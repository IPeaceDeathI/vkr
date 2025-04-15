<template>
    <svg
        :icon="path"
        :sprite="'/src/assets/images/' + path"
        :class="'flexbe-icon size-' + size"
    >
        <use :href="src + 'src/assets/images/' + path + '.svg#' + name"></use>
    </svg>
</template>

<script>
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

<style>
.flexbe-icon {
    fill: currentColor;
    fill-rule: evenodd;
    clip-rule: evenodd;
    max-width: 100%;
    max-height: 100%;
    --iconSize: 14px;
    flex-shrink: 0;
    image-rendering: optimizequality;
    width: var(--iconSize);
    height: var(--iconSize);
    min-height: var(--iconSize);
}
.quality-top-count svg {
    margin-right: 0.3em;
}
.flexbe-icon.size-auto {
    --iconSize: auto;
}
.flexbe-icon.size-6 {
    --iconSize: 6px;
}
.flexbe-icon.size-8 {
    --iconSize: 8px;
}
.flexbe-icon.size-10 {
    --iconSize: 10px;
}
.flexbe-icon.size-12 {
    --iconSize: 12px;
}
.flexbe-icon.size-14 {
    --iconSize: 14px;
}
.flexbe-icon.size-16 {
    --iconSize: 16px;
}
.flexbe-icon.size-18 {
    --iconSize: 18px;
}
.flexbe-icon.size-20 {
    --iconSize: 20px;
}
.flexbe-icon.size-22 {
    --iconSize: 22px;
}
.flexbe-icon.size-24 {
    --iconSize: 24px;
}
.flexbe-icon.size-28 {
    --iconSize: 28px;
}
.flexbe-icon.size-32 {
    --iconSize: 32px;
}
.flexbe-icon.size-34 {
    --iconSize: 34px;
}
.flexbe-icon.size-36 {
    --iconSize: 36px;
}
.flexbe-icon.size-40 {
    --iconSize: 40px;
}
</style>
