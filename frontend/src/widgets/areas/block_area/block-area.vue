<template>
    <styles-container />
    <div
        class="block-area"
        :class="{
            'smth-is-drag': store.getters['environment/elementIsDragging'],
        }"
    >
        <div v-if="blocks.length < 1" class="empty-block-area-container">
            <add-block-btn
                @add-block="addBlock(0, $event)"
                :containerIsEmpty="true"
            />
        </div>
        <template v-else>
            <add-block-btn @add-block="addBlock(0, $event)" position="top" />
            <transition-group name="flip-list" tag="div">
                <!-- OPTIMIZATION добавит генерацию id у родителя и что-то выдумать с key -->
                <template
                    v-for="(blockElement, index) in blocks"
                    :key="blockElement.id"
                >
                    <div>
                        <block-c
                            :myPositionInBlockArea="index"
                            :id="blockElement.id"
                            :block-params="blockElement.bundle"
                            @copy="copyBlock(index)"
                            @paste="pasteBlock(index)"
                            @delete="removeBlock(index)"
                            @clone="cloneBlock(index)"
                            @save="saveBlock(index)"
                            @move-top="moveTop(index)"
                            @move-bottom="moveBottom(index)"
                            @changeBurgerHeaderState="
                                burgerHeaderIsEnabled = $event
                            "
                        />
                        <add-block-btn
                            v-if="index != blocks.length - 1"
                            @add-block="addBlock(index + 1, $event)"
                        />
                    </div>
                </template>
            </transition-group>
            <add-block-btn
                @add-block="addBlock(blocks.length, $event)"
                position="bottom"
            />
        </template>
        <burger-header v-if="burgerHeaderIsEnabled" />
        <!-- TODO оптимизация можно как-то не рендерит сразу все окна, вопрос только в том, как потом при сохранение срендерить все -->
        <template
            v-for="(windowElement, index) in windows"
            :key="windowElement.id"
        >
            <window-c
                :id="windowElement.id"
                :show="openedWindowIndex === index"
                :window-bundle="windowElement.bundle"
                @close="openedWindowIndex = false"
            />
        </template>
    </div>
    <Teleport to="body">
        <window-picker
            :model-value="showWindowPicker && openedWindowIndex === false"
            @update:model-value="showWindowPicker = $event"
            :window-ids="windowIds"
            @add-window="addWindow(0, $event)"
            @remove="removeWindow"
            @clone="cloneWindow"
            @copy="copyWindow"
            @paste="pasteWindow"
            @open="openedWindowIndex = $event"
        />
    </Teleport>
</template>

<script setup lang="ts">
import blockC from "./block-c/block-c.vue";
import windowC from "@/widgets/zones/window-c/window-c.vue";
import burgerHeader from "./widgets/burger-header.vue";
import { addBlockBtn, blockSpacerResize } from "@/features/structure";
import { useStore } from "@/app/providers/store";
import { provide, ref } from "vue";
import {
    BlockBundle,
    BlockHeaderParams,
    BlockParams,
    ProjectBundle,
    ZoneBundle,
    ZoneTypes,
} from "@/types";
import { INumberOfBlocks } from "./../../injectKeys";
import stylesContainer from "./styles-container/styles-container.vue";
import { computed } from "vue";
import { CriticalError, WarningError } from "@/shared/services/error_service";
import windowPicker from "@/shared/services/window-picker/window-picker.vue";
import { getUUID, randomIntFromInterval } from "@/shared/helpers";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";

import { BundleUncollector, CopyPaste } from "@/entities";
import { getEmptyBlockBundle } from "@/shared/services/block-catalog/mock-data";
import BlockHeaderFixRedactor from "@/features/structure/redactors/main-redactors/zone/block-header-redactors/block-header-fix-redactor.vue";

const store = useStore();

//STATE
const blocks = ref<{ id: string; bundle: BlockBundle }[]>([]);
//OPTIMIZATION тут мне не нравится zoneBundle возможно для окон стоить создать определенный windowBundle
const numberOfBlocks = computed(() => blocks.value.length);
provide(INumberOfBlocks, numberOfBlocks);

