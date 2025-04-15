<template>
    <draggable-inner-card width="360px" v-model="show">
        <redactor-toolbar title="Структура" @close-click="show = false" />
        <v-redactor-container>
            <v-row>
                <v-col cols="6">
                    <redactor-component-title
                        >Цвет фона</redactor-component-title
                    >
                    <color-editor :auto-color="true" v-model="bgColor" />
                </v-col>
                <v-col cols="6">
                    <redactor-component-title style="visibility: hidden">
                        Цвет фона
                    </redactor-component-title>
                    <v-btn-toggle v-model="textColor">
                        <v-btn
                            icon="mdi mdi-invert-colors"
                            value="auto"
                        ></v-btn>
                        <v-btn
                            icon="mdi mdi-water-outline"
                            value="#ffffff"
                        ></v-btn>
                        <v-btn icon="mdi mdi-water" value="#000000"></v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <redactor-component-title
                        >Размытие фона</redactor-component-title
                    >
                    <v-text-field suffix="px" type="number" v-model="blur" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <redactor-component-title>
                        Фиксировать
                    </redactor-component-title>
                    <v-btn-toggle v-model="fixedRows">
                        <v-btn icon="mdi mdi-invert-colors" value="all">
                            Оба ряда
                        </v-btn>
                        <v-btn icon="mdi mdi-water" value="first">
                            Первый ряд
                        </v-btn>
                        <v-btn icon="mdi mdi-water-outlined" value="second">
                            Второй ряд
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-switch
                        label="Переопределить отступы"
                        v-model="customPaddings"
                    />
                    <v-sheet
                        color="transparent"
                        class="d-flex"
                        v-if="customPaddings"
                    >
                        <v-col cols="6" class="pl-0">
                            <redactor-component-title>
                                Отступ сверху
                            </redactor-component-title>
                            <v-text-field
                                suffix="px"
                                type="number"
                                v-model="paddingTop"
                            />
                        </v-col>
                        <v-col cols="6" class="pr-0">
                            <redactor-component-title>
                                Отступ снизу
                            </redactor-component-title>
                            <v-text-field
                                suffix="px"
                                type="number"
                                v-model="paddingBottom"
                            />
                        </v-col>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-redactor-container>
    </draggable-inner-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import mixin from "./_mixin";

export default defineComponent({
    mixins: [mixin],
});
</script>
<style lang="scss" scoped></style>
