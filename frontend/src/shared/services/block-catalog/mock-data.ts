import { BlockBundle, BodyLayoutType, ZoneTypes } from "@/types";
import { Block } from "../elements_fabrics/block";
import { ZonesFabric } from "../elements_fabrics/zones_fabric";
import { BlockBodyFabric } from "../elements_fabrics/block_body_fabric";

export function getEmptyBlockBundle(): BlockBundle {
    const blockParams = Block.getInstance().getDefaultParams("1") as any;
    delete blockParams.parentId;
    delete blockParams.childrenBlockBodiesId;

    const BlockBundle: BlockBundle = {
        blockParams: blockParams,
        blockBodies: [],
        blockTitle: false,
        header: false,
    };
    return BlockBundle;
}

export function getEmptyBlockColumnBundle(): BlockBundle {
    const blockParams = Block.getInstance().getDefaultParams("1");
    const zoneParams = ZonesFabric.getInstance()
        .getZone(ZoneTypes.column)
        .getDefaultParams("sfsdfsd");
    zoneParams.cols = 16;
    const secondCol = structuredClone(zoneParams);
    secondCol.cols = 8;
    const zones = [
        { zoneParams: structuredClone(zoneParams), items: [] },
        { zoneParams: structuredClone(secondCol), items: [] },
    ];
    const blockBodyParams = BlockBodyFabric.getInstance()
        .getBodyLayout(BodyLayoutType.columns)
        .getDefaultParams();
    const blockBodyBundle = {
        blockBodyParams: { BodyLayoutParams: blockBodyParams },
        zones: zones,
    };

    const BlockBundle: BlockBundle = {
        blockParams: blockParams,
        headerSecondRow: false,
        blockBodies: [blockBodyBundle],
        blockTitle: false,
        header: false,
    };

    return BlockBundle;
}

export function getEmptyBlockCardsBundle(): BlockBundle {
    const blockParams = Block.getInstance().getDefaultParams("1") as any;
    delete blockParams.parentId;
    delete blockParams.childrenBlockBodiesId;

    const zoneParams = ZonesFabric.getInstance()
        .getZone(ZoneTypes.card)
        .getDefaultParams("sfsdfsd");

    const zones = [
        { zoneParams: structuredClone(zoneParams), items: [] },
        { zoneParams: structuredClone(zoneParams), items: [] },
        { zoneParams: structuredClone(zoneParams), items: [] },
    ];
    const blockBodyParams = BlockBodyFabric.getInstance()
        .getBodyLayout(BodyLayoutType.cards)
        .getDefaultParams();
    const blockBodyBundle = {
        blockBodyParams: { BodyLayoutParams: blockBodyParams },
        zones: zones,
    };

    const BlockBundle: BlockBundle = {
        blockParams: blockParams,
        headerSecondRow: false,
        blockBodies: [blockBodyBundle],
        header: false,
        blockTitle: false,
    };

    return BlockBundle;
}

// const emptyBlockBundle: BlockBundle = {
//     blockParams: {
//         tabs: false,
//         blockCParams: { visibility: "all", anchor: false, height: "auto" },
//         baseBGParams: {
//             selectedBg: 1,
//             color: { backgroundColor: "#f5f5f5ff", contrastColor: "#000000" },
//             image: { backgroundPosition: "center", backgroundImage: "" },
//             video: {
//                 src: "",
//                 basicBG: {
//                     selectedBasicBg: false,
//                     color: "#f5f5f5ff",
//                     image: {
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundImage: "",
//                     },
//                 },
//             },
//             blackout: { enabled: false, color: "#00000040" },
//             textColorAutoType: "auto",
//         },
//         topSpacerHeight: 70,
//         bottomSpacerHeight: 70,
//     },
//     blockBodies: [],
// } as unknown as BlockBundle;
