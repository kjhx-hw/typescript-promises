#!/usr/bin/env node

const fs = require('fs');

var args = process.argv.slice(2);
console.log('Scanning directory "' + args[0] + '" for files of type "' + args[1] + '"\n');

async function scanDirectory(dir:string) {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
        const file_stat = await fs.promises.stat(dir + "/" + file);
        if (file_stat.isFile()) {
            if (file.endsWith(args[1])) {
                console.log(file);
            }
        } else if (file_stat.isDirectory()) {
            scanDirectory(dir + '/' + file);
        }
    }
}

scanDirectory(args[0]);