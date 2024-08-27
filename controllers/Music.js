const fs = require('fs');
const path = require('path');
const os = require("os");

const musicDir = path.join(os.homedir(), "Music");
const musicFileExtensions = ["mp3", "wav", "flac", "aac", "ogg", "wma", "alac", "midi", "aif"];

async function listSongs() {
    return new Promise((resolve, reject) => {
        fs.readdir(musicDir, (err, files) => {
            if (err) {
                return reject(err);
            }

            const musicFiles = files.filter(file => {
                const ext = path.extname(file).toLowerCase().slice(1);

                if (musicFileExtensions.includes(ext)) return true
            })

            resolve(musicFiles);
        })
    })
}

async function  getFileData(filepath) {
    return new Promise((resolve, reject) => {

        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(err);
            }

            resolve(data);
        })

    })
}


module.exports = {
    listSongs,
    getFileData
}

