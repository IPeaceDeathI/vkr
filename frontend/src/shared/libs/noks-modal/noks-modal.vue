<template>
    <draggable-inner-card
        width="770px"
        v-model="showGallery"
        :attach="'noks-attach-dialog-target-inner'"
    >
        <redactor-toolbar
            @close-click="showGallery = false"
            :title="'ГАЛЕРЕЯ'"
        />
        <v-layout style="width: 100%; height: 521px">
            <v-navigation-drawer permanent class="pos-relat">
                <v-list color="editor" mandatory style="height: 100%">
                    <v-list-subheader
                        title="Категории"
                        style="font-weight: 600"
                    ></v-list-subheader>
                    <div
                        class="scrollable"
                        style="height: calc(100% - 40px); overflow-y: auto"
                    >
                        <v-list-item
                            v-for="(category, i) in list_of_categories"
                            :key="category.id"
                            :title="category.name"
                            :value="category.name"
                            class="list-item-title"
                            @click="categorySearch(i)"
                        ></v-list-item>
                    </div>
                </v-list>
            </v-navigation-drawer>
            <v-main style="width: calc(100% - 170px); padding: 0">
                <v-toolbar color="#ffffff" class="toolbar-for-search">
                    <v-text-field
                        v-model="query"
                        @click:append="clearImgs"
                        @keyup.enter="clearImgs"
                        clearable
                        label="Введите запрос"
                        variant="solo"
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        density="compact"
                    ></v-text-field>
                </v-toolbar>
                <v-col
                    class="scrollable blockWtihImages"
                    style="
                        height: calc(100% - 84px);
                        overflow: auto;
                        padding-top: 0;
                    "
                >
                    <div
                        v-if="!search"
                        class="image-search-start"
                        style="
                            display: flex;
                            width: 100%;
                            height: 100%;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;
                            text-align: center;
                            font-size: 13px;
                            line-height: 18px;
                        "
                    >
                        <v-img
                            style="
                                height: 26px;
                                width: 26px;
                                flex: 0 0 auto;
                                margin: 10px 0 20px 0;
                            "
                            src="@/assets/images/Unsplash_icon.png"
                        ></v-img>
                        <div
                            style="
                                font-size: 16px;
                                font-weight: 500;
                                margin: 0 0 8px;
                                transition: opacity 0.3s ease;
                            "
                        >
                            Поиск изображений Unsplash
                        </div>
                        <div
                            style="
                                font-size: 13px;
                                font-weight: 400;
                                line-height: 16px;
                                color: rgba(48, 52, 59, 0.57);
                            "
                        >
                            Unsplash — бесплатный фотосток снимков<br />высокого
                            разрешения
                        </div>
                    </div>

                    <v-card v-else variant="flat">
                        <v-container style="flex-grow: 1; overflow-y: auto">
                            <v-row
                                cols="12"
                                style="display: flex; flex-direction: row"
                            >
                                <v-col
                                    v-for="(n, index) in colAmount"
                                    :key="index"
                                    cols="4"
                                    class="pa-0"
                                >
                                    <v-card
                                        v-for="{
                                            id,
                                            mini_img,
                                            authorName,
                                            authorLink,
                                        } in lists[index]"
                                        :key="id"
                                        style="padding: 5px; cursor: pointer"
                                        width="100%"
                                        position="relative"
                                        tile
                                        class="d-flex"
                                    >
                                        <v-hover>
                                            <template
                                                v-slot:default="{
                                                    isHovering,
                                                    props,
                                                }"
                                            >
                                                <div
                                                    v-if="isHovering"
                                                    v-bind="props"
                                                    class="d-flex"
                                                    style="
                                                        transition: 'opacity: 0.35s';
                                                        width: 100%;
                                                        height: auto;
                                                        position: absolute;
                                                        z-index: 1;
                                                        bottom: 0px;
                                                        left: 0px;
                                                        color: #fff;
                                                        background: linear-gradient(
                                                            transparent,
                                                            #000
                                                        );
                                                        line-height: 14px;
                                                        padding: 15px 7px 7px;
                                                        font-size: 12px;
                                                        font-weight: 500;
                                                    "
                                                >
                                                    <a
                                                        target="_blank"
                                                        style="
                                                            color: inherit;
                                                            opacity: 0.7;
                                                            pointer-events: all;
                                                            text-decoration: none;
                                                            cursor: pointer;
                                                        "
                                                        :href="
                                                            authorLink +
                                                            '?utm_source=noks&utm_medium=referral'
                                                        "
                                                        >{{ authorName }}</a
                                                    >
                                                    <a
                                                        target="_blank"
                                                        style="
                                                            color: inherit;
                                                            opacity: 0.7;
                                                            pointer-events: all;
                                                            text-decoration: none;
                                                            cursor: pointer;
                                                        "
                                                        href="https://unsplash.com/?utm_source=noks&utm_medium=referral"
                                                        >&nbsp;Unsplash</a
                                                    >
                                                </div>

                                                <v-img
                                                    style="
                                                        display: block;
                                                        width: 100%;
                                                        height: auto;
                                                        position: relative;
                                                    "
                                                    :class="
                                                        isHovering
                                                            ? 'img-hover'
                                                            : undefined
                                                    "
                                                    v-bind="props"
                                                    :src="mini_img"
                                                    :lazy-src="mini_img"
                                                    @click="selectImage(id)"
                                                >
                                                    <v-progress-circular
                                                        v-if="loadingImg == id"
                                                        style="
                                                            position: absolute;
                                                            left: 50%;
                                                            top: 50%;
                                                            transform: translateX(
                                                                    -50%
                                                                )
                                                                translateY(-50%);
                                                        "
                                                        :size="40"
                                                        indeterminate
                                                        color="primary"
                                                    >
                                                    </v-progress-circular>
                                                </v-img>
                                            </template>
                                        </v-hover>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-main>
        </v-layout>
    </draggable-inner-card>
