export const setAsyncInterval = (cb: () => boolean, interval: number) => {
    return new Promise<void>((resolve, reject) => {
        const intervalId = setInterval(() => {
            try {
                if (cb()) {
                    clearInterval(intervalId);
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        }, interval);
    });
};
export const setAsyncTimeout = (timeout: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
};
