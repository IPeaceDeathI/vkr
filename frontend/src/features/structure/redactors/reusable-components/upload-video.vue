<template>
    <div
        @click="chooseVideoFile"
        class="upload-video"
        style="display: flex; flex-direction: row"
    >
        <v-icon color="editor">mdi-upload</v-icon
        ><redactor-component-title
            class="upload-video-text"
            :hint="'Формат MP4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Видеокодек H264 (битрейт от 1 до 5 Мбит/с) Аудиокодек AAC (битрейт 128 Кбит/с) Максимальный размер файла — 50 Мб'"
            :max-width="'330px'"
            >{{ text }}</redactor-component-title
        ><input
            v-on:change="loadVideo($event)"
            type="file"
            hidden
            ref="inputVideoFile"
        />
    </div>
</template>
<script lang="ts">
import { VideosModel } from "@/models";
import { fileListToArray } from "@/shared/helpers";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        text: { type: String, default: "Загрузить видео" },
        // От флага зависит метод обращения к API картинок
        resize: {
            type: Boolean,
            default: true,
        },
    },
    emits: {
        start: () => true,
        input: (value: string) => true,
        end: () => true,
    },
    data() {
        return {
            videoIsLoading: false,
        };
    },
    methods: {
        chooseVideoFile() {
            const tmp = this.$refs.inputVideoFile as HTMLElement;
            tmp.click();
        },
        async loadVideo(event: Event) {
            this.videoIsLoading = true;
            this.$emit("start");
            try {
                const el = event.target as HTMLInputElement;
                if (el.files) {
                    const files = el.files;
                    if (files) {
                        const result = VideosModel.getVideo(
                            fileListToArray(files)
                        );
                        result.then((res) => {
                            this.$emit("input", res.result[0].src);
                        });
                    }
                }
            } catch (error) {
                NotificationService.common().error({
                    text: "Не удалось загрузить видео",
                });
            }
            this.$emit("end");
            this.videoIsLoading = false;
        },
    },
});
</script>
<style lang="scss" scoped></style>
