<script>
import Icon from "@/components/ui/AdminIcon.vue";
import axios from "axios";

export default {
    components: { Icon },
    inject: ["settings"],
    user_old: null,
    data() {
        return {
            user: null,
            isChanged: false,
            changes: {},
        };
    },
    mounted() {
        axios
            .get(this.settings.SITE_PATH + "/api/user/profile")
            .then((response) => {
                this.user = response.data.data.user;
                this.user_old = { ...response.data.data.user };
                console.log(this.user);
            });
    },
    methods: {
        changeUserStack(col) {
            this.changes[col] = this.user[col];
            this.isChanged = true;
            console.log(col, this.user[col]);
        },
        changeUserCol(col) {
            this.changeUserStack(col);
            this.changeUserAll();
        },
        changeUserAll() {
            axios.put(this.settings.SITE_PATH + "/api/user/profile", {
                data: this.changes,
            });
            this.isChanged = false;
            this.changes = null;
        },
        saveChanges() {
            this.changeUserAll();
            this.user_old = { ...this.user };
        },
        leaveChanges() {
            this.isChanged = false;
            this.user = { ...this.user_old };
        },
    },
    computed: {
        firstLetter() {
            return this.user
                ? this.user.user_email.toUpperCase().slice(0, 1)
                : "";
        },
    },
};
</script>

