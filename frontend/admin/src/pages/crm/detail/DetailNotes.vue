<script>
import axios from "axios";

import DetailNotesRouter from "@/pages/crm/detail/DetailNotesRouter.vue";

export default {
    components: { DetailNotesRouter },
    inject: ["settings"],
    data() {
        return {
            notes: [],
            // notes: [
            // {
            //     id: 1,
            //     type: "info",
            //     type_second: "create_lead",
            //     text: "Сделка создана:",
            //     link: "/admin/crm/detail/1",
            //     link_text: "Заявка #1 | Noks.ru",
            //     text_addon:
            //         "uvjksafv jkshdgasd gasg aksdgaksdgkasjd glasjdhg kasdg asgk  kssakgl shdg kkjbgklbk",
            //     author: "Admin",
            //     date_create: "25.08.2023 07:15",
            //     date_point: "25.08.2023",
            // },
            // {
            //     id: 2,
            //     type: "info",
            //     type_second: "change_field",
            //     text: "Для поля «Телефон»",
            //     text_addon: "установлено значение «75839779044»",
            //     author: "Admin",
            //     date_create: "25.08.2023 08:26",
            //     date_point: "25.08.2023",
            // },
            // {
            //     id: 3,
            //     type: "info",
            //     type_second: "change_field",
            //     who: "Робот",
            //     text: "Новый этап:",
            //     author: "Admin",
            //     date_create: "11.02.2024 16:36",
            //     date_point: "Вчера",
            //     new_status: "Принимают решение",
            //     new_status_color: "#ffcc66",
            //     text_addon: "из Первичный контакт",
            // },
            // {
            //     id: 4,
            //     type: "text",
            //     who: "Виктор",
            //     text: 'Клиент оставил записку на ресепшене: "Вы большие молодцы! Спасибо!", а значит он доволен обработкой заказа)',
            //     // author: 'Admin',
            //     date_create: "14.02.2024 18:13",
            //     date_point: "Сегодня",
            // },
            // ],
            datePoints: {}, // TODO: сделвть реактивным, после подгрузки /api/crm/notes
            intervalUpdateNotesId: false,
        };
    },
    methods: {
        updateNotes() {
            axios
                .put(this.settings.SITE_PATH + "/api/crm/notes", {
                    info_id_lead: this.$route.params.lead_id,
                })
                .then((response) => (this.notes = response.data.data.notes));
        },
        intervalUpdateNotes() {
            this.updateNotes();
            this.intervalUpdateNotesId = setInterval(() => {
                this.updateNotes();
            }, 5 * 1000);
        },
    },
    mounted() {
        this.intervalUpdateNotes();
    },
    computed: {
        pointedNotes() {
            var last_point = "";
            return this.notes.filter((item) => {
                if (last_point != item.date_point) {
                    last_point = item.date_point;
                    item.isPoint = true;
                }
                return item;
            });
        },
    },
};
</script>

<template>
    <div class="notes-wrapper__notes js-notes">
        <DetailNotesRouter
            v-for="(note, index) in pointedNotes"
            :key="index"
            :note="note"
            :datePoints="datePoints"
        />
    </div>
</template>
