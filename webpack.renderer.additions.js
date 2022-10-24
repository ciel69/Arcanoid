const { di } = require("@wessberg/di-compiler");

module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    // ...
                    getCustomTransformers: program => di({program})
                }
            }
        ]
    }
}
