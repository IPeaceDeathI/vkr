<template>
    <template v-if="$store.getters['environment/isEditable']">
        <template v-if="containerIsEmpty">
            <v-hover v-slot="{ isHovering, props }">
                <v-card
                    v-bind="props"
                    rounded="lg"
                    color="primary"
                    :elevation="isHovering ? 12 : 3"
                    class="empty"
                    @click="openBlockCatalog"
                    ><v-icon
                        :color="isHovering ? 'editor' : 'secondary'"
                        size="x-large"
                        >mdi-plus</v-icon
                    >

                    <v-tooltip location="bottom" activator="parent">
                        Добавить блок
                    </v-tooltip>
                </v-card>
            </v-hover>
        </template>
        <template v-else>
            <add-button
                :hidden="true"
                class="noks-controls"
                @click="openBlockCatalog"
                v-if="position === 'center'"
            >
            </add-button>
            <div
                v-else
                class="add-block-btn"
                :class="position"
                @click="openBlockCatalog"
            >
                <v-tooltip
                    :location="position === 'top' ? 'bottom' : 'top'"
                    activator="parent"
                    open-delay="500"
                >
                    Добавить блок
                </v-tooltip>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 18">
                    <path
                        d="M0 0H68C53 0 53.5 18 34 18C14.5 18 15 0 0 0Z"
                    ></path>
                </svg>
                <v-icon class="icon-plus" size="small" color="primary"
                    >mdi-plus</v-icon
                >
            </div>
        </template>
    </template>
</template>
<script lang="ts">
import { addButton } from "@/shared/helpers/components";
import { defineComponent } from "vue";
import { BlockCatalogService } from "@/shared/services/block-catalog/blockCatalogService";
import { BlockBundle, BlockParams } from "@/types";
export default defineComponent({
    components: { addButton },
    props: {
        //OPTIMIZATION
        index: {
            type: Number,
            required: false,
        },
        containerIsEmpty: {
            type: Boolean,
            default: false,
        },
        position: {
            type: String,
            validator(value: string) {
                // The value must match one of these strings
                return ["top", "bottom", "center"].includes(value);
            },
            default: "center",
        },
    },
    emits: {
        addBlock: (blockParams: BlockBundle) => true,
    },
    data() {
        return {
            catalogOpened: false as boolean,
        };
    },
    methods: {
        callAddBlock(blockParams: BlockBundle) {
            this.$emit("addBlock", blockParams);
        },
        openBlockCatalog() {
            BlockCatalogService.open(this.callAddBlock);
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.empty {
    @include centering-container;
    cursor: pointer;
    opacity: 0.6;
    height: 120px;
    width: 120px;
    i {
        height: 50px;
        width: 50px;
    }
    i::before {
        font-size: 50px;
        height: 50px;
        width: 50px;
    }
    &:hover {
        opacity: 0.8;
    }
}
.add-block-btn {
    fill: $theme-editor;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 68px;
    height: 18px;
    z-index: calc(var(--base-z-index) + $editor-add-block-btns-z-index);
    cursor: pointer;
    opacity: 0.8;
    &:hover {
        opacity: 1;
    }
    &.bottom {
        bottom: 0;
        top: unset;
        transform: rotate(180deg) translateX(50%);
    }
}
.add-block-btn-center-container {
    height: 1px;
    position: relative;
    z-index: calc(var(--base-z-index) + $editor-add-block-btns-z-index);
    &:has(.add-icon:hover) {
        box-shadow: 0px 1px 0px $theme-editor, inset 0px -1px 0px $theme-editor,
            inset 1px 0px 0px $theme-editor, inset -1px 0px 0px $theme-editor;
    }
}
.add-icon {
    position: absolute;
    z-index: calc(var(--base-z-index) + $editor-add-block-btns-z-index);
    left: 50%;
    transform: translateX(-50%);
    top: -15px;
    cursor: pointer;
    opacity: 0.8;
    &:hover {
        opacity: 1;
    }
}
.add-icon-helper {
    position: absolute;
    z-index: calc(var(--base-z-index) + $editor-add-block-btns-z-index);
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: $theme-primary;
}
.icon-plus {
    position: absolute;
    top: -1;
    left: 50%;
    transform: translateX(-50%);
}
</style>
