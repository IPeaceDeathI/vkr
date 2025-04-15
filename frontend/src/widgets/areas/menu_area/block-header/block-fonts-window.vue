<template>
    <draggable-dialog
        :model-value="showFontsW"
        transition="scale-transition"
        handle="v-toolbar"
        origin="top center"
        class="setting-menu"
    >
        <v-card
            class="noks-media-redactor redactor-page setting-menu pa-2"
            elevation="12"
            width="395px"
            rounded="5px"
            color="editorBg"
            id="fontMenu"
            v-scroll:#scroll-target="onScroll"
        >
            <v-redactor-toolbar class="movable" color="#ffffff">
                <v-text-field
                    v-model="queryFonts"
                    clearable
                    label="Поиск по названию шрифта"
                    variant="outlined"
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    density="compact"
                />
                <v-spacer />
                <v-btn icon @click="showFontsW = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-redactor-toolbar>

            <v-divider />
            <v-card-text
                class="pa-0 parent-wrap-fonts overflow-y-auto"
                id="scroll-target"
            >
                <div>
                    <div class="mb-3 card-fonts-search-style">
                        <div class="card-fonts-toolbar d-flex pt-2 pb-1">
                            <span class="fonts-title">
                                <v-icon>mdi-account-outline</v-icon> Мои
                                шрифты</span
                            >
                            <v-spacer />
                            <v-btn
                                class="me-2 text-none link-fonts"
                                prepend-icon="mdi-open-in-new"
                                flat
                                size="small"
                                >Управление шрифтами</v-btn
                            >
                        </div>
                        <div class="card-none-fonts pt-2 pb-2">
                            Нет загруженных шрифтов
                        </div>
                    </div>
                    <div class="card-fonts-search-style card-fonts-search">
                        <div class="card-fonts-toolbar d-flex pt-2 pb-1">
                            <span class="fonts-title">
                                <v-icon>mdi-google</v-icon> Google Fonts</span
                            >
                            <v-spacer />
                        </div>
                        <div
                            ref="scrollContainerList"
                            class="card-fonts pt-2 pb-2"
                        >
                            <div
                                height="200px"
                                v-for="(item, index) in filteredFonts"
                                :key="index"
                                class="font-item"
                                :class="{ active: item === activeFont }"
                                :style="getFont(item)"
                                @click="onClickFont(item)"
                            >
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </div>
            </v-card-text>
            <v-divider />
            <v-card-actions>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="saveSelectionFont"
                >
                    Готово
                </v-btn>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="dialogFontsSearch = false"
                >
                    Отмена
                </v-btn>
            </v-card-actions>
        </v-card>
        <!-- </v-dialog> -->
    </draggable-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import draggableDialog from "@/shared/libs/draggable_dialog/draggable-dialog.vue";

