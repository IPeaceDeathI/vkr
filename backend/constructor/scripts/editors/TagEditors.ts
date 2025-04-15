import { TagType } from "@/classes/types";
import { Observer } from "@/classes/Observer";
import { createApp } from "vue/dist/vue.esm-bundler.js";
import vuetify from "#/app/goals_editor/providers/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import App from "#/app/goals_editor/index.vue";
import { getUUID } from "@/helpers/helpers";
import { TagAttributes } from "@/classes/types";
import { TagEditor } from "./BaseEditor";

export class AttributeEditor extends Observer {
    tag: TagType;
    goals_target: JQuery;
    constructor(tag: TagType) {
        super();
        this.tag = tag;
        this.subscribe(this.tag);
    }
    _set_template() {
        // console.log(this.tag.get_attributes().get(TagAttributes.MetricClick))
    }
    public render(parentJQuery): void {
        const index = getUUID();
        const instance = this;
        this.goals_target = $(
            `<div noks-goal-editor-target-${index} style="margin-top:5px;"></div>`
        );
        parentJQuery.append(this.goals_target);
        const goal = this.tag.get_attributes().get(TagAttributes.MetricClick);
        const app = createApp(App);
        const rootComponent = app.use(vuetify);
        app.provide("appProp", goal);
        app.provide("appEmit", function (value) {
            instance.tag.update_attribute(TagAttributes.MetricClick, value);
        });
        app.mount(`[noks-goal-editor-target-${index}]`);
    }
}

export class BackgroundEditor extends TagEditor {
    constructor(Tag: TagType) {
        super(Tag);
    }
    get_editor_view_template() {
        var background_editor_wrapper = $(
            `<div class="editors-wrapper-numeric" style="width:100%">
                <ul class="tabs" role="tablist">
                    <li>
                        <input type="radio" name="tabs" id="tab1" checked />
                        <label for="tab1" 
                            role="tab" 
                            aria-selected="true" 
                            aria-controls="panel1" 
                            tabindex="0">Цвет</label>
                        <div id="tab-content1" 
                            class="tab-content" 
                            role="tabpanel" 
                            aria-labelledby="Цвет" 
                            aria-hidden="false">
                        <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </div>
                    </li>
                
                    <li>
                        <input type="radio" name="tabs" id="tab2" />
                        <label for="tab2"
                            role="tab" 
                            aria-selected="false" 
                            aria-controls="panel2" 
                            tabindex="0">Градиент</label>
                        <div id="tab-content2" 
                            class="tab-content"
                            role="tabpanel" 
                            aria-labelledby="Градиент" 
                            aria-hidden="true">
                        <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla?</p>
                        </div>
                    </li>

                    <li>
                        <input type="radio" name="tabs" id="tab2" />
                        <label for="tab2"
                            role="tab" 
                            aria-selected="false" 
                            aria-controls="panel2" 
                            tabindex="0">Фото</label>
                        <div id="tab-content2" 
                            class="tab-content"
                            role="tabpanel" 
                            aria-labelledby="Фото" 
                            aria-hidden="true">
                        <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla?</p>
                        </div>
                    </li>
                </ul>
            </div>`
        );
        return background_editor_wrapper;
    }
}
