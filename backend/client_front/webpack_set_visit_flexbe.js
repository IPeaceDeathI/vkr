const path = require("path");
module.exports = {
    // mode: "development",
    mode: "production",
    // точка входа
    entry: ["./v0020/client_front/entry_set_visit_flexbe.js"],
    output: {
        filename: "visit_flexbe.js",
        path: path.resolve(__dirname + "/../../resource/js", "dist"),
    },
    // watch: true,
};
