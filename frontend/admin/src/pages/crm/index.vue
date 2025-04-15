<script>
import axios from "axios";

// import FunnelTopMore from "@/pages/crm/funnel/FunnelTopMore.vue";

import FunnelGridList from "@/pages/crm/funnel/FunnelGridList.vue";
import FunnelGridPipe from "@/pages/crm/funnel/FunnelGridPipe.vue";

import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: {
        // FunnelTopMore,
        Icon,
        FunnelGridList,
        FunnelGridPipe,
    },
    inject: ["settings"],
    data() {
        return {
            pressed: false,
            grid: "pipe",
            // items: [
            // {
            //     id: 2345,
            //     title: "Item A",
            //     list: 1,
            //     price: 100,
            // },
            // ],
            items: [],
            funnel: {
                // 1: {
                //     status_id: 1,
                //     status_name: "Необработанные",
                //     status_color: "#ffcccc",
                // },
            },
            info: [],
            intervalUpdateLeadsId: false,
            search_val: "",
        };
    },
    methods: {
        priceColumn(id) {
            var total = 0;
            this.filteredList.forEach(function (item) {
                if (id == -1) total += item.price;
                else if (item.list == id) total += item.price;
            });
            return total;
        },
        intervalUpdateLeads() {
            this.updateLeads();
            this.intervalUpdateLeadsId = setInterval(() => {
                this.updateLeads();
            }, 10 * 1000);
        },
        addLeadFromCRM() {
            axios
                .get(this.settings.SITE_PATH + "/api/crm/add_lead")
                .then((response) =>
                    this.$router.push(
                        "/admin/crm/detail/" + response.data.data.lead_id,
                    ),
                );
        },
        updateLeads() {
            axios
                .get(this.settings.SITE_PATH + "/api/crm/leads")
                .then((response) => (this.items = response.data.data.leads));
        },
        updateStatuses() {
            axios
                .get(this.settings.SITE_PATH + "/api/crm/leads_statuses")
                .then(
                    (response) => (this.funnel = response.data.data.statuses),
                );
        },
    },
    mounted() {
        this.intervalUpdateLeads();
        this.updateStatuses();
    },
    computed: {
        filteredList() {
            return this.items.filter((item) => {
                const computedObj = {
                    ...item,
                    status_name: item.status.status_name,
                };
                return Object.keys(computedObj).some((key) =>
                    ("" + computedObj[key])
                        .toLowerCase()
                        .includes(this.search_val.toLowerCase()),
                );
            });
        },
    },
};
</script>

