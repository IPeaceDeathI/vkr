import { store } from "@/app/providers";

export class ErrorReportService {
    private static instance: ErrorReportService;
    private static ref: any;

    static getInstance() {
        if (!ErrorReportService.instance) {
            ErrorReportService.instance = new ErrorReportService();
            ErrorReportService.ref =
                store.getters["environment/indexRef"].errorReportForm;
            // ... здесь единожды выполняется инициализация ...
        }
        return ErrorReportService.instance;
    }

    static open() {
        this.ref.open();
    }
}
