<script>
import axios from "axios";

export default {
    inject: ["settings"],
    data() {
        return {
            isActive: false,
            valSelect: 0,
            numSelect: 0,
        };
    },
    props: {
        statuses: {
            type: Array,
            required: true,
        },
        lead: {
            type: Array,
            required: true,
        },
    },
    computed: {
        leadStatus() {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.valSelect = this.lead.lead_status;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.numSelect = this.getStatus(
                this.lead.lead_status,
                "status_num",
            );
            return this.getStatus(this.lead.lead_status, "status_name");
        },
    },
    watch: {
        // lead(){
        //     let status = this.statuses.filter((item) => item.status_id === this.lead.lead_id);
        //     return this.setVal(status)
        // }
    },
    methods: {
        setVal(status) {
            this.isActive = false;
            this.valSelect = status.status_id;
            console.log(status);
            // eslint-disable-next-line vue/no-mutating-props
            this.lead.lead_status = status.status_id;
            this.numSelect = status.status_num;
            var inf = {
                id: this.lead.lead_id,
                old_list: null,
                new_list: status.status_id,
            };
            axios.put(
                this.settings.SITE_PATH + "/api/crm/lead_status_change",
                inf,
            );
        },
        getStatus(id, col) {
            let status = this.statuses.filter((item) => item.status_id === id);
            if (col && status && status[0][col]) {
                return status[0][col];
            }
            return status;
        },
    },
};
</script>

<template>
    <div
        class="linked-form__field linked-form__field_status linked-form__field_status-lead"
    >
        <div class="linked-form__field__value js-cf-readonly">
            <div
                class="pipeline-select-view card-cf-lead-status-select"
                @click="isActive = !isActive"
            >
                <div
                    class="pipeline-select-view__inner"
                    id="card_status_view_mode"
                    data-pipeline-id="6917214"
                    data-status-id="58209734"
                >
                    <!-- <div class="pipeline-select-view__pipeline">
                    Воронка
                </div> -->
                    <div class="pipeline-select-view__status">
                        <span>{{ leadStatus }}</span>

                        <!-- <span class="pipeline-select-view__status-from">
                        &nbsp;(191 день)
                    </span> -->
                    </div>

                    <div class="pipeline-select-view__icon"></div>

                    <div class="pipeline-select-view__colors">
                        <div
                            v-for="(status, index) in statuses"
                            :key="index"
                            :class="
                                'pipeline-select-view__colors-block pipeline-select-view__colors-block_current ' +
                                (numSelect >= status.status_num
                                    ? ''
                                    : 'noactive')
                            "
                            :data-status-id="status.status_color"
                            :style="'background:' + status.status_color"
                        ></div>
                    </div>
                </div>

                <div class="pipeline-select-dropdown" v-show="isActive">
                    <li
                        v-for="(status, index) in statuses"
                        :key="index"
                        class="pipeline-select__dropdown__item pipeline-select__dropdown__item_selected"
                        :style="'background-color: ' + status.status_color"
                        :for="'pipeline_' + status.status_id"
                    >
                        <input
                            class="pipeline-select__dropdown__item__input"
                            type="radio"
                            name="lead[STATUS]"
                            :id="'pipeline_' + status.status_id"
                            :value="status.status_id"
                            v-model="status.checked"
                            @change="setVal(status)"
                        />
                        <label
                            class="pipeline-select__dropdown__item__label"
                            :for="'pipeline_' + status.status_id"
                        >
                            <span class="pipeline-select__item-text-wrapper">
                                <span class="pipeline-select__item-text">
                                    {{ status.status_name }}
                                </span>
                            </span>
                        </label>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pipeline-select-view {
    position: relative;
    cursor: pointer;
    user-select: none;
}
.pipeline-select-dropdown {
    position: absolute;
    background-color: #fff;
    top: 100%;
    width: 100%;
    box-shadow: 0.1em 0.2em 0.5em rgba(0, 0, 0, 0.3);
}

.pipeline-select-view__colors-block.noactive {
    opacity: 0;
}

.pipeline-select-dropdown {
    z-index: 100;
}
</style>
