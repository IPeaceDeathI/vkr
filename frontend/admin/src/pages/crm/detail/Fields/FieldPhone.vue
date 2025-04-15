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
    <div class="linked-form__multiple-container">
        <div class="linked-form__field linked-form__field-pei">
            <div
                class="linked-form__field__label linked-form__field__label-multiple"
            >
                <div class="control--select linked-form__select">
                    <!-- <ul class="custom-scroll control--select--list">
                        <li
                            data-value="469245"
                            data-color=""
                            class="control--select--list--item"
                            style=""
                        >
                            <span
                                class="control--select--list--item-inner"
                                title="Раб. тел."
                            >
                                Раб. тел.
                            </span>
                        </li>

                        <li
                            data-value="469247"
                            data-color=""
                            class="control--select--list--item"
                            style=""
                        >
                            <span
                                class="control--select--list--item-inner"
                                title="Раб.прямой"
                            >
                                Раб.прямой
                            </span>
                        </li>

                        <li
                            data-value="469249"
                            data-color=""
                            class="control--select--list--item control--select--list--item-selected"
                            style=""
                        >
                            <span
                                class="control--select--list--item-inner"
                                title="Мобильный"
                            >
                                Мобильный
                            </span>
                        </li>

                        <li
                            data-value="469251"
                            data-color=""
                            class="control--select--list--item"
                            style=""
                        >
                            <span
                                class="control--select--list--item-inner"
                                title="Факс"
                            >
                                Факс
                            </span>
                        </li>

                        <li
                            data-value="469253"
                            data-color=""
                            class="control--select--list--item"
                            style=""
                        >
                            <span
                                class="control--select--list--item-inner"
                                title="Домашний"
                            >
                                Домашний
                            </span>
                        </li>

                        <li
                            data-value="469255"
                            data-color=""
                            class="control--select--list--item"
                            style=""
                        >
                            <span
                                class="control--select--list--item-inner"
                                title="Другой"
                            >
                                Другой
                            </span>
                        </li>
                    </ul> -->

                    <button
                        class="control--select--button"
                        tabindex=""
                        type="button"
                        data-value="469249"
                    >
                        <span class="control--select--button-inner">
                            Мобильный
                        </span>
                    </button>
                    <input
                        type="hidden"
                        class="control--select--input"
                        name="CFV[884169][fvtTdYlrXy][DESCRIPTION]"
                        value="469249"
                        data-prev-value="469249"
                    />
                </div>
            </div>

            <div class="linked-form__field__value">
                <div
                    class="js-linked-with-actions js-linked-has-actions js-linked-has-value"
                    data-pei-code="phone"
                >
                    <div class="js-control-phone control-phone">
                        <input
                            name=""
                            class="control-phone__formatted js-form-changes-skip linked-form__cf js-linked-pei text-input"
                            type="text"
                            :value="lead.lead_phone"
                            placeholder="..."
                            autocomplete="off"
                            disabled
                        />

                        <!-- <div
                            class="control-wrapper control--suggest control-phone__suggest"
                        >
                            <ul
                                class="control--suggest--list js-control--suggest--list custom-scroll"
                            ></ul>

                            <input
                                data-enable-filter="y"
                                autocomplete="off"
                                class="text-input control--suggest--input js-control--suggest--input control--suggest--input-inline linked-form__cf js-linked-pei"
                                type="hidden"
                                placeholder="..."
                                value="72763266519"
                                data-value-id=""
                                data-type="phone"
                            />
                        </div> -->
                    </div>

                    <div class="js-tip-holder">
                        <div class="tips js-tip card-cf-actions-tip" id="">
                            <div class="tips__inner custom-scroll js-tip-items">
                                <div
                                    class="tips-item js-tips-item js-cf-actions-item"
                                    data-type="phone"
                                    data-id=""
                                    data-forced=""
                                    data-value=""
                                    data-suggestion-type=""
                                >
                                    <span class="tips-icon-container">
                                        <span
                                            class="tips-icon icon icon-inline icon-phone-dark"
                                        ></span>
                                    </span>

                                    Позвонить
                                </div>

                                <div
                                    class="tips-item js-tips-item js-cf-actions-item"
                                    data-type="copy"
                                    data-id=""
                                    data-forced=""
                                    data-value=""
                                    data-suggestion-type=""
                                >
                                    <span class="tips-icon-container">
                                        <span class="tips-icon tips-svg-icon">
                                            <svg
                                                class="svg-icon svg-common--copy-dims"
                                            >
                                                <use
                                                    xlink:href="#common--copy"
                                                ></use>
                                            </svg>
                                        </span>
                                    </span>

                                    Копировать
                                </div>

                                <div
                                    class="tips-item js-tips-item js-cf-actions-item"
                                    data-type="edit"
                                    data-id=""
                                    data-forced=""
                                    data-value=""
                                    data-suggestion-type=""
                                >
                                    <span class="tips-icon-container">
                                        <span
                                            class="tips-icon icon icon-inline icon-pencil"
                                        ></span>
                                    </span>

                                    Редактировать
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="linked-form__field-add-multiple" style="display: block">
            <div class="linked-form__field__value"></div>
        </div> -->
    </div>
</template>
