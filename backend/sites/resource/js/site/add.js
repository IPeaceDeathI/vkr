function addEventSave() {
    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => ajaxSave(
        $('[name="title_site"]').val(),
        $(el.currentTarget)
    ));
}

function ajaxSave(name, $el) {
    tempDisabledElem($el, true);
    $.ajax({
        url: '/api/site/method/add_site',
        method: 'POST',
        dataType: 'json',
        data: {
            title: name
        },
        success: (response) => {
            redirect(response.data.move_to_site);
            tempDisabledElem($el, false);
        },
        error: (response) => {
            console.log(response.responseJSON);
            confirmNotice(Object.values(response.responseJSON.errors).join('<br>'));
            // confirmNotice('Внештатная ошибка');
        },
    });
}

addEventSave();