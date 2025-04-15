<template>
    <draggable-inner-card width="360px" v-model="show">
        <redactor-toolbar title="Структура" @close-click="show = false" />
        <v-redactor-container>
            <v-row>
                <v-col class="pt-2">
                    <v-switch
                        label="Включить разделитель"
                        v-model="isDivider"
                    />
                    <color-editor
                        class="mt-2"
                        v-if="isDivider"
                        :auto-color="false"
                        v-model="dividerColor"
                    />
                </v-col>
            </v-row>
        </v-redactor-container>
    </draggable-inner-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import mixin from "./_mixin";
export default defineComponent({
    mixins: [mixin],
});
</script>
<style lang="scss" scoped></style>
