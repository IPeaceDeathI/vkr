<script>
export default {
    props: {
        lead: {
            type: Array,
            required: true,
        },
    },
};
</script>

<template>
    <div class="linked-form__field linked-form__field_budget" data-id="budget">
        <div class="linked-form__field__label" title="Бюджет">
            <label for="" class="card-cf-name-label__label">
                <span>Бюджет</span>
            </label>
        </div>
        <div
            class="linked-form__field__value card-budget linked-form__field-text"
        >
            <div
                class="control-price card-budget__input control-price_autosized"
            >
                <input
                    type="text"
                    class="js-control-pretty-price js-form-changes-skip text-input"
                    id="lead_card_budget"
                    placeholder="0"
                    maxlength="17"
                    data-autosized="y"
                    data-allow-zero="y"
                    autocomplete="off"
                    style="width: 42px"
                    :value="lead.lead_budget"
                    disabled
                />
                <!-- <tester>3 000</tester> -->
                <span class="currency-symbol">₽</span>
                <!-- <input type="hidden" 
                        name="lead[PRICE]" class="js-control-raw-price text-input" 
                        value="3000" placeholder="" autocomplete="off"> -->
            </div>
        </div>
    </div>
</template>
