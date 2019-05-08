import {
    readFileSync as read,
    writeFileSync as write,
    readdirSync as ls
} from 'fs'
import path from 'path'
import uglify from 'uglify-es'

const currentFile = decodeURI(import.meta.url).replace(/^file:\/+/, '/');
const srcDir = path.resolve(currentFile, '..', 'src');
const distDir = path.resolve(srcDir, '..', 'dist');

function minify(src){
    const minified = uglify.minify(src);
    if(minified.error) throw new Error(minified.error);
    return minified.code
}

ls(srcDir).forEach(fname => {
    const src = read(path.resolve(srcDir, fname), 'utf8');
    const minified = minify(src);
    write(path.resolve(distDir, fname), minified)
})
