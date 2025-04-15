import {
    SelectorEditor,
    NonEditableSelectorEditor,
    TextEditor,
    NonEditableTextEditor,
    NumericEditor,
    NonEditableNumericEditor,
    NonEditableNumericEditorWithUnit,
    NumericEditorWithUnit,
    StringEditor,
    NonEditableStringEditor,
    GradientEditor,
    NonEditableGradientEditor,
    ColorEditor,
    NoneditableColorEditor,
    ImageEditor,
    NoneditableImageEditor,
    HrefEditor,
} from "@/editors/Editors";
import { ItcTabs } from "@/classes/Tabs";
//Класс для создания врапперов, от него наследуются "внутренние" врапперы ('отрисовываются внутри главного вью настройки TagOptions в меню')
class EditorsWrapper {
    constructor(tag_options) {
        this.has_editable = false;
        this.tag_options = tag_options;
        this.editors = [];
    }
    delete() {
        //Be careful, when will add new methods in the loop. So in array => this.editors there are instances of EditorsWrapperViews
        this.editors.forEach((editor) => {
            try {
                editor.delete();
            } catch {
                console.log(editor);
            }
        });
    }
    get_wrapper_view() {
        this.has_editable = false;
        var _wrapper = this.get_wrapper_view_template();
        if (this.has_editable) return { has_editable: true, wrapper: _wrapper };
        else return { has_editable: false, wrapper: _wrapper };
    }
    get_wrapper_view_template() {
        throw new Error("method  get_wrapper_view must be redefined");
    }
    /**
     *
     * @param {jquery object} wrapper - В него будет обернут editor
     * @param {EnumOption} option_id -id опции, Должна быть указана в функциях : get_editor_by_optnion_id, get_noneditable_by_optnion_id
     * @returns
     */
    _get_editor(wrapper, option_id) {
        var option = this.tag_options.get(option_id);
        if (option && option.editable()) {
            option.has_in_new_menu = true;
            this.has_editable = true;
            var object = this.#get_editor_by_optnion_id(option_id, option);
            var editor = object.get_editor_view();
        } else if (option == null) {
            //TODO бессмысленное создание noneditable, если option null
            var object = this.#get_noneditable_by_optnion_id(option_id);
            var editor = object.get_view();
            wrapper.addClass("noneditable");
        } else {
            var object = this.#get_noneditable_by_optnion_id(option_id);
            var editor = object.get_view();
            wrapper.addClass("noneditable");
        }
        this.editors.push(object);
        wrapper.append(this.#get_icon(option_id, option));
        wrapper.append(editor);
        return wrapper;
    }
    #get_editor_by_optnion_id(option_id, option) {
        switch (option_id) {
            case EnumOption.PADDING_TOP:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.PADDING_RIGHT:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.PADDING_LEFT:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.PADDING_BOTTOM:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.MARGIN_TOP:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.MARGIN_RIGHT:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.MARGIN_LEFT:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.MARGIN_BOTTOM:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.LEFT:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.TOP:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.WIDTH:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.HEIGHT:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.WIDTH_MAX:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.HEIGHT_MAX:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.WIDTH_MIN:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.HEIGHT_MIN:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.BACKGROUND:
                return new BackgroundEditor({ tag_option: option });
            case EnumOption.BACKGROUND_IMAGE:
                return new ImageEditor({ tag_option: option });
            case EnumOption.BACKGROUND_COLOR:
                return new ColorEditor({ tag_option: option });
            case EnumOption.BACKGROUND_GRADIENT:
                return new GradientEditor({ tag_option: option });
            case EnumOption.BACKGROUND_POSITION_X:
                return new NumericEditor({ tag_option: option });
            case EnumOption.BACKGROUND_POSITION_Y:
                return new NumericEditor({ tag_option: option });
            case EnumOption.BACKGROUND_SIZE:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.BACKGROUND_REPEAT:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.OBJECT_POSITION:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.OBJECT_FIT:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.FONT_FAMILY:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.TEXT_DECORATION:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.FONT_SIZE:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.FONT_WEIGHT:
                return new NumericEditor({ tag_option: option });
            case EnumOption.TEXT_ALIGN:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.COLOR:
                return new ColorEditor({ tag_option: option });
            case EnumOption.FLOAT:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.Z_INDEX:
                return new NumericEditor({ tag_option: option });
            case EnumOption.TEXT_TRANSFORM:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.LINE_HEIGHT:
                return new NumericEditor({ tag_option: option });
            case EnumOption.DISPLAY:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.IMAGE:
                return new ImageEditor({ tag_option: option });
            case EnumOption.HREF:
                return new HrefEditor({ tag_option: option });
            case EnumOption.ATTR:
                return new TextEditor({ tag_option: option });
            case EnumOption.CURSOR:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.POINTER_EVENTS:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.OVERFLOW:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.OVERFLOW_X:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.OVERFLOW_Y:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.OPACITY:
                return new NumericEditor({ tag_option: option });
            case EnumOption.ALIGN_CONTENT:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.BORDER_COLOR:
                return new ColorEditor({ tag_option: option });
            case EnumOption.BORDER_WIDTH:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.BORDER_STYLE:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.BORDER_BOTTOM_LEFT_RADIUS:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.BORDER_BOTTOM_RIGHT_RADIUS:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.BORDER_TOP_LEFT_RADIUS:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.BORDER_TOP_RIGHT_RADIUS:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.FLEX_DIRECTION:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.ALIGN_ITEMS:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.JUSTIFY_CONTENT:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.FLEX_WRAP:
                return new SelectorEditor({ tag_option: option });
            case EnumOption.FLEX_BASIS:
                return new NumericEditorWithUnit({ tag_option: option });
            case EnumOption.POSITION:
                return new SelectorEditor({ tag_option: option });
            default:
                console.log(`Неизвестный id : ${option_id}`);
        }
    }
    #get_noneditable_by_optnion_id(option_id) {
        switch (option_id) {
            case EnumOption.PADDING_TOP:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.PADDING_RIGHT:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.PADDING_LEFT:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.PADDING_BOTTOM:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.MARGIN_TOP:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.MARGIN_RIGHT:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.MARGIN_LEFT:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.MARGIN_BOTTOM:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.LEFT:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.TOP:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.WIDTH:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.HEIGHT:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.WIDTH_MAX:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.HEIGHT_MAX:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.WIDTH_MIN:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.HEIGHT_MIN:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.BACKGROUND_IMAGE:
                return new NoneditableImageEditor();
            case EnumOption.BACKGROUND_COLOR:
                return new NoneditableColorEditor();
            case EnumOption.BACKGROUND_GRADIENT:
                return new NonEditableGradientEditor();
            case EnumOption.BACKGROUND_POSITION_X:
                return new NonEditableNumericEditor();
            case EnumOption.BACKGROUND_POSITION_Y:
                return new NonEditableNumericEditor();
            case EnumOption.BACKGROUND_SIZE:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.BACKGROUND_REPEAT:
                return new NonEditableSelectorEditor();
            case EnumOption.OBJECT_POSITION:
                return new NonEditableSelectorEditor();
            case EnumOption.OBJECT_FIT:
                return new NonEditableSelectorEditor();
            case EnumOption.FONT_FAMILY:
                return new NonEditableSelectorEditor();
            case EnumOption.TEXT_DECORATION:
                return new NonEditableSelectorEditor();
            case EnumOption.FONT_SIZE:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.FONT_WEIGHT:
                return new NonEditableNumericEditor();
            case EnumOption.TEXT_ALIGN:
                return new NonEditableSelectorEditor();
            case EnumOption.COLOR:
                return new NoneditableColorEditor();
            case EnumOption.FLOAT:
                return new NonEditableSelectorEditor();
            case EnumOption.Z_INDEX:
                return new NonEditableNumericEditor();
            case EnumOption.TEXT_TRANSFORM:
                return new NonEditableSelectorEditor();
            case EnumOption.LINE_HEIGHT:
                return new NonEditableNumericEditor();
            case EnumOption.DISPLAY:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.IMAGE:
                return new NoneditableImageEditor();
            case EnumOption.HREF:
                return new NonEditableTextEditor();
            case EnumOption.ATTR:
                return new NonEditableTextEditor();
            case EnumOption.CURSOR:
                return new NonEditableSelectorEditor();
            case EnumOption.POINTER_EVENTS:
                return new NonEditableSelectorEditor();
            case EnumOption.OVERFLOW:
                return new NonEditableSelectorEditor();
            case EnumOption.OVERFLOW_Y:
                return new NonEditableSelectorEditor();
            case EnumOption.OVERFLOW_X:
                return new NonEditableSelectorEditor();
            case EnumOption.OPACITY:
                return new NonEditableNumericEditor();
            case EnumOption.BORDER_COLOR:
                return new NoneditableColorEditor();
            case EnumOption.ALIGN_CONTENT:
                return new NonEditableSelectorEditor();
            case EnumOption.BORDER_WIDTH:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.BORDER_STYLE:
                return new NonEditableSelectorEditor();
            case EnumOption.BORDER_BOTTOM_LEFT_RADIUS:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.BORDER_BOTTOM_RIGHT_RADIUS:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.BORDER_TOP_LEFT_RADIUS:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.BORDER_TOP_RIGHT_RADIUS:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.FLEX_DIRECTION:
                return new NonEditableSelectorEditor();
            case EnumOption.ALIGN_ITEMS:
                return new NonEditableSelectorEditor();
            case EnumOption.JUSTIFY_CONTENT:
                return new NonEditableSelectorEditor();
            case EnumOption.FLEX_WRAP:
                return new NonEditableSelectorEditor();
            case EnumOption.FLEX_BASIS:
                return new NonEditableNumericEditorWithUnit();
            case EnumOption.POSITION:
                return new NonEditableSelectorEditor();
            default:
                console.log(`Неизвестный id : ${option_id}`);
        }
    }

    #get_icon(option_id, option) {
        var title = "";
        if (option != null) {
            title = option.title;
        }
        var icon_wrapper = $(
            `<div data-tooltip="${title}" class="editors-icon-wrapper"></div>`
        );
        switch (option_id) {
            case EnumOption.FONT_FAMILY:
                icon_wrapper.append(
                    $(
                        `<svg  viewBox="0 0 364 517" fill="currentColor"">
                    <path d="M115.25 286.875L57.875 439.875H77L98.038 382.5H153.5L174.537 439.875H193.662L136.287 286.875H115.25ZM103.775 363.375L124.812 306L145.85 363.375H103.775Z" fill="white"/>
                    <path d="M249.125 0H239.563H38.75C17.712 0 0.5 17.212 0.5 38.25V478.125C0.5 499.162 17.712 516.375 38.75 516.375H325.625C346.662 516.375 363.875 499.162 363.875 478.125V143.438V133.876L249.125 0ZM249.125 28.688L339.013 133.876H268.25C258.688 133.876 249.125 124.314 249.125 114.751V28.688ZM344.75 478.125C344.75 487.687 337.1 497.25 325.625 497.25H38.75C29.188 497.25 19.625 489.6 19.625 478.125V38.25C19.625 28.688 27.275 19.125 38.75 19.125H230V114.75C230 135.788 247.213 153 268.25 153H344.75V478.125Z" fill="white"/>
                    <path d="M210.875 392.062C210.875 418.837 231.912 439.874 258.687 439.874C270.162 439.874 279.724 436.049 287.375 430.312V439.874H306.5V344.25H287.375V353.812C279.725 348.075 270.162 344.25 258.687 344.25C231.912 344.25 210.875 365.287 210.875 392.062ZM287.375 392.062C287.375 407.362 273.987 420.75 258.687 420.75C243.387 420.75 230 407.362 230 392.062C230 376.762 243.388 363.374 258.688 363.374C273.988 363.374 287.375 376.763 287.375 392.062Z" fill="white"/>
                </svg>`
                    )
                );
                break;
            case EnumOption.PADDING_BOTTOM:
                icon_wrapper.addClass(
                    "editors-wrapper-numeric-icon-padding-bottom"
                );
                break;
            case EnumOption.PADDING_TOP:
                icon_wrapper.addClass(
                    "editors-wrapper-numeric-icon-padding-top"
                );
                break;
            case EnumOption.PADDING_LEFT:
                icon_wrapper.addClass(
                    "editors-wrapper-numeric-icon-padding-left"
                );
                break;
            case EnumOption.PADDING_RIGHT:
                icon_wrapper.addClass(
                    "editors-wrapper-numeric-icon-padding-right"
                );
                break;
            case EnumOption.MARGIN_BOTTOM:
                icon_wrapper.addClass(
                    "editors-wrapper-numeric-icon-margin-bottom"
                );
                break;
            case EnumOption.MARGIN_TOP:
                icon_wrapper.addClass(
                    "editors-wrapper-numeric-icon-margin-top"
                );
                break;
            case EnumOption.MARGIN_LEFT:
                icon_wrapper.addClass(
                    "editors-wrapper-numeric-icon-margin-left"
                );
                break;
            case EnumOption.MARGIN_RIGHT:
                icon_wrapper.addClass(
                    "editors-wrapper-numeric-icon-margin-right"
                );
                break;
            case EnumOption.TOP:
                icon_wrapper.text("Y");
                break;
            case EnumOption.LEFT:
                icon_wrapper.text("X");
                break;
            case EnumOption.WIDTH:
                icon_wrapper.text("W");
                break;
            case EnumOption.HEIGHT:
                icon_wrapper.text("H");
                break;
            case EnumOption.WIDTH_MAX:
                icon_wrapper.text("W>");
                break;
            case EnumOption.WIDTH_MIN:
                icon_wrapper.text("W<");
                break;
            case EnumOption.HEIGHT_MAX:
                icon_wrapper.text("H>");
                break;
            case EnumOption.HEIGHT_MIN:
                icon_wrapper.text("H<");
                break;
            case EnumOption.FONT_SIZE:
                icon_wrapper.append(`<svg viewBox="0 0 574 422" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                </svg>
                `);
                break;
            case EnumOption.FONT_WEIGHT:
                // icon_wrapper.append(`<><>
                // `)
                icon_wrapper.text("b");
                break;
            case EnumOption.TEXT_ALIGN:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("a");
                break;
            case EnumOption.COLOR:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("c");
                break;
            case EnumOption.FLOAT:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("f");
                break;
            case EnumOption.Z_INDEX:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("z");
                break;
            case EnumOption.TEXT_TRANSFORM:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("t");
                break;
            case EnumOption.LINE_HEIGHT:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("h");
                break;
            case EnumOption.DISPLAY:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("d");
                break;
            case EnumOption.IMAGE:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("i");
                break;
            case EnumOption.HREF:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("l");

                break;
            case EnumOption.ATTR:
                // icon_wrapper.append(`<svg viewBox="0 0 574 422" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                // <path d="M217.667 7.12897C216.035 2.64097 212.975 0.396973 208.487 0.396973H129.54C125.052 0.396973 121.992 2.64097 120.36 7.12897L0.408 401.257C-0.408 404.929 0 407.578 1.632 409.21C3.264 411.658 5.916 412.885 9.588 412.885H80.58C85.476 412.885 88.536 410.641 89.76 406.153L109.956 335.161H228.073L248.269 406.153C249.493 410.641 252.349 412.885 256.837 412.885H328.441H329.05C331.498 412.885 333.643 412.068 335.479 410.437C337.315 408.806 338.233 406.561 338.233 403.705C338.233 402.891 337.824 401.259 337.006 398.809L217.667 7.12897ZM128.316 258.661L168.708 114.229L209.712 258.661H128.316ZM545.087 144.829C525.911 127.285 498.984 118.513 464.306 118.513C442.682 118.513 422.69 122.083 404.329 129.222C385.968 136.362 369.853 146.868 355.981 160.74C352.714 164.004 352.105 167.676 354.145 171.756L376.789 210.923C378.014 213.37 380.256 215.003 383.521 215.819C386.375 216.636 389.029 215.819 391.477 213.371C410.245 194.195 431.052 184.607 453.901 184.607C483.276 184.607 497.963 198.684 497.963 226.835V244.583C480.828 231.119 459.612 224.39 434.317 224.39C422.893 224.39 411.571 226.327 400.351 230.202C389.129 234.078 379.132 239.994 370.363 247.95C361.59 255.906 354.451 266.107 348.943 278.553C343.435 290.995 340.681 305.58 340.681 322.311C340.681 338.628 343.33 352.911 348.634 365.151C353.941 377.391 361.078 387.693 370.057 396.057C379.032 404.419 389.028 410.745 400.042 415.029C411.06 419.313 422.482 421.455 434.314 421.455C446.146 421.455 457.569 419.619 468.585 415.947C479.604 412.275 489.396 406.972 497.961 400.035V405.543C497.961 407.991 498.879 410.136 500.715 411.972C502.554 413.808 504.694 414.726 507.144 414.726H564.669C567.117 414.726 569.261 413.808 571.098 411.972C572.934 410.136 573.852 407.993 573.852 405.543V219.493C573.853 187.261 564.265 162.373 545.087 144.829ZM497.964 343.116C488.988 356.988 474.708 363.927 455.124 363.927C443.292 363.927 433.909 360.153 426.975 352.605C420.037 345.057 416.571 335.162 416.571 322.92C416.571 310.683 420.038 300.687 426.975 292.935C433.91 285.183 443.292 281.307 455.124 281.307C460.836 281.307 467.978 282.632 476.544 285.285C485.112 287.938 492.252 293.955 497.964 303.339V343.116Z" fill="white"/>
                // </svg>
                // `)
                icon_wrapper.text("attr");

                break;
            case EnumOption.CURSOR:
                icon_wrapper.text("cur");
                break;
            case EnumOption.POINTER_EVENTS:
                icon_wrapper.text("pe");
                break;
            case EnumOption.OVERFLOW:
                icon_wrapper.text("o");
                break;
            case EnumOption.OVERFLOW_X:
                icon_wrapper.text("o-x");
                break;
            case EnumOption.OVERFLOW_Y:
                icon_wrapper.text("o-y");
                break;
            case EnumOption.OPACITY:
                icon_wrapper.text("%");
                break;
            case EnumOption.ALIGN_CONTENT:
                icon_wrapper.text("ac");
                break;
            case EnumOption.BORDER_COLOR:
                icon_wrapper.text("bc");
                break;
            case EnumOption.BORDER_WIDTH:
                icon_wrapper.text("bw");
                break;
            case EnumOption.BORDER_STYLE:
                icon_wrapper.text("bs");
                break;
            case EnumOption.BORDER_BOTTOM_LEFT_RADIUS:
                icon_wrapper.text("bl");
                break;
            case EnumOption.BORDER_BOTTOM_RIGHT_RADIUS:
                icon_wrapper.text("br");
                break;
            case EnumOption.BORDER_TOP_LEFT_RADIUS:
                icon_wrapper.text("tl");
                break;
            case EnumOption.BORDER_TOP_RIGHT_RADIUS:
                icon_wrapper.text("tr");
                break;
            case EnumOption.FLEX_DIRECTION:
                icon_wrapper.text("fd");
                break;
            case EnumOption.ALIGN_ITEMS:
                icon_wrapper.text("au");
                break;
            case EnumOption.JUSTIFY_CONTENT:
                icon_wrapper.text("jc");
                break;
            case EnumOption.FLEX_WRAP:
                icon_wrapper.text("fw");
                break;
            case EnumOption.FLEX_BASIS:
                icon_wrapper.text("fb");
                break;
            case EnumOption.POSITION:
                icon_wrapper.text("pos");
                break;
            default:
                icon_wrapper = $("");
        }
        return icon_wrapper;
    }
}
class ColumnWrapper extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
        this.wrapper = $(`<div class="editors-wrapper-column"></div>`);
    }
}
class RowWrapper extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
        this.wrapper = $(`<div class="editors-wrapper-row"></div>`);
    }
}
class PaddingWrapper extends ColumnWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.PADDING_TOP
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.PADDING_RIGHT
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.PADDING_LEFT
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.PADDING_BOTTOM
            )
        );
        return this.wrapper;
    }
}
class MarginWrapper extends ColumnWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.MARGIN_TOP
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.MARGIN_RIGHT
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.MARGIN_LEFT
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.MARGIN_BOTTOM
            )
        );
        return this.wrapper;
    }
}
class XYWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.LEFT
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.TOP
            )
        );
        return this.wrapper;
    }
}
class WidthHeightWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.WIDTH
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.HEIGHT
            )
        );
        return this.wrapper;
    }
}

class MaxWidthHeightWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.WIDTH_MAX
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.HEIGHT_MAX
            )
        );
        return this.wrapper;
    }
}
class MinWidthHeightWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.WIDTH_MIN
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.HEIGHT_MIN
            )
        );
        return this.wrapper;
    }
}
class ZIndexFloatAlignContentWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.Z_INDEX
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.FLOAT
            )
        );
        this.wrapper.append(
            this._get_editor(
                $(`<div class="editors-wrapper-numeric-icon"></div>`),
                EnumOption.ALIGN_CONTENT
            )
        );
        return this.wrapper;
    }
}
class PositionWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
        this.wrapper = $(`<div class="editors-wrapper-row"></div>`);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.POSITION
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}

export class BackgroundWrapper extends EditorsWrapper {
    constructor(tags_options, tag) {
        super("Фон");
        this.wrapper = $(`<div class="editors-wrapper-filling"></div>`);
        this.tags_options = tags_options;
        this.manager = tag.manager;
    }
    get_wrapper_view_template() {
        let tmp =
            $(`<div class="tabs_for_background editors-wrapper-numeric" style="width:100%">
                        <div class="tabs">
                            <div class="tabs__nav">
                                <button class="tabs__btn tabs__btn_active">Градиент</button>
                                <button class="tabs__btn">Фото</button>
                                <button class="tabs__btn">Цвет</button>
                            </div>
                            <div class="tabs__content">
                                <div class="tabs__pane tabs__pane_show">
                                    <button id="gradient_btn">Выбрать градиент</button>
                                </div>
                                <div class="tabs__pane"></div>
                                <div class="tabs__pane"></div>
                            </div>
                        </div>
                    </div>`);

        const tabs_init = new Promise((resolve, reject) => {
            setTimeout(() => {
                const elTab = document.querySelector(".tabs");
                // инициализация elTab как табы
                const tabs_for_background = new ItcTabs(elTab);
                resolve(tabs_for_background);
            }, 0);
        });
        if (this.tags_options.get("background")) {
            const bg_grad_option = this.tags_options.get("background");
            tabs_init
                .then((tabs_for_background) => {
                    tabs_for_background.showByIndex(0);
                    const gradient_editor = new GradientEditor({
                        tag_option: bg_grad_option,
                    });
                    tmp.find(".tabs__content")
                        .children()
                        .eq(0)
                        .append(gradient_editor.get_editor_view_template());
                })
                .catch((error) => {
                    // Обработка ошибки в случае отклонения
                    console.log(error);
                });
        } else if (this.tags_options.get("background-image")) {
            const bg_image_option = this.tags_options.get("background-image");
            tabs_init
                .then((tabs_for_background) => {
                    tabs_for_background.showByIndex(1);
                    const image_editor = new ImageEditor({
                        tag_option: bg_image_option,
                    });
                    tmp.find(".tabs__content")
                        .children()
                        .eq(1)
                        .append(image_editor.get_editor_view_template());
                })
                .catch((error) => {
                    // Обработка ошибки в случае отклонения
                    console.log(error);
                });
        } else if (this.tags_options.get("background-color")) {
            const bg_color_option = this.tags_options.get("background-color");
            tabs_init
                .then((tabs_for_background) => {
                    tabs_for_background.showByIndex(2);
                    const color_editor = new ColorEditor({
                        tag_option: bg_color_option,
                    });
                    tmp.find(".tabs__content")
                        .children()
                        .eq(2)
                        .append(color_editor.get_editor_view_template());
                })
                .catch((error) => {
                    // Обработка ошибки в случае отклонения
                    console.log(error);
                });
        }

        // tmp.find('.tabs__nav').children().eq(0).on('click',() => {
        //     if(this.tags_options.get(EnumOption.BACKGROUND_GRADIENT)) {
        //         return;
        //     }else {
        //         // tmp.find('.tabs__content').children().eq(0).html('<button id="gradient_btn">Выбрать градиент</button>');
        //         this.manager.set_gradient();
        //         const gradient_editor = new GradientEditor({ tag_option: this.tags_options.get(EnumOption.BACKGROUND_GRADIENT)});
        //         tmp.find('.tabs__content').children().eq(0).append(gradient_editor.get_editor_view_template());
        //         tmp.find('.tabs__content').children().eq(1).html('');
        //         tmp.find('.tabs__content').children().eq(2).html('');
        //     }
        // });
        // tmp.find('.tabs__nav').children().eq(1).on('click',() => {
        //     if(this.tags_options.get(EnumOption.BACKGROUND_IMAGE)) {
        //         return;
        //     }else {
        //         this.manager.set_img();
        //         const image_editor = new ImageEditor({ tag_option: this.tags_options.get(EnumOption.BACKGROUND_IMAGE)});
        //         tmp.find('.tabs__content').children().eq(1).append(image_editor.get_editor_view_template());
        //         // tmp.find('.tabs__content').children().eq(0).html('<button id="gradient_btn">Выбрать градиент</button>');
        //         tmp.find('.tabs__content').children().eq(2).html('');
        //     }
        // });
        // tmp.find('.tabs__nav').children().eq(2).on('click',() => {
        //     if(this.tags_options.get(EnumOption.BACKGROUND_COLOR)) {
        //         return;
        //     }else {
        //         this.manager.set_color();
        //         const color_editor = new ColorEditor({ tag_option: this.tags_options.get(EnumOption.BACKGROUND_COLOR)});
        //         tmp.find('.tabs__content').children().eq(2).append(color_editor.get_editor_view_template());
        //         // tmp.find('.tabs__content').children().eq(0).html('<button id="gradient_btn">Выбрать градиент</button>');
        //         tmp.find('.tabs__content').children().eq(1).html('');
        //     }
        // });
        tmp.appendTo(this.wrapper);
        return this.wrapper;
    }
}

