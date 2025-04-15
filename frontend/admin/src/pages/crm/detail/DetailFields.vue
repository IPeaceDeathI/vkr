<script>
import FieldFIO from "./Fields/FieldFIO.vue";
import FieldPhone from "./Fields/FieldPhone.vue";
import FieldBudget from "./Fields/FieldBudget.vue";

export default {
    components: {
        FieldFIO,
        FieldPhone,
        FieldBudget,
    },
    props: {
        lead: {
            type: Array,
            required: true,
        },
    },
};
</script>

<template>
    <div class="card-entity-form__main-fields js-card-main-fields">
        <!-- <div class="linked-form__field linked-form__field_reassign">
            <div class="linked-form__field__label" title="Отв-ный">
                <label for="" class="card-cf-name-label__label"><span>Отв-ный</span></label>
            </div>
            <div class="linked-form__field__value">
                <div class="multisuggest users_select-select_one card-fields__fields-block__users-select js-multisuggest js-can-add " data-multisuggest-id="1088" id="lead_main_user-users_select_holder" data-new-item-msg="">
                    <ul class="multisuggest__list js-multisuggest-list">
                        <li class="multisuggest__list-item js-multisuggest-item" data-title="Никита" data-group="" data-id="8447065">
                            <input type="text" class="js-focuser" readonly="readonly" 
                                onkeydown="([13,8].indexOf(event.which)+1)&amp;&amp;this.parentNode.click()" 
                                onclick="return false"
                            >
                            <span>Никита</span>
                            <input type="checkbox" checked="checked" class="hidden" 
                                name="lead[MAIN_USER]" id="cbx_drop_8447065" value="8447065">
                        </li>
                    </ul>
                </div>
            </div>
        </div> -->

        <FieldFIO :lead="lead" />
        <FieldPhone :lead="lead" />
        <FieldBudget :lead="lead" />
    </div>
</template>
