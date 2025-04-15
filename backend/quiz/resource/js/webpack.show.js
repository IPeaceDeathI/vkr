const path = require("path");

module.exports = {
    mode: "production",
    // mode: "development",
    // точка входа
    entry: ["./v0020/quiz/resource/js/show/entry_show.js"],
    output: {
        filename: "quiz.js",
        path: path.resolve(__dirname + "/../../../../resource/js", "dist"),
    },
    // watch: true,
};
