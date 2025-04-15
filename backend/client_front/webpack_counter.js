const path = require("path");
// запускаем в корне проекта "npm run build_client_front_counter"
module.exports = {
    // mode: "development",
    mode: "production",
    // точка входа
    entry: ["./v0020/client_front/entry_counter.js"],
    output: {
        filename: "lp_stat.js",
        path: path.resolve(__dirname + "/../../resource/js", "dist"),
    },
    // watch: true,
};
