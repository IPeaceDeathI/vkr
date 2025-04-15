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

<div class="feed-note-wrapper feed-note-wrapper-amojo" data-id="8dfa01f4-b9ca-4824-b861-d109623dd1ed">
    <div class="js-note  feed-note-fixer">
        <div class="feed-note ">
            <div class="feed-note__icon"><span class="feed-note__avatar" title="Никита"><div class="n-avatar " id="8447065" style="background-image: url('/frontend/images/interface/avatars/6.jpeg'), url('/frontend/images/interface/avatars/6.jpeg')"></div></span></div>
            <div class="feed-note__content ">
                <div class="feed-note__header">
                    <div class="feed-note__header-inner ">
                        <div class="feed-note__header-inner-nowrap">
                            <div class="feed-note__date">Сегодня 15:31</div><span class="feed-note__date-text">От:</span><span class="feed-note__amojo-user" title="Никита (Отдел продаж)">Никита&nbsp;</span><span class="feed-note__date-text">кому:</span><span class="feed-note__amojo-user js-amojo-recipient js-amojo-reply " title="всем" data-group-id="" data-id=""><span data-id="" class="control-user_state "></span>всем&nbsp;</span>
                        </div>
                    </div>
                </div>
                <div class="feed-note__body">
                    <div class="feed-note__message_paragraph">chater</div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>