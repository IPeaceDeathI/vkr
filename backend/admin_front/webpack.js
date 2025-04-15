const path = require("path");
// запускаем в корне проекта "npm run build_admin_front"
module.exports = {
    // mode: "development",
    mode: "production",
    entry: [
        "./v0020/admin_front/index.js",
    ],
    output: {
        filename: 'admin_front.js',
        path: path.resolve(__dirname + "/../../resource/js", "dist"),
    },
    // watch: true,
};
