const path = require("path");
module.exports = {
    mode: "development",
    entry: ["./src/published_main.ts"],
    output: {
        filename: "PublishedPage.js",
        path: path.resolve("dist/js"),
    },

    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 200,
        poll: 1000,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname + "/src"),
        },
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "css/",
                            name: "index.min.css",
                        },
                    },
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
};
