function ajaxClonePage(data, $el) {
    tempDisabledElem($el, true);
    $.ajax({
        dataType: "json",
        url:
            "/api/site/" +
            getMetaIdSite() +
            "/page/" +
            getMetaIdPage() +
            "/method/clone_page",
        data: {
            title: data.title,
        },
        method: "POST",
        success: () => {
            showConfirm("Готово", true);
            tempDisabledElem($el, false);
        },
        error: (response) => {
            showConfirm(
                Object.values(response.responseJSON.errors).join("<br>")
            );
        },
    });
}

function showConfirm(msg, status = false) {
    $.confirm({
        backgroundDismiss: true,
        boxWidth: "25%",
        useBootstrap: false,
        title: "",
        content: msg,
        buttons: {
            ok: {
                btnClass: "btn-noks-yes",
            },
        },
        onClose: () => {
            if (!status) return;
            redirect(window.location.origin + "/admin/pages");
        },
    });
}

$(document).off("click", "[data-save]");
$(document).on("click", "[data-save]", (el) => {
    ajaxClonePage(
        {
            title: $('[name="title"]').val(),
        },
        $(el.currentTarget)
    );
});
