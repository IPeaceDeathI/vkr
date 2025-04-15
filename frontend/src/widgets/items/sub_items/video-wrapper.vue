<template>
    <div
        ref="noksVideoCover"
        v-if="params.cover"
        @click="playVideo"
        class="noks-video cover-image w-100 h-100"
        :style="{ backgroundImage: 'url(' + params.previewSrc + ')' }"
    >
        <div class="play-video-cover">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                width="52px"
                height="52px"
            >
                <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
        </div>
    </div>
    <template v-if="params.srcType === VideoSrcType.youTube">
        <div class="video-wrapper" v-bind="attributes">
            <iframe
                class="noks-video yt-video-frame"
                :src="videoSrc"
                frameborder="0"
                allowfullscreen
            />
        </div>
    </template>
    <template v-if="params.srcType === VideoSrcType.download">
        <div class="video-wrapper" v-bind="attributes">
            <video
                ref="noksVideo"
                class="noks-video custom-video"
                allowfullscreen
                preload="auto"
                controlslist="nodownload"
                disablepictureinpicture
                pip="false"
                controls
                v-bind="videoAttrs"
                :style="{
                    objectFit:
                        itemImageParams.commonStyles.backgroundSize == 'cover'
                            ? 'cover'
                            : 'contain',
                }"
            >
                <source
                    v-if="params.cover === false"
                    type="video/mp4"
                    :src="params.src"
                />
            </video></div
    ></template>
</template>
<script lang="ts">
import { PropType, VideoHTMLAttributes, defineComponent } from "vue";
import { ItemImageParams, MediaVideoParams, VideoSrcType } from "@/types";
import { PublishTargetAttributes } from "@/publish";

export default defineComponent({
    props: {
        params: {
            type: Object as PropType<MediaVideoParams>,
            required: true,
        },
        itemImageParams: {
            type: Object as PropType<ItemImageParams>,
            required: true,
        },
    },
    data() {
        return {
            VideoSrcType: VideoSrcType,
            play: false,
        };
    },
    mounted() {
        // console.log("params = ", this.params);
    },
    methods: {
        playVideo() {
            this.play = true;
            const cover = this.$refs.noksVideoCover as HTMLElement;
            const video = this.$refs.noksVideo as HTMLMediaElement;
            cover.style.opacity = "0";
            if (this.params.srcType == "download") {
                video.muted = true;
                video.play();
            }
        },
    },
    computed: {
        attributes(): {
            [PublishTargetAttributes.mediaVideo]: string;
            "data-media-video-cover": boolean;
            "data-media-video-src": string;
            "data-media-video-previewSrc": string;
            "data-media-video-srcType": VideoSrcType;
            "data-media-video-autoplay": boolean;
            "data-media-video-cycle": boolean;
        } {
            return {
                [PublishTargetAttributes.mediaVideo]: "",
                "data-media-video-cover": this.params.cover
                    ? this.params.cover
                    : false,
                "data-media-video-src": this.params.src,
                "data-media-video-previewSrc": this.params.previewSrc,
                "data-media-video-srcType": this.params.srcType,
                "data-media-video-autoplay": this.params.autoPlay,
                "data-media-video-cycle": this.params.cycleAndHideInterface,
            };
        },
        // videoParams: {
        //     get(): MediaVideoParams {
        //         return this.params;
        //     },
        //     set(value: MediaVideoParams) {
        //         this.$emit("onChange", value);
        //     },
        // },
        // videoCover: {
        //     get(): boolean {
        //         return this.params.cover ?? false;
        //     },
        //     set(value: boolean) {
        //         // eslint-disable-next-line vue/no-mutating-props
        //         this.params.cover = value;
        //     },
        // },
        videoSrc(): string {
            if (this.params.srcType === VideoSrcType.youTube) {
                if (this.params.cover === true) {
                    if (this.play === true) {
                        if (this.params.autoPlay === true) {
                            return this.params.src + "&autoplay=1&mute=1";
                        } else return this.params.src;
                    } else return "";
                } else if (this.params.autoPlay === true) {
                    if (this.params.cycleAndHideInterface === true) {
                        return (
                            this.params.src +
                            "&controls=0&loop=1&autoplay=1&mute=1"
                        );
                    } else return this.params.src + "&autoplay=1&mute=1";
                } else return this.params.src;
            } else {
                //  DEVELOP download videos after YT videos
                if (this.params.cover === true) {
                    if (this.play === true) {
                        return this.params.src;
                    } else return "";
                } else return this.params.src;
            }
        },
        videoAttrs(): VideoHTMLAttributes {
            if (this.params.autoPlay) {
                if (this.params.cycleAndHideInterface) {
                    return {
                        autoplay: true,
                        muted: true,
                        loop: true,
                        playsinline: true,
                        controls: false,
                    };
                } else
                    return {
                        autoplay: true,
                        muted: true,
                        playsinline: true,
                    };
            } else {
                return {};
            }
        },
        autoplay(): boolean {
            return this.params.autoPlay;
        },
    },
    watch: {
        autoplay(oldVal, newVal) {
            if (newVal) {
                if (this.params.srcType === VideoSrcType.download) {
                    const video = this.$refs.noksVideo as HTMLMediaElement;
                    video.muted = true;
                }
            }
        },
    },
});
</script>
<style lang="scss"></style>
