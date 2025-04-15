import * as models from "./models";
export class Api {
    public static Blocks() {
        return models.ApiBlock.getInstance();
    }
    public static Page() {
        return models.ApiPage.getInstance();
    }
    public static Image() {
        return models.ApiImage.getInstance();
    }
    public static Video() {
        return models.ApiVideo.getInstance();
    }
    public static Categories() {
        return models.ApiCategories.getInstance();
    }
    public static CodeWidget() {
        return models.ApiCodeWidget.getInstance();
    }
    public static Quiz() {
        return models.ApiQuiz.getInstance();
    }
    public static Site() {
        return models.ApiSite.getInstance();
    }
    public static ErrorLog() {
        return models.ApiError.getInstance();
    }
    public static User() {
        return models.ApiUser.getInstance();
    }
    public static Template() {
        return models.ApiTemplate.getInstance();
    }
    public static TemplateCategories() {
        return models.ApiTemplateCategories.getInstance();
    }
}
