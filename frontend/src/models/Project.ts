import { Api } from "@/shared/api";
import { GetResponseData, PostPutData } from "@/shared/api/models";
import { ProjectBundle } from "@/types";

export interface SaveData
    extends Omit<PostPutData, "structure" | "last_structure"> {
    structure?: ProjectBundle;
}
interface LoadData
    extends Omit<GetResponseData, "structure" | "last_structure"> {
    structure: null | ProjectBundle;
    last_structure: null | ProjectBundle;
}
export class ProjectModel {
    public static save(projectID: number, data: SaveData): Promise<null> {
        return Api.Page().POST(
            projectID,
            ProjectModel.prepareStructureForApiSave(data)
        );
    }
    public static async load(projectID: number): Promise<LoadData> {
        const bundle = await Api.Page().GET(projectID);
        return ProjectModel.prepareStructureAfterApiGet(bundle);
    }
    private static prepareStructureAfterApiGet(
        structure: GetResponseData
    ): LoadData {
        return {
            ...structure,
            ...{
                last_structure:
                    structure.last_structure !== null &&
                    structure.last_structure !== ""
                        ? JSON.parse(structure.last_structure)
                        : null,
                structure:
                    structure.structure !== null && structure.structure !== ""
                        ? JSON.parse(structure.structure)
                        : null,
            },
        };
    }
    private static prepareStructureForApiSave(
        structure: SaveData
    ): PostPutData {
        return {
            ...structure,
            ...{
                last_structure: JSON.stringify(structure.structure),
                structure: JSON.stringify(structure.structure),
            },
        };
    }
}
