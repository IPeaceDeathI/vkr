import { addSourceToVideo } from "@/shared/helpers";
import { PublishTargetAttributes } from "./target-attributes";

try {
    const videos = document.querySelectorAll(
        `[${PublishTargetAttributes.mediaVideo}]`
    ) as NodeListOf<HTMLFormElement>;

    videos.forEach((video) => {
        if (video.getAttribute("data-media-video-srctype") == "youTube") {
            if (video.getAttribute("data-media-video-cover") == "true") {
                const videoCover = video.previousElementSibling as HTMLElement;
                videoCover?.addEventListener("click", () => {
                    videoCover.style.display = "none";
                    const videoFrame = video.firstChild as HTMLElement;
                    const videoSrc =
                        video.getAttribute("data-media-video-src") ?? "";
                    videoFrame?.setAttribute("src", videoSrc);
                });
            }
        }
        if (video.getAttribute("data-media-video-srctype") == "download") {
            if (video.getAttribute("data-media-video-cover") == "true") {
                const videoCover = video.previousElementSibling as HTMLElement;
                videoCover?.addEventListener("click", () => {
                    videoCover.style.display = "none";
                    const videoTag = video.firstChild as HTMLMediaElement;
                    const videoSrc =
                        video.getAttribute("data-media-video-src") ?? "";
                    addSourceToVideo(videoTag, videoSrc);
                    videoTag.play();
                });
            }
            if (video.getAttribute("data-media-video-autoplay") == "true") {
                const videoTag = video.firstChild as HTMLMediaElement;
                videoTag.muted = true;
                videoTag.setAttribute("autoplay", "true");
                if (video.getAttribute("data-media-video-cycle") == "true") {
                    videoTag.setAttribute("loop", "true");
                    videoTag.removeAttribute("controls");
                }
            }
        }
    });

    // let player: any;
    // const tag = document.createElement("script");

    // tag.src = "https://www.youtube.com/iframe_api";
    // const firstScriptTag = document.getElementsByTagName("script")[0];
    // firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    // const onYouTubeIframeAPIReady = function () {
    //     player = new YT.Player("tmpid", {
    //         height: "360",
    //         width: "640",
    //         videoId: "M7lc1UVf-VE",
    //         events: {
    //             onReady: onPlayerReady,
    //         },
    //     });
    // };

    // // 4. The API will call this function when the video player is ready.
    // const onPlayerReady = function (event: any) {
    //     event.target.playVideo();
    // };
    // const playVideo = function () {
    //     // const cover = this.$refs.noksVideoCover as HTMLElement;
    //     // const video = this.$refs.noksVideo as HTMLMediaElement;
    //     // cover.style.opacity = "0";
    //     // video.play();
    // };
} catch (error) {
    console.error(error);
}
