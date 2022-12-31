let myText = `Turpis in eu mi bibendum neque egestas congue quisque.
Should - wrap - this - even - if - there - is - hyphens -
Aliquam etiam erat velit scelerisque in dictum.`;
let myNum = 25;
console.log(wrapText(myText, myNum).s);
console.log(wrapText(myText, myNum).modified);

/**
 * Wraps given text to lines, to maximum of given n characters.
 * Doesn't modify code block contents, TeX block contents, code lines (lines starting with 4 spaces). 
 * 
 * @param text - Text to be wrapped
 * @param maxLineLength - Maximum line length
 * @param wrapStart - Wrapping start point (might be useful to give the cursor position[in characters])
 * @returns Was there any modifications & possibly wrapped text
 */
function wrapText(text: string, maxLineLength: number, wrapStart: number = 0) {
    // If the given max line length is not desired: don't modify
    if (maxLineLength <= 0) {
        return {modified: false, s: text};
    }

    // Saves everything before wrap starting point
    let result = "" + text.substring(0, wrapStart);
    let modified = false;

    // Contents that shouldn't be modified
    let rx: RegExp = /(```[^```]*```|\$\$[^\$\$]*\$\$|~~~[^~~~]*~~~|^    .*|^\s*-.*)/gm;

    // Splits text into wrappable and non-wrappable blocks
    const sections = text.substring(wrapStart).split(rx);

    // Loops through all blocks
    for (const section of sections) {
        if (rx.test(section)) {
            // Adds contents that shouldn't be modified directly into result
            result += section;
        } else {
            // Wraps the text if needed and adds to result
            const wrappedSection = wrapSection(section, maxLineLength);
            result += wrappedSection.s;
            // Keeps track of modifications
            modified = modified || wrappedSection.modified;
        }
    }

    // Returns boolean and text
    return {modified: modified, s: result};
}

/**
 * Wraps all the given text to a maximum of given number of characters.
 * Doesn't split long words.
 * 
 * @param text - Text to be wrapped
 * @param maxLineLength - Maximum line length
 * @returns Was there any modifications & possibly wrapped text
 */
function wrapSection(text: string, maxLineLength: number) {
    let modified = false;
    let currentLine = "";
    let result = "";
    let sep = "";

    // Breaks wrappable block into words
    const words = text.split(" ");

    // Loops through the words
    for (const word of words) {
        // Checks if adding a word to the current line exceeds the max line length
        if (currentLine.length + word.length > maxLineLength) {
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
    return {modified: modified, s: result};
}

module.exports = wrapText;