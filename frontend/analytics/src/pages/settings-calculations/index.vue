<template>
    <div>
        <v-list-subheader inset>
            <p>
                Используйте собственные формулы, чтобы глубже анализировать
                данные. Например, чтобы посмотреть отношение заявок к событию.
            </p>
        </v-list-subheader>

        <v-col>
            <v-data-table
                :headers="tableTitle"
                item-value="name_calc"
                :items="tableDataArray"
                class="text-center"
            >
                <template v-slot:top>
                    <v-toolbar color="white">
                        <v-btn
                            size="default"
                            density="compact"
                            color="primary-darken-2"
                            variant="flat"
                            class="ml-2"
                        >
                            Добавить показатель
                            <add-calc-dialog />
                        </v-btn>
                        <!-- <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    variant="tonal"
                                    class="mb-2"
                                    color="primary"
                                    v-bind="props"
                                    size="default"
                                >
                                    Добавить показатель
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5"
                                        >Добавление пользовательского
                                        показателя</span
                                    >
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" md="4" sm="6">
                                                <v-text-field
                                                    v-model="editedItem.name"
                                                    label="Dessert name"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="4" sm="6">
                                                <v-text-field
                                                    v-model="
                                                        editedItem.calories
                                                    "
                                                    label="Calories"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="4" sm="6">
                                                <v-text-field
                                                    v-model="editedItem.fat"
                                                    label="Fat (g)"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="4" sm="6">
                                                <v-text-field
                                                    v-model="editedItem.carbs"
                                                    label="Carbs (g)"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="4" sm="6">
                                                <v-text-field
                                                    v-model="editedItem.protein"
                                                    label="Protein (g)"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue-darken-1"
                                        variant="text"
                                        @click="close"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        color="blue-darken-1"
                                        variant="text"
                                        @click="save"
                                    >
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog> -->
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5"
                                    >Are you sure you want to delete this
                                    item?</v-card-title
                                >
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue-darken-1"
                                        variant="text"
                                        @click="closeDelete"
                                        >Cancel</v-btn
                                    >
                                    <v-btn
                                        color="blue-darken-1"
                                        variant="text"
                                        @click="deleteItemConfirm"
                                        >OK</v-btn
                                    >
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.ame_calc`]="{ item }">
                    <div class="name-project">
                        {{ item.name_calc }}
                    </div>
                </template>

                <template v-slot:[`item.color_calc`]="{ item }">
                    {{ item.color_calc }}
                </template>

                <template v-slot:[`item.formula_calc`]="{ item }"
                    >{{ item.formula_calc }}
                </template>
            </v-data-table>
        </v-col>
    </div>
    table
</template>
<script setup lang="ts">
import { ref } from "vue";
import addCalcDialog from "@/entities/user-info/ui/add-calc-dialog.vue";

const headers = [
    {
        title: "Название",
        align: "start",
        sortable: true,
        key: "name_calc",
    },
    {
        title: "Цвет",
        key: "color_calc",
        align: "start",
        sortable: false,
        width: 200,
    },
    {
        title: "Расчет",
        key: "formula_calc",
        align: "start",
        sortable: true,
    },
];
const tableTitle = ref<any[]>(headers);
const tableDataArray = ref([]);
</script>
