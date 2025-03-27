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

const faInputFontPath = path.resolve(projectRoot, "node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2");
const faOutputFontPath = path.resolve(__dirname, "build/webfonts/fa-regular-400.woff2");

const faInputCSSPath = path.resolve(projectRoot, "node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css");
const faFontFaceInputCSSPath = path.resolve(projectRoot, "node_modules/@fortawesome/fontawesome-free/css/regular.min.css");
const faOutputCSSPath = path.resolve(__dirname, "build/css/fontawesome.min.css");

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

// Concatenate CSS files
try {
    const fontawesomeCSS = fs.readFileSync(faInputCSSPath, "utf8");
    const regularCSS = fs.readFileSync(faFontFaceInputCSSPath, "utf8");
    const concatenatedCSS = `${fontawesomeCSS}\n${regularCSS}`;

    fs.writeFileSync(faOutputCSSPath, concatenatedCSS, "utf8");
    console.log("Fontawesome CSS files concatenated successfully to:", faOutputCSSPath);
} catch (err) {
    console.error("Error concatenating css files:", err);
}