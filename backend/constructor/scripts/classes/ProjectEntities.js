class ProjectEntity {
    constructor() {}
    get_back_btn_title() {
        return "";
    }
}
export class Template extends ProjectEntity {
    constructor() {
        super();
    }
    get_back_btn_title() {
        return "К выбору шаблона";
    }
    get_back_btn_ref() {
        return `/templates`;
    }
    get_url_for_save() {
        return [
            `/api/templates/method?method=updateTemplate&id_tpl=${window.main.id_tpl}`,
            "PUT",
        ];
    }
}
export class Page extends ProjectEntity {
    constructor() {
        super();
    }
    get_back_btn_title() {
        return "К выбору страницы";
    }
    get_back_btn_ref() {
        return `/sites/${window.main.id_site}`;
    }
    get_url_for_save() {
        return [
            `/constructor/api/pages?method=savePage&id_page=${window.main.id_page}`,
            "POST",
        ];
    }
}