</template>

<script lang="ts">
import { getPhotosByQuery } from "./api/unsplash";
import { defineComponent } from "vue";
import { PromisePhotos } from "./api/unsplash";
import { ListImg } from "./api/unsplash";
import { selectImageParams } from "./types";
import { createFile } from "@/shared/helpers/helpers";
import { ImagesModel } from "@/models/Image";
import {
    draggableInnerCard,
    redactorToolbar,
} from "@/features/structure/redactors/reusable-components";

export default defineComponent({
    name: "noks-modal",
    components: { redactorToolbar, draggableInnerCard },
    props: {
        modelValue: {
            type: Boolean,
        },
    },
    emits: {
        imageSelected(res: string) {
            return true;
        },
        "update:model-value": function (val: boolean) {
            return true;
        },
    },
    computed: {
        loadingImg: {
            get(): number {
                return this.loadingImgId;
            },
            set(val: number) {
                this.loadingImgId = val;
            },
        },
        showGallery: {
            get(): boolean {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
    },
    data() {
        return {
            loadingImgId: -1 as number,
            collsHeight: [0, 0, 0],
            count: 0,
            numberOfPage: 1,
            colAmount: 3,
            settedEventListener: false,
            clear_imgs: false,
            search: false,
            // isActive: false,
            requestInProgress: false,
            query: "" as string,
            photosPromise: Promise,
            list: [{}] as Array<ListImg>, // TODO сделать один список
            lists: [[{}], [{}], [{}]] as Array<Array<ListImg>>,
            list_of_categories: [
                {
                    id: 1,
                    name: "Поиск",
                    value: "",
                },
                {
                    id: 2,
                    name: "Свежее",
                    value: "LATEST",
                },
                {
                    id: 3,
                    name: "Популярное",
                    value: "POPULAR",
                },
                {
                    id: 4,
                    name: "Природа",
                    value: "NATURE",
                },
                {
                    id: 5,
                    name: "Пейзаж",
                    value: "LANDSCAPE",
                },
                {
                    id: 6,
                    name: "Горы",
                    value: "MOUNTAINS",
                },
                {
                    id: 7,
                    name: "Небо",
                    value: "SKY",
                },
                {
                    id: 8,
                    name: "Города",
                    value: "CITY",
                },
                {
                    id: 9,
                    name: "Дороги",
                    value: "ROAD",
                },
                {
                    id: 10,
                    name: "Люди",
                    value: "PEOPLE",
                },
                {
                    id: 11,
                    name: "Женщины",
                    value: "WOMAN",
                },
                {
                    id: 12,
                    name: "Мужчины",
                    value: "MAN",
                },
                {
                    id: 13,
                    name: "Друзья",
                    value: "FRIENDS",
                },
                {
                    id: 14,
                    name: "Семья",
                    value: "FAMILY",
                },
                {
                    id: 15,
                    name: "Любовь",
                    value: "LOVE",
                },
                {
                    id: 16,
                    name: "Счастье",
                    value: "HAPPY",
                },
                {
                    id: 17,
                    name: "Свадьба",
                    value: "WEDDING",
                },
                {
                    id: 18,
                    name: "Цветы",
                    value: "FLOWER",
                },
                {
                    id: 19,
                    name: "Животные",
                    value: "ANIMAL",
                },
                {
                    id: 20,
                    name: "Кофе",
                    value: "COFFEE",
                },
                {
                    id: 21,
                    name: "Еда",
                    value: "FOOD",
                },
                {
                    id: 22,
                    name: "Ресторан",
                    value: "RESTAURANT",
                },
                {
                    id: 23,
                    name: "Дом",
                    value: "HOME",
                },
                {
                    id: 24,
                    name: "Работа",
                    value: "WORK",
                },
                {
                    id: 25,
                    name: "Строительство",
                    value: "CONSTRUCTION",
                },
                {
                    id: 26,
                    name: "Бизнес",
                    value: "BUSINESS",
                },
                {
                    id: 27,
                    name: "Офис",
                    value: "OFFICE",
                },
                {
                    id: 28,
                    name: "Рабочий стол",
                    value: "DESK",
                },
                {
                    id: 29,
                    name: "Компьютеры",
                    value: "COMPUTER",
                },
                {
                    id: 30,
                    name: "Часы",
                    value: "CLOCK",
                },
                {
                    id: 31,
                    name: "Apple",
                    value: "APPLE",
                },
                {
                    id: 32,
                    name: "Музыка",
                    value: "MUSIC",
                },
                {
                    id: 33,
                    name: "Спорт",
                    value: "SPORT",
                },
                {
                    id: 34,
                    name: "Велосипеды",
                    value: "BIKE",
                },
                {
                    id: 35,
                    name: "Мотоциклы",
                    value: "MOTORCYCLE",
                },
                {
                    id: 36,
                    name: "Автомобили",
                    value: "CAR",
                },
                {
                    id: 37,
                    name: "Лето",
                    value: "SUMMER",
                },
                {
                    id: 38,
                    name: "Зима",
                    value: "WINTER",
                },
                {
                    id: 39,
                    name: "Весна",
                    value: "SPRING",
                },
                {
                    id: 40,
                    name: "Осень",
                    value: "AUTUMN",
                },
                {
                    id: 41,
                    name: "Дождь",
                    value: "RAIN",
                },
            ],
        };
    },
    methods: {
        closeGallery() {
            this.showGallery = false;
        },
        setEventListener() {
            if (!this.settedEventListener) {
                const listElm = document.querySelector(".blockWtihImages");
                listElm?.addEventListener("scroll", () => {
                    if (
                        listElm.scrollTop + listElm.clientHeight + 100 >=
                        listElm.scrollHeight
                    ) {
                        if (!this.requestInProgress && this.query != "") {
                            this.loadMoreImages();
                        }
                    }
                });
                this.settedEventListener = true;
            }
        },
        loadMoreImages() {
            this.numberOfPage++;
            this.image_request();
        },
        clearImgs() {
            this.numberOfPage = 1;
            this.count = 0;
            this.list = [];
            this.lists = [[], [], []];
            this.collsHeight = [0, 0, 0];
            this.image_request();
        },
        categorySearch(category_id: number) {
            if (this.list_of_categories[category_id].value === "") {
                this.search = false;
                this.query = "";
            } else {
                this.query = this.list_of_categories[category_id].value;
                if (this.query != "") {
                    this.clearImgs();
                }
            }
        },
        selectImage(imageId: number) {
            this.loadingImg = imageId;
            const res = {
                archiving: true,
            } as selectImageParams;
            this.lists.find((subArray) => {
                const tmp = subArray.find((obj) => {
                    return obj.id === imageId;
                });
                if (tmp?.full_img && tmp.small_img && tmp.regular_img) {
                    // res.src = tmp.full_img;
                    res.src = tmp.regular_img;
                    res.base_src = tmp.regular_img;
                    return res;
                }
            });
            if (res.src !== "") {
                this.loadImgsFromGallery(res.src);
            }
        },
        loadImgsFromGallery: function (url: string) {
            if (url) {
                this.loadImageByUrl(url).then((data) => {
                    this.$emit("imageSelected", data);
                    this.loadingImg = -1;
                });
            }
        },
        async loadImageByUrl(url: string): Promise<string> {
            const file = [await createFile(url, "unsplash_img")];
            const result = await ImagesModel.getImageResize(file);
            return result.result[0].src;
        },
        image_request() {
            this.requestInProgress = true;
            this.setEventListener();
            this.search = true;
            const photosPromise: Promise<PromisePhotos> = getPhotosByQuery(
                this.query,
                this.numberOfPage
            );
            photosPromise
                .then((photos) => {
                    const list_of_images = photos.data?.results;
                    list_of_images?.forEach((element) => {
                        if (
                            element?.urls?.thumb &&
                            element?.urls?.full &&
                            element?.urls?.regular &&
                            element?.urls?.small &&
                            element?.user?.name &&
                            element?.user?.links?.html &&
                            element?.height &&
                            element?.width
                        ) {
                            this.list.push({
                                id: this.count,
                                authorName: element.user.name,
                                authorLink: element.user.links.html,
                                mini_img: element.urls.thumb,
                                full_img: element.urls.full,
                                regular_img: element.urls.regular,
                                small_img: element.urls.small,
                                imgHeight:
                                    (element.height / element.width) * 177.46,
                                elemHeight: element.height,
                                elemWidth: element.width,
                            });
                            this.count++;
                        }
                    });

                    // const cols = document.querySelectorAll(
                    //     ".columnWithImages"
                    // ) as HTMLElement;

                    while (this.list.length > 0) {
                        if (
                            Math.min(
                                this.collsHeight[0],
                                this.collsHeight[1],
                                this.collsHeight[2]
                            ) == this.collsHeight[0]
                        ) {
                            let tmp = this.list.shift();
                            if (tmp) {
                                this.collsHeight[0] += tmp.imgHeight;
                                this.lists[0].push({
                                    id: tmp?.id,
                                    authorName: tmp?.authorName,
                                    authorLink: tmp?.authorLink,
                                    mini_img: tmp?.mini_img,
                                    full_img: tmp?.full_img,
                                    regular_img: tmp?.regular_img,
                                    small_img: tmp?.small_img,
                                    imgHeight: tmp?.imgHeight,
                                    elemHeight: tmp?.elemHeight,
                                    elemWidth: tmp?.elemWidth,
                                });
                            }
                        } else if (
                            Math.min(
                                this.collsHeight[0],
                                this.collsHeight[1],
                                this.collsHeight[2]
                            ) == this.collsHeight[1]
                        ) {
                            let tmp = this.list.shift();
                            if (tmp) {
                                this.collsHeight[1] += tmp.imgHeight;
                                this.lists[1].push({
                                    id: tmp?.id,
                                    authorName: tmp?.authorName,
                                    authorLink: tmp?.authorLink,
                                    mini_img: tmp?.mini_img,
                                    full_img: tmp?.full_img,
                                    regular_img: tmp?.regular_img,
                                    small_img: tmp?.small_img,
                                    imgHeight: tmp?.imgHeight,
                                    elemHeight: tmp?.elemHeight,
                                    elemWidth: tmp?.elemWidth,
                                });
                            }
                        } else if (
                            Math.min(
                                this.collsHeight[0],
                                this.collsHeight[1],
                                this.collsHeight[2]
                            ) == this.collsHeight[2]
                        ) {
                            let tmp = this.list.shift();
                            if (tmp) {
                                this.collsHeight[2] += tmp.imgHeight;
                                this.lists[2].push({
                                    id: tmp?.id,
                                    authorName: tmp?.authorName,
                                    authorLink: tmp?.authorLink,
                                    mini_img: tmp?.mini_img,
                                    full_img: tmp?.full_img,
                                    regular_img: tmp?.regular_img,
                                    small_img: tmp?.small_img,
                                    imgHeight: tmp?.imgHeight,
                                    elemHeight: tmp?.elemHeight,
                                    elemWidth: tmp?.elemWidth,
                                });
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            setTimeout(() => {
                this.requestInProgress = false;
            }, 200);
        },
    },
});
</script>
<style lang="scss" scoped>
.movable {
    cursor: move;
}
.pos-relat {
    position: relative !important;
    height: 100% !important;
    width: 170px !important;
}
.list-item-title {
    font-size: 13px !important;
    /* font-weight: 500 !important; */
    opacity: 0.7;
}
.toolbar-for-search {
    padding: 0 25px 0 20px;
}
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.9;
    position: absolute;
    width: 100%;
}

.img-hover {
    transform: scale(1.3) !important;
}
</style>
