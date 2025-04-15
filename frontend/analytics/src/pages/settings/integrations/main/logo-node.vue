<template>
    <div class="tree-logo-node">
        <div class="tree-logo-node__logo-container bg-primary">
            <v-img
                cover
                :src="require('@/assets/lp2.svg')"
                class="tree-logo-node__logo-container__node__logo"
            />
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.tree-logo-node {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tree-logo-node__logo-container {
    padding: 7px 25px;
    margin-top: 68px;
    width: 116px;
    border-radius: 9px;
    height: 59px;
    display: flex;
    align-items: center;
}
</style>
