<script>
export default {}
</script>

<template>
    <div data-is="page-progress-loader" 
        class="page-progress-loader state-done " 
        loading="done" 
    >
        <div class="page-progress-bar"></div>
    </div>
</template>

<style>
.page-progress-loader {
    opacity: 1;
    z-index: 999;
}
.page-progress-loader .page-progress-bar {
    animation-name: loading;
    animation-duration: .5s;
    animation-timing-function: ease-out;
}

@keyframes loading {
    0% {
        opacity: 1;
        width: 0%;
    }
    50% {
        opacity: 1;
        width: 65%;
    }
    99% {
        opacity: 1;
        width: 100%;
    }
    100% {
        opacity: 0;
    }
}
</style>