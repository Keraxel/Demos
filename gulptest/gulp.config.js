module.exports = function () {
    'use strict';

    const buildPath = './dist/';

    var config = {
        buildPath: buildPath,
        buildCssPath: buildPath + 'css/',

        lessBuildFiles: [
            './src/less/*.less'
        ],

        lessWatchFiles: [
            './src/less/**/*.less'
        ]
    };

    return config;
}
