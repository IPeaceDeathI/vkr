<template>

<div class="notes-wrapper__filter-and-chat-users js-notes-filter-and-chat-users" style="">
    <div class="notes-wrapper__filter-and-chat-users-inner">
        <div class="notes-wrapper__chat-users-wrapper">
            <div class="subscribers"><a href="https://noks.amocrm.ru/leads/detail/8312923#" class="subscribers-toggle  js-toggle">Участники:&nbsp;<span id="show-chat-list-length" class="js-counter">2</span></a>
                <div class="subscribers-container js-container" style="display: none">
                    <div class="js-view-container"></div>
                    <div class="subscribers-add js-subscriber-add"><a href="https://noks.amocrm.ru/leads/detail/8312923#">Добавить участника</a></div>
                    <div class="subscribers__overlay">
                        <div class="button-input__spinner"><span class="button-input__spinner__icon spinner-icon"></span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="notes-wrapper__bots-wrapper">
            <div class="bots" style="display: none">
                <div class="businessbots businessbots--collapsed js-businessbots-container" style="display: block;">
                    <div class="businessbots-container businessbots-container--collapsed"></div>
                </div><span class="bots__toggle js-toggle">Боты:&nbsp;<span class="bots__counter js-counter">0</span></span>
                <div class="bots__container js-container custom-scroll" style="display: none;">
                    <div class="bots__overlay js-overlay" style="display: none;"><span class="spinner-icon"></span></div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>