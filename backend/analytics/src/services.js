export class Api{
    static validate_axios_response(response){
        return response.data.status == true;
    }
}
export class Route{
    static to_contructor(id_page){
        window.open(`/constructor/edit?id_page=${id_page}`)
    }
    static to_page(id_page){
        window.open(`/constructor/page?id_page=${id_page}`)
    }
}