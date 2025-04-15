<script>
import DetailNoteInfo from "@/pages/crm/detail/DetailNoteInfo.vue";
import DetailNoteText from "@/pages/crm/detail/DetailNoteText.vue";
import DetailNoteChat from "@/pages/crm/detail/DetailNoteChat.vue";

export default {
    components: { DetailNoteInfo, DetailNoteText, DetailNoteChat },
    props: {
        note: {
            type: Array,
            required: true,
        },
        datePoints: {
            type: Array,
            required: true,
        },
        notes: {
            type: Array,
            required: true,
        },
    },
    created() {
        // if (!this.datePoints[this.note.date_point]) this.note.isPoint = true;
        // this.datePoints[this.note.date_point] = 1;
        // console.log(this.datePoints);
    },
};
</script>

<template>
    <div
        v-if="note.isPoint"
        class="note-time-label__wrapper js-notes-timeline-point"
        data-point="Август, 2023"
    >
        <div class="note-time-label">{{ note.date_point }}</div>
    </div>

    <!-- <DetailNoteInfo v-if="note.info_type=='info'"
        :note="note"
    /> -->

    <DetailNoteText v-if="note.info_type == 'text'" :note="note" />

    <!-- <DetailNoteChat 
        v-for="(note, index) in notes" :key="index"
        :note="note"
    /> -->
</template>