<template>
    <div id="page_holder">
        <div class="list list-pipeline">
            <div class="list__body clearfix">
                <div class="list__body-right">
                    <!-- filters -->
                    <div class="list__body-right__top">
                        <div class="list__top__preset">
                            <div
                                class="list-top-nav__text-button list-top-nav__text-button_funnel list-top-nav__text-button_submenu js-list-top-nav__text-button_submenu"
                                data-entity="leads"
                                title="Воронка"
                            >
                                <span class="clip-text-overflow">Воронка</span>
                            </div>
                            <div class="list-top-nav__buttons-wrapper">
                                <a
                                    :class="
                                        'list-top-nav__icon-button list-top-nav__icon-button_pipe js-list-caption-link ' +
                                        (grid == 'pipe'
                                            ? 'list-top-nav__icon-button_active'
                                            : '')
                                    "
                                    title="Сделки"
                                    @click="grid = 'pipe'"
                                >
                                    <Icon
                                        path="filters"
                                        name="cards-view"
                                        size="16"
                                    />
                                </a>
                                <a
                                    :class="
                                        'list-top-nav__icon-button list-top-nav__icon-button_list js-list-caption-link ' +
                                        (grid == 'list'
                                            ? 'list-top-nav__icon-button_active'
                                            : '')
                                    "
                                    title="Список"
                                    @click="grid = 'list'"
                                >
                                    <Icon
                                        path="filters"
                                        name="table-view"
                                        size="16"
                                    />
                                </a>
                            </div>
                        </div>

                        <div
                            class="list-top-search list-top-search-responsive"
                            id="search_input_wrapper"
                        >
                            <div class="search-options" id="search-options">
                                <div
                                    class="list-top-search__preset"
                                    id="search_filter_preset"
                                ></div>
                                <div class="search-options-wrapper"></div>
                            </div>
                            <div class="list-top-search__input-wrapper">
                                <div
                                    class="list-top-search__apply-block h-hidden"
                                >
                                    <button
                                        class="list-top-search__apply-button js-filter-apply"
                                    >
                                        <span>Применить</span>
                                    </button>
                                </div>
                                <div class="list-top-search__input-block">
                                    <input
                                        type="text"
                                        class="list-top-search__input"
                                        id="search_input"
                                        placeholder="Поиск и фильтр"
                                        spellcheck="false"
                                        autocomplete="off"
                                        v-model="search_val"
                                    />
                                    <div
                                        class="list-top-search__summary js-list_summary"
                                        id="list-top-search__summary"
                                    >
                                        <span
                                            class="list-top-search__summary-text"
                                        >
                                            {{ filteredList.length }} сделок:
                                        </span>
                                        <span
                                            class="list-top-search__summary-count h-text-overflow"
                                        >
                                            {{ priceColumn(-1) }} ₽
                                        </span>
                                    </div>
                                    <div
                                        class="list-top-search__info h-hidden"
                                        id="search_clear_button"
                                    >
                                        <span
                                            class="list-top-search__actions-icon list-top-search__actions-icon_cancel js-search-cancel"
                                            ><svg
                                                class="svg-icon svg-common--cross-close-dims"
                                            >
                                                <use
                                                    xlink:href="#common--cross-close"
                                                ></use></svg></span
                                        ><span
                                            class="list-top-search__actions-icon list-top-search__actions-icon_hide js-search-hide"
                                            ><svg
                                                class="svg-icon svg-common--cross-close-dims"
                                            >
                                                <use
                                                    xlink:href="#common--cross-close"
                                                ></use>
                                            </svg>
                                        </span>
                                    </div>
                                    <div
                                        class="list-top-search__info h-hidden"
                                        id="search_loader"
                                    >
                                        <span class="spinner-icon"></span>
                                    </div>
                                </div>
                            </div>
                            <label for="">
                                <Icon
                                    path="core"
                                    name="search"
                                    size="18"
                                    class="list-top-search__icon svg-icon svg-common--filter-search-dims"
                                />
                            </label>
                        </div>

                        <div class="list__top__actions">
                            <!-- <FunnelTopMore /> -->

                            <!-- <a href="/settings/pipeline/leads/6917214" data-href="/settings/pipeline/leads/6917214" class="js-navigate-link list-top-nav__button-setup ">
                            <span class="button-input button-input_add">
                                <span class="button-input-inner__text button-input-inner__text_short-settings">
                                    Настроить
                                </span>
                                <span class="button-input-inner__text">
                                    Настроить воронку
                                </span>
                            </span>
                        </a> -->

                            <a
                                @click="addLeadFromCRM()"
                                data-href="/leads/add/"
                                class="button-input button-input_add button-input_add-lead content-table__name-link button-input_blue js-navigate-link"
                            >
                                <span
                                    class="button-input-inner__text button-input-inner__text_short"
                                >
                                    Сделка
                                </span>
                                <span class="button-input-inner__text">
                                    Новая сделка
                                </span>
                            </a>
                        </div>
                    </div>

                    <div
                        class="list__body__holder js-hs-wrapper hs-wrapper_hide-boundary hs-wrapper list__body__holder_stats_opening list__body__holder_stats_opened"
                    >
                        <!-- <div class="pipeline__stats pipeline-leads__stats" id="pipeline__stats">
                        <div class="pipeline-leads__stats-inner">
                            <div class="pipeline-leads__stats-item pipeline-leads__stats-item_due">
                                <div class="pipeline-leads__stats-text">Задач на сегодня:</div><span class="pipeline-leads__stats-count pipeline-leads__stats-count_due pipeline-leads__stats-count_empty" data-type="due">0</span></div>
                            <div class="pipeline-leads__stats-item pipeline-leads__stats-item_without_task">
                                <div class="pipeline-leads__stats-text">Без задач:</div><span class="pipeline-leads__stats-count pipeline-leads__stats-count_without_task " data-type="without_task">10</span></div>
                            <div class="pipeline-leads__stats-item pipeline-leads__stats-item_overdue">
                                <div class="pipeline-leads__stats-text">Просроченных:</div><span class="pipeline-leads__stats-count pipeline-leads__stats-count_overdue pipeline-leads__stats-count_empty" data-type="overdue">0</span></div>
                            <div class="pipeline-leads__stats-item pipeline-leads__stats-item_new">
                                <div class="pipeline-leads__stats-text">Новых сегодня / вчера:</div><span class="pipeline-leads__stats-count pipeline-leads__stats-count_new_today pipeline-leads__stats-count_empty" data-type="new_today">0</span><span class="pipeline-leads__stats-count pipeline-leads__stats-count_divider">&nbsp;/&nbsp;</span><span class="pipeline-leads__stats-count pipeline-leads__stats-count_new_yesterday pipeline-leads__stats-count_empty" data-type="new_yesterday">0</span>
                            </div>
                        </div>
                        <div class="pipeline-leads__stats-total">
                            <div class="pipeline-leads__stats-text">Прогноз продаж</div><span class="pipeline-leads__stats-count pipeline-leads__stats-count_no-data">Нет данных</span>
                        </div>
                    </div> -->

                        <FunnelGridList
                            v-if="grid == 'list'"
                            :items="filteredList"
                            :funnel="funnel"
                        />

                        <FunnelGridPipe
                            v-if="grid == 'pipe'"
                            :items="filteredList"
                            :funnel="funnel"
                            :info="info"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
body {
    padding-left: 0;
}
#page_holder {
    left: 0px;
}
.list__body-right__top {
    left: 65px;
}
.admin-content-wrapper {
    /* height: 100vh; */
    height: calc(100vh + 20px);
}

/* В grid=list сжаты строки иначе */
.content-table__item__inner {
    height: 37px;
}
</style>

<style>
.admin-content-wrapper {
    padding-left: 65px !important;
}
</style>
<style scoped>
.admin-content-wrapper {
    padding-left: 32px !important;
}

.list-pipeline .list__body__holder {
    width: calc(100vw - 65px);
}
</style>
