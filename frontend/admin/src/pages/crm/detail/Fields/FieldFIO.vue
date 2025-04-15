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
    <div class="linked-form__field linked-form__field-fio">
        <div class="linked-form__field__label" title="ФИО">ФИО</div>
        <div class="linked-form__field__value linked-form__field__value-fio">
            <div data-check="fio">
                <!-- <input type="hidden" name="fio[ID]" value="" /> -->

                <div
                    class="control-wrapper control--suggest"
                    spellcheck="false"
                >
                    <ul
                        class="control--suggest--list js-control--suggest--list custom-scroll"
                    ></ul>

                    <input
                        data-enable-filter="y"
                        autocomplete="off"
                        class="text-input control--suggest--input js-control--suggest--input-ajax linked-form__cf js-linked-contact-company"
                        type="text"
                        placeholder="..."
                        :value="lead.lead_name"
                        data-value-id=""
                        disabled
                    />
                </div>
            </div>
        </div>
    </div>
</template>
