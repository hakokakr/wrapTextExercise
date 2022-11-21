const wrapText = require("../dist/HarjoitteluTS");

describe("wrapText", () => {
    it("Shouldn't modify, sentences are shorter than given number", () => {
        // assertions
        var givenNumber = 100;
        var testString = `Text text text text text`;
        var textShouldBe = testString.slice();
        var modifiedShouldBe = false;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Should wrap the given text to maximum of given number of characters", () => {
        // assertions
        var givenNumber = 10;
        var testString = `Text text text text text`;
        var textShouldBe = `Text text\ntext text\ntext`;
        var modifiedShouldBe = true;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't modify the the given string, because given number <= 0", () => {
        // assertions
        var givenNumber = 0;
        var testString = `Text text text text text`;
        var textShouldBe = testString.slice();
        var modifiedShouldBe = false;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't modify the the given string, because given number <= 0", () => {
        // assertions
        var givenNumber = -1;
        var testString = `Text text text text text`;
        var textShouldBe = testString.slice();
        var modifiedShouldBe = false;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't modify the the given string, because given number <= 0 (string is empty)", () => {
        // assertions
        var givenNumber = 1;
        var testString = ``;
        var textShouldBe = ``;
        var modifiedShouldBe = false;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Should wrap the given text to maximum of given number of characters", () => {
        // assertions
        var givenNumber = 75;
var testString = 
`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas pharetra convallis posuere morbi. Libero enim sed faucibus turpis in eu mi bibendum. Etiam erat velit scelerisque in dictum. Id leo in vitae turpis massa sed elementum.`
// long text without any line breaks or code blocks
var textShouldBe = 
`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas
pharetra convallis posuere morbi. Libero enim sed faucibus turpis in eu mi
bibendum. Etiam erat velit scelerisque in dictum. Id leo in vitae turpis
massa sed elementum.`
        var modifiedShouldBe = true;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't wrap the long code block", () => {
        // assertions
        var givenNumber = 20;
var testString = 
`Lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum`
// short text with line breaks and with long code block in the middle of the plain text
var textShouldBe = testString.slice();
        var modifiedShouldBe = false;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't modify anything, because includes a codeblock and text is written without line breaks before code block", () => {
        // assertions
        var givenNumber = 20;
var testString = 
`Lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum`
// editor doesn't consider this as a codeblock, user's editing might be in progress
var textShouldBe = testString.slice();
        var modifiedShouldBe = false;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        var givenNumber = 12;
var testString = 
`Lorem ipsum
Lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum
Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`
// text with line breaks and with long code block in the middle of the plain text
var textShouldBe = 
`Lorem ipsum
Lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum
Lorem ipsum
lorem ipsum
lorem ipsum
lorem ipsum
lorem ipsum`
        var modifiedShouldBe = true;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        var givenNumber = 12;
var testString =
`\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum
Lorem ipsum
Lorem ipsum
Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`
// starts with code block, rest is plain text
var textShouldBe = 
`\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum
Lorem ipsum
Lorem ipsum
Lorem ipsum
lorem ipsum
lorem ipsum
lorem ipsum
lorem ipsum`
        var modifiedShouldBe = true;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        var givenNumber = 12;
var testString = 
`Lorem ipsum
Lorem ipsum
Lorem ipsum
Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\``;
// starts with plain text, ends in code block
var textShouldBe = 
`Lorem ipsum
Lorem ipsum
Lorem ipsum
Lorem ipsum
lorem ipsum
lorem ipsum
lorem ipsum
lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\``;
        var modifiedShouldBe = true;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't wrap simultaneous code blocks", () => {
        // assertions
        var givenNumber = 12;
var testString = 
`\`\`\`
    print("hello world hello world hello world")
\`\`\`
\`\`\`
    print("hello world hello world hello world")
\`\`\`
\`\`\`
    print("hello world hello world hello world")
\`\`\``
// multiple code blocks, doesn't need wrapping
var textShouldBe = testString.slice();
        var modifiedShouldBe = false;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        var givenNumber = 12;
var testString =
`Lorem ipsum lorem ipsum lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum lorem ipsum lorem ipsum`
// Code block inside wrappable lines
var textShouldBe = 
`Lorem ipsum
lorem ipsum
lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum
lorem ipsum
lorem ipsum`
        var modifiedShouldBe = true;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 


     it("Shouldn't wrap code block insides, but should wrap the texts before and after it", () => {
        // assertions
        var givenNumber = 12;
var testString = 
`\`\`\`
    print("hello world hello world hello world")
\`\`\`
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum lorem ipsum lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum lorem ipsum lorem ipsum`
// Two simultaneous code blocks in the beginning, wrappable text and one code block in the middle
var textShouldBe = 
`\`\`\`
    print("hello world hello world hello world")
\`\`\`
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum
lorem ipsum
lorem ipsum
\`\`\`
    print("hello world hello world hello world")
\`\`\`
Lorem ipsum
lorem ipsum
lorem ipsum`
        var modifiedShouldBe = true;
        // test
        var result = wrapText(testString, givenNumber);
        expect(result.s).toBe(textShouldBe);
        expect(result.modified).toBe(modifiedShouldBe);
     }); 
});