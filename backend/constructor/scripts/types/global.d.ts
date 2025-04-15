export {};

declare global{
    interface Main{
        current_text_editor;
        has_change;
        menu_is_hide;
        block_menu;
        id_page;
        id_tpl;
        id_site;
        state;
        blocks_view;
        blocks_model;
        page_model;
        buffer;
        message_indicator;
        menu_left;
        menu_top;
        main_menu;
        menus_is_hide;
        project_entity;
        env_params;
        loading_zero_editor() : void;
        remove_zero_editor() : void;
        get_page_hash_id() : number: 
    };
} 
declare global {
    interface MyWindow {
        main : Main;
    }
}

declare global { type TagMap =  Map<string, Tag> }
declare global {type HTMLVariantMap =  Map<number, HtmlVariant>;}
declare global {type SettingsMap =  Map<string, SettingOption>;}
declare global {type SettingInitialParams = Array<string>}
declare global {interface TagInitialParams{
    parent? : Block,
    tag : string,

}}
declare global {interface HTMLVariantInitialParams{}}
declare global {
    interface BlockInitialParams {
        id : number,
        name : string,
        settings : SettingInitialParams[],
        tags : TagInitialParams[],
        html_variants : HTMLVariantInitialParams[],
    }
}
declare global {
        interface SettingOutputStructure{
      //
    }
}
declare global {
    interface TagOutputStructure{
        //
    }
}
declare global {
    interface SettingInputStructure{
        name : string,
        //
    }
}
declare global {
    interface TagInputStructure{
        id : string,
    }
}
declare global {
    interface BlockOutputStructure{
        id : number,
        name : string,
        settings : SettingOutputStructure[],
        tags : TagOutputStructure[],
        html : string,
        client_id : string;
    };
}
declare global {
    interface BlockInputStructure{
        settings : SettingInputStructure[],
        tags : TagInputStructure[],
        client_id : string;
    }
}
