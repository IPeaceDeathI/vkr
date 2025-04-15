<script>
// import axios from 'axios'
import DetailTextarea from "@/pages/crm/detail/DetailTextarea.vue";
import DetailSearch from "@/pages/crm/detail/DetailSearch.vue";
import DetailNotes from "@/pages/crm/detail/DetailNotes.vue";
import DetailUsers from "@/pages/crm/detail/DetailUsers.vue";
import DetailTasks from "@/pages/crm/detail/DetailTasks.vue";

export default {
    components: {
        DetailTextarea,
        DetailSearch,
        DetailNotes,
        DetailUsers,
        DetailTasks,
    },
    data() {
        return {};
    },
};
</script>

<template>
    <div class="js-card-feed card-holder__feed">
        <div class="notes-wrapper scrolled">
            <div
                class="notes-wrapper__scroller custom-scroll"
                style="max-height: 751px"
            >
                <div class="notes-wrapper__scroller-inner">
                    <!-- <DetailSearch /> -->

                    <!-- <div class="notes-wrapper__load-more">
                    <span class="suggest__load-more js-feed-load-more notes-wrapper__load-more-button hidden">
                        <span class="js-suggest__load-more-link notes-wrapper__load-more-button-label">Загрузить еще</span>
                        <span class="suggest__load-more-loader notes-wrapper__load-more-button-spinner">
                            <span class="spinner-icon"></span>
                        </span>
                    </span>
                </div> -->

                    <DetailNotes />

                    <!-- <div class="notes-wrapper__online feed-note-wrapper feed-note-wrapper_grouped"></div> -->

                    <!-- <DetailUsers /> -->

                    <!-- <DetailTasks /> -->

                    <!-- <div class="notes-wrapper__reaction-notification"></div> -->
                </div>
            </div>

            <DetailTextarea />

            <div
                class="notes-wrapper__compose-bottom"
                data-scroll-calc="y"
                style="right: 21px"
            ></div>
            <div
                class="notes-wrapper__unseen-count js-unseen-count"
                data-text="Новых сообщений"
            ></div>
        </div>
    </div>
</template>
