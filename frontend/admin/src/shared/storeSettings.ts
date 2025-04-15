import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("settings", () => {
    // Объявляем переменную id
    const id = ref();

    // Метод для установки значения id
    function setId(document: any) {
        if (document.querySelector("#data_page")) {
            const mas = JSON.parse(
                document.querySelector("#data_page").innerHTML,
            );
            id.value = mas;
        } else id.value = {};
    }

    // Метод для получения значения id
    function getId() {
        return id.value;
    }

    return {
        id,
        setId,
        getId,
    };
});