export default defineComponent({
    name: "block-fonts-window",
    components: {
        draggableDialog,
    },
    props: {
        modelValueF: {
            type: Boolean,
        },
    },
    data() {
        return {
            queryFonts: "" as string,
            dialogFontsSearch: false,
            fontsData: [],
            fontsName: [] as Array<string>,
            fontsPerPage: [] as Array<string>,
            selectedFont: "" as string,
            pageFonts: 1,
            fontsLinkArr: [] as Array<string>,
            offsetTop: 0 as number,
            toLowerFontsName: [] as Array<string>,
            includeFonts: false, // include link fonts
            activeFont: "" as string,
        };
    },
    computed: {
        filteredFonts() {
            if (this.queryFonts == "") {
                return this.fontsName;
            } else {
                return this.fontsName.filter((font: any) =>
                    font.toLowerCase().includes(this.queryFonts.toLowerCase())
                );
            }
        },

        startIndex() {
            return (this.pageFonts - 1) * 20;
        },

        endIndex() {
            return this.pageFonts * 20;
        },
        paginatedFonts() {
            if (this.queryFonts == "") {
                if (!this.includeFonts) {
                    this.createLinkAllFonts();
                    !this.includeFonts;
                }
                this.getPerPageArr(); // для обновления this.fontsPerPage
                return this.fontsPerPage;
            } else {
                if (!this.includeFonts) {
                    this.createLinkAllFonts();
                    !this.includeFonts;
                }
                return this.searchFonts(this.queryFonts, this.fontsName);
            }
        },
        showFontsW: {
            get() {
                return this.modelValueF;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
    },
    methods: {
        searchFonts(query: string, fonts: Array<string>) {
            // к нижнему регистру
            if (query == "" || query == null) {
                return fonts;
            } else {
                const lowercaseQuery = query.toLowerCase();
                return fonts.filter((font: string) => {
                    const lowercaseFont = font.toLowerCase();
                    // для поиска совпадения
                    const regex = new RegExp(`\\b${lowercaseQuery}\\b`, "i");
                    return regex.test(lowercaseFont);
                });
            }
        },

        getPageFonts() {
            let maxPage = this.fontsName.length / 20;
            return (this.pageFonts =
                this.pageFonts <= Math.ceil(maxPage)
                    ? this.pageFonts + 1
                    : this.pageFonts);
        },
        getPerPageArr() {
            if (this.pageFonts == 1) {
                return (this.fontsPerPage = this.fontsName.slice(
                    0,
                    this.endIndex
                ));
            } else {
                return this.fontsPerPage.push(
                    ...this.fontsName.slice(this.startIndex, this.endIndex)
                );
            }
        },
        async addFonts() {
            try {
                const f = await fetch(
                    `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAUJZ8wTbdDIF0mr2DtyUS4eWWzEOWGf7s`
                );
                const data = await f.json();
                const desiredAlphabets = ["latin", "cyrillic"];
                const filteredFonts = data.items.filter((font: any) =>
                    desiredAlphabets.every((alphabet) =>
                        font.subsets.includes(alphabet)
                    )
                );

                if (filteredFonts) {
                    this.fontsName = filteredFonts.map((item: any) =>
                        item.family.replace(/&quot;/g, "/'")
                    );

                    if (!this.includeFonts && this.fontsName.length > 0) {
                        this.createLinkAllFonts();
                        !this.includeFonts;
                    }
                } else {
                    console.error("Отсутствуют данные в items");
                }
            } catch (error) {
                console.error("Произошла ошибка:", error);
            }
        },
        getFont(item: string) {
            const tmp = { "font-family": item };
            return tmp;
        },
        loadFont() {
            if (this.selectedFont) {
                // Создайте элемент <link> для подключения шрифта
                const linkElement = document.createElement("link");
                linkElement.rel = "stylesheet";
                linkElement.href = `https://fonts.googleapis.com/css?family=${this.selectedFont.replace(
                    /\s+/g,
                    "+"
                )}`;

                document.head.appendChild(linkElement);
            }
        },
        onScroll(e: any) {
            this.offsetTop = e.target.scrollTop;
            const container = e.target;
            const containerHeight = container.clientHeight;
            const scrollHeight = container.scrollHeight;
            const scrollTop = container.scrollTop;
            const topTitleFontt = document.getElementsByClassName(
                "card-fonts-search"
            ) as HTMLCollection; // ??

            if (
                scrollTop > 20 * this.pageFonts &&
                scrollTop + containerHeight >= scrollHeight
            ) {
                return this.getPageFonts();
            }
        },

        createLinkFonts(start: number, last: number) {
            let strLink = "";
            let strItem = "";

            if (last > this.fontsName.length) {
                last = this.fontsName.length;
            }

            for (let i = start; i < last; i++) {
                if (this.fontsName[i].indexOf(" ") > 0) {
                    strItem = this.fontsName[i].replace(" ", "+");
                } else {
                    strItem = this.fontsName[i];
                }
                strLink += `&family=${strItem}`;
            }

            const linkElement = document.createElement("link");
            linkElement.rel = "stylesheet";
            linkElement.href = `https://fonts.googleapis.com/css2?display=swap${strLink}`;
            document.head.appendChild(linkElement);
        },
        createLinkAllFonts() {
            let strLink = "";
            let strItem = "";
            if (this.fontsName.length > 0) {
                for (let i = 0; i < this.fontsName.length; i++) {
                    if (this.fontsName[i].indexOf(" ") > 0) {
                        strItem = this.fontsName[i].replace(" ", "+");
                    } else {
                        strItem = this.fontsName[i];
                    }
                    strLink += `&family=${strItem}`;
                }

                const linkElement = document.createElement("link");
                linkElement.rel = "stylesheet";
                linkElement.href = `https://fonts.googleapis.com/css2?display=swap${strLink}`;
                document.head.appendChild(linkElement);
            }
        },
        onClickFont(font: string) {
            this.activeFont = font;

            const newFont = this.activeFont;
            this.$emit("font-changed", newFont);
        },
        saveSelectionFont() {
            this.dialogFontsSearch = false;
            this.showFontsW = false;
            const newFont = this.activeFont;
            this.$emit("font-changed", newFont);
        },
    },
    mounted() {
        this.addFonts();
    },
});
</script>
<style scoped>
.card-fonts-search-style .card-fonts-toolbar {
    color: #898b8f;
    border-bottom: 1px solid #eaebeb;
    font-size: 13px;
    align-items: center;
}
.font-item:hover {
    cursor: pointer;
    color: rgb(71, 115, 255);
}
.font-item.active,
.link-fonts {
    color: rgb(71, 115, 255);
}
.card-none-fonts {
    font-size: 12px;
    color: rgba(48, 52, 59, 0.57);
}
.font-item {
    font-size: 18px;
    padding: 7px 0;
}

.parent-wrap-fonts {
    max-height: 300px;
}
</style>
