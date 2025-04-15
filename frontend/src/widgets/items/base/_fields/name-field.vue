<template>
    <div class="form-field-text">
        <input
            type="text"
            :id="id"
            name="name"
            class="form-field-text__input"
            :required="commonFieldParams.required"
        />
        <desc-c :desc="commonFieldParams.description" />
        <title-c
            :fieldId="id"
            :title="commonFieldParams.title"
            :required="commonFieldParams.required"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import mixin from "./mixin";
export default defineComponent({
    mixins: [mixin],
});
</script>
