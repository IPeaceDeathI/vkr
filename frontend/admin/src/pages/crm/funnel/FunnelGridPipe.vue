<script>
import PipelineItem from "@/pages/crm/funnel/PipelineItem.vue";
import axios from "axios";

export default {
    components: { PipelineItem },
    inject: ["settings"],
    props: {
        items: {
            type: Array,
            required: true,
        },
        funnel: {
            type: Array,
            required: true,
        },
        info: {
            type: Array,
            required: true,
        },
    },
    methods: {
        getItemsColumn(id) {
            return this.items.filter((item) => item.list === id);
        },
        startDrag(evt, item) {
            evt.dataTransfer.dropEffect = "move";
            evt.dataTransfer.effectAllowed = "move";
            evt.dataTransfer.setData("itemID", item.id);
            // evt.dataTransfer.dropEffect = "copy"
        },
        onDrop(evt, list) {
            const itemID = evt.dataTransfer.getData("itemID");
            const item = this.items.find((item) => item.id == itemID);
            var inf = {
                id: item.id,
                old_list: item.list,
                new_list: list,
            };
            axios.put(
                this.settings.SITE_PATH + "/api/crm/lead_status_change",
                inf,
            );
            item.list = list;
        },
        priceColumn(id) {
            var total = 0;
            this.items.forEach(function (item) {
                if (id == -1) total += item.price;
                else if (item.list == id) total += item.price;
            });
            return total;
        },
    },
};
</script>

<template>
    <div
        class="pipeline-scroller js-scroll-x-container js-hs-scroller block-selection-prepended"
    >
        <div class="pipeline__body">
            <div class="pipeline_wrapper pipeline_row">
                <!-- column -->

                <div
                    class="pipeline_status pipeline_cell pipeline_cell-58209734"
                    v-for="column in funnel"
                    :key="column.id"
                >
                    <div
                        class="pipeline_cell-head pipeline_cell-head-58209734 pipeline_cell-head-group-58209734"
                    >
                        <div class="pipeline_status__head-wrapper">
                            <div
                                id="status_id_58209734"
                                class="pipeline_status__head"
                                data-id="58209734"
                            >
                                <div
                                    class="pipeline_status__head_title"
                                    title="Первичный контакт"
                                >
                                    <span class="block-selectable">{{
                                        column.status_name
                                    }}</span>
                                </div>
                                <div
                                    class="pipeline_status__head_info js-fixed-header-stats"
                                    style="opacity: 1; max-height: 20px"
                                >
                                    <div class="block-selectable">
                                        <span
                                            class="pipeline_status__head_info__count"
                                        >
                                            {{
                                                items.filter(
                                                    (v) =>
                                                        v.list ==
                                                        column.status_id,
                                                ).length
                                            }}
                                            сделок:
                                        </span>
                                        <span
                                            class="pipeline_status__head_info__sum"
                                        >
                                            {{ priceColumn(column.status_id) }}
                                            ₽
                                        </span>
                                    </div>
                                </div>
                                <span
                                    class="pipeline_status__head_line"
                                    :style="
                                        'background: ' +
                                        column.status_color +
                                        '; color: #99ccff;'
                                    "
                                ></span>
                            </div>
                        </div>
                        <label
                            class="control-checkbox pipeline_status__head-checkbox"
                        >
                            <div class="control-checkbox__body">
                                <input
                                    type="checkbox"
                                    class=""
                                    name=""
                                    id="status_chckbx_58209734"
                                    value="58209734"
                                    data-value="58209734"
                                />
                                <span class="control-checkbox__helper"></span>
                            </div>
                        </label>
                    </div>

                    <div
                        class="pipeline_cell-head pipeline_cell-head-58209734 pipeline_cell-head-group-58209734"
                    >
                        <div
                            class="pipeline_items__list js-pipeline-row ui-sortable"
                            @drop="onDrop($event, column.status_id)"
                            @dragover.prevent
                            @dragenter.prevent
                        >
                            <PipelineItem
                                v-for="item in getItemsColumn(column.status_id)"
                                :key="item.title"
                                :lead="item"
                                draggable="true"
                                @dragstart="startDrag($event, item)"
                            />
                        </div>
                    </div>
                </div>

                <!-- column -->
            </div>
        </div>
    </div>
</template>

<style>
/* Отступ вверху grid=list */
.list__table__holder {
    padding-top: 20px;
}
</style>
