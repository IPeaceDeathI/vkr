<script>
import axios from "axios";
import { NOKS_HOST } from "../../shared/config";
import AdminIcon from "../ui/AdminIcon.vue";
import BoxDetail from "./BoxDetail.vue";

export default {
    components: { AdminIcon, BoxDetail },
    props: {
        page_id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            qualityData: {
                count: {
                    rating: 0,
                    error: 0,
                    warning: 0,
                },
            },
            isActive: false,
            intervalBaseId: false,
        };
    },
    mounted() {
        this.intervalBase();
    },
    methods: {
        updateBase() {
            axios
                .get(
                    NOKS_HOST +
                        "api/raiting_quality_page/" +
                        this.page_id +
                        // eslint-disable-next-line prettier/prettier
                        "?detail=0",
                )
                .then((response) => (this.qualityData = response.data.data));
        },
        intervalBase() {
            this.updateBase();
            this.intervalBaseId = setInterval(() => {
                this.updateBase();
            }, 10 * 1000);
        },
    },
};
</script>

<template>
    <div
        class="quality-panel"
        @click="isActive = true"
        title="Индекс качества страницы, присваивает балл от 0 до 100, и подсказывает что можно улучшить на странице. Нажмите, чтобы посмотреть"
    >
        <div class="progress-level">
            <AdminIcon
                path="addons"
                name="logo"
                size="16"
                style="color: #fff"
            />
            {{ qualityData.count.rating }} %
        </div>
        <!-- <div
            class="progress-level"
            data-level="3"
            v-if="qualityData.count.error"
        >
            <AdminIcon path="addons" name="dot" size="10" />
            <div class="progress-count">
                {{ qualityData.count.error }}
            </div>
        </div>
        <div
            class="progress-level"
            data-level="2"
            v-if="qualityData.count.warning"
        >
            <AdminIcon path="addons" name="dot" size="10" />
            <div class="progress-count">
                {{ qualityData.count.warning }}
            </div>
        </div> -->
    </div>
    <v-dialog v-model="isActive">
        <BoxDetail @closeQuality="isActive = false" :page_id="page_id" />
    </v-dialog>
</template>

<style>
/* Куда встраивается */
.pages-list .page-preview {
    position: relative;
}
/* Полоса */
.quality-panel {
    position: absolute;
    top: 1em;
    right: 1em;
    background-color: #8e1053;
    padding: 0.35em 0.7em;
    border-radius: 0.3em;
    color: #fff;
    z-index: 9;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 0.8em;
    /* border: 2px solid #9da8ae; */
    transition: all 0.3s;
    box-shadow: 0.1em 0.1em 0.3em 0.1em rgba(255, 255, 255, 0.7);
}
.quality-panel:hover {
    /* box-shadow: 0.1em 0.1em 0.3em 0.4em rgb(71 115 255 / 69%); */
    background-color: #8e1053bb;
}
.quality-panel div + div {
    margin-left: 0.7em;
}

.quality-panel .progress-counts-box {
    display: flex;
    justify-content: space-between;
    padding: 0.7em 1em;
}
.quality-panel .progress-level svg {
    margin-right: 0.3em;
}
.quality-panel .progress-count {
    color: #fff;
}

.progress-level {
    display: flex;
    align-items: center;
}
.progress-level[data-level="0"] {
    color: #aaaaaa;
}
.progress-level[data-level="1"] {
    color: #5ecb38;
}
.progress-level[data-level="2"] {
    color: #dbed12;
}
.progress-level[data-level="3"] {
    color: #e42b2b;
}
.quality-top-count[data-level="0"]:hover,
.quality-top-count[data-level="0"].on {
    border-color: #aaaaaa;
}
.quality-top-count[data-level="1"]:hover,
.quality-top-count[data-level="1"].on {
    border-color: #5ecb38;
}
.quality-top-count[data-level="2"]:hover,
.quality-top-count[data-level="2"].on {
    border-color: #dbed12;
}
.quality-top-count[data-level="3"]:hover,
.quality-top-count[data-level="3"].on {
    border-color: #e42b2b;
}
</style>
