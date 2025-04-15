<template>
    <v-list-item
        color="primary"
        density="compact"
        :value="index"
        class="tree-menu-item"
    >
        <v-list-item-title> {{ item.title }}</v-list-item-title>
        <template v-slot:prepend>
            <v-icon :icon="item.prependIcon"></v-icon>
        </template>
        <template v-slot:append>
            <v-btn
                width="30px"
                height="30px"
                min-width="30px"
                variant="plain"
                @click="copyClass"
            >
                <v-tooltip
                    activator="parent"
                    location="top"
                    v-if="item.tooltipText"
                    >{{ item.tooltipText }}</v-tooltip
                >

                <v-icon size="small" :icon="item.appendIcon"></v-icon>
            </v-btn>
            <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
        <v-menu
            activator="parent"
            :close-on-content-click="false"
            :close-delay="100"
            :open-on-hover="true"
            :persistent="true"
            location="end top"
            max-width="500px"
            class="tree-menu-item"
        >
            <v-card>
                <v-list class="menu-list" variant="text" bgColor="secondary">
                    <v-list-item color="secondary" class="text-body-2">
                        {{ item.staticSubitem.title }}
                    </v-list-item>
                    <template
                        v-for="(subitem, index) in item.subitems"
                        :key="index"
                    >
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item
                                color="secondary"
                                @click="subitem?.callBackFn(subitem.title)"
                                class="text-body-2"
                                v-bind="props"
                            >
                                {{ subitem.title }}
                                <template v-slot:append>
                                    <v-icon
                                        size="small"
                                        icon="mdi-close"
                                        v-if="isHovering"
                                        @click.stop="subitem.deleteFn"
                                    ></v-icon>
                                </template>
                            </v-list-item>
                        </v-hover>
                    </template>
                    <v-list-item min-width="226px">
                        <v-text-field
                            width
                            placeholder="Название класса"
                            base-color="secondary-lighten-5"
                            color="secondary-lighten-4"
                            density="compact"
                            variant="outlined"
                            v-model="newClass"
                            class="tree-menu-text-field"
                            @keyup.enter="refreshTextField(newClass)"
                        >
                            <template v-slot:append-inner>
                                <v-btn
                                    color="secondary-lighten-1"
                                    @click="refreshTextField(newClass)"
                                    class="text-body-2"
                                    width="70px"
                                    height="32px"
                                    min-width="70px"
                                >
                                    Добавить
                                </v-btn>
                            </template>
                        </v-text-field>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </v-list-item>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { TreeMenuClassItem } from "./types";
import { InformationIconType } from "@/shared/libs/information-icon";

export default defineComponent({
    name: "main-item",
    props: {
        item: {
            type: Object as PropType<TreeMenuClassItem>,
            required: true,
        },
        index: String,
    },
    data() {
        return {
            InformationIconType: InformationIconType,
            newClass: "" as string,
        };
    },
    methods: {
        refreshTextField(newClass: string) {
            if (newClass !== "") {
                this.item.staticSubitem.addFn(newClass);
            }
            this.newClass = "";
        },
        copyClass() {
            const subitems = this.item.subitems;
            const lastClass =
                subitems.length > 0
                    ? subitems[subitems.length - 1].title
                    : this.item.staticSubitem.title;
            this.item.copyFn(lastClass);
        },
    },
});
</script>
<style lang="scss" scoped>
@import "./styles.scss";
</style>
