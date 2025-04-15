<script>
export default {
    props: {
        note: {
            type: Array,
            required: true,
        }
    },
    data(){
        return {
            isExpanded: false,
        }
    },
}
</script>

<template>

<div v-if="note.type=='info'" class="feed-note-wrapper feed-note-wrapper-lead_created feed-note-wrapper_system" 
    data-id="01h8p31f8tvsnz55dx72hyway2"
>
    <div class="js-note  feed-note-fixer">
        <div class="feed-note  feed-note-system-common">
            <div class="feed-note__icon"></div>
            <div class="feed-note__content ">
                <div :class="'feed-note__header expandable '+(isExpanded?'expandabled':'')">
                    <div :class="'feed-note__header-inner '+(isExpanded?'h-feed-note__header-expanded':'')">
                        <div class="feed-note__header-inner-nowrap">
                            <div class="feed-note__date">{{ note.date_create }}</div>
                            <div class="feed-note__responsible">
                                <span class="feed-note__amojo-user" 
                                    :title="note.who"
                                >
                                    {{ note.who }}&nbsp;
                                </span>
                            </div>


                            <div class="feed-note__header-inner-wrap feed-note__status-changed-wrapper feed-note-wrapper-lead_status_changed">
                                <div style="white-space: nowrap">
                                    {{ note.text }}&nbsp;
                                </div>
                                <a v-if="note.link" 
                                    class="js-navigate-link feed-note__gray-link" 
                                    :href="note.link" 
                                    :title="note.link_text"
                                >
                                    {{ note.link_text }}
                                </a>
                                <a v-if="note.new_status" class="feed-note__pipeline-status" 
                                    :style="'background-color: '+note.new_status_color" 
                                    :title="note.new_status"
                                >
                                    {{ note.new_status }}
                                </a>
                                <div style="white-space: nowrap">
                                    {{ note.text_addon }}
                                </div>
                            </div>


                        </div>
                        <div class="feed-note__expand-header"
                            v-if="(note.text+note.text_addon).length>60"
                            @click="isExpanded=!isExpanded"
                        ></div>
                    </div>
                </div>
                <div class="feed-note__body"></div>
            </div>
        </div>
    </div>
</div>

</template>