const path = require("path");

module.exports = {
    // mode: "development",
    mode: "production",
    // точка входа
    entry: ["./v0020/quiz/resource/js/edit/entry_edit.js"],
    output: {
        filename: "edit_quiz.js",
        path: path.resolve(__dirname + "/../../../../resource/js", "dist"),
    },
    // watch: true,
};
