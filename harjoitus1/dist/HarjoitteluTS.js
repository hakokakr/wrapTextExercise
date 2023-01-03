"use strict";
/**
 * Wraps given text to lines, to maximum of given n characters.
 * Doesn't modify code block contents, TeX block contents, code lines (lines starting with 4 spaces)
 * or lines starting with hyphen.
 *
 * @param text - Text to be wrapped
 * @param maxLineLength - Maximum line length
 * @param wrapStart - Wrapping start point (might be useful to give the cursor position[character length])
 * @returns Was there any modifications & possibly wrapped text
 */
function wrapText(text, maxLineLength, wrapStart = 0) {
    // If the given max line length is not desired: don't modify
    if (maxLineLength <= 0 || wrapStart < 0 || text.length < wrapStart) {
        return { modified: false, s: text };
    }
    // Saves everything before wrap starting point
    let result = "" + text.substring(0, wrapStart);
    let modified = false;
    // Contents that shouldn't be modified
    let rx = /(^```\n[\s\S]*?\n```|^\$\$\n[\s\S]*?\n\$\$|^~~~\n[\s\S]*?\n~~~|^    .*|^\s*-.*|^\t.*$)/gm;
    // Splits text into wrappable and non-wrappable blocks
    const sections = text.substring(wrapStart).split(rx);
    // Loops through all blocks
    for (const section of sections) {
        if (rx.test(section)) {
            // Adds contents that shouldn't be modified directly into result
            result += section;
        }
        else {
            // Breaks the block to lines
            const lines = section.split("\n");
            // Loops through all lines
            for (let i = 0; i < lines.length; i++) {
                // Wraps the text if needed and adds to result
                const wrappedSection = wrapSection(lines[i], maxLineLength);
                result += wrappedSection.s;
                // Keeps track of modifications
                modified = modified || wrappedSection.modified;
                // Adds line break if it's not the last line
                if (i < lines.length - 1) {
                    result += "\n";
                }
            }
        }
    }
    // Returns boolean and text
    return { modified: modified, s: result };
}
/**
 * Wraps all the given text to a maximum of given number of characters.
 * Doesn't split long words.
 *
 * @param text - Text to be wrapped
 * @param maxLineLength - Maximum line length
 * @returns Was there any modifications & possibly wrapped text
 */
function wrapSection(text, maxLineLength) {
    let modified = false;
    let currentLine = "";
    let result = "";
    let sep = "";
    // Breaks wrappable block into words
    const words = text.split(" ");
    // Loops through the words
    for (const word of words) {
        // Checks if adding a word to the current line exceeds the max line length
        if (maxLineLength < currentLine.length + word.length + sep.length) {
            // Exceeds the max line length: adds current line to result with line break & clears current line
            result += currentLine + "\n";
            currentLine = "";
            sep = "";
            modified = true;
        }
        // Adds the word to current line
        currentLine += sep + word;
        sep = " ";
    }
    // Adds the last line to result
    result += currentLine;
    // Returns boolean and text
    return { modified: modified, s: result };
}
module.exports = wrapText;
