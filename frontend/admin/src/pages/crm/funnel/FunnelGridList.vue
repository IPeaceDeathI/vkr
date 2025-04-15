<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        funnel: {
            type: Array,
            required: true,
        },
    },
};
</script>

<template>
    <div
        class="list__table__holder js-hs-scroller custom-scroll hs-wrapper_no-hand"
    >
        <div class="js-scroll-container list__table" id="list_table">
            <div
                class="js-list-columns-group list__col-group"
                id="list_col_group"
            >
                <div
                    class="js-list-column-code-id list-column-code-id js-list-column list__col-group__column"
                    data-field-code="id"
                ></div>
                <div
                    class="js-list-column-code-name js-list-column list__col-group__column"
                    style=""
                    data-field-code="name"
                ></div>
                <div
                    class="js-list-column-code-main_contact js-list-column list__col-group__column"
                    style=""
                    data-field-code="main_contact"
                ></div>
                <div
                    class="js-list-column-code-contact_company_name js-list-column list__col-group__column"
                    style=""
                    data-field-code="contact_company_name"
                ></div>
                <div
                    class="js-list-column-code-status js-list-column list__col-group__column"
                    style=""
                    data-field-code="status"
                ></div>
                <div
                    class="js-list-column-code-budget js-list-column list__col-group__column"
                    style=""
                    data-field-code="budget"
                ></div>
            </div>

            <div
                class="list-row list-row-head js-list-row js-list-row-head"
                id="list_head"
            >
                <div
                    class="list-row__cell js-hs-prevent list-row__cell-head cell-head list-row__cell-template-id list-row__cell-id"
                >
                    <div class="cell-head__inner">
                        <label class="control-checkbox">
                            <div class="control-checkbox__body">
                                <input
                                    type="checkbox"
                                    class=""
                                    name=""
                                    id="list_all_checker"
                                    value=""
                                    data-value=""
                                /><span class="control-checkbox__helper"></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div
                    class="list-row__cell js-hs-prevent js-resizable-cell list-row__cell-head cell-head js-cell-head js-cell-head_sortable list-row__cell-template-name list-row__cell-name ui-resizable"
                    data-field-template="name"
                    data-field-name=""
                    data-field-code="name"
                    style=""
                >
                    <div class="cell-head__inner">
                        <div class="cell-head__inner-content">
                            <span
                                class="cell-head__dots icon icon-v-dots"
                            ></span
                            ><span class="cell-head__title">
                                Название сделки<!----> </span
                            ><span class="cell-head__icon"
                                ><span
                                    class="cell-head__icon-sortable cell-head__icon-sortable_desc"
                                ></span
                                ><span
                                    class="cell-head__icon-close js-cell-head__icon-close"
                                    ><svg
                                        class="svg-icon svg-common--cross-close-dims"
                                    >
                                        <use
                                            xlink:href="#common--cross-close"
                                        ></use></svg></span
                            ></span>
                        </div>
                        <div class="cell-head__resize-ghost"></div>
                    </div>
                    <div
                        class="ui-resizable-handle ui-resizable-e"
                        style="z-index: 90"
                    ></div>
                </div>
                <div
                    class="list-row__cell js-hs-prevent js-resizable-cell list-row__cell-head cell-head js-cell-head js-cell-head_sortable list-row__cell-template-main_contact list-row__cell-main_contact ui-resizable"
                    data-field-template="main_contact"
                    data-field-name=""
                    data-field-code="main_contact"
                    style=""
                >
                    <div class="cell-head__inner">
                        <div class="cell-head__inner-content">
                            <span
                                class="cell-head__dots icon icon-v-dots"
                            ></span
                            ><span class="cell-head__title">
                                Основной контакт<!----> </span
                            ><span class="cell-head__icon"
                                ><span
                                    class="cell-head__icon-sortable cell-head__icon-sortable_desc"
                                ></span
                                ><span
                                    class="cell-head__icon-close js-cell-head__icon-close"
                                    ><svg
                                        class="svg-icon svg-common--cross-close-dims"
                                    >
                                        <use
                                            xlink:href="#common--cross-close"
                                        ></use></svg></span
                            ></span>
                        </div>
                        <div class="cell-head__resize-ghost"></div>
                    </div>
                    <div
                        class="ui-resizable-handle ui-resizable-e"
                        style="z-index: 90"
                    ></div>
                </div>
                <div
                    class="list-row__cell js-hs-prevent js-resizable-cell list-row__cell-head cell-head js-cell-head list-row__cell-template-link list-row__cell-contact_company_name ui-resizable"
                    data-field-template="link"
                    data-field-name=""
                    data-field-code="contact_company_name"
                    style=""
                >
                    <div class="cell-head__inner">
                        <div class="cell-head__inner-content">
                            <span
                                class="cell-head__dots icon icon-v-dots"
                            ></span
                            ><span class="cell-head__title">
                                Компания контакта<!---->
                            </span>
                        </div>
                        <div class="cell-head__resize-ghost"></div>
                    </div>
                    <div
                        class="ui-resizable-handle ui-resizable-e"
                        style="z-index: 90"
                    ></div>
                </div>
                <div
                    class="list-row__cell js-hs-prevent js-resizable-cell list-row__cell-head cell-head js-cell-head js-cell-head_sortable list-row__cell-template-status list-row__cell-status ui-resizable"
                    data-field-template="status"
                    data-field-name=""
                    data-field-code="status"
                    style=""
                >
                    <div class="cell-head__inner">
                        <div class="cell-head__inner-content">
                            <span
                                class="cell-head__dots icon icon-v-dots"
                            ></span
                            ><span class="cell-head__title">
                                Этап сделки<!----> </span
                            ><span class="cell-head__icon"
                                ><span
                                    class="cell-head__icon-sortable cell-head__icon-sortable_desc"
                                ></span
                                ><span
                                    class="cell-head__icon-close js-cell-head__icon-close"
                                    ><svg
                                        class="svg-icon svg-common--cross-close-dims"
                                    >
                                        <use
                                            xlink:href="#common--cross-close"
                                        ></use></svg></span
                            ></span>
                        </div>
                        <div class="cell-head__resize-ghost"></div>
                    </div>
                    <div
                        class="ui-resizable-handle ui-resizable-e"
                        style="z-index: 90"
                    ></div>
                </div>
                <div
                    class="list-row__cell js-hs-prevent js-resizable-cell list-row__cell-head cell-head js-cell-head js-cell-head_sortable list-row__cell-template-budget list-row__cell-budget ui-resizable"
                    data-field-template="budget"
                    data-field-name=""
                    data-field-code="budget"
                    style=""
                >
                    <div class="cell-head__inner">
                        <div class="cell-head__inner-content">
                            <span
                                class="cell-head__dots icon icon-v-dots"
                            ></span
                            ><span class="cell-head__title">
                                Бюджет<!---->, ₽ </span
                            ><span class="cell-head__icon"
                                ><span
                                    class="cell-head__icon-sortable cell-head__icon-sortable_desc"
                                ></span
                                ><span
                                    class="cell-head__icon-close js-cell-head__icon-close"
                                    ><svg
                                        class="svg-icon svg-common--cross-close-dims"
                                    >
                                        <use
                                            xlink:href="#common--cross-close"
                                        ></use></svg></span
                            ></span>
                        </div>
                        <div class="cell-head__resize-ghost"></div>
                    </div>
                    <div
                        class="ui-resizable-handle ui-resizable-e"
                        style="z-index: 90"
                    ></div>
                </div>
            </div>

            <div
                v-for="(lead, index) in items"
                :key="index"
                class="list-row js-list-row js-pager-list-item__1 js-page-delimiter"
                data-page="1"
            >
                <div
                    class="list-row__cell js-list-row__cell list-row__cell-template-id list-row__cell-id"
                >
                    <div
                        class="content-table__item__inner"
                        style="overflow: visible"
                    >
                        <label class="control-checkbox">
                            <div class="control-checkbox__body">
                                <input
                                    type="checkbox"
                                    class=""
                                    name=""
                                    :id="'lead_' + lead.lead_id"
                                    :value="lead.lead_id"
                                    :data-value="lead.lead_id"
                                />
                                <span class="control-checkbox__helper"></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div
                    class="list-row__cell js-list-row__cell list-row__cell-template-name list-row__cell-name"
                    data-field-code="name"
                    data-field-id="10"
                >
                    <div
                        class="content-table__item__inner content-table__item__inner-template-name"
                    >
                        <div class="list-row__template-name__name">
                            <!-- <div class="list-row__tasks">
                                <span
                                    class="pipeline_leads__task-icon pipeline_leads__task-icon_yellow"
                                    title="Действий по сделке не запланировано"
                                ></span>
                            </div> -->
                            <a
                                :href="'/admin/crm/detail/' + lead.lead_id"
                                class="js-navigate-link list-row__template-name__table-wrapper__name-link"
                                :title="lead.title"
                            >
                                {{ lead.title ?? "Сделка #" + lead.lead_id }}
                            </a>
                        </div>
                        <!-- <div class="list-row__template-name__tags js-list-tag">
                        <div class="pipeline_leads__tags-inner" data-rest="0">
                            <span class="pipeline_leads__tag pipeline_leads__tag-add"></span>
                        </div>
                    </div> -->
                    </div>
                </div>
                <div
                    class="list-row__cell js-list-row__cell list-row__cell-template-main_contact list-row__cell-main_contact"
                    data-field-code="main_contact"
                    data-field-id="20"
                >
                    <div class="content-table__item__inner">
                        <a
                            :href="'/admin/crm/detail/' + lead.lead_id"
                            class="js-navigate-link"
                        >
                            {{ lead.lead_phone }}
                        </a>
                    </div>
                </div>
                <div
                    class="list-row__cell js-list-row__cell list-row__cell-template-link list-row__cell-contact_company_name"
                    data-field-code="contact_company_name"
                    data-field-id="30"
                >
                    <div class="content-table__item__inner">
                        <span class="block-selectable">&nbsp;</span>
                    </div>
                </div>
                <div
                    class="list-row__cell js-list-row__cell list-row__cell-template-status list-row__cell-status"
                    data-field-code="status"
                    data-field-id="50"
                >
                    <div class="content-table__item__inner">
                        <span
                            class="leads__status-label"
                            :style="
                                'background-color: ' +
                                (lead.status.status_color
                                    ? lead.status.status_color
                                    : '#99ccff')
                            "
                        >
                            <span class="block-selectable">
                                {{ lead.status.status_name }}
                            </span>
                        </span>
                    </div>
                </div>
                <div
                    class="list-row__cell js-list-row__cell list-row__cell-template-budget list-row__cell-budget"
                    data-field-code="budget"
                    data-field-id="60"
                >
                    <div class="content-table__item__inner">
                        <span class="block-selectable">
                            {{ lead.price.toLocaleString() }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