const windows = ref<{ id: string; bundle: ZoneBundle }[]>([]);
const openedWindowIndex = ref<false | number>(false);
const showWindowPicker = computed<boolean>({
    get: () => {
        return store.getters["environment/showWindowPicker"];
    },
    set: (value) => {
        store.commit("environment/SET_SHOW_WINDOW_PICKER", value);
    },
});
const windowIds = computed<Array<number>>(() => {
    const result: number[] = [];
    windows.value.forEach(({ bundle }) => {
        if (bundle.zoneParams?.type === ZoneTypes.window) {
            //OPTIMIZATION после ибавление от parentids убрать
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            result.push(bundle.zoneParams.publishId);
        }
    });
    return result;
});
//END STATE

//BURGER-HEADER
const burgerHeaderIsEnabled = ref(false);
//END BURGER-HEADER

//BLOCKS MANAGMENT
const addBlock = (index: number, blockBundle: BlockBundle) => {
    // OPTIMIZATION  существует проблема с anchor, который при сохранении также сохраняется, возможно стоит просто генить новый id
    blocks.value = blocks.value.toSpliced(index, 0, {
        id: getUUID(),
        bundle: blockBundle,
    });
};
const removeBlock = (index: number) => {
    blocks.value = blocks.value.toSpliced(index, 1);
};
const copyBlock = async (index: number) => {
    const tmp = store.state.structure.blocks.blocksComponentOPTIM.get(
        blocks.value[index].id
    );
    if (!tmp) return;
    const bundle = tmp.getBundle();
    await navigator.clipboard.writeText(JSON.stringify(bundle)).catch((err) => {
        console.log("Ошибка копирования", err);
    });
};
const pasteBlock = async (index: number) => {
    await navigator.clipboard
        .readText()
        .then((bundle) => {
            blocks.value = blocks.value.toSpliced(index + 1, 0, {
                id: getUUID(),
                bundle: JSON.parse(bundle),
            });
        })
        .catch((err) => {
            new WarningError({
                notificationTitle: "Ошибка вставки",
                isNotification: true,
                bundle: err,
                message: "Ошибка вставки",
            });
        });
};
const cloneBlock = (index: number) => {
    const tmp = store.state.structure.blocks.blocksComponentOPTIM.get(
        blocks.value[index].id
    );
    if (!tmp) return;
    blocks.value = blocks.value.toSpliced(index + 1, 0, {
        id: getUUID(),
        bundle: tmp.getBundle(),
    });
};
const saveBlock = (index: number) => {
    const tmp = store.state.structure.blocks.blocksComponentOPTIM.get(
        blocks.value[index].id
    );
    if (!tmp) return;

    const bundle = tmp.getBundle();
    //OPTIMIZATION
    // BlocksModel.addBlock(bundle);
};
const moveTop = (index: number) => {
    const id1 = blocks.value[index - 1].id;
    const id2 = blocks.value[index].id;

    swap(blocks.value, index, index - 1);

    const tmp1 = store.state.structure.blocks.blocksComponentOPTIM.get(id1);
    const tmp2 = store.state.structure.blocks.blocksComponentOPTIM.get(id2);
    if (tmp1) {
        store.state.structure.blocks.blocksComponentOPTIM.set(id2, tmp1);
    }
    if (tmp2) {
        store.state.structure.blocks.blocksComponentOPTIM.set(id1, tmp2);
    }
};
const moveBottom = (index: number) => {
    const id1 = blocks.value[index].id;
    const id2 = blocks.value[index + 1].id;

    swap(blocks.value, index, index + 1);

    const tmp1 = store.state.structure.blocks.blocksComponentOPTIM.get(id1);
    const tmp2 = store.state.structure.blocks.blocksComponentOPTIM.get(id2);
    if (tmp1) {
        store.state.structure.blocks.blocksComponentOPTIM.set(id2, tmp1);
    }
    if (tmp2) {
        store.state.structure.blocks.blocksComponentOPTIM.set(id1, tmp2);
    }
};
//END BLOCKS MANAGMENT

//WINDOWS MANAGMENT
const addWindow = (index: number, zoneBundle: ZoneBundle) => {
    // OPTIMIZATION  существует проблема с anchor, который при сохранении также сохраняется, возможно стоит просто генить новый шв
    windows.value = windows.value.toSpliced(
        index,
        0,
        prepareWindowToAdd(zoneBundle)
    );
};
const removeWindow = (index: number) => {
    windows.value = windows.value.toSpliced(index, 1);
};
const copyWindow = async (index: number) => {
    try {
        const tmp = store.state.structure.zones.zoneComponents.get(
            windows.value[index].id
        );
        if (!tmp)
            throw new CriticalError({
                message:
                    "Критическая ошибка копирования окна под номером " +
                    (index + 1),
            });
        const bundle: ZoneBundle = tmp.getBundle();
        await navigator.clipboard.writeText(JSON.stringify(bundle));
        NotificationService.common().success({ text: "Скопировано" });
    } catch (error) {
        NotificationService.common().error({ text: "Ошибка копирования" });
    }
};
const pasteWindow = (index: number) => {
    navigator.clipboard
        .readText()
        .then((bundle) => {
            addWindow(index, JSON.parse(bundle));
        })
        .catch((err) => {
            new WarningError({
                notificationTitle: "Ошибка вставки",
                isNotification: true,
                bundle: err,
                message: "Ошибка вставки",
            });
        });
};
const cloneWindow = (index: number) => {
    try {
        const tmp = store.state.structure.zones.zoneComponents.get(
            windows.value[index].id
        );
        if (!tmp)
            throw new CriticalError({
                message:
                    "Критическая ошибка клонирования окна под номером " +
                    (index + 1),
            });
        const bundle: ZoneBundle = tmp.getBundle();
        addWindow(index + 1, bundle);
    } catch (err: any) {
        new WarningError({
            notificationTitle: "Ошибка клонирования",
            isNotification: true,
            bundle: err.toString ? err.toString() : "",
            message: "Ошибка клонирования",
        });
    }
};
//END WINDOWS MANAGMENT

//SUP FUNCTION
const loadProject = async (projectBundle: ProjectBundle) => {
    blocks.value = projectBundle.structure.blocks.map((bundle) => {
        return { id: getUUID(), bundle: bundle };
    });
    windows.value = projectBundle.structure.windows.map((bundle) => {
        return { id: getUUID(), bundle: bundle };
    });

    if (blocks.value.length < 1 && windows.value.length < 1) {
        store.commit("project/SET_EMPTY", true);
    } else store.commit("project/SET_EMPTY", false);

    //OPTIMIZATION потом стоит выбрать другое место для шрифтом, тут оствить только структуру
    store.dispatch(
        "environment/CHANGE_FONT_PAGE",
        projectBundle.fonts.pageFonts
    );
    store.dispatch(
        "environment/CHANGE_REDEFINE_FONTS",
        projectBundle.fonts.redefine
    );
};
const swap = (array: Array<any>, index1: number, index2: number) => {
    [array[index1], array[index2]] = [array[index2], array[index1]];
};
const prepareWindowToAdd = (
    zoneBundle: ZoneBundle
): { id: string; bundle: ZoneBundle } => {
    if (zoneBundle.zoneParams?.type !== ZoneTypes.window) {
        throw new CriticalError({
            bundle: JSON.stringify(zoneBundle),
            message:
                "Критическая ошибка при проверке типа покета зоны, переданный покет не является окном " +
                JSON.stringify(zoneBundle),
        });
    }
    return { id: getUUID(), bundle: zoneBundle };
};
//END SUP FUNCTION

//CREATED
store.commit("project/SET_LOAD_PROJECT", loadProject);
</script>

<style scoped></style>
