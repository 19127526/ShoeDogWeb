const fs = require('fs');


const FOLDER = `./public/cache/cache.txt`;

class FileCache {
    async getCache(key) {
        try {
            if (!fs.existsSync(FOLDER)) {
                return null
            }
            return new Promise((resolve, reject) => {
                fs.readFile(FOLDER, 'utf8', async function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    const result = JSON.parse(data)
                    resolve(result?.[key]);
                    return await result?.[key]
                });
            });

        } catch (e) {
            throw e;
        }
    }

    async setCache(key, data) {
        try {
            // if (!fs.existsSync(FOLDER)) {
            //     fs.mkdirSync(FOLDER, {recursive: true});
            // }
            const result = {
                [key]: data
            }
            return new Promise(async (resolve, reject) => {
                await fs.writeFile(FOLDER, JSON.stringify(result), function (err, data) {
                    if (err) reject(err)
                    console.log('write cache successfully');
                    return resolve(data);
                });
            });

        } catch (e) {
            throw e;
        }
    }
}

module.exports = FileCache