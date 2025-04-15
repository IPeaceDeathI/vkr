<script>
import Icon from "@/components/ui/AdminIcon.vue";
import axios from "axios";

import DetailStatus from "@/pages/crm/detail/DetailStatus.vue";
import DetailFields from "@/pages/crm/detail/DetailFields.vue";

import DetailRight from "@/pages/crm/detail/DetailRight.vue";

export default {
    components: { Icon, DetailStatus, DetailFields, DetailRight },
    inject: ["settings"],
    data() {
        return {
            lead: {},
            statuses: {},
        };
    },
    mounted() {
        axios
            .put(this.settings.SITE_PATH + "/api/crm/lead", {
                id: this.$route.params.lead_id,
            })
            .then((response) => (this.lead = response.data.data.lead));
        axios
            .get(this.settings.SITE_PATH + "/api/crm/leads_statuses")
            .then((response) => (this.statuses = response.data.data.statuses));
    },
    methods: {},
};
</script>

<template>
    <div class="card-holder js-widgets-hidden">
        <div class="js-card-fields card-holder__fields">
            <div
                class="card-holder__container custom-scroll card-holder__container_reduced"
            >
                <div class="card-fields__fields-block">
                    <a
                        class="js-back-button card-fields__top-back"
                        @click="$router.go(-1)"
                    >
                        <Icon
                            path="addons"
                            name="arrow_left"
                            size="12"
                            class="svg-icon svg-common--arrow-left-dims"
                        />
                    </a>
                    <form class="card-entity-form">
                        <div class="card-entity-form__fields">
                            <div class="card-entity-form__top">
                                <div class="card-entity-form__top-cover"></div>

                                <div class="card-fields__top-name-block">
                                    <div class="card-fields__top-name">
                                        <div
                                            class="card-fields__top-name-wrapper"
                                        >
                                            <div
                                                class="card-fields__top-name-input-wrapper js-card-name"
                                            >
                                                <textarea
                                                    disabled
                                                    id="person_n"
                                                    class="text-input text-input-textarea card-fields__top-name-input js-textarea-autosize"
                                                    tabindex=""
                                                    name="lead[NAME]"
                                                    :placeholder="
                                                        'Сделка #' +
                                                        lead.lead_id
                                                    "
                                                    style="
                                                        overflow: hidden;
                                                        overflow-wrap: break-word;
                                                        height: 31px;
                                                    "
                                                    v-model="lead.lead_name"
                                                ></textarea>
                                            </div>
                                            <div
                                                class="card-fields__top-name-more"
                                            >
                                                <div
                                                    class="button-input-wrapper button-input-more"
                                                >
                                                    <!-- <button type="button" class="button-input  button-input-with-menu" tabindex="-1">
                                                <span class="button-input-inner button-input-more-inner">
                                                    <span class="icon icon-inline icon-dots-card icon-dots button-input-more-icon">
                                                        <Icon path="projects" name="more" size="14" />
                                                    </span>
                                                </span>          
                                            </button> -->
                                                    <ul
                                                        class="button-input__context-menu"
                                                    >
                                                        <li
                                                            class="button-input__context-menu__item element__save-and-create"
                                                            id="save_and_create_contacts_link"
                                                            style="
                                                                display: list-item;
                                                            "
                                                        >
                                                            <div
                                                                class="button-input__context-menu__item__inner"
                                                            >
                                                                <span
                                                                    class="button-input__context-menu__item__icon-container"
                                                                >
                                                                    <span
                                                                        class="button-input__context-menu__item__icon icon icon-inline icon-save-and-create"
                                                                    ></span>
                                                                </span>
                                                                <span
                                                                    class="button-input__context-menu__item__text"
                                                                >
                                                                    Сохранить и
                                                                    создать
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            class="card-fields__tags-scoring-container"
                                        >
                                            <div
                                                id="add_tags"
                                                class="card-fields__top-name-add-tags-label doubles_button"
                                            >
                                                <div
                                                    class="multisuggest js-multisuggest js-can-add"
                                                >
                                                    <ul
                                                        class="multisuggest__list js-multisuggest-list"
                                                    >
                                                        <li
                                                            class="multisuggest__list-item js-multisuggest-fake"
                                                            data-id="lead_id"
                                                        >
                                                            <span
                                                                class="tag"
                                                                :title="
                                                                    '#' +
                                                                    lead.lead_id
                                                                "
                                                                >#{{
                                                                    lead.lead_id
                                                                }}</span
                                                            >
                                                        </li>
                                                        <!-- <li
                                                            class="multisuggest__list-item js-multisuggest-item"
                                                            data-id="add_tag"
                                                        >
                                                            <input
                                                                type="text"
                                                                class="js-focuser js-form-changes-skip"
                                                                readonly="readonly"
                                                                onkeydown="([13,8].indexOf(event.which)+1)&amp;&amp;this.parentNode.click()"
                                                                onclick="return false"
                                                            />
                                                            <span
                                                                class="tag"
                                                                title="#тегировать"
                                                                >#тегировать</span
                                                            >
                                                        </li> -->
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <DetailStatus
                                    :statuses="statuses"
                                    :lead="lead"
                                />
                            </div>

                            <div class="card-tabs-wrapper"></div>

                            <DetailFields :lead="lead" />
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- detail -->

        <DetailRight />
    </div>
</template>

<style>
.card-fields__top-name-more .button-input-with-menu {
    color: #fff;
}

.card-holder__fields {
    border-right: 1px solid #c5c5c5;
}
</style>
