/**
 * Wrap the given text to lines of max n characters splitting from space.
 * Doesn't modify code block or TeX block contents.
 */
function wrapText(s: string, n: number) {
    if (n <= 0) {
        return {modified: false, s: s};
    }
    let rx: RegExp = /(```[^```]*```|\$\$[^\$\$]*\$\$)/g; // block contents that shouldn't be modified
    const sepRxLines = s.toString().split(rx);
    let lines = [];
    let nextToRx: Boolean = false;
    for (let i = 0; i < sepRxLines.length; i++) {
        let element: string = sepRxLines[i];
        if (!element.match(rx)) { 
            if (nextToRx && element.indexOf("\n") == 0) { 
                element = element.slice(1); 
            }
            element.split("\n").forEach(piece => {
                lines.push(piece);
            }); 
            nextToRx = false;
            continue;
        }
        if (lines[lines.length - 1] == "") { lines.pop(); }
        lines.push(element);
        nextToRx = true;
    } // splits by line break, ignores empty lines around blocks
    let needJoin = false;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let sep = "";
        if (line.length > n) {
            lines[i] = "";
            while (true) {
                let ignore = false
                let p = -1;
                ignore = !!line.match(rx)
                if (line.length > n && !ignore) {
                    p = line.lastIndexOf(" ", n);
                    if (p < 0) {
                        p = line.indexOf(" ");
                    } // long line
                }
                if (ignore) { 
                    sep = "";
                }
                if (p < 0) {
                    lines[i] += sep + line;
                    break;
                } // line is as short as it needs
                lines[i] += sep + line.substring(0, p);
                line = line.substring(p + 1);
                if (
                    i + 1 < lines.length &&
                    lines[i + 1].length > 0 &&
                    !" 0123456789-".includes(lines[i + 1][0])
                    ) {
                        lines.splice(i + 1, 0, line);
                        needJoin = true;
                        break;
                    } // remaining line placed to the next index
                sep = "\n";
                needJoin = true;
            }
        }
    }
    if (needJoin) {
        return {modified: true, s: lines.join("\n")};
    }
    return {modified: false, s: s};
}

module.exports = wrapText;