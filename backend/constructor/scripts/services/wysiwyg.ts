// TODO ENTER НЕ РАБОТАЕТ В ТЕГАХ <H1,H2...>
// TODO РЕДАКТОР НЕ ЗАКРЫВАЕТСЯ, ЕСЛИ ЭЛЕМЕНТ ПОТЕРЯЛ ФОКУС ПРИ КЛИКЕ НА МЕНЮ>


import tinymce from "tinymce/tinymce"
import 'tinymce/themes/silver/theme';
import 'tinymce/models/dom/model';
import 'tinymce/icons/default/icons';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.inline.min.css';
import type {Editor} from 'tinymce/tinymce.d.ts';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/lists';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';



export default class WYSIWYGEditor {
    private static _instance : WYSIWYGEditor;
    private editor : Editor | null;
    currentOnDestroy : ()=>void;
    constructor() {
        if (WYSIWYGEditor._instance) {
            return WYSIWYGEditor._instance;
        }
        this.editor = null;
        WYSIWYGEditor._instance = this;
    }
    public init({ jqObject, onChange=()=>{}, onDestroy=()=>{}, onInput=()=>{}}: { jqObject: JQuery; onChange: (e? : Object)=>void; onDestroy: (e? : Object)=>void , onInput:(e?:Object)=>void}) : void{
        const instanse = this;        
        this.prepareToInit(jqObject, onDestroy)
        tinymce.init({
            target:jqObject[0],
            // selector: `[${this.ATTR_NAME}]`,
            plugins: 'lists image link autolink code visualblocks ',
            skin: "oxide-dark",
            contextmenu: false,
            content_css: "dark",
            toolbar_location: 'auto', // top work bad
            inline: true,
            menubar: 'file edit insert view format table tools help',
            toolbar: 'undo redo formatting align nokslists forecolor backcolor',
            toolbar_mode: 'floating',
            // width : 370,
            toolbar_groups: {
              formatting: {
                icon: 'bold',
                tooltip: 'Формат',
                items: 'bold italic underline | superscript subscript'
              },
              align : {
                icon: 'align-justify',
                tooltip: 'Расположение',
                items: ' alignleft aligncenter alignright alignjustify '
              },
              nokslists : {
                icon: 'ordered-list',
                tooltip: 'Списки',
                items: 'bullist numlist outdent indent'
              }
            },
            auto_focus:'editable',
            setup : (editor)=>{
                editor.on('init', function (e) {
                    instanse.editor = editor;
                    editor.focus();
                  }),
                editor.on('Change', (e)=>{
                    onChange( e.target.getContent());
                })
                editor.on('input', (e)=>{
                    onInput(e.target.innerHTML);
                })
                editor.on('focusout', (e)=>{
                    const text_editor = document.querySelector('.tox-tinymce')
                    if(text_editor && text_editor !== (e.relatedTarget) && !text_editor.contains(e.relatedTarget)){
                        if(e.relatedTarget === null){
                            onDestroy(e.target.innerHTML);
                            editor.destroy(false);
                            e.stopImmediatePropagation();
                            this.clearParams()
                        }
                    }
                    tinymce.execCommand('mceFocus',false,editor.id);
                })
                editor.on('contextmenu', (e)=>{
                    e.stopPropagation();
                })
                editor.on('blur', (e)=>{
                    onDestroy( e.target.getContent());
                    editor.destroy(false);
                    e.stopImmediatePropagation();
                    this.clearParams()
                })
            }
          });
    }
    private prepareToInit(newJqObject : JQuery, onDestroy:()=>void):void{
        //clear old
        if(this.currentOnDestroy)this.currentOnDestroy()
        if(this.editor) this.closeIfAlreadyExist()

        //inti new
        this.currentOnDestroy = onDestroy;
    }
    private closeIfAlreadyExist(){
        this.editor?.destroy(false);
        this.clearParams()
    }
    private clearParams() : void{
        this.currentOnDestroy = ()=>{};
        this.editor = null;
    }
}