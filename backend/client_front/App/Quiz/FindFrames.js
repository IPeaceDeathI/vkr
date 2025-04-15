/**
 * класс для поиска фреймов квиза
 */
export class FindFrames {
    static #count_frames = null;
    /**
     * @returns {Array}
     */
    static find() {
        let res = document.querySelectorAll('iframe[src*="/quiz/show/"]');

        FindFrames.#count_frames = res.length;
        console.log("FindFrames.count", FindFrames.#count_frames);

        return res;
    }

    static getCount() {
        if (FindFrames.#count_frames === null) {
            FindFrames.find();
            return FindFrames.#count_frames;
        }
        return FindFrames.#count_frames;
    }
}
