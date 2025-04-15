const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath:
        process.env.NOKS_ENV === "dev"
            ? "/public"
            : "/constructor2/analytics/dist",
    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        },
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                // Drop Options API from bundle
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
            }),
        ],
    },
    lintOnSave: false,
});
