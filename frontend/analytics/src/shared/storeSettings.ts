import { defineStore } from 'pinia' 
import { ref } from 'vue'
 
export default defineStore('settings', () => { 
  // Объявляем переменную id 
  const id = ref<string>() 
 
  // Метод для установки значения id 
  function setId(document: any) { 
    id.value = JSON.parse(document.querySelector('#data_page').innerHTML)
  } 
 
  // Метод для получения значения id 
  function getId() { 
    return id.value 
  } 
 
  return { 
    id, 
    setId, 
    getId 
  } 
})