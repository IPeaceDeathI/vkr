import TagsOptionSelect from "@/classes/TagsOptionSelect";
import Api from "@/classes/Api";
import FrameContentEditor from "@/editors/FrameContentEditor";
import { Editor, NonEditableEditor } from "@/editors/BaseEditor";
import Gpickr from "gpickr/dist/gpickr.min.js";

export class SelectorEditor extends Editor {
  constructor(params) {
    super(params);
    if (!this.tag_option instanceof TagsOptionSelect) {
      console.log(
        `Для создания SelectorEditor требуется передать опцию TagsOptionSelect, вы передали: ${this.tag_option}`
      );
    }
    this.selectors_without_image = [];
    this.selectors_with_image = [];
    this.#sort_selectors_by_availability_img();
  }
  get_editor_view_template() {
    var selector_editor_wrapper = $(
      `<div class="editors-wrapper-selector"></div>`
    );
    var img_sel_wrapper = this.#get_wrapper_with_images_wrapper().appendTo(
      selector_editor_wrapper
    );
    var no_img_sel_wrapper =
      this.#get_wrapper_without_images_wrapper().appendTo(
        selector_editor_wrapper
      );
    return selector_editor_wrapper;
  }
  #get_wrapper_with_images_wrapper() {
    var img_sel_wrapper = $(`<div class="selectors-with-image-wrapper"></div>`);
    if (this.selectors_with_image.length < 1) return $(``);
    for (const variant of this.selectors_with_image) {
      var _wrapper = $(
        `<div data-tooltip="${variant.text}" export class = "selector-with-image">${variant.img}</div>`
      );

      if (this.tag_option.val == variant.value)
        _wrapper.addClass("editor-selected-selector");

      _wrapper.on("click", () => {
        this.tag_option.set_value(variant.value);
      });

      _wrapper.appendTo(img_sel_wrapper);
    }
    return img_sel_wrapper;
  }
  #get_wrapper_without_images_wrapper() {
    var selector = $(`<select>`);
    if (this.selectors_without_image.length < 1) return $(``);
    for (const variant of this.selectors_without_image) {
      const option = $(
        '<option value="' +
          variant["value"] +
          '" ' +
          (variant["value"] == this.tag_option.val ? "selected" : "") +
          ">" +
          variant["text"] +
          "</option>"
      );
      if (this.tag_option.id === EnumOption.FONT_FAMILY)
        option.css("font-family", variant["value"]);
      option.appendTo(selector);
    }
    selector.on("change", () => {
      this.tag_option.set_value(selector.val());
    });
    return selector;
  }
  #sort_selectors_by_availability_img() {
    for (const variant of this.tag_option.possible_variants) {
      if (variant.img == "") {
        this.selectors_without_image.push(variant);
        continue;
      }
      this.selectors_with_image.push(variant);
    }
  }
}

export class NonEditableSelectorEditor extends NonEditableEditor {
  get_editor_view_template() {
    return $("");
  }
}
export class TextEditor extends Editor {
  constructor(params) {
    super(params);
  }
  get_editor_view_template() {
    var text_editor_wrapper = $(`<div class="editors-wrapper-text"></div>`);
    let box = $(`<input type="text"  value="${this.value}">`).appendTo(
      text_editor_wrapper
    );
    box.on("change", () => {
      this.tag_option.set_value(box.val());
    });
    return text_editor_wrapper;
  }
}
export class NonEditableTextEditor extends NonEditableEditor {
  get_editor_view_template() {
    return $("");
  }
}

export class NumericEditor extends Editor {
  constructor(params) {
    super(params);
  }

  get_editor_view_template() {
    var numeric_editor_wrapper = $(
      `<div class="editors-wrapper-numeric"></div>`
    );
    var number = this.get_value_editor().appendTo(numeric_editor_wrapper);
    number.on("input", () => {
      this.tag_option.set_value_without_notify(number.val());
      number.val(this.tag_option.get_val());
    });
    number.on("change", () => {
      if (number.val() == "") number.val(0);
      this.tag_option.set_value(number.val());
    });
    return numeric_editor_wrapper;
  }
  get_value_editor() {
    return $(`<input type="number" value="${this.get_val()}"></input>`);
  }
}

export class GradientEditor extends Editor {
  constructor(params) {
    super(params);
  }

  get_editor_view_template() {
    var gradient_editor_wrapper = $(
      `<div class="editors-wrapper-numeric" style="justify-content: center"></div>`
    );
    var gradient = this.get_value_editor().appendTo(gradient_editor_wrapper);
    gradient.on("input", () => {
      this.tag_option.set_value_without_notify(gradient.val());
      gradient.val(this.tag_option.get_val());
    });
    gradient.on("change", () => {
      if (gradient.val() == "") gradient.val(0);
      this.tag_option.set_value(gradient.val());
    });
    return gradient_editor_wrapper;
  }
  get_value_editor() {
    const main_instance = this;
    const Gbtn = $(`#gradient_btn`); // TODO
    // console.log('Градиент едитор сработал!');
    Gbtn.on("click", function (e) {
      // console.log("AMOUNT OF PICKERS(start) = " + $(".gpickr").length);
      if ($(".gpickr").length >= 1) {
        return;
      }
      const posX = e.pageX;
      const posY = e.pageY;
      const info_btn = $(
        `<button class=info-for-gradient-picker-btn-1 style="transition: width ease-in 0.3s;position:absolute;height:20px;width:10px;top:0px;right:0px;border-radius:0 0 0 0.15em;background-color:#119a22;z-index:1"><img style="transition: opacity ease-in 0.3s;height:100%;width:100%;opacity:0" src="/resource/img/gradient/info.png"></button>`
      );
      const Wrapper = $(
        `<div class="g_pickr_wrapper_window" style='position:"absolute"'><div>`
      );

      $(document).find("html").append(Wrapper);
      this.gpickr = new Gpickr({
        el: ".g_pickr_wrapper_window",

        // Pre-defined stops. These are the default since at least two should be defined
        stops: []
      });

      // list_of_stops = gpickr.getStops();

      const OnMouseEnt = function () {
        if ($(this).css("width") === "20px") {
          $(this).css("width", "10px");
          $(this).find("img").css("opacity", 0);
        } else {
          $(this).css("width", "20px");
          $(this).find("img").css("opacity", 1);
        }
      };
      $(".gpickr").append(info_btn);
      $(".info-for-gradient-picker-btn-1")
        .on("mouseenter", OnMouseEnt)
        .on("click", function (e) {
          if ($(".popup").length > 0) {
            $(".popup").remove();
            $(".info-for-gradient-picker-btn-1").on("mouseenter", OnMouseEnt);
          } else {
            $(".info-for-gradient-picker-btn-1").off("mouseenter");
            const popup =
              $(`<div class="popup" style="display:flex;flex-direction:column;margin-left:0.5em;">
                                        <video src="/resource/img/gradient/gradient-1.webm" loop autoplay style="width: 12em;height: auto;" class="popup-image"></video>
                                        <video src="/resource/img/gradient/gradient-2.webm" loop autoplay style="width: 12em;height: auto;" class="popup-image"></video>
                                    </div>`);
            $(this).after(popup);
          }
        });

      $(this.gpickr._root.root).css("top", `${posY - 40}px`);
      $(this.gpickr._root.root).css("left", `${posX + 80}px`);

      this.gpickr
        .on("init", (instance) => {
          // console.log(main_instance);
          this.gpickr.setGradient(main_instance.tag_option.val);
        })
        .on("change", (instance) => {
          main_instance.tag_option.set_value(instance.getGradient());
          // console.log(main_instance);
          // console.log(gpickr.getGradient());
        });

      setTimeout(() => {
        $(document).on("click.outsideGradientPicker", () => {
          // list_of_stops = gpickr.getStops();
          // console.log("LIST AFTER: ");
          // console.log(list_of_stops);

          $(this.gpickr._root.root).css("opacity", 0);
          // setTimeout(()=>{ // TODO нет анимации при закрытии, продумать
          $(this.gpickr._root.root).remove();
          $(document).off("click.outsideGradientPicker");
          // $('#gradient_btn').removeAttr('disabled');
          // }, 1000)
        });
      }, 0);
      $(this.gpickr._root.root).on("click.outsideGradientPicker", (e) => {
        e.stopPropagation();
      });
      // console.log("AMOUNT OF PICKERS(end) = " + $(".gpickr").length);
    });
    return Gbtn;
  }
  get_information_about() {}

  _set_template(data) {
    // try{
    //     this.gpickr.setGradient(data);
    //     console.log(data);
    // } catch (error) {
    //     console.log(error);
    // }
  }
}

export class StringEditor extends Editor {
  constructor(params) {
    super(params);
  }

