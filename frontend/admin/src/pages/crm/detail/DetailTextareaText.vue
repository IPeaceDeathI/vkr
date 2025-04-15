<script>
import axios from "axios";

export default {
    props: {
        setFocus: {
            type: Function,
            required: true,
        },
        setSwitch: {
            type: Function,
            required: true,
        },
    },
    inject: ["settings"],
    data() {
        return {
            note_text_val: "",
        };
    },
    methods: {
        sendNoteText() {
            // var text = this.$el.querySelector('.control-contenteditable__area')
            // var text = this.$refs.textarea.innerText;
            var text = this.note_text_val;
            this.note_text_val = "";
            var inf = {
                info_id_lead: this.$route.params.lead_id,
                info_type: "text",
                info_text: text,
            };
            axios.put(this.settings.SITE_PATH + "/api/crm/note_add", inf);
            // this.notes.push(inf) // TODO: пробросить notes из detail.vue, предварительно перенеся их туда
        },
    },
};
</script>

<template>
    <div
        class="js-note feed-compose_note"
        data-dnd-before="Перенесите сюда файлы, чтобы прикрепить их"
        data-dnd-after="Отпустите клавишу мыши, чтобы прикрепить файлы"
    >
        <div
            class="js-control-contenteditable control-contenteditable feed-compose__message-wrapper custom-scroll"
            @focusin="setFocus(true)"
            @focusout="setSwitch(false)"
        >
            <div
                class="js-control-contenteditable-clearer control-contenteditable__clearer"
            >
                <div class="feed-compose__before">
                    <div class="feed-compose-switcher" @click="setSwitch(true)">
                        <span class="feed-compose-switcher__text">
                            Примечание
                        </span>
                    </div>
                    <span class="feed-compose__before-colon">:</span>
                </div>
            </div>
            <!-- <div class="feed-control__voice-container">
                <div class="feed-control__voice-wave"></div>
                <canvas class="feed-control__voice-wave-canvas hidden" width="0" height="0"></canvas><span class="feed-control__voice-timer"></span>
            </div> -->
            <input
                type="hidden"
                class="js-control-contenteditable-input"
                name="text"
                value=""
            />
            <textarea
                class="control-contenteditable__area feed-compose__message"
                contenteditable="true"
                data-hint="Введите текст"
                ref="textarea"
                v-model="note_text_val"
            ></textarea>
        </div>
        <div class="feed-compose__actions">
            <div class="feed-compose__attaches js-attachments"></div>
            <div class="feed-note__actions">
                <div class="feed-note__actions-inner">
                    <button
                        type="4"
                        class="button-input js-note-submit feed-note__button"
                        tabindex="-1"
                        @click="sendNoteText()"
                    >
                        <span class="button-input-inner">
                            <span class="button-input-inner__text">
                                Добавить
                            </span>
                        </span>
                    </button>
                    <button
                        type="button"
                        class="button-input button-cancel js-note-edit-cancel feed-note__button_cancel"
                        tabindex="-1"
                        style=""
                        @click="setFocus(false)"
                    >
                        <span>Отменить</span>
                    </button>
                </div>
                <!-- <div class="feed-compose__shortcuts-helper-wrapper">
                    <div class="feed-compose__shortcuts-helper-container">
                        <svg class="svg-icon svg-common--keyboard-dims ">
                            <use xlink:href="#common--keyboard"></use>
                        </svg>
                        <div class="feed-compose__shortcuts-helper">
                            <h3 class="feed-compose__shortcuts-helper-title">Комбинации клавиш</h3>
                            <div class="feed-compose__shortcuts-helper-list">
                                <div class="feed-compose__shortcuts-helper-item">
                                    <div class="feed-compose__shortcuts-helper-item-svg-wrapper">
                                        <svg class="svg-icon svg-common--shortcuts-arrow-up-dims feed-compose__shortcuts-helper-item-svg">
                                            <use xlink:href="#common--shortcuts-arrow-up"></use>
                                        </svg>
                                    </div><span class="feed-compose__shortcuts-helper-item-text">– выбор действия</span></div>
                                <div class="feed-compose__shortcuts-helper-item">
                                    <div class="feed-compose__shortcuts-helper-item-svg-wrapper">
                                        <svg class="svg-icon svg-common--shortcuts-bracket-dims feed-compose__shortcuts-helper-item-svg">
                                            <use xlink:href="#common--shortcuts-bracket"></use>
                                        </svg>
                                    </div><span class="feed-compose__shortcuts-helper-item-text">– выбрать значение поля</span></div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <label
                    for="note-edit-attach-filenew"
                    class="feed-note__actions-attach"
                >
                    <svg class="svg-icon svg-notes--feed-attach-dims">
                        <use xlink:href="#notes--feed-attach"></use>
                    </svg>
                </label>
                <input
                    type="file"
                    id="note-edit-attach-filenew"
                    class="js-form-changes-skip hidden"
                    tabindex="-1"
                    name="UserFile"
                    multiple=""
                />
            </div>
        </div>
    </div>
</template>
