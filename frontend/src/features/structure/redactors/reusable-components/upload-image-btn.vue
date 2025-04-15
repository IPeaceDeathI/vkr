<template>
    <v-btn
        :loading="imageIsLoading"
        block
        :prepend-icon="icon"
        color="editor"
        @click="chooseFile()"
        :resize="resize"
    >
        {{ text }}
        <input
            v-on:change="loadImage($event)"
            type="file"
            hidden
            ref="inputFile"
        />
    </v-btn>
</template>
<script lang="ts">
import { ImagesModel } from "@/models";
import { fileListToArray } from "@/shared/helpers";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        text: {
            type: String,
            default: "Загрузить",
        },
        icon: {
            type: String,
            default: "mdi-upload",
        },
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
            imageIsLoading: false,
        };
    },
    methods: {
        chooseFile() {
            const tmp = this.$refs.inputFile as HTMLElement;
            tmp.click();
        },
        async loadImage(event: Event) {
            this.imageIsLoading = true;
            this.$emit("start");
            try {
                const el = event.target as HTMLInputElement;
                if (el.files) {
                    const files = el.files;
                    if (files) {
                        const result = this.resize
                            ? ImagesModel.getImageResize(fileListToArray(files))
                            : ImagesModel.getImage(fileListToArray(files));
                        result.then((res) => {
                            this.$emit("input", res.result[0].src);
                        });
                    }
                }
            } catch (error) {
                NotificationService.common().error({
                    text: "Не удалось загрузить картинку",
                });
            }
            this.$emit("end");
            this.imageIsLoading = false;
        },
    },
});
</script>
<style lang="scss" scoped></style>
