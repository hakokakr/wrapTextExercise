const wrapText = require("../dist/HarjoitteluTS");

describe("wrapText", () => {
    it("Shouldn't modify, sentences are shorter than given number", () => {
        // assertions
        const testString = "Text text text text text";
        const givenNumber = 100;
        const textShouldBe = "Text text text text text";
        const modifiedShouldBe = false;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Should wrap the given text to maximum of given number of characters", () => {
        // assertions
        const testString = "Text text text text text";
        const givenNumber = 10;
        const textShouldBe = "Text text\ntext text\ntext";
        const modifiedShouldBe = true;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't modify the the given string, because given number <= 0", () => {
        // assertions
        const testString = "Text text text text text";
        const givenNumber = 0;
        const textShouldBe = "Text text text text text";
        const modifiedShouldBe = false;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't modify the the given string, because given number <= 0", () => {
        // assertions
        const testString = "Text text text text text";
        const givenNumber = -1;
        const textShouldBe = "Text text text text text";
        const modifiedShouldBe = false;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't modify the the given string, because given number <= 0 (string is empty)", () => {
        // assertions
        const testString = "";
        const givenNumber = 1;
        const textShouldBe = "";
        const modifiedShouldBe = false;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Should wrap the given text to maximum of given number of characters", () => {
        // assertions
        const testString = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            "Turpis egestas maecenas pharetra convallis posuere morbi.",
            "Libero enim sed faucibus turpis in eu mi bibendum.",
            "Etiam erat velit scelerisque in dictum.",
            "Id leo in vitae turpis massa sed elementum."
        ].join(" "); // long text without any line breaks or code blocks
        const givenNumber = 75;
        const textShouldBe = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", 
            "tempor incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas", 
            "pharetra convallis posuere morbi. Libero enim sed faucibus turpis in eu mi", 
            "bibendum. Etiam erat velit scelerisque in dictum. Id leo in vitae turpis", 
            "massa sed elementum."
        ]. join("\n");
        const modifiedShouldBe = true;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't wrap the long code block", () => {
        // assertions
        const testString = [ 
            "Lorem ipsum",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum"
        ].join("\n"); // short text with line breaks and with long code block in the middle of the plain text
        const givenNumber = 20;
        const textShouldBe = [ 
            "Lorem ipsum",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum"
        ].join("\n");
        const modifiedShouldBe = false;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't modify anything, because includes a codeblock and text is written without line breaks before code block", () => {
        // assertions
        const testString = "Lorem ipsum```print(\"hello world hello world hello world\")```Lorem ipsum"
        // editor doesn't consider this as a codeblock, user's editing might be in progress
        const givenNumber = 20;
        const textShouldBe = "Lorem ipsum```print(\"hello world hello world hello world\")```Lorem ipsum"
        const modifiedShouldBe = false;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        const testString = [ 
            "Lorem ipsum",
            "Lorem ipsum",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum",
            "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
        ].join("\n"); // text with line breaks and with long code block in the middle of the plain text
        const givenNumber = 12;
        const textShouldBe = [ 
            "Lorem ipsum",
            "Lorem ipsum",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum",
            "Lorem ipsum",
            "lorem ipsum",
            "lorem ipsum",
            "lorem ipsum",
            "lorem ipsum"
        ].join("\n");
        const modifiedShouldBe = true;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        const testString = [ 
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
        ].join("\n"); // text with line breaks and with long code block in the beginning of the plain text
        const givenNumber = 12;
        const textShouldBe = [ 
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
            "lorem ipsum",
            "lorem ipsum",
            "lorem ipsum",
            "lorem ipsum"
        ].join("\n");
        const modifiedShouldBe = true;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        const testString = "Lorem ipsum\nLorem ipsum\nLorem ipsum\nLorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum\n```print(\"hello world hello world hello world\")```";
        const givenNumber = 12;
        const textShouldBe = "Lorem ipsum\nLorem ipsum\nLorem ipsum\nLorem ipsum\nlorem ipsum\nlorem ipsum\nlorem ipsum\nlorem ipsum\n```print(\"hello world hello world hello world\")```";
        // first just plain text, last code block
        const modifiedShouldBe = true;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't wrap simultaneous code blocks", () => {
        // assertions
        const testString = [ 
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
        ].join("\n");
        const givenNumber = 12;
        const textShouldBe = [ 
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```"
        ].join("\n");
        const modifiedShouldBe = false;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        const testString = [ 
            "Lorem ipsum lorem ipsum lorem ipsum",
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum lorem ipsum lorem ipsum"
        ].join("\n");
        const givenNumber = 12;
        const textShouldBe = [ 
            "Lorem ipsum", 
            "lorem ipsum", 
            "lorem ipsum",
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum", 
            "lorem ipsum", 
            "lorem ipsum"
        ].join("\n");
        const modifiedShouldBe = true;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 

     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        const testString = [ 
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum lorem ipsum lorem ipsum",
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum lorem ipsum lorem ipsum"
        ].join("\n");
        const givenNumber = 12;
        const textShouldBe = [ 
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum", 
            "lorem ipsum", 
            "lorem ipsum",
            "```print(\"hello world hello world hello world\")```",
            "```print(\"hello world hello world hello world\")```",
            "Lorem ipsum", 
            "lorem ipsum", 
            "lorem ipsum"
        ].join("\n");
        const modifiedShouldBe = true;
        // test
        const result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 
});