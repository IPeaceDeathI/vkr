<template>
    <v-card class="template-catalog__card" @click="$emit('select')">
        <v-btn
            v-if="editable && $store.getters['user/getIsAdmin']"
            class="template-catalog__card__edit-button"
            color="primary"
            icon="mdi-pencil"
            @click.stop="$emit('edit')"
        />
        <div class="template-catalog__card__image">
            <div
                class="template-catalog__card__image-bg"
                :style="{ 'background-image': `url(${preview_src})` }"
            />
            <div class="template-catalog__card__image-blackout" />
            <v-card-title
                class="template-catalog__card__image-title text-white"
                v-text="name"
            />
        </div>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        preview_src: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        editable: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        select: () => true,
        edit: () => true,
    },
});
</script>

<style scoped lang="scss">
.template-catalog__card {
    position: relative;
    top: 0;
    cursor: pointer;
    flex-basis: 400px;
    max-width: 700px;
    flex-grow: 1;
    flex-shrink: 0;
    transition: all 0.2s linear;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
}
.template-catalog__card:hover {
    top: 3px;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.3);
}
.template-catalog__card::v-deep(.v-responsive__sizer) {
    padding-bottom: 56% !important;
}
.template-catalog__card__edit-button {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1000000000000000000;
}
.template-catalog__card__image {
    width: 100%;
    position: relative;
    padding-bottom: 56% !important;
}
.template-catalog__card__image-bg {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center 0%;
    background-color: white;
    transition: background-position-y 300ms linear 0s;
}
.template-catalog__card:hover .template-catalog__card__image-bg {
    background-position: center 100%;
    transition: background-position-y 7000ms linear 0s;
}
.template-catalog__card__image-blackout {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(rgb(0, 0, 0, 0.1), rgb(0, 0, 0, 0.5));
    height: 100%;
    opacity: 1;
    transition: opacity 0.5s;
}
.template-catalog__card:hover .template-catalog__card__image-blackout {
    opacity: 0;
}
.template-catalog__card__image-title {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 1;
    transition: opacity 0.5s;
}
.template-catalog__card:hover .template-catalog__card__image-title {
    opacity: 0;
}
</style>