class BackgroundGradientWrapper extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        return this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon" ></div>`),
            EnumOption.BACKGROUND_GRADIENT
        );
    }
}
class BackgroundImageWrapper extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
        this.wrapper = $(
            `<div class="padding-left-6px editors-wrapper-numeric-icon"  style="height: auto; padding: 5px; display: flex;flex-wrap: wrap; flex-direction: row"></div>`
        );
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class=""></div>`),
            EnumOption.BACKGROUND_IMAGE
        ).appendTo(this.wrapper);
        var position_wrapper = $(
            `<div class="editors-wrapper-numeric-icon"></div>`
        ).appendTo(this.wrapper);
        editor = this._get_editor(
            $(`<div class=""></div>`),
            EnumOption.BACKGROUND_POSITION_X
        ).appendTo(position_wrapper);
        editor = this._get_editor(
            $(`<div class=""></div>`),
            EnumOption.BACKGROUND_POSITION_Y
        ).appendTo(position_wrapper);
        editor = this._get_editor(
            $(`<div class=""></div>`),
            EnumOption.BACKGROUND_SIZE
        ).appendTo(this.wrapper);
        editor = this._get_editor(
            $(`<div class=""></div>`),
            EnumOption.BACKGROUND_REPEAT
        ).appendTo(this.wrapper);

        return this.wrapper;
    }
}
class FontFamilyWrapper extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
        this.wrapper = $(`<div class="editors-wrapper-row"></div>`);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.FONT_FAMILY
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class TextDecorationFontSIzeWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.TEXT_DECORATION
        ).appendTo(this.wrapper);
        editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.FONT_SIZE
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class FontWeightLineHeightWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.FONT_WEIGHT
        ).appendTo(this.wrapper);
        editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.LINE_HEIGHT
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class TextAlignWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-row"></div>`),
            EnumOption.TEXT_ALIGN
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class ColorWrapper extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
        this.wrapper = $(`<div class="editors-wrapper-row"></div>`);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.COLOR
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class TextTransform extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
        this.wrapper = $(`<div class="editors-wrapper-row"></div>`);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.TEXT_TRANSFORM
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class DisplayWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.DISPLAY
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.OPACITY
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.OBJECT_POSITION
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.OBJECT_FIT
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class FlexDirection extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.FLEX_DIRECTION
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class ElementsAlign extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.ALIGN_ITEMS
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class JustifyContent extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.JUSTIFY_CONTENT
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class FlexWrapWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.FLEX_WRAP
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class FlexBasisWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.FLEX_BASIS
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class HrefAttrWrapper extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
        this.wrapper = $(`<div class="editors-wrapper-row"></div>`);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon href"></div>`),
            EnumOption.HREF
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.ATTR
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class ImageWrapper extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
        this.wrapper = $(`<div class="editors-wrapper-row"></div>`);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.IMAGE
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class CursorPointerEventsWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.CURSOR
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.POINTER_EVENTS
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class OverflowWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.OVERFLOW
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.OVERFLOW_X
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.OVERFLOW_Y
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class BorderColorWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.BORDER_COLOR
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class BorderWidthBorderStyleWrapper extends RowWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.BORDER_WIDTH
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.BORDER_STYLE
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}
class BorderRadiusWrapper extends RowWrapper {
    // TODO Подумать на common editor`ом
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.BORDER_BOTTOM_LEFT_RADIUS
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.BORDER_BOTTOM_RIGHT_RADIUS
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.BORDER_TOP_LEFT_RADIUS
        ).appendTo(this.wrapper);
        var editor = this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.BORDER_TOP_RIGHT_RADIUS
        ).appendTo(this.wrapper);
        return this.wrapper;
    }
}

