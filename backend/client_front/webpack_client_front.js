const path = require("path");
// запускаем в корне проекта "npm run build_client_front"
module.exports = {
    // mode: "development",
    mode: "production",
    // точка входа
    entry: ["./v0020/client_front/entry_client_front.js"],
    output: {
        filename: "client_front.js",
        path: path.resolve(__dirname + "/../../resource/js", "dist"),
    },
    // watch: true,
};
