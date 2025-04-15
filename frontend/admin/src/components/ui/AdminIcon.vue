<template>
    <svg
        :icon="path"
        :sprite="'/src/assets/images/' + path"
        :class="'flexbe-icon size-' + size"
    >
        <use :href="src + 'src/assets/images/' + path + '.svg#' + name"></use>
    </svg>
</template>

<script scoped>
export default {
    props: {
        path: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        size: {
            type: String,
        },
    },
    data() {
        return {
            src:
                process.env.NODE_ENV === "production"
                    ? "/constructor2/admin/"
                    : "/",
        };
    },
};
</script>