//Сама вьюха в меню
class EditorsWrapperView extends EditorsWrapper {
    constructor(title) {
        super();
        this.title = title;
        this.editors = [];
    }
    delete() {
        this.editors.forEach((editor) => {
            try {
                editor.delete();
            } catch {
                console.log(editor);
            }
        });
    }
    get_wrapper_view() {
        this.has_editable = false;
        var panel_edit_box = $(`<div class="panel-edit-box">`);
        if (this.title)
            $(`<label>${this.title}</label>`).appendTo(panel_edit_box);
        this.get_wrapper_view_template().appendTo(panel_edit_box);
        if (this.has_editable) return panel_edit_box;
        else return false;
    }
    _add_editor_wrapper(object) {
        this.editors.push(object);
        const tmp_array = object.get_wrapper_view();
        const wrapper = tmp_array.wrapper;
        const has_editable = tmp_array.has_editable;
        if (has_editable) {
            this.has_editable = true;
            wrapper.appendTo(this.wrapper);
        }
    }
}
//dfjdslfjdlkf
export class FillingWrapper extends EditorsWrapperView {
    constructor(tags_options) {
        super("Фон");
        this.wrapper = $(`<div class="editors-wrapper-filling"></div>`);
        this.tags_options = tags_options;
    }
    get_wrapper_view_template() {
        this._add_editor_wrapper(new BackgroundColorWrapper(this.tags_options));
        this._add_editor_wrapper(new BackgroundImageWrapper(this.tags_options));
        return this.wrapper;
    }
}
class BackgroundColorWrapper extends EditorsWrapper {
    constructor(tag_options) {
        super(tag_options);
    }
    get_wrapper_view_template() {
        return this._get_editor(
            $(`<div class="editors-wrapper-numeric-icon"></div>`),
            EnumOption.BACKGROUND_COLOR
        );
    }
}
export class IdnentWrapper extends EditorsWrapperView {
    constructor(tags_options) {
        super("Отступы");
        this.wrapper = $(`<div class="editors-wrapper-indent"></div>`);
        this.tags_options = tags_options;
    }
    get_wrapper_view_template() {
        var object = new PaddingWrapper(this.tags_options);
        this.editors.push(object);
        var array = object.get_wrapper_view();
        var wrapper = array.wrapper;
        var has_editable = array.has_editable;
        wrapper.appendTo(this.wrapper);
        if (has_editable) {
            this.has_editable = true;
        } else {
            wrapper.addClass("noneditable");
        }
        var object = new MarginWrapper(this.tags_options);
        this.editors.push(object);
        var margin = object.get_wrapper_view();
        wrapper = margin.wrapper;
        has_editable = margin.has_editable;
        wrapper.appendTo(this.wrapper);
        if (has_editable) {
            this.has_editable = true;
        } else {
            wrapper.addClass("noneditable");
        }
        return this.wrapper;
    }
}
export class TransformWrapper extends EditorsWrapperView {
    constructor(tags_options) {
        super("Трансформация");
        this.wrapper = $(`<div class="editors-wrapper-transform"></div>`);
        this.tags_options = tags_options;
    }
    get_wrapper_view_template() {
        this._add_editor_wrapper(new PositionWrapper(this.tags_options));
        this._add_editor_wrapper(new XYWrapper(this.tags_options));
        this._add_editor_wrapper(new WidthHeightWrapper(this.tags_options));
        this._add_editor_wrapper(new MaxWidthHeightWrapper(this.tags_options));
        this._add_editor_wrapper(new MinWidthHeightWrapper(this.tags_options));
        this._add_editor_wrapper(
            new ZIndexFloatAlignContentWrapper(this.tags_options)
        );
        return this.wrapper;
    }
}
// export class FillingWrapper extends EditorsWrapperView {
//     constructor(tags_options) {
//         super("Фон");
//         this.wrapper = $(`<div class="editors-wrapper-filling"></div>`);
//         this.tags_options = tags_options;
//     }
//     get_wrapper_view_template() {
//         this._add_editor_wrapper(new BackgroundWrapper(this.tags_options));
//         return this.wrapper;
//     }
// }
export class TextWrapper extends EditorsWrapperView {
    constructor(tags_options) {
        super("Текст");
        this.wrapper = $(`<div class="editors-wrapper-text"></div>`);
        this.tags_options = tags_options;
    }
    get_wrapper_view_template() {
        this._add_editor_wrapper(new FontFamilyWrapper(this.tags_options));
        this._add_editor_wrapper(
            new TextDecorationFontSIzeWrapper(this.tags_options)
        );
        this._add_editor_wrapper(
            new FontWeightLineHeightWrapper(this.tags_options)
        );
        this._add_editor_wrapper(new TextAlignWrapper(this.tags_options));
        this._add_editor_wrapper(new ColorWrapper(this.tags_options));
        this._add_editor_wrapper(new TextTransform(this.tags_options));
        return this.wrapper;
    }
}
export class DisplayWrapperView extends EditorsWrapperView {
    constructor(tags_options) {
        super("Отображение");
        this.wrapper = $(`<div class="editors-wrapper-text"></div>`);
        this.tags_options = tags_options;
    }
    get_wrapper_view_template() {
        this._add_editor_wrapper(new DisplayWrapper(this.tags_options));

        return this.wrapper;
    }
}
export class ContentWrapperView extends EditorsWrapperView {
    constructor(tags_options) {
        super("Ссылка");
        this.wrapper = $(`<div class="editors-wrapper-text"></div>`);
        this.tags_options = tags_options;
    }
    get_wrapper_view_template() {
        this._add_editor_wrapper(new ImageWrapper(this.tags_options));
        this._add_editor_wrapper(new HrefAttrWrapper(this.tags_options));

        return this.wrapper;
    }
}
export class CustomizationWrapperView extends EditorsWrapperView {
    constructor(tags_options) {
        super("Кастомизация");
        this.wrapper = $(`<div class="editors-wrapper-text"></div>`);
        this.tags_options = tags_options;
    }
    get_wrapper_view_template() {
        this._add_editor_wrapper(
            new CursorPointerEventsWrapper(this.tags_options)
        );
        this._add_editor_wrapper(new OverflowWrapper(this.tags_options));

        return this.wrapper;
    }
}
export class StrokeWrapperView extends EditorsWrapperView {
    constructor(tags_options) {
        super("Обводка");
        this.wrapper = $(`<div class="editors-wrapper-text"></div>`);
        this.tags_options = tags_options;
    }
    get_wrapper_view_template() {
        this._add_editor_wrapper(new BorderColorWrapper(this.tags_options));
        this._add_editor_wrapper(
            new BorderWidthBorderStyleWrapper(this.tags_options)
        );
        this._add_editor_wrapper(new BorderRadiusWrapper(this.tags_options));
        return this.wrapper;
    }
}
export class FlexWrapperView extends EditorsWrapperView {
    constructor(tags_options) {
        super("");
        this.wrapper = $(`<div class="editors-wrapper-text"></div>`);
        this.tags_options = tags_options;
    }
    get_wrapper_view_template() {
        this._add_editor_wrapper(new FlexDirection(this.tags_options));
        this._add_editor_wrapper(new ElementsAlign(this.tags_options));
        this._add_editor_wrapper(new JustifyContent(this.tags_options));
        this._add_editor_wrapper(new FlexWrapWrapper(this.tags_options));
        this._add_editor_wrapper(new FlexBasisWrapper(this.tags_options));
        return this.wrapper;
    }
}
