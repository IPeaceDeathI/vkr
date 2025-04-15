import ViewQuiz from "./ViewQuiz";
// точка входа
if (!window.ViewQuiz) {
    window.ViewQuiz = new ViewQuiz();
    window.ViewQuiz.init();
} else {
    console.log("quiz show again");
}
