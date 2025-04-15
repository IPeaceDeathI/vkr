// export default class Api {
//     static async save_images_from_base64(canvas: any) {
//         let blob = (await new Promise((resolve) =>
//             canvas.toBlob(resolve)
//         )) as Blob;
//         blob = new Blob([blob], { type: "image/jpeg" });
//         return this.#save_images([blob], "file", "blob_image.jpg");
//     }
//     static save_images_from_files(files: File) {
//         return this.#save_images(files, "file");
//     }
//     static save_images_from_urls(urls: string) {
//         return this.#save_images(urls, "url");
//     }
//     static #save_images(
//         items: File | string | Blob[],
//         type: string,
//         fileName = ""
//     ) {
//         return new Promise((resolve, reject) => {
//             const url_save = `https://noks-d1.ru/`;
//             for (let index = 0; index < items.length; index++) {
//                 const formData = new FormData();
//                 formData.append(`${type}`, items[index], fileName);
//                 // $.ajax({
//                 //     url: url_save,
//                 //     method: "POST",
//                 //     dataType: "json",
//                 //     data: formData,
//                 //     processData: false,
//                 //     contentType: false,
//                 //     success: (response) => {
//                 //         if (!response["status"]) {
//                 //             new MessagesIndicator().showPopUpMessage({
//                 //                 message: "Не получилось загрузить картинку",
//                 //                 status: EnumMessagesStatus.ERROR,
//                 //             });
//                 //             reject();
//                 //         }
//                 //         resolve(response.result[0].src);
//                 //     },
//                 //     error: function () {
//                 //         new MessagesIndicator().showPopUpMessage({
//                 //             message: "Не получилось загрузить картинку",
//                 //             status: EnumMessagesStatus.ERROR,
//                 //         });
//                 //         reject();
//                 //     },
//                 // });
//             }
//         });
//     }
// }
