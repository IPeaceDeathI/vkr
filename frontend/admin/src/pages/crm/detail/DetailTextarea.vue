<script>
// import DetailTextareaTaskPanel from "@/pages/crm/detail/DetailTextareaTaskPanel.vue";

import DetailTextareaText from "@/pages/crm/detail/DetailTextareaText.vue";
import DetailTextareaTask from "@/pages/crm/detail/DetailTextareaTask.vue";

export default {
    components: {
        // DetailTextareaTaskPanel,
        DetailTextareaText,
        DetailTextareaTask,
    },
    data() {
        return {
            focusTextarea: false,
            isSwitch: false,
            valType: "text",
        };
    },
    computed: {
        // getFocus(){
        //     console.log('getFocus:',this.focusTextarea);
        //     return this.focusTextarea?'feed-compose_task-future':'minimized'
        // },
    },
    methods: {
        setFocus(bool) {
            this.focusTextarea = bool;
            this.valType = "text";
        },
        setSwitch(bool) {
            this.isSwitch = bool;
        },
        getType(type) {
            this.setSwitch(false);
            this.setFocus(true);
            this.valType = type;
        },
        // button-input-disabled
    },
};
</script>

<template>
    <div
        :class="
            'feed-compose ' +
            (focusTextarea ? 'feed-compose_task-future' : 'minimized')
        "
        data-scroll-calc="y"
        style="right: 21px"
    >
        <!-- <DetailTextareaTaskPanel /> -->

        <!-- <div class="tips js-tip feed-compose-switcher__tip tips_has-selected tips_selected-right tips_slide-up tips_mouse tips-at-top"
        v-show="isSwitch"
    >
        <div class="tips__inner custom-scroll js-tip-items">
            <div :class="'tips-item js-tips-item js-switcher-note '+(valType=='text'?'tips-item_selected':'')" data-id="note" data-forced="" data-value="" data-suggestion-type=""
                @click="getType('text')"
            >
                Примечание
            </div>
            <div :class="'tips-item js-tips-item js-switcher-task '+(valType=='task'?'tips-item_selected':'')" data-id="task" data-forced="" data-value="" data-suggestion-type=""
                @click="getType('task')"
            >
                Задача
            </div>
        </div>
    </div> -->

        <!-- <input type="hidden" class="js-changes-skip" name="feed-compose-switcher" value="note"> -->

        <div :class="'feed-compose__inner ' + 'editing'">
            <DetailTextareaText
                v-if="valType == 'text'"
                :setSwitch="setSwitch"
                :setFocus="setFocus"
            />
            <DetailTextareaTask
                v-if="valType == 'task'"
                :setSwitch="setSwitch"
                :setFocus="setFocus"
            />
        </div>
    </div>
</template>

<style scoped>
.tips {
    display: block;
}
</style>
