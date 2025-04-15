import { list } from "./icons";
import { Category, Icon, IconData, Icons } from "./types";

class IconService {
    list: Icons;
    constructor(list: Icons) {
        this.list = list;
    }
    baseUrl = "svg/";
    getIconName(icon: Icon) {
        return icon.name;
    }
    getRelevantData(icon: Icon, variant: string | null) {
        const data: IconData = { path: "", name: "" };
        const pathVariant = variant ? variant : "outlined";

        data.name = this.getIconName(icon);
        data.path = this.baseUrl + pathVariant + "/" + data.name + "#icon";

        return data;
    }
    checkTag(icon: Icon, substr: string) {
        let flag = false;
        substr = substr.toLocaleLowerCase();
        icon.tags.forEach((tag) => {
            tag.includes(substr) ? (flag = true) : "";
        });
        return flag;
    }
    getByParams(
        category: Category,
        variant = "outlined",
        tag: string | null = ""
    ) {
        let relevantIcons: Array<IconData> = [];
        let buffer: Array<IconData> = [];
        const result = [];
        if (category === "all") {
            relevantIcons = [
                ...(Object.keys(this.list) as Array<Category>).reduce(
                    (acc: IconData[], curr) => {
                        this.list[curr].forEach((icon: Icon) => {
                            (tag ? this.checkTag(icon, tag) : true)
                                ? acc.push(this.getRelevantData(icon, variant))
                                : "";
                        });
                        return acc;
                    },
                    []
                ),
            ];
        } else {
            this.list[category].forEach((icon: Icon) => {
                (tag ? this.checkTag(icon, tag) : true)
                    ? relevantIcons.push(this.getRelevantData(icon, variant))
                    : "";
            });
        }
        for (let i = 0; i < relevantIcons.length; i++) {
            if (buffer.length < 6 && i !== relevantIcons.length - 1) {
                buffer.push(relevantIcons[i]);
            } else {
                result.push(buffer);
                buffer = [];
            }
        }
        return result;
    }
}
export const iconService = new IconService(list);
