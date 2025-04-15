<script>
import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: { Icon },
    data() {
        return {
            items: [{ email: "test@test.com" }, { email: "test@ya.ru" }],
        };
    },
    methods: {
        addElem() {
            this.items.push({ email: "" });
        },
        removeElem(index) {
            this.items.splice(index, 1);
        },
    },
};
</script>

<template>
    <div
        data-is="settings-block-notify-mails"
        class="settings-block-notify-mails group-item"
    >
        <div class="flexbe-title text-subtitle inline-box">
            <span>Электронная почта</span>
            <span data-is="admin-save-text" class="admin-save-text flexbe-desc">
                <div class="status-saved">
                    <span class="saved-text"></span>
                    <span class="saving-text">Сохранение</span>
                    <span class="success-text flexbe-success">Сохранено</span>
                    <span class="error-text flexbe-error">Ошибка</span>
                </div>
            </span>
        </div>

        <div class="flexbe-white-box shadow p0 overflow">
            <div class="flexbe-table block">
                <div class="tbody">
                    <div v-for="(item, index) in items" :key="index" class="tr">
                        <div class="th">
                            <span class="flexbe-text">
                                Email #{{ index + 1 }}
                            </span>
                        </div>
                        <div class="td">
                            <div class="inline-box">
                                <div
                                    data-is="proxy"
                                    is="save-input"
                                    type="text"
                                    input-class="transparent in-table `email_0`"
                                    placeholder="example@site.com"
                                    name="test[0]"
                                    style=""
                                    class="save-input"
                                >
                                    <div
                                        is="flexbe-input"
                                        style="--addonPadding: 0"
                                        class="flexbe-input transparent in-table `email_0` flexbe-input--text"
                                        type="text"
                                        name="test[0]"
                                        placeholder="example@site.com"
                                        :value="item.email"
                                    >
                                        <div class="flexbe-input-wrap">
                                            <input
                                                type="text"
                                                class="flexbe-input__text flexbe-input-styled"
                                                name="test[0]"
                                                placeholder="example@site.com"
                                                autocomplete="off"
                                                tabindex="undefined"
                                                v-model="item.email"
                                            />
                                        </div>
                                        <div
                                            is="save-button"
                                            type="submit"
                                            class="save-button flexbe-input__addon hide"
                                            show-save="show-save"
                                        >
                                            <div class="save-block show">
                                                <div
                                                    class="flexbe-button small filled is-primary"
                                                >
                                                    <span class="flexbe-text"
                                                        >Сохранить</span
                                                    >
                                                    <span
                                                        class="flexbe-check text-s is-check"
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flexbe-action-buttons ml25">
                                    <div
                                        class="action-button"
                                        @click="removeElem(index)"
                                    >
                                        <Icon
                                            path="settings"
                                            name="remove"
                                            size="16"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="collection">
                <div class="collection-item top-border">
                    <div class="row">
                        <div class="col col-4">
                            <div
                                class="flexbe-button small filled is-secondary px15"
                                @click="addElem()"
                            >
                                Добавить email
                            </div>
                        </div>
                        <div class="col col-8">
                            <label
                                data-is="flexbe-input"
                                type="toggle"
                                checked="checked"
                                class="flexbe-input flexbe-input--checkbox large to-right"
                            >
                                <input
                                    ref="input"
                                    class="flexbe-input__toggle"
                                    type="checkbox"
                                    checked="checked"
                                    value="checked"
                                />
                                <span class="flexbe-toggle"></span>
                                <span
                                    >Добавить UTM-метки в email
                                    уведомления</span
                                >
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
