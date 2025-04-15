<script>
import axios from "axios";
import { NOKS_HOST } from "./../../shared/config";
import AdminIcon from "./../ui/AdminIcon.vue";
import { ref } from "vue";

import BoxDetailMessage from "./../QualityRating/BoxDetailMessage.vue";

export default {
    setup() {
        const qualityData = ref({
            count: {
                rating: 0,
                error: 0,
                warning: 0,
                notice: 0,
                error_all: 0,
                warning_all: 0,
                notice_all: 0,
            },
        });

        return {
            qualityData,
        };
    },
    components: { AdminIcon, BoxDetailMessage },
    props: {
        page_id: {
            type: Number,
            required: true,
        },
    },
    emits: {
        closeQuality: () => true,
    },
    data() {
        return {
            filterTrouble: false,
            filterLevel: 0,
        };
    },
    mounted() {
        axios
            .get(
                NOKS_HOST +
                    "api/raiting_quality_page/" +
                    this.page_id +
                    // eslint-disable-next-line prettier/prettier
                    "?detail=2",
            )
            .then((response) => (this.qualityData = response.data.data));
    },
    computed: {
        getCountDone() {
            let mas = [];
            if (this.qualityData.tickets)
                mas = this.qualityData.tickets.filter(
                    (item) =>
                        (!this.filterLevel ||
                            item.level === this.filterLevel) &&
                        // eslint-disable-next-line prettier/prettier
                        !item.trouble,
                );
            return mas.length;
        },
        getCountLost() {
            let mas = [];
            if (this.qualityData.tickets)
                mas = this.qualityData.tickets.filter(
                    (item) =>
                        (!this.filterLevel ||
                            item.level === this.filterLevel) &&
                        // eslint-disable-next-line prettier/prettier
                        item.trouble,
                );
            return mas.length;
        },
    },
};
</script>

<template>
    <div class="quality-box fixed">
        <div class="quality-close" @click="$emit('closeQuality')">
            <AdminIcon
                path="core"
                name="close"
                size="24"
                style="color: #3366cc"
            />
        </div>
        <div class="quality-top">
            <div
                class="quality-top-count count-rating"
                data-level="0"
                @click="filterLevel = 0"
            >
                <AdminIcon
                    path="addons"
                    name="logo"
                    size="28"
                    style="color: #119a22"
                />
                {{ qualityData.count.rating }}
                <span>%</span>
            </div>
            <div
                :class="'quality-top-count ' + (filterLevel == 3 ? 'on' : '')"
                data-level="3"
                @click="filterLevel = 3"
            >
                <div class="progress-level" data-level="3">
                    <AdminIcon path="addons" name="dot" size="14" />
                </div>
                <div class="progress-top-count">
                    {{ qualityData.count.error }}
                </div>
                <span>/ {{ qualityData.count.error_all }}</span>
            </div>
            <div
                :class="'quality-top-count ' + (filterLevel == 2 ? 'on' : '')"
                data-level="2"
                @click="filterLevel = 2"
            >
                <div class="progress-level" data-level="2">
                    <AdminIcon path="addons" name="dot" size="14" />
                </div>
                <div class="progress-top-count">
                    {{ qualityData.count.warning }}
                </div>
                <span>/ {{ qualityData.count.warning_all }}</span>
            </div>
            <div
                :class="'quality-top-count ' + (filterLevel == 1 ? 'on' : '')"
                data-level="1"
                @click="filterLevel = 1"
            >
                <div class="progress-level" data-level="1">
                    <AdminIcon path="addons" name="dot" size="14" />
                </div>
                <div class="progress-top-count">
                    {{ qualityData.count.notice }}
                </div>
                <span>/ {{ qualityData.count.notice_all }}</span>
            </div>
        </div>
        <div class="quality-filters">
            <div
                :class="'filter-done ' + (filterTrouble ? 'on' : '')"
                @click="filterTrouble = true"
            >
                Выполнено
                <span>{{ getCountDone }}</span>
            </div>
            <div
                :class="'filter-trouble ' + (!filterTrouble ? 'on' : '')"
                @click="filterTrouble = false"
            >
                Осталось
                <span>{{ getCountLost }}</span>
            </div>
        </div>
        <div class="quality-messages-box">
            <BoxDetailMessage
                v-for="(item, index) in qualityData.tickets"
                :key="index"
                :item="item"
                :filterTrouble="filterTrouble"
                :filterLevel="filterLevel"
            />
        </div>
    </div>
</template>

<style scoped>
.quality-close {
    position: absolute;
    top: 1em;
    right: 1em;
    cursor: pointer;
}

.quality-box {
    position: relative;
    /* padding: 3em 2em; */
    color: #000;
    background-color: #fafafa;
}
.quality-box.absolute {
    position: absolute;
    top: 100%;
    right: calc(-300px + 50%);
    background-color: #fff;
    width: 600px;
    border-radius: 0.3em;
    box-shadow: 0.2em 0.2em 0.5em rgba(0, 0, 0, 0.35);
    z-index: 10;
    padding: 1.5em;
}
.quality-box.fixed {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 80vh;
    border-radius: 0.3em;
    box-shadow: 0.2em 0.2em 1em rgba(0, 0, 0, 0.35);
    z-index: 1000;
}

.quality-top {
    display: flex;
    align-items: flex-end;
    padding: 1.5em 1.5em 0;
}
.quality-top > div {
    height: 100%;
    display: flex;
    align-items: center;
}

.quality-top-count {
    font-size: 2em;
    line-height: 1em;
    padding: 0.3em 0.5em;
    font-weight: bold;
    cursor: pointer;
    border-bottom: 5px solid transparent;
    transition: all 0.3s;
    border-radius: 3px;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}
.quality-top-count:hover,
.quality-top-count.on {
    border-color: red;
    background-color: #fff;
    box-shadow: 0.05em 0.05em 0.1em rgba(0, 0, 0, 0.15);
}
.quality-top-count svg {
    margin-right: 0.3em;
}
.quality-top-count span {
    font-size: 0.7em;
    color: #aaa;
    font-weight: normal;
    margin-left: 0.3em;
}
.quality-top-count.count-rating {
    font-size: 4em;
    line-height: 1em;
    padding: 0.1em 0.2em;
    display: flex;
    align-items: flex-end;
}
.quality-top-count.count-rating svg {
    margin-right: 0.15em;
    margin-bottom: 0.1em;
}
.quality-top-count.count-rating span {
    font-size: 0.45em;
    line-height: 1em;
    margin-left: 0.15em;
    margin-bottom: 0.2em;
}

.quality-filters {
    display: flex;
    margin-top: 1em;
    padding: 0 1.5em 1em;
}
.quality-filters > div {
    background-color: #fff;
    border-radius: 3px;
    border-bottom: 4px solid transparent;
    padding: 0.3em 0.7em 0.2em 0.7em;
    transition: all 0.3s;
    cursor: pointer;
    box-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.1);
}
.quality-filters span {
    font-size: 0.8em;
    border-radius: 0.2em;
    background-color: rgba(0, 0, 0, 0.08);
    padding: 0.1em 0.3em;
    margin-left: 0.2em;
    margin-right: -0.2em;
}
.quality-filters div + div {
    margin-left: 0.3em;
}
.quality-filters > div.on,
.quality-filters > div:hover {
    border-color: #119a22;
}
.quality-filters > div:hover {
    box-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.2);
}

.quality-messages-box {
    height: 60%;
    overflow-x: auto;
    padding: 0em 1.5em 1.5em;
    height: calc(80vh - 10.9em);
}
</style>
