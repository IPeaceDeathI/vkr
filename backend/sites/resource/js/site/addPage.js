function ajaxAddPage (name, $el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        // '/api/sites/{int_unsigned}/add_page'
        url: '/api/sites/' + getMetaIdSite() + '/add_page',
        data: {
            title: name,
        },
        method: 'POST',
        success: (r) => {
            redirect( r.data.move_to_constructor );
        },
        error: (r) => {
            console.log(r.responseJSON);
            confirmNotice(Object.values(r.responseJSON.errors).join('<br>'));
        },
    });
}

(function ()
{
    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => ajaxAddPage(
        $('[name="title"]').val(),
        $(el.currentTarget)
    ));
})();
