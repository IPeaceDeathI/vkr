<script>
import AdminIcon from "@/components/ui/AdminIcon.vue";

export default {
    components: { AdminIcon },
    props: {
        text: {
            type: String,
            required: true,
        },
        val: {
            type: Number,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        setValue: {
            type: Function,
            required: true,
        },
        sale: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            isActive: false,
            max: 10,
            // sites: '3 сайта',
        };
    },
    methods: {
        getPriceOne(item) {
            var priceTariff = item.for_one * item.count;
            var sale = 1 - this.sale / 100;
            return Math.round((priceTariff * sale) / item.count);
        },
    },
};
</script>

<template>
    <li
        :class="
            'dropdown plan-info-projects flexbe-tag clickable ' +
            (isActive ? 'in-dropdown focus' : '')
        "
        ref="dropdown"
    >
        <span class="flexbe-text">{{ text }}</span>
        <AdminIcon
            class="arrow-down"
            path="addons"
            name="arrow-down"
            size="8"
        />

        <div is="proxy" data-is="dropdown">
            <div class="toggle-helper" @click="isActive = !isActive"></div>

            <div
                v-if="isActive"
                ref="balloon"
                tabindex="0"
                data-layers-events="ignore"
                class="dropdown__balloon balloon dropdown__balloon--default in-bottom"
                is-show="true"
                style="inset: 28px auto auto -67px"
            >
                <div class="arrow" ref="arrow" style="left: 103.203px"></div>
                <div
                    ref="content"
                    class="dropdown__balloon_content flexbe-balloon-content"
                >
                    <div ref="proxy-slot">
                        <div
                            class="flexbe-list borderless hoverable hoverable-background"
                        >
                            <div
                                v-for="(item, index) in items.slice(0, max)"
                                :key="index"
                                :class="
                                    'flexbe-list-item ' +
                                    (index == val ? 'active' : '')
                                "
                                @click="
                                    setValue(index);
                                    isActive = !isActive;
                                "
                            >
                                <span class="flexbe-text feature-name"
                                    >{{ item.count }} {{ item.name }}</span
                                >
                                <span class="flexbe-text feauture-price"
                                    >{{ getPriceOne(item) }} ₽/сайт</span
                                >
                            </div>
                        </div>
                        <div class="flexbe-hr m0"></div>
                        <div
                            v-if="max < items.length"
                            class="plan-info-dropdown-more"
                            @click="max += 15"
                        >
                            <span class="flexbe-desc mr10">Больше</span>
                            <AdminIcon
                                class="arrow-down"
                                path="addons"
                                name="arrow-down"
                                size="10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>