<template>
    <div class="admin-content">
        <header class="container narrow">
            <div
                data-is="admin-breadcrumbs"
                class="admin-breadcrumbs text-title"
            >
                Профиль
            </div>
        </header>

        <section class="container narrow">
            <div
                data-is="user-section-profile"
                class="user-section-profile pb60"
            >
                <div class="group-list slide-down-animation">
                    <div
                        data-is="user-block-avatar"
                        class="user-block-avatar group-item"
                    >
                        <div
                            data-is="flexbe-media-upload"
                            url="/admin/api/user/avatar/"
                            type="image"
                            loader="true"
                            overlay="true"
                            class="flexbe-media-upload flexbe-remove-item-container big circle"
                        >
                            <div
                                data-is="user-avatar"
                                class="user-avatar flexbe-media-upload__image"
                            >
                                <div class="user-avatar--symbol font-ui">
                                    <div
                                        class="background"
                                        style="background: #8e1053"
                                    ></div>
                                    <span class="symbol">{{
                                        firstLetter
                                    }}</span>
                                </div>
                                <!-- <div
                                    class="user-avatar--image"
                                    style="
                                        background-image: url(https://www.gravatar.com/avatar/c05884205acd8de2d56b8eb2b790a110?s=120&amp;d=blank);
                                    "
                                ></div> -->
                            </div>

                            <!-- <div
                                data-is="flexbe-button-upload"
                                url="/admin/api/user/avatar/"
                                file-type="image"
                                class="flexbe-button-upload"
                            >
                                <label
                                    class="file-select flexbe-button status-default filled size-m block is-primary"
                                >
                                    <input
                                        type="file"
                                        class="file-input"
                                        ref="fileInput"
                                        name="file"
                                        title=""
                                        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                                    />
                                    <div class="upload-text show">
                                        <span class="flexbe-text"
                                            >Загрузить</span
                                        >
                                    </div>
                                </label>
                            </div> -->

                            <!-- <div class="overlay">
                                <svg
                                    class="icon-big"
                                    viewBox="0 0 28 22"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.887 9.772l-1.462.283A3.002 3.002 0 0 0 5 16h2v2H5a5 5 0 0 1-.955-9.91A9 9 0 0 1 21.488 6H22a6 6 0 0 1 0 12h-3v-2h3a4 4 0 0 0 0-8h-1.927l-.47-1.334A7 7 0 0 0 6.035 8.29l-.15 1.482zm7.853-2.445a1 1 0 0 0-1.48 0l-5 5.5 1.48 1.346L12 10.587V22h2V10.587l3.26 3.586 1.48-1.346-5-5.5z"
                                    ></path>
                                </svg>
                                <svg
                                    class="icon-small"
                                    width="16"
                                    height="13"
                                    viewBox="0 0 16 13"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        fill="none"
                                        stroke="currentcolor"
                                        stroke-width="2"
                                        cx="8"
                                        cy="7"
                                        r="2"
                                    ></circle>
                                    <path
                                        d="M3.83 1.106A2 2 0 0 1 5.617 0h4.764a2 2 0 0 1 1.79 1.106l.446.894H14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1.382l.447-.894zM10.38 2H5.618l-.724 1.447A1 1 0 0 1 4 4H2v7h12V4h-2a1 1 0 0 1-.894-.553L10.382 2z"
                                    ></path>
                                </svg>
                            </div> -->
                        </div>
                    </div>

                    <div
                        data-is="user-block-credetials"
                        class="user-block-credetials group-item"
                    >
                        <div class="flexbe-title text-subtitle inline-box">
                            <div class="flexbe-text">Данные аккаунта</div>
                            <div
                                v-if="isChanged"
                                class="save-button"
                                show-cancel="true"
                                show-save="true"
                            >
                                <div class="save-block show">
                                    <div
                                        class="flexbe-button small filled is-secondary"
                                    >
                                        <span
                                            class="flexbe-text"
                                            @click="leaveChanges()"
                                            >Отмена</span
                                        >
                                    </div>
                                    <div
                                        class="flexbe-button small filled is-primary"
                                    >
                                        <span
                                            class="flexbe-text"
                                            @click="saveChanges()"
                                            >Сохранить</span
                                        ><span
                                            class="flexbe-check text-s is-check"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flexbe-white-box shadow flexbe-table overflow"
                        >
                            <div class="tbody">
                                <div class="tr">
                                    <div class="th">
                                        <span class="flexbe-text">
                                            Электронная почта
                                        </span>
                                    </div>
                                    <div class="td">
                                        <div
                                            type="text"
                                            class="flexbe-input flexbe-input--text transparent in-table"
                                        >
                                            <input
                                                class="flexbe-input__text flexbe-input-styled"
                                                type="text"
                                                v-model="user.user_email"
                                                @keyup="
                                                    changeUserStack(
                                                        'user_email',
                                                    )
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="tr">
                                    <div class="th">
                                        <span class="flexbe-text"> ФИО </span>
                                    </div>
                                    <div class="td">
                                        <div
                                            type="text"
                                            class="flexbe-input flexbe-input--text transparent in-table"
                                        >
                                            <input
                                                class="flexbe-input__text flexbe-input-styled"
                                                type="text"
                                                v-model="user.user_fio"
                                                @keyup="
                                                    changeUserStack('user_fio')
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="tr">
                                    <div class="th">
                                        <span class="flexbe-text">
                                            Телефон
                                        </span>
                                    </div>
                                    <div class="td">
                                        <div
                                            type="text"
                                            class="flexbe-input flexbe-input--text transparent in-table"
                                        >
                                            <input
                                                class="flexbe-input__text flexbe-input-styled"
                                                type="text"
                                                v-model="user.user_phone"
                                                @keyup="
                                                    changeUserStack(
                                                        'user_phone',
                                                    )
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="tr">
                                    <div class="th">
                                        <span class="flexbe-text">
                                            Пароль
                                        </span>
                                    </div>
                                    <div class="td">
                                        <div class="inline-box">
                                            <span class="flexbe-text"
                                                >••••••••</span
                                            >
                                            <div
                                                class="flexbe-button small is-light filled to-right"
                                            >
                                                <span class="flexbe-text">
                                                    Изменить пароль
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>

                    <!-- <div data-is="user-block-lang" class="user-block-lang group-item">
          <div class="flexbe-title text-subtitle inline-box">
            <div class="flexbe-text">Язык и страна</div>
            <div data-is="admin-save-text" status="saved" class="admin-save-text flexbe-desc">
              <div class="status-saved"> <span class="saved-text"></span> <span class="saving-text">Сохранение</span> <span class="success-text flexbe-success">Сохранено</span> <span class="error-text flexbe-error">Ошибка</span> </div>
            </div>
          </div>
          <div class="flexbe-table flexbe-white-box shadow overflow">
            <div class="tbody">
              <div class="tr">
                <div class="th"> <span class="flexbe-text"> Часовой пояс </span> </div>
                <div class="td">
                  <div data-is="flexbe-select" initial-value="Europe/Moscow" class="flexbe-select transparent in-table">
                    <div ref="selected" tabindex="0" class="flexbe-selected  "> <span class="flexbe-text">+03:00 Europe/Moscow</span>
                      <svg class="show-more" viewBox="0 0 10 6">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4L9 0L10 1L5 6L0 1L1 0L5 4Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tr">
                <div class="th"> <span class="flexbe-text"> Язык </span> </div>
                <div class="td">
                  <div data-is="flexbe-select" initial-value="ru" class="flexbe-select transparent in-table">
                    <div ref="selected" tabindex="0" class="flexbe-selected  "> <span class="flexbe-text">Русский</span>
                      <svg class="show-more" viewBox="0 0 10 6">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4L9 0L10 1L5 6L0 1L1 0L5 4Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tr">
                <div class="th"> <span class="flexbe-text"> Страна </span> </div>
                <div class="td">
                  <div data-is="flexbe-select" initial-value="RU" class="flexbe-select transparent in-table">
                    <div ref="selected" tabindex="0" class="flexbe-selected  "> <span class="flexbe-text">Россия</span>
                      <svg class="show-more" viewBox="0 0 10 6">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4L9 0L10 1L5 6L0 1L1 0L5 4Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

                    <!-- <div data-is="user-block-subscriptions" class="user-block-subscriptions group-item">
          <div class="flexbe-title text-subtitle inline-box">
            <div class="flexbe-text">Уведомления</div>
            <div data-is="admin-save-text" status="saved" class="admin-save-text flexbe-desc">
              <div class="status-saved"> <span class="saved-text"></span> <span class="saving-text">Сохранение</span> <span class="success-text flexbe-success">Сохранено</span> <span class="error-text flexbe-error">Ошибка</span> </div>
            </div>
          </div>
          <div class="flexbe-table flexbe-white-box shadow overflow">
            <div class="tbody">
              <div class="tr">
                <div class="td">
                  <div class="inline-box">
                    <label data-is="flexbe-input" type="toggle" checked="checked" class="flexbe-input flexbe-input--checkbox large ">
                      <input ref="input" class="flexbe-input__toggle " type="checkbox" checked="checked" value="checked"> <span class="flexbe-toggle "></span>
                      <div class="checkbox-title flexbe-subtitle">Напоминания об оплате</div>
                    </label>
                    <div class="flexbe-desc font-ui to-right">Уведомления о предстоящих и совершенных платежах</div>
                  </div>
                </div>
              </div>
              <div class="tr">
                <div class="td">
                  <div class="inline-box">
                    <label data-is="flexbe-input" type="toggle" checked="checked" class="flexbe-input flexbe-input--checkbox large ">
                      <input ref="input" class="flexbe-input__toggle " type="checkbox" checked="checked" value="checked"> <span class="flexbe-toggle "></span>
                      <div class="checkbox-title flexbe-subtitle">Обновления продукта</div>
                    </label>
                    <div class="flexbe-desc font-ui to-right">Промоакции, новости и обновления редактора Flexbe</div>
                  </div>
                </div>
              </div>
              <div class="tr">
                <div class="td">
                  <div class="inline-box">
                    <label data-is="flexbe-input" type="toggle" checked="checked" class="flexbe-input flexbe-input--checkbox large ">
                      <input ref="input" class="flexbe-input__toggle " type="checkbox" checked="checked" value="checked"> <span class="flexbe-toggle "></span>
                      <div class="checkbox-title flexbe-subtitle">Обучающие материалы</div>
                    </label>
                    <div class="flexbe-desc font-ui to-right">Помощь в создании, редактировании и продвижении вашего сайта</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
                </div>
            </div>
        </section>
    </div>
</template>
