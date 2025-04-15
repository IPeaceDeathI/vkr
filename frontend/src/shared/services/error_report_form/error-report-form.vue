<template>
    <draggable-card
        v-model="isActive"
        width="560px"
        height="255px"
        :close-on-back="false"
        persistent
    >
        <v-sheet color="primary">
            <v-redactor-toolbar style="cursor: default">
                <v-spacer></v-spacer>
                <v-btn size="small" icon @click="close">
                    <v-icon size="x-large" color="secondary-lighten-1"
                        >mdi-close</v-icon
                    >
                </v-btn>
            </v-redactor-toolbar>
            <v-redactor-container>
                <v-row class="px-2 mb-5 text-center d-flex justify-center">
                    Кратко опишите проблему и приложите необходимые скриншоты.
                    Это поможет нам сделать конструктор ещё лучше!
                </v-row>
                <v-row class="mb-5">
                    <v-textarea
                        variant="outlined"
                        style="min-height: 150px"
                        v-model="description"
                        clearable
                        hide-details
                    />
                </v-row>
                <v-row class="mb-3 d-flex" style="gap: 28px">
                    <span
                        v-for="img in urlInsertImg"
                        :key="img"
                        height="80px"
                        width="160px"
                        style="position: relative"
                    >
                        <v-icon
                            size="x-small"
                            color="secondary-lighten-1"
                            class="closeBtn"
                            @click="removeImg(img)"
                            >mdi-close</v-icon
                        >
                        <v-img :src="img" height="80px" width="160px" />
                    </span>
                </v-row>
                <v-row class="mb-3"
                    ><upload-image-btn
                        class="mb-2"
                        @start="imageIsLoading = true"
                        @end="imageIsLoading = false"
                        @input="imageInsert"
                        :disabled="urlInsertImg.length >= 3"
                        :resize="false"
                        >Загрузить</upload-image-btn
                    ></v-row
                >
                <v-row class="justify-center"
                    ><v-btn
                        text="Закрыть"
                        @click="close"
                        class="mr-5"
                        flat
                        variant="outlined"
                        color="yellow-darken-4"
                    ></v-btn>
                    <v-btn
                        text="Отправить"
                        @click="sendReport"
                        variant="tonal"
                        color="yellow-darken-4"
                        flat
                    ></v-btn
                ></v-row>
            </v-redactor-container>
        </v-sheet>
    </draggable-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uploadImageBtn } from "@/features/structure";
import { draggableCard } from "@/features/structure/redactors/reusable-components";
import { ErrorModel } from "@/models";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";

export default defineComponent({
    components: {
        uploadImageBtn,
        draggableCard,
    },
    emits: {
        afterClose() {
            return true;
        },
        afterOpen() {
            return true;
        },
        reportSended() {
            return true;
        },
    },
    data() {
        return {
            isActive: false,
            imageIsLoading: false,
            urlInsertImg: [] as Array<string>,
            description: "",
        };
    },
    watch: {
        isActive(val) {
            val === false ? this.$emit("afterClose") : this.$emit("afterOpen");
        },
    },
    computed: {
        report() {
            return {
                message: "user report",
                description: this.description,
                imgs: this.urlInsertImg,
            };
        },
    },
    methods: {
        open() {
            this.isActive = true;
            this.$emit("afterOpen");
        },
        sendReport() {
            ErrorModel.log(JSON.stringify(this.report)).then(() => {
                NotificationService.common().success({
                    text: "Отчёт об ошибке успешно отправлен!",
                });
                this.$emit("reportSended");
                this.close();
            });
        },
        removeImg(img: string) {
            this.urlInsertImg = this.urlInsertImg.filter((el) => el !== img);
        },
        async imageInsert(res: string) {
            if (this.urlInsertImg.length >= 3) {
                NotificationService.common().error({
                    text: "Можно добавить не более 3 изображений",
                });
                return;
            }
            this.urlInsertImg.push(res);
        },
        close() {
            this.urlInsertImg = [];
            this.description = "";
            this.isActive = false;
            this.$emit("afterClose");
        },
    },
});
</script>
<style scoped lang="scss">
.closeBtn {
    position: absolute;
    right: 3px;
    top: 3px;
    z-index: 1;
}
</style>