  get_editor_view_template() {
    var string_editor_wrapper = $(
      `<div class="editors-wrapper-numeric" style="width:100%"></div>`
    );
    var string = this.get_value_editor().appendTo(string_editor_wrapper);
    string.on("input", () => {
      this.tag_option.set_value_without_notify(string.val());
      string.val(this.tag_option.get_val());
    });
    string.on("change", () => {
      if (string.val() == "") string.val(0);
      this.tag_option.set_value(string.val());
    });
    return string_editor_wrapper;
  }
  get_value_editor() {
    return $(`<input type="text" value="${this.get_val()}"></input>`);
  }
}

export class NonEditableNumericEditor extends NonEditableEditor {
  get_editor_view_template(tag_option) {
    if (tag_option == null) var val = "";
    else var val = tag_option.get_val();
    var numeric_editor_wrapper = $(
      `<div class="editors-wrapper-numeric"></div>`
    );
    var number = $(`<input type="number" value="${val}"></input>`)
      .appendTo(numeric_editor_wrapper)
      .attr("disabled", "disabled");
    return numeric_editor_wrapper;
  }
}
export class NonEditableNumericEditorWithUnit extends NonEditableEditor {
  get_editor_view_template(tag_option) {
    if (tag_option == null) var val = "";
    else var val = tag_option.get_val();
    var numeric_editor_wrapper = $(
      `<div class="editors-wrapper-numeric"></div>`
    );
    var number = $(`<input type="number" value="${val}"></input>`)
      .appendTo(numeric_editor_wrapper)
      .attr("disabled", "disabled");
    var select = $("<select></select>")
      .appendTo(numeric_editor_wrapper)
      .attr("disabled", "disabled");
    $(`<option>?</option> `).appendTo(select);

    return numeric_editor_wrapper;
  }
}

export class NumericEditorWithUnit extends Editor {
  state_percent;
  state_pixel;

  state_em;
  state_rem;
  state_vh;
  state_vw;

  state_auto;
  state_contain;
  state_cover;
  state_inherit;
  /**
   * params.tag_option - tag_option, к которому привязан editor
   */
  constructor(params) {
    super(params);
    this.variants = ["px", "%"];

    if (this.tag_option.extra_unit != null)
      this.variants = this.variants.concat(this.tag_option.extra_unit);
    if (this.tag_option.unit != null) this.set_state(this.tag_option.unit);
    else this.set_state("px");
  }
  _set_template(data) {
    if (data instanceof Object) {
      if (data["value"]) {
        this.set_value(data["value"]);
      }
      if (data["unit"]) {
        this.set_state(data["unit"]);
      }
    } else this.set_value(data);
    this.re_render(); //////Плохая оптимизация(ВРеменно для теста реактивности)
  }
  set_state(unit) {
    if (this.current_state != null) this.#save_state();
    switch (unit) {
      case "px":
        if (this.state_pixel == null) {
          this.current_state = new NumericEditorWithUnitStatePixel(
            this.value,
            this
          );
        } else this.current_state = this.state_pixel;
        break;
      case "%":
        if (this.state_percent == null)
          this.current_state = new NumericEditorWithUnitStatePercent(
            this.value,
            this
          );
        else this.current_state = this.state_percent;
        break;
      case "auto":
        if (this.state_auto == null)
          this.current_state = new NumericEditorWithUnitStateAuto(
            this.value,
            this
          );
        else this.current_state = this.state_auto;
        break;
      case "cover":
        if (this.state_cover == null)
          this.current_state = new NumericEditorWithUnitStateCover(
            this.value,
            this
          );
        else this.current_state = this.state_cover;
        break;
      case "contain":
        if (this.state_contain == null)
          this.current_state = new NumericEditorWithUnitStateContain(
            this.value,
            this
          );
        else this.current_state = this.state_contain;
        break;
      case "vw":
        if (this.state_vw == null)
          this.current_state = new NumericEditorWithUnitStateVw(
            this.value,
            this
          );
        else this.current_state = this.state_vw;
        break;
      case "vh":
        if (this.state_vh == null)
          this.current_state = new NumericEditorWithUnitStateVh(
            this.value,
            this
          );
        else this.current_state = this.state_vh;
        break;
      case "rem":
        if (this.state_rem == null)
          this.current_state = new NumericEditorWithUnitStateRem(
            this.value,
            this
          );
        else this.current_state = this.state_rem;
        break;
      case "em":
        if (this.state_em == null)
          this.current_state = new NumericEditorWithUnitStateEm(
            this.value,
            this
          );
        else this.current_state = this.state_em;
        break;
      case "inherit":
        if (this.state_em == null)
          this.current_state = new NumericEditorWithUnitStateInherit(
            this.value,
            this
          );
        else this.current_state = this.state_inherit;
        break;
      default:
        console.log(`Указан неверный unit ${unit} в ${this.tag_option}!`);
    }
    this.re_render();
  }

