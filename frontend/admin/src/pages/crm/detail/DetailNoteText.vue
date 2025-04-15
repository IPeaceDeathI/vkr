<script>
import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: { Icon },
    props: {
        note: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            isExpanded: false,
        };
    },
};
</script>

<template>
    <div
        v-if="note.info_type == 'text'"
        class="feed-note-wrapper feed-note-wrapper-note"
        data-id="7567063"
    >
        <div class="js-note feed-note-fixer">
            <div class="feed-note feed-note-with-context">
                <div class="feed-note__icon">
                    <div class="feed-note__icon-inner">
                        <Icon path="pages" name="rename" size="16" />
                    </div>
                </div>
                <div class="feed-note__content">
                    <div class="feed-note__header">
                        <div class="feed-note__header-inner">
                            <div class="feed-note__header-inner-nowrap">
                                <div class="feed-note__date">Вы</div>
                                <div class="feed-note__responsible">
                                    <span
                                        class="feed-note__amojo-user"
                                        title="Никита"
                                        >{{ note.info_json.who }}&nbsp;</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="feed-note__body">
                        <p>{{ note.info_text }}</p>
                    </div>
                    <div class="note-date-time">
                        {{ note.date_time }}
                    </div>
                </div>
                <!-- <div class="feed-note__context-container">
                    <div class="feed-note__context js-note-context">
                        <div
                            class="feed-note__context__item pinner js-note-pinner"
                        >
                            <svg
                                class="svg-icon svg-notes--pin-dims pinner-icon"
                            >
                                <use xlink:href="#notes--pin"></use>
                            </svg>
                            <span>Закрепить</span>
                        </div>
                        <div
                            class="feed-note__context__item delete js-note-delete-btn"
                        >
                            <svg
                                class="svg-icon svg-notes--context-delete-dims"
                            >
                                <use xlink:href="#notes--context-delete"></use>
                            </svg>
                            <span>Удалить</span>
                        </div>
                        <div
                            class="feed-note__context__item edit js-note-edit-mode-btn"
                        >
                            <svg class="svg-icon svg-notes--context-edit-dims">
                                <use xlink:href="#notes--context-edit"></use>
                            </svg>
                            <span>Изменить</span>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style>
.feed-note__content {
    position: relative;
}
.note-date-time {
    position: absolute;
    bottom: -0.8em;
    right: 0em;
    color: #ccc;
    font-size: 0.8em;
}
</style>
