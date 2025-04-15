<template>
    <div
        v-show="show"
        class="window-overlay-container"
        :data-el-id="id"
        :id="JSON.stringify(params.publishId)"
        :data-zone-id="id"
        v-bind="attributes"
        ref="zoneHTMLWrapper"
    >
        <div
            class="zone window-c noks-row"
            :data-el-id="id"
            :class="{ 'empty-children': itemLength < 1 }"
            ref="wrp"
        >
            <closeC
                :position="WindowCrossPosition.inside"
                :iconPath="params.styles.cross.path"
                @close="emit('close')"
            />
            <closeC
                :position="WindowCrossPosition.near"
                :iconPath="params.styles.cross.path"
                @close="emit('close')"
            />
            <zone-bg
                :class="{
                    'bg-image':
                        params.styles.background.type === ZoneBgTypes.image,
                }"
                v-if="params.styles.background.type !== ZoneBgTypes.none"
            />
            <zone-shadow />
            <zone-border v-if="params.styles.border.enabled" />
            <items-list
                ref="itemListRef"
                :id="id"
                :zone-params="params"
                :items="windowBundle.items"
                @updateItemLength="itemLength = $event"
            />
        </div>
        <div
            data-noks-window-close
            class="window-overlay"
            @click="emit('close')"
        >
            <closeC
                :position="WindowCrossPosition.outside"
                :iconPath="params.styles.cross.path"
                @close="emit('close')"
            />
            <div
                class="window-toolbar"
                v-if="$store.getters['environment/isEditable']"
            >
                <template v-if="!redactorIsOpen">
                    <v-btn
                        variant="flat"
                        color="editor"
                        rounded="xl"
                        class="text-body-2 mr-2"
                        prepend-icon="mdi-cog"
                        @click.stop="redactorIsOpen = true"
                    >
                        Настройки окна
                    </v-btn>
                    <v-btn
                        variant="flat"
                        color="success"
                        rounded="xl"
                        class="text-body-2 mr-2"
                    >
                        Закрыть
                    </v-btn>
                </template>

                <windowRedactor
                    v-model="redactorIsOpen"
                    :window-params="params"
                    @update:window-params="updateParams"
                    :parent-selector="zoneHTMLWrapper"
                />
            </div>
        </div>
    </div>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>

<script setup lang="ts">
import zoneBg from "../_common/zone-bg.vue";
import zoneShadow from "../_common/zone-shadow.vue";
import zoneBorder from "../_common/zone-border.vue";
import { windowRedactor } from "@/features/structure";
import closeC from "./_close-c.vue";
import {
    WindowCrossPosition,
    WindowParams,
    ZoneBundle,
    ZoneTypes,
    ZoneBgTypes,
    ItemBundle,
} from "@/types";
import { PublishTargetAttributes } from "@/publish";
import { ref, toRefs, onMounted, onUnmounted, triggerRef } from "vue";
import useZone from "../useZone";
import itemsList from "../items-list/items-list.vue";
import { useStore } from "vuex";
type Props = {
    id: string;
    windowBundle: ZoneBundle;
    show: boolean;
};
const props = defineProps<Props>();
type Emits = {
    close: [];
};
const emit = defineEmits<Emits>();
const { id, show } = toRefs(props);
const store = useStore();
function validZoneParms(
    zoneBundle: ZoneBundle
): Omit<WindowParams, "parentId" | "childrenIds"> {
    //OPTIMIZATION elfkbnm childrenid and parentId и убрать это приведение типов
    const params = zoneBundle.zoneParams as unknown as WindowParams;
    if (params.type === ZoneTypes.window) {
        return params;
    }
    //OPTIMIZATION вызывать сервис ошибок вместо throw
    throw "no window";
}
//OPTIMIZATION проблема если использовать shallowRef, при измененнии wrapperPadding в редакторе, модль не обновится
const params = ref<Omit<WindowParams, "parentId" | "childrenIds">>(
    structuredClone(validZoneParms(props.windowBundle))
);
const itemLength = ref<number>(props.windowBundle.items.length);
const itemListRef = ref<typeof itemsList>();

const { zoneHTMLWrapper, styles } = useZone(id, params, itemListRef);

const redactorIsOpen = ref<boolean>(false);

const attributes = (): { "data-noks-window": boolean } => {
    return {
        [PublishTargetAttributes.window]: true,
    };
};
const updateParams = (
    value: Omit<WindowParams, "parentId" | "childrenIds">
) => {
    params.value = value;
    triggerRef(params);
};
//LIFE CYRCLE
onMounted(() => {
    store.state.structure.windows.push(id.value);
});
onUnmounted(() => {
    const index = store.state.structure.windows.indexOf(id.value);
    if (index !== -1) store.state.structure.windows.splice(1, index);
});
//END LIFE CYRCLE
</script>

<style scoped></style>
