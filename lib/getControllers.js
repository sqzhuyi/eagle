const fs = require('fs');
const path = require('path');

module.exports = function (config) {
    let dir = path.join(config._root, 'controllers');

    config.controllers = {};

    fs.readdir(dir, function (err, files) {
        files.forEach(function (f, i) {
            let ctl = require(path.join(dir, f));
            for (let a in Object.keys(ctl)) {
                if (a !== a.toLowerCase()) {
                    ctl[a.toLowerCase()] = ctl[a];
                    delete ctl[a];
                }
            }
            config.controllers[f.split('.')[0].toLowerCase()] = ctl;
        });
    });
};