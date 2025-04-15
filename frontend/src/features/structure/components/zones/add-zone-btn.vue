<template>
    <template v-if="$store.getters['environment/isEditable']">
        <transition name="fade">
            <v-btn
                size="small"
                @click="add"
                class="add-zone-btn noks-controls"
                color="editor"
                rounded="xl"
                >Добавить элемент</v-btn
            >
        </transition>
    </template>
</template>
<script lang="ts">
import { ZonesFabric } from "@/shared/services/elements_fabrics/zones_fabric";
import { BodyLayoutType, ZoneBundle, ZoneTypes } from "@/types";
import { defineComponent, PropType } from "vue";
export default defineComponent({
    props: {
        zoneType: {
            type: String as PropType<ZoneTypes>,
            required: true,
        },
    },
    emits: {
        addZone: (value: ZoneBundle) => true,
    },
    methods: {
        add() {
            this.$emit(
                "addZone",
                ZonesFabric.getInstance().getZone(this.zoneType).getBundle()
            );
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.add-zone-btn {
    position: absolute;
    z-index: calc(var(--base-z-index) + $noks-controls-z-index);
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>
