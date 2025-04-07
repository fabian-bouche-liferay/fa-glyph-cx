const fs = require("fs");
const path = require("path");

function findProjectRoot(dir) {
    let currentDir = dir;
    let lastFound = null;
    
    try {
        while (currentDir !== path.parse(currentDir).root) {
            if (fs.existsSync(path.join(currentDir, "package.json"))) {
                lastFound = currentDir;
            }
            currentDir = path.dirname(currentDir);
        }
    } catch (err) {
        console.error("Permission error while searching for project root:", err);
    }
    
    return lastFound || dir; // If no package.json is found, return the original directory
}

const projectRoot = findProjectRoot(__dirname);

/* Glyphicons */

const inputFontPath = path.resolve(projectRoot, "node_modules/glyphicons-only-bootstrap/fonts/glyphicons-halflings-regular.woff2");
const outputFontPath = path.resolve(__dirname, "build/fonts/glyphicons-halflings-regular.woff2");

const inputCSSPath = path.resolve(projectRoot, "node_modules/glyphicons-only-bootstrap/css/bootstrap.css");
const outputCSSPath = path.resolve(__dirname, "build/css/bootstrap.css");

// Ensure output directory exists
fs.mkdirSync(path.dirname(outputCSSPath), { recursive: true });
fs.mkdirSync(path.dirname(outputFontPath), { recursive: true });

// Copy font file
fs.copyFile(inputFontPath, outputFontPath, (err) => {
    if (err) {
        console.error("Error copying font file:", err);
        return;
    }
    console.log("Font file copied successfully to:", outputFontPath);
});

// Copy css file
fs.copyFile(inputCSSPath, outputCSSPath, (err) => {
    if (err) {
        console.error("Error copying css file:", err);
        return;
    }
    console.log("Font css copied successfully to:", outputCSSPath);
});

/* Fontawesome */

const faInputFontPath = path.resolve(__dirname, "assets/font-awesome-3.2.1/fontawesome-webfont.woff");
const faOutputFontPath = path.resolve(__dirname, "build/font/fontawesome-webfont.woff");

const faInputCSSPath = path.resolve(__dirname, "assets/font-awesome-3.2.1/font-awesome.min.css");
const faOutputCSSPath = path.resolve(__dirname, "build/css/font-awesome.min.css");

// Ensure output directories exist
fs.mkdirSync(path.dirname(faOutputCSSPath), { recursive: true });
fs.mkdirSync(path.dirname(faOutputFontPath), { recursive: true });

// Copy font file
fs.copyFile(faInputFontPath, faOutputFontPath, (err) => {
    if (err) {
        console.error("Error copying font file:", err);
        return;
    }
    console.log("Font file copied successfully to:", faOutputFontPath);
});

// Copy css file
fs.copyFile(faInputCSSPath, faOutputCSSPath, (err) => {
    if (err) {
        console.error("Error copying css file:", err);
        return;
    }
    console.log("Font css copied successfully to:", faOutputCSSPath);
});
