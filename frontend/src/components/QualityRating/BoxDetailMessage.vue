<script>
import AdminIcon from "./../ui/AdminIcon.vue";

export default {
    components: { AdminIcon },
    props: {
        item: {
            type: Object,
            required: true,
        },
        filterTrouble: {
            type: Boolean,
            required: true,
        },
        filterLevel: {
            type: Number,
            required: true,
        },
    },
    methods: {
        isShow(item) {
            var checkLevel = false;
            if (this.filterLevel && item.level == this.filterLevel)
                checkLevel = true;
            else if (!this.filterLevel) checkLevel = true;

            var checkTrouble = false;
            if (
                (!item.trouble && this.filterTrouble) ||
                (item.trouble && !this.filterTrouble)
            )
                checkTrouble = true;

            return checkLevel && checkTrouble;
        },
    },
};
</script>

<template>
    <div
        v-if="isShow(item)"
        :class="
            'quality-message ' + (!item.trouble && item.level > 0 ? 'on' : '')
        "
    >
        <div class="quality-message-info">
            <div class="quality-message-text">{{ item.text }}</div>
            <div class="quality-message-progress">
                <div class="progress-counts-box">
                    <div
                        class="progress-check-done"
                        v-if="!item.trouble && item.level > 0"
                    >
                        <AdminIcon
                            path="settings"
                            name="icon-check"
                            size="14"
                        />
                    </div>
                    <div class="progress-count">
                        {{ item.count }}
                    </div>
                    <div class="progress-recommend">/ {{ item.recommend }}</div>
                    <div class="progress-level" :data-level="item.level">
                        <AdminIcon path="addons" name="dot" size="12" />
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="
                item.rule &&
                (item.rule.solution || item.rule.words || item.rule.example_bad)
            "
            class="quality-rule-box"
        >
            <div class="rule-solution">{{ item.rule.solution }}</div>
            <div class="rule-words" v-if="item.rule.words">
                <div
                    v-for="(w, index) in item.rule.words"
                    :key="index"
                    :class="
                        item.words_searched &&
                        item.words_searched.indexOf(w) != -1
                            ? 'on'
                            : ''
                    "
                >
                    {{ w }}
                </div>
            </div>
            <div
                v-if="item.rule.example_bad && item.rule.example_good"
                class="rule-examples-columns"
            >
                <div class="expample-bad">
                    <span>Нет</span>
                    {{ item.rule.example_bad }}
                </div>
                <div class="example-good">
                    <span>Да</span>
                    <div
                        class="examples-box-column"
                        v-for="(good, index) in item.rule.example_good"
                        :key="index"
                    >
                        {{ good }}
                    </div>
                </div>
            </div>
        </div>
        <div class="quality-message-bar">
            <div class="quality-message-category">
                <AdminIcon path="addons" name="category" size="12" />&nbsp;
                {{ item.category }}
            </div>
            <div v-if="item.min" class="quality-message-min">
                <AdminIcon path="core" name="layers" size="12" />&nbsp; Минимум
                элементов: {{ item.min }}
            </div>
        </div>
        <div class="quality-message-data" v-if="item.data">
            <div
                class="message-data-elem"
                v-for="(dt, index) in item.data"
                :key="index"
            >
                <div class="data-elem-text">
                    {{ dt.text }}
                    <span v-if="dt.text_solution" class="data-elem-text">
                        <AdminIcon
                            path="addons"
                            name="arrow_right"
                            size="8"
                            style="color: #aaa; margin: 0 0.2em"
                        />
                        {{ dt.text_solution }}
                    </span>
                </div>
                <div class="data-elem-check" v-if="dt.check">
                    <AdminIcon path="settings" name="icon-check" size="16" />
                </div>
                <div
                    class="data-elem-box"
                    v-for="(val, name) in dt"
                    :key="name"
                >
                    <div
                        class="data-elem-wrap"
                        v-if="
                            [
                                'text',
                                'check',
                                'example_bad',
                                'example_good',
                                'solution',
                                'name',
                                'text_solution',
                                'word_rule',
                                'word_search',
                            ].indexOf(name) == -1
                        "
                    >
                        <div
                            class="data-elem-name"
                            v-if="['words_in_text'].indexOf(name) == -1"
                        >
                            {{ name }}:
                        </div>
                        <div class="data-elem-val">
                            <div
                                v-if="name.indexOf('color') != -1"
                                class="data-elem-val-column"
                            >
                                <div
                                    class="data-val-color"
                                    :style="'background:' + val"
                                ></div>
                                {{ val }}
                            </div>
                            <div
                                v-else-if="name.indexOf('in_text') != -1"
                                v-for="(v, index) in val"
                                :key="index"
                            >
                                <div v-html="v"></div>
                            </div>
                            <pre v-else>{{ val }}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.quality-message {
    position: relative;
    background-color: #fff;
    border-radius: 0.3em;
    box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.1);
    /* border-left: 2px solid transparent; */
}
.quality-message.on {
    border-left: 2px solid #119a22;
}
.quality-message + .quality-message {
    margin-top: 1em;
}

.progress-check-done {
    color: #119a22;
    width: 22px;
}
.quality-message .progress-level {
    width: 0.8em;
}

.quality-message-info {
    display: flex;
    justify-content: space-between;
}
.progress-counts-box {
    display: flex;
    justify-content: space-between;
    padding: 0.7em 1em;
}
.progress-counts-box > div {
    display: flex;
    align-items: center;
}
.progress-counts-box div + div {
    margin-left: 0.6em;
}
.progress-count {
    font-size: 1em;
    font-weight: bold;
}
.progress-recommend {
    color: #888;
    font-size: 0.8em;
    white-space: nowrap;
}
.progress-level {
    display: flex;
    align-items: center;
}

.quality-rule-box {
    padding: 0.3em 1em;
}
.quality-rule-box > div {
    font-size: 0.8em;
}
.rule-solution {
    margin-bottom: 1em;
    margin-top: -0.8em;
    font-style: italic;
}
.rule-words {
    font-style: italic;
    color: #888;
    margin-bottom: 1em;
    overflow-x: auto;
    max-height: 6.5em;
}
.rule-words div {
    display: inline-block;
    background-color: #eee;
    border-radius: 0.3em;
    padding: 0 0.4em;
    margin: 0.3em 0.3em 0 0;
}
.rule-words div.on {
    background-color: #119a22;
    color: #fff;
}
.rule-examples-columns {
    display: flex;
    color: #888;
    font-style: italic;
}
.quality-rule-box > div span {
    font-weight: bold;
    display: block;
}
.examples-box-column {
    display: flex;
    flex-direction: column;
}

.quality-message-text {
    font-weight: bold;
    padding: 0.7em 1em;
}

.quality-message-bar {
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
}
.quality-message-bar > div {
    font-size: 0.8em;
    padding: 0.4em 0;
    display: flex;
    align-items: center;
}
.quality-message-category,
.quality-message-min {
    color: #888;
}

.quality-message-data {
    background-color: #119a2220;
    color: #888;
    max-height: 300px;
    overflow-x: auto;
}
.message-data-elem {
    position: relative;
    padding: 0.7em 1.3em;
    font-size: 0.8em;
    font-style: italic;
}
.message-data-elem + .message-data-elem {
    border-top: 1px dashed #cdcdcd;
}
.data-elem-text {
    font-weight: bold;
    font-size: 1.1em;
    color: #000;
}
.data-elem-check {
    position: absolute;
    top: 0.85em;
    right: 1em;
    color: #119a22;
}
.data-elem-wrap {
    display: flex;
}
.data-elem-val {
    font-weight: bold;
    margin-left: 0.3em;
    display: flex;
    flex-direction: column;
}
.data-elem-val-column {
    display: flex;
}
.data-val-color {
    width: 14px;
    height: 14px;
    border-radius: 0.2em;
    margin: 0 0.2em;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.data-val-columns {
    display: flex;
}
.data-val-columns + .data-val-columns {
    border-left: 1px solid #eee;
}
</style>
