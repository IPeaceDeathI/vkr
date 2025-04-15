<?php

use Noks\Helper\Fonts;

$d = MAIN_URL . '/constructor';
// css
// fonts
Fonts::addConctructorFonts();

addCSS(SITE_URL . 'node_modules/trumbowyg/dist/ui/trumbowyg.css');
addCSS(SITE_URL . 'node_modules/modaal/dist/css/modaal.min.css');
addCSS($d . '/styles/main.css');
addCSS($d . '/styles/constructor.css');
addCSS($d . '/styles/elements.css');
addCSS($d . '/styles/tag_options_editors.css');
addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
addCSS(SITE_URL . 'resource/css/smackbar.css');
addCSS(SITE_URL . 'resource/css/gpickr.min.css');
// js
// временно end
addJS(MAIN_URL . '/script/jquery.js');
addJS(MAIN_URL . '/script/ajax.js');
addJS(SITE_URL . 'resource/js/smackbar.js');
addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
addJS(SITE_URL . 'resource/js/general_functions.js');
addJS(SITE_URL . 'resource/js/main_client.js');
addJS(MAIN_URL . '/script/jquery-ui.js');
addJS(SITE_URL . 'node_modules/modaal/dist/js/modaal.min.js');
addJS(SITE_URL . 'node_modules/trumbowyg/dist/trumbowyg.js');
addJS(SITE_URL . 'node_modules/trumbowyg/dist/plugins/colors/trumbowyg.colors.min.js');
addJS(SITE_URL . 'node_modules/trumbowyg/dist/plugins/fontsize/trumbowyg.fontsize.min.js');
addJS(SITE_URL . 'node_modules/trumbowyg/dist/plugins/fontfamily/trumbowyg.fontfamily.min.js');
addJS('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
addJS($d . '/scripts/enums.js');




// addJS($d . '/scripts/classes/Api.js');
// addJS($d . '/scripts/classes/UndoManager.js');
// addJS($d . '/scripts/classes/MenuDesigner.js');
// addJS($d . '/scripts/classes/Observer.js');
// addJS($d . '/scripts/classes/PopUpItems.js');

// addJS($d . '/scripts/helpers/helpers.js');
// addJS($d . '/scripts/services/services.js');
// addJS($d . '/scripts/services/blocks.js');
// addJS($d . '/scripts/services/MessagesIndicator.js');
// addJS($d . '/scripts/services/EventHanger.js');

// addJS($d . '/scripts/editors/Editors.js');
// addJS($d . '/scripts/editors/EditorsWrappers.js');
// addJS($d . '/scripts/editors/EditorsWrapperViews.js');
// addJS($d . '/scripts/editors/FrameContentEditor.js');
// addJS($d . '/scripts/editors/LiEditors.js');
// addJS($d . '/scripts/editors/BlockEditor.js');
// addJS($d . '/scripts/classes/ProjectEntities.js');
// addJS($d . '/scripts/classes/options.js');
// addJS($d . '/scripts/classes/SettingOption.js');
// addJS($d . '/scripts/classes/TagsOption.js');
// addJS($d . '/scripts/classes/TagsOptionSelect.js');
// addJS($d . '/scripts/classes/TagsOptionsPackage.js');
// addJS($d . '/scripts/classes/TagsOptionColor.js');
// addJS($d . '/scripts/classes/TagsOptionSrc.js');
// addJS($d . '/scripts/classes/TagsOptionNumeric.js');
// addJS($d . '/scripts/classes/TagsOptionPixel.js');
// addJS($d . '/scripts/classes/TagsOptionPercent.js');
// addJS($d . '/scripts/classes/Tag.js');
// addJS($d . '/scripts/classes/TagUl.js');
// addJS($d . '/scripts/classes/TagFrameContent.js');
// addJS($d . '/scripts/classes/HtmlVariant.js');
// addJS($d . '/scripts/classes/Block.js');
// addJS($d . '/scripts/classes/BlocksFactory.js');
// addJS($d . '/scripts/constant.js');
// addJS($d . '/scripts/models/Blocks.js');
// addJS($d . '/scripts/models/Page.js');
// addJS($d . '/scripts/models/Form.js');
// addJS($d . '/scripts/menus/Menu.js');
// addJS($d . '/scripts/menus/ContextMenu.js');
// addJS($d . '/scripts/menus/LeftMenu.js');
// addJS($d . '/scripts/menus/TopMenu.js');
// addJS($d . '/scripts/menus/BlockMenu.js');
// addJS($d . '/scripts/classes/Command.js');

// addJS($d . '/scripts/services/BlocksViewSpace.js');
// addJS($d . '/scripts/services/Buffer.js');

// временно start
// Подключаем все блоки из файлов js c любым названием
$blocks_files = \scandir(VERSION . '/constructor/scripts/blocks/');
if (!\is_array($blocks_files)) $blocks_files = [];
foreach ($blocks_files as $key => $src) {
    if ($key > 5)
        break;
    if (strpos($src, '.js') !== false)
        addJS($d . '/scripts/blocks/' . $src);
}
// временно end
addJS($d . '/dist/main.js');

// addJS($d . '/scripts/main.js');
// addJS('/framlly/framlly.js');

unset($d);
