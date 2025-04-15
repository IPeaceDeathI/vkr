<template>
    <v-lazy
        @update:modelValue="blockIsOutsideViewport = true"
        :height="blockIsOutsideViewport ? undefined : '400px'"
        :options="{ threshold: 0.5 }"
        transition="fade-transition"
    >
        <div
            ref="blockCRef"
            class="block-c"
            :data-contrast="contrastAttr"
            :data-noks-element-visibility="params.blockCParams.visibility"
        >
            <block-container
                ref="blockContainerRef"
                :blockCParams="params.blockCParams"
                v-model:bottomSpacerHeight="bottomSpacerHeight"
                v-model:topSpacerHeight="topSpacerHeight"
                :base-b-g-params="params.baseBGParams"
                :id="id"
                :block-body-bundles="props.blockParams.blockBodies"
                :buffered-block-body-params="blockBodyParams"
                @update:buffered-block-body-params="blockBodyParams = $event"
                :block-title-bundle="blockTitleBundle"
                :buffered-block-title-params="blockTitleParams"
                :block-title-is-enabled="params.blockTitleIsEnabled"
                @update:buffered-block-title-params="blockTitleParams = $event"
                :buffered-block-header-params="blockHeaderParams"
                :block-header-bundle="blockHeaderBundle"
                :block-header-is-enabled="params.headerIsEnabled"
                @update:buffered-block-header-params="
                    blockHeaderParams = $event
                "
                :buffered-block-header-second-row-params="
                    blockHeaderSecondRowParams
                "
                :block-header-second-row-bundle="blockHeaderSecondRowBundle"
                :block-header-second-row-is-enabled="headerSecondRowIsEnabled"
                @update:buffered-block-header-second-row-params="
                    blockHeaderSecondRowParams = $event
                "
            />
            <block-editor-controls
                :blockRef="blockRef"
                :myPositionInBlockArea="myPositionInBlockArea"
                :number-of-blocks="numberOfBlocks"
                :blockCParams="blockCParams"
                :blockBodyParams="blockBodyParams"
                :blockParams="params"
                :block-title-bundle="blockTitleBundle"
                :block-title-params="blockTitleParams"
                :block-header-params="blockHeaderParams"
                :block-header-bundle="blockHeaderBundle"
                @on-copy="emits('copy')"
                @on-paste="emits('paste')"
                @on-delete="emits('delete')"
                @on-clone="emits('clone')"
                @on-save="emits('save')"
                @move-top="emits('moveTop')"
                @move-bottom="emits('moveBottom')"
                @update:blockParams="updateBlockParams"
                @update:blockBodyParams="updateBlockBodyParams"
                @update:block-title-params="blockTitleParams = $event"
                @update:block-title-bundle="blockTitleBundle = $event"
                @update:block-header-params="blockHeaderParams = $event"
                @update:block-header-bundle="blockHeaderBundle = $event"
                @update:block-header-second-row-params="
                    blockHeaderSecondRowParams = $event
                "
                @update:block-header-second-row-bundle="
                    blockHeaderSecondRowBundle = $event
                "
                @changeBurgerHeaderState="
                    emits('changeBurgerHeaderState', $event)
                "
            />
        </div>
    </v-lazy>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>

<script setup lang="ts">
// "update:blockCParams": (value: BlockCParams) => true,
import {
    defineProps,
    inject,
    ref,
    defineEmits,
    shallowRef,
    computed,
    triggerRef,
    onMounted,
    onUnmounted,
    toRefs,
} from "vue";
import {
    BlockBodyBundle,
    BlockBodyParams,
    BlockBundle,
    BlockCParams,
    BlockHeaderParams,
    BlockParams,
    BlockTitleParams,
    ContrastColor,
    TextColorAutoTypes,
    ZoneBundle,
} from "@/types";
import { getContrastColor } from "@/shared/helpers";
import { useElement } from "@/widgets/useElement";
import blockContainer from "./block-container/block-container.vue";
import { blockEditorControls } from "@/features/structure";
import { INumberOfBlocks } from "@/widgets/injectKeys";
import { getBlockStyles } from "@/shared/services";
import { useStore } from "@/app/providers";
import { CriticalError } from "@/shared/services/error_service";
type Props = {
    id: string;
    blockParams: BlockBundle;
    myPositionInBlockArea: number;
};
type Emits = {
    moveBottom: [];
    moveTop: [];
    remove: [];
    copy: [];
    paste: [];
    delete: [];
    clone: [];
    save: [];
    changeBurgerHeaderState: [value: boolean];
};
const store = useStore();
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
//Скорее всего у тебя не получится разобраться с тем, как эта система работает, поэтому пиши в тг
//STATE
const { id } = toRefs(props);
const blockRef = ref(null) as unknown as HTMLElement;
const numberOfBlocks = inject(INumberOfBlocks);
const blockIsOutsideViewport = ref(true);
const styles = computed(() => {
    return getBlockStyles({
        elementId: id.value,
        BlockParams: params.value,
    });
});
//END STATE

//LIFE CYRCLE
useElement();
onMounted(() => {
    store.state.structure.blocks.blocksComponentOPTIM.set(id.value, {
        index: props.myPositionInBlockArea,
        getBundle: getMeAsBundle,
        setBundle: setMeFromBundle,
    });
});
onUnmounted(() => {
    store.state.structure.blocks.blocksComponentOPTIM.delete(id.value);
});
//END LIFE CYRCLE
//BLOCK PARAMS
const params = shallowRef<
    Omit<BlockParams, "blockTitle" | "parentId" | "childrenBlockBodiesId">
>(structuredClone(props.blockParams.blockParams)); // здесь менять параметры с emit'ов
const updateBlockParams = function (
    value: Omit<
        BlockParams,
        "blockTitle" | "parentId" | "childrenBlockBodiesId"
    >
) {
    params.value = value;
    triggerRef(params);
};

const blockCParams = computed<BlockCParams>({
    get() {
        return params.value.blockCParams;
    },
    set(blockCParams) {
        params.value.blockCParams = blockCParams;
    },
});
const contrastAttr = computed<"dark" | "light">(() => {
    if (!params.value) return "light";
    const autoType = params.value.baseBGParams.textColorAutoType;
    if (autoType === TextColorAutoTypes.dark) {
        return "dark";
    } else if (autoType === TextColorAutoTypes.light) {
        return "light";
    } else {
        const contrColor = getContrastColor(
            params.value.baseBGParams.color.backgroundColor
        );
        return contrColor === ContrastColor.light ? "light" : "dark";
    }
});
//END BLOCK PARAMS

//BLOCK TITLE PARAMS
const blockTitleBundle = ref<false | ZoneBundle>(props.blockParams.blockTitle);
//не являются "трушными" парметрами служит только буфером для передачи между BLOCK TITLE и BLOCK REDACTOR
//если нужно менять парметры blockTitle, то меняйте params в компоненте block-title.vue
const blockTitleParamsBuffer = ref<
    Omit<BlockTitleParams, "parentId" | "childrenIds"> | false
>(false);
const blockTitleParams = computed<
    Omit<BlockTitleParams, "parentId" | "childrenIds"> | false
>({
    get() {
        return blockTitleParamsBuffer.value;
    },
    set(value) {
        blockTitleParamsBuffer.value = value;
    },
});
//END BLOCK TITLE PARAMS

//BLOCK BODY PARAMS
//не являются "трушными" парметрами служит только буфером для передачи между BLOCK BODY и BLOCK REDACTOR
//если нужно менять парметры blockbody, то меняйте params в компоненте block-body.vue
const blockBodyParamsBuffer = ref<
    Omit<BlockBodyParams, "parentId" | "childrenIds">
>(
    //TODO убрать и обратить внимаенние, что тут делать при нескольких block bodies
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    props.blockParams.blockBodies[0].blockBodyParams
);
const blockBodyParams = computed<
    Omit<BlockBodyParams, "parentId" | "childrenIds">
>({
    get() {
        return blockBodyParamsBuffer.value;
    },
    set(value) {
        blockBodyParamsBuffer.value = value;
    },
});
const updateBlockBodyParams = function (
    value: Omit<BlockBodyParams, "parentId" | "childrenIds">
) {
    blockBodyParams.value = value;
    triggerRef(blockBodyParamsBuffer);
};
//END BLOCK BODY PARAMS

//HEADER PARAMS
//не являются "трушными" парметрами служит только буфером для передачи между HEADER и BLOCK REDACTOR
//если нужно менять парметры header, то меняйте params в компоненте block-header.vue
const blockHeaderParamsBuffer = ref<
    Omit<BlockHeaderParams, "parentId" | "childrenIds"> | false
>(false);
const blockHeaderParams = computed<
    Omit<BlockHeaderParams, "parentId" | "childrenIds"> | false
>({
    get() {
        return blockHeaderParamsBuffer.value;
    },
    set(value) {
        blockHeaderParamsBuffer.value = value;
    },
});
const blockHeaderBundle = ref<false | ZoneBundle>(props.blockParams.header);

const blockHeaderSecondRowParamsBuffer = ref<
    Omit<BlockHeaderParams, "parentId" | "childrenIds"> | false
>(false);
const blockHeaderSecondRowParams = computed<
    Omit<BlockHeaderParams, "parentId" | "childrenIds"> | false
>({
    get() {
        return blockHeaderSecondRowParamsBuffer.value;
    },
    set(value) {
        blockHeaderSecondRowParamsBuffer.value = value;
    },
});
const blockHeaderSecondRowBundle = ref<false | ZoneBundle>(
    props.blockParams.headerSecondRow ?? false
);
const headerSecondRowIsEnabled = computed<boolean>(() => {
    if (blockHeaderParams.value) {
        return blockHeaderParams.value.isSecondRow;
    } else return false;
});
//END HEADER PARAMS

//BUNDLE
const blockContainerRef = ref<typeof blockContainer>();
const getMeAsBundle = function (): BlockBundle {
    return {
        blockParams: params.value,
        header: collectBlockHeaderBundle(),
        headerSecondRow: collectBlockHeaderSecondRowBundle(),
        blockTitle: collectBlockTitleBundle(),
        blockBodies: collectBlockBodyBundles(),
    };
};
const setMeFromBundle = function (bundle: BlockBundle): void {
    console.log(bundle);
};
const collectBlockBodyBundles = (): Array<BlockBodyBundle> => {
    if (blockContainerRef.value)
        return blockContainerRef.value.getBlockBodyBundles();
    else
        throw new CriticalError({
            message: "Критическая ошибка при сборке пакета вкладки ",
        });
};
const collectBlockTitleBundle = (): ZoneBundle | false => {
    if (blockContainerRef.value)
        //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getBlockTitleBundle не найдено
        return blockContainerRef.value.getBlockTitleBundle();
    else
        throw new CriticalError({
            message: "Критическая ошибка при сборке пакета заголовка блока ",
        });
};
const collectBlockHeaderBundle = (): ZoneBundle | false => {
    if (params.value.headerIsEnabled) {
        if (blockContainerRef.value) {
            //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getBlockTitleBundle не найдено
            return blockContainerRef.value.getBlockHeaderBundle();
        } else
            throw new CriticalError({
                message: "Критическая ошибка при сборке пакета хедера блока ",
            });
    } else return false;
};
const collectBlockHeaderSecondRowBundle = (): ZoneBundle | false => {
    if (
        params.value.headerIsEnabled &&
        blockHeaderParams.value &&
        blockHeaderParams.value.isSecondRow
    ) {
        if (blockContainerRef.value)
            //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getBlockTitleBundle не найдено
            return blockContainerRef.value.getBlockHeaderSecondRowBundle();
        else
            throw new CriticalError({
                message:
                    "Критическая ошибка при сборке пакета 2ой строки хедера блока ",
            });
    } else return false;
};
//END BUNDLE

//SPACERS
const topSpacerHeight = computed<number>({
    get() {
        return params.value.topSpacerHeight;
    },
    set(blockCParams) {
        params.value.topSpacerHeight = blockCParams;
        triggerRef(params);
    },
});

const bottomSpacerHeight = computed<number>({
    get() {
        return params.value.bottomSpacerHeight;
    },
    set(blockCParams) {
        params.value.bottomSpacerHeight = blockCParams;
        triggerRef(params);
    },
});
//END SPACER
</script>

<style scoped></style>
