import { LocalStoragePrefixStaticClassAbstract } from "./../../../../../vendor/inilim/js_local_storage/src/LocalStoragePrefixStaticClassAbstract";

export class Counter extends LocalStoragePrefixStaticClassAbstract {
    static prefix = "lp_stat_";
}