  get_editor_view_template() {
    var numeric_editor_wrapper = $(
      `<div class="editors-wrapper-numeric"></div>`
    );
    var number = this.current_state
      .get_value_editor()
      .appendTo(numeric_editor_wrapper);
    var select = $("<select></select>").appendTo(numeric_editor_wrapper);
    this.variants.forEach((variant) => {
      $(
        '<option value="' +
          variant +
          '" ' +
          (variant == this.current_state.get_unit() ? "selected" : "") +
          ">" +
          variant +
          "</option>"
      ).appendTo(select);
    });
    select.on("change", () => {
      this.set_state(select.val());
      this.current_state.set_unit_to_tag_option();
    });
    number.on("input", () => {
      this.current_state.set_value(number.val());
      this.current_state.set_value_to_tag_option_without_notify();
    });
    number.on("change", () => {
      if (number.val() == "") number.val(0);
      this.current_state.set_value(number.val());
      this.current_state.set_value_to_tag_option();
    });
    return numeric_editor_wrapper;
  }
  #save_state() {
    this.current_state.save_me();
  }
}
class NumericEditorWithUnitState {
  constructor(val, parent, unit) {
    this.val = val;
    this.parent = parent;
    this.unit = unit;
  }
  get_value_editor() {
    return $(`<input type="number" value="${this.get_val()}"></input>`);
  }
  set_value(val) {
    this.val = val;
  }
  get_val() {
    return this.parent.value;
  }
  get_unit() {
    return this.unit;
  }
  set_value_to_tag_option_without_notify() {
    this.parent.tag_option.set_value_without_notify(this.val);
  }
  set_value_to_tag_option() {
    this.parent.tag_option.set_value(this.val);
  }
  set_unit_to_tag_option() {
    this.parent.tag_option.set_unit(this.unit);
  }
}
class NumericEditorWithUnitStatePercent extends NumericEditorWithUnitState {
  constructor(val = 50, parent) {
    super(val, parent, "%");
  }
  save_me() {
    this.parent.state_percent = this;
  }
}
class NumericEditorWithUnitStateContain extends NumericEditorWithUnitState {
  constructor(val = 0, parent) {
    super(val, parent, "contain");
  }
  get_value_editor() {
    return $(``);
  }
  save_me() {
    this.parent.state_contain = this;
  }
}
class NumericEditorWithUnitStateInherit extends NumericEditorWithUnitState {
  constructor(val = 0, parent) {
    super(val, parent, "inherit");
  }
  get_value_editor() {
    return $(``);
  }
  save_me() {
    this.parent.state_inherit = this;
  }
}
class NumericEditorWithUnitStateCover extends NumericEditorWithUnitState {
  constructor(val = 0, parent) {
    super(val, parent, "cover");
  }
  get_value_editor() {
    return $(``);
  }
  save_me() {
    this.parent.state_cover = this;
  }
}
class NumericEditorWithUnitStateAuto extends NumericEditorWithUnitState {
  constructor(val = 0, parent) {
    super(val, parent, "auto");
  }
  get_value_editor() {
    return $(``);
  }
  save_me() {
    this.parent.state_auto = this;
  }
}
class NumericEditorWithUnitStatePixel extends NumericEditorWithUnitState {
  constructor(val = 100, parent) {
    super(val, parent, "px");
  }
  save_me() {
    this.parent.state_pixel = this;
  }
}
class NumericEditorWithUnitStateEm extends NumericEditorWithUnitState {
  constructor(val = 1, parent) {
    super(val, parent, "em");
  }
  save_me() {
    this.parent.state_em = this;
  }
}
class NumericEditorWithUnitStateRem extends NumericEditorWithUnitState {
  constructor(val = 1, parent) {
    super(val, parent, "rem");
  }
  save_me() {
    this.parent.state_rem = this;
  }
}
class NumericEditorWithUnitStateVh extends NumericEditorWithUnitState {
  constructor(val = 50, parent) {
    super(val, parent, "vh");
  }
  save_me() {
    this.parent.state_vh = this;
  }
}
class NumericEditorWithUnitStateVw extends NumericEditorWithUnitState {
  constructor(val = 50, parent) {
    super(val, parent, "vw");
  }
  save_me() {
    this.parent.state_vw = this;
  }
}
export class ColorEditor extends Editor {
  constructor(params) {
    super(params);
  }
  _set_template(data) {
    this.set_value(data);
    this.inputColor.val(data.substring(0, 7));
    this.inputText.val(data);
    this.inputOpacity.val(
      this.valid_opacity(Math.round(this.tag_option.get_opacity(data) * 100))
    );
  }
  get_editor_view_template() {
    var image_color_editor_wrapper = $(
      `<div class="color-editor-wrapper"></div>`
    );
    var color_wrapper = $(`<div class="editors-icon-wrapper"></div>`);
    this.inputColor = $(
      `<input type="color" class="color_picker " value="${this.tag_option.get_color()}">`
    );
    this.inputText = $(`<input type="text" value="${this.tag_option.val}">`);
    this.inputOpacity = $(
      `<input type="number" value="${this.valid_opacity(
        Math.round(this.tag_option.get_opacity() * 100)
      )}">`
    );
    var opacityImage = $(`<div class="opacity-image">%</div>`).attr(
      "data-tooltip",
      "Прозрачность"
    );
    this.inputColor.appendTo(color_wrapper);
    image_color_editor_wrapper.append(color_wrapper);
    image_color_editor_wrapper.append(this.inputText);
    image_color_editor_wrapper.append(this.inputOpacity);
    image_color_editor_wrapper.append(opacityImage);

    var instance = this.tag_option;
    var instance_color = this;
    this.inputText.on("change", function () {
      instance.set_value($(this).val().trim());
    });
    this.inputColor.on("change", function () {
      instance.set_color($(this).val());
    });
    this.inputColor.on("input", function () {
      instance.val = $(this).val();
      instance.hook_before_set_value();
      instance.notify(instance.val);
      instance.set_option();
    });
    this.inputOpacity.on("input", function () {
      var val = instance_color.valid_opacity($(this).val());
      $(this).val(val);
      instance.set_opacity(val / 100);
    });
    this.inputOpacity.on("change", function () {
      var val = instance_color.valid_opacity($(this).val());
      instance.set_opacity(val / 100);
      instance.set_value(instance.val);
    });
    return image_color_editor_wrapper;
  }
  valid_opacity(val) {
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    return val;
  }
}
export class NoneditableColorEditor extends NonEditableEditor {
  get_editor_view_template() {
    var image_color_editor_wrapper = $(
      `<div class="color-editor-wrapper"></div>`
    );
    var inputColor = $(
      `<input type="color" class="color_picker" value="#ffffff">`
    ).attr("disabled", "disabled");
    var inputText = $(`<input type="text" value="?">`).attr(
      "disabled",
      "disabled"
    );
    var inputOpacity = $(`<input type="number" value="">`).attr(
      "disabled",
      "disabled"
    );
    image_color_editor_wrapper.append(inputColor);
    image_color_editor_wrapper.append(inputText);
    image_color_editor_wrapper.append(inputOpacity);
    return image_color_editor_wrapper;
  }
}
export class NonEditableGradientEditor extends NonEditableEditor {
  get_editor_view_template() {
    const Gbtn = $(
      `<button id="gradient_btn" disabled>Выбрать градиент</button>`
    );
    return Gbtn;
  }
}
export class NonEditableStringEditor extends NonEditableEditor {
  get_editor_view_template() {
    const String_input = $(`<input type="text"></input>`);
    return String_input;
  }
}
export class ImageEditor extends Editor {
  constructor(params) {
    super(params);
    if (this.tag_option.id !== EnumOption.IMAGE) return;
    this.#setPosition();
  }
  _hook_after_delete() {
    if (this.tag_option.id !== EnumOption.IMAGE) return;
    this.#unsetPosition();
  }
  get_editor_view_template() {
    var box = $(
      `<input type="file"  accept="image/png, image/jpeg, image/svg+xml">`
    ).css("display", "none");
    box.on("change", async () => {
      const input = box;
      const files = input.prop("files");
      const el_for_disable =
        this.tag_option.parent_jq.prop("tagName") == "img"
          ? this.tag_option.parent_jq
          : this.tag_option.parent_jq.parent();
      const el2_for_disable =
        input.prop("tagName") == "img" ? input : input.parent();
      tempDisabledElem(el_for_disable, true);
      tempDisabledElem(el2_for_disable.closest("div"), true);
      Api.save_images_from_files(files)
        .then((results) => {
          if (Array.isArray(results)) results = results[0];
          this.val = results;
          this.tag_option.set_value(results);
        })
        .catch((results) => {
          return;
        })
        .finally(() => {
          tempDisabledElem(el_for_disable, false);
          tempDisabledElem(el2_for_disable, false);
        });
    });
    var image_editor_wrapper = $(
      `<div class="image-editor-wrapper editors-icon-wrapper"></div>`
    );
    var image = $(`<img src=${this.tag_option.val}></img>`);
    if (this.tag_option.id == EnumOption.IMAGE) {
      this.tag_option.parent_jq.append();
      this.tag_option.parent_jq.on("click", (e) => {
        this.#createImageMenu(e, clear_btn, image);
      });
    }
    image.on("click", () => {
      box.trigger("click");
    });
    const clear_btn = $(
      '<div class="edit-delete-background-image">Очистить</div>'
    ).on("click", (e) => {
      this.tag_option.set_value("");
    });
    image.appendTo(image_editor_wrapper);
    clear_btn.appendTo(image_editor_wrapper);
    box.appendTo(image_editor_wrapper);
    return image_editor_wrapper;
  }
  #createImageMenu(e, clearBtn, addBtn) {
    const menu = $(`<div class="noks-constructor-under-click-menu"></div>`);
    const posX = e.pageX;
    const posY = e.pageY;
    const clrButton = $(`<div class="clearImage"></div>`).on("click", () => {
      clearBtn.trigger("click");
    });
    const addButton = $(`<div class="uploadImage"></div>`).on("click", () => {
      addBtn.trigger("click");
    });
    menu.append(addButton).append(clrButton);
    const offset = window.main.blocks_view_space().get_wrapper().offset();
    const off_top = offset?.top ?? 0;
    const off_left = offset?.left ?? 0;
    window.main.blocks_view_space().get_wrapper().append(menu);
    menu.css("top", `${posY - 15 - off_top}px`);
    menu.css("left", `${posX - 25 - off_left}px`);
    setTimeout(() => {
      $(document).on("click.outsideImageMenu", () => {
        menu.remove();
        $(document).off("click.outsideImageMenu");
      });
    });
    menu.on("click.outsideImageMenu", () => {
      stopPropagation();
    });
  }
  #setPosition() {
    this.initialPosition = this.tag_option.parent_jq.css("position");
    if (this.initialPosition == "static" || this.initialPosition == "absolute")
      this.tag_option.parent_jq.css("position", "relative");
    this.tag_option.parent_jq.attr(
      "noks-constructor-image-toolbar-bilyalov",
      ""
    );
    this.tag_option.parent_jq.attr("title", "Нажмите, чтобы заменить");
  }
  #unsetPosition() {
    if (this.initialPosition)
      this.tag_option.parent_jq.css("position", this.initialPosition);
    this.tag_option.parent_jq.removeAttr(
      "noks-constructor-image-toolbar-bilyalov"
    );
    this.tag_option.parent_jq.removeAttr("title");
  }
}
export class NoneditableImageEditor extends NonEditableEditor {
  get_editor_view_template() {
    var image = $(`<img src=""></img>`).attr("disabled", "disabled");
    var image_editor_wrapper = $(`<div class="image-editor-wrapper"></div>`);
    image.appendTo(image_editor_wrapper);
    return image_editor_wrapper;
  }
}
export class HrefEditor extends Editor {
  constructor(params) {
    super(params);
  }
  set_param(param) {
    const entity = param.entity ?? null;
    const entity_id = param.entity_id ?? null;

    this.tag_option.set_value(
      FrameContentEditor.render_href_from_param(entity, entity_id)
    );
  }
  get_editor_view_template() {
    var text_editor_wrapper = $(`<div class="editors-wrapper-href"></div>`);
    let box = $(`<input type="text"  value="${this.value}">`).appendTo(
      text_editor_wrapper
    );
    box.on("change", () => {
      this.tag_option.set_value(box.val());
    });
    let button = $(`<button>Выбрать окно</button>`).appendTo(
      text_editor_wrapper
    );
    button.on("click", () => {
      const tmp = FrameContentEditor.parse_href_for_editor(
        this.wrapper.find("input").val()
      );
      const editor = new FrameContentEditor({
        tag_parent: this,
        param: {
          entity: tmp.entity,
          entity_id: tmp.entity_id
        }
      }).get_pop_up();
      window.main.blocks_view_space().wrapper.append(editor);
    });
    return text_editor_wrapper;
  }
}
