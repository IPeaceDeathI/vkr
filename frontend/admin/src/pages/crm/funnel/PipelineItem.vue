<script>
export default {
    props: {
        lead: {
            type: Array,
            required: true,
        },
    },
};
</script>

<template>
    <div
        class="pipeline_leads__item pipeline_leads__item_flex js-hs-prevent js-pipeline-sortable pipeline_leads__item-sortable ui-sortable-handle"
    >
        <div class="pipeline_leads__info">
            <div class="pipeline_leads__top-block">
                <div
                    v-if="lead.lead_name"
                    class="pipeline_leads__linked-entities"
                >
                    {{ lead.lead_name || "Без имени" }}
                </div>
                <div
                    v-if="!lead.lead_name"
                    class="pipeline_leads__linked-entities"
                >
                    {{ lead.lead_phone || "Телефон не указан" }}
                </div>
                <div class="pipeline_leads__top-date">
                    {{ lead.lead_date_cut }}
                </div>
            </div>
            <div class="pipeline_leads__lead-title">
                <a
                    class="pipeline_leads__title-text h-text-overflow js-navigate-link"
                    :title="lead.title"
                    :href="'/admin/crm/detail/' + lead.id"
                >
                    {{ lead.title ?? "Сделка #" + lead.lead_id }}
                </a>
            </div>
            <div class="pipeline_leads__middle-block">
                <span
                    class="pipeline_leads__note pipeline_leads__grey h-text-overflow"
                >
                    {{ lead.lead_budget.toLocaleString() }} ₽
                </span>
                <div class="pipeline_leads__tags">
                    <!-- <div class="pipeline_leads__tags-inner" data-rest="1">
                        <span class="pipeline_leads__tag" data-id="62839" data-rest="0">первый тег</span>
                    </div> -->
                    <!-- <span class="pipeline_leads__task-days pipeline_leads__task-days_yellow">Нет задач</span> -->
                </div>
                <!-- <div class="pipeline_leads__tasks">
                    <span
                        class="pipeline_leads__task-icon pipeline_leads__task-icon_yellow"
                        title="Действий по сделке не запланировано"
                    ></span>
                </div> -->
            </div>
            <!-- <label class="control-checkbox pipeline_leads__lead-checkbox">
                <div class="control-checkbox__body">
                    <input
                        type="checkbox"
                        class=""
                        name=""
                    /><span class="control-checkbox__helper"></span>
                </div>
            </label> -->
        </div>
    </div>
</template>
