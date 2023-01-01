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


   it("Shouldn't wrap at the beginning, because starting point is set farther", () => {
      // assertions
      var givenNumber = 10;
      var givenStartingPoint = 10;
      var testString = `Text text text text text`;
      var textShouldBe = `Text text text text\ntext`;
      var modifiedShouldBe = true;
      // test
      var result = wrapText(testString, givenNumber, givenStartingPoint);
      expect(result.s).toBe(textShouldBe);
      expect(result.modified).toBe(modifiedShouldBe);
   }); 


   it("Shouldn't modify, because starting point is set higher than text length", () => {
      // assertions
      var givenNumber = 10;
      var givenStartingPoint = 50;
      var testString = `Text text text text text`;
      var textShouldBe = testString.slice();
      var modifiedShouldBe = false;
      // test
      var result = wrapText(testString, givenNumber, givenStartingPoint);
      expect(result.s).toBe(textShouldBe);
      expect(result.modified).toBe(modifiedShouldBe);
   }); 


   it("Shouldn't modify, because starting point is set lower than 0", () => {
      // assertions
      var givenNumber = 10;
      var givenStartingPoint = -1;
      var testString = `Text text text text text`;
      var textShouldBe = testString.slice();
      var modifiedShouldBe = false;
      // test
      var result = wrapText(testString, givenNumber, givenStartingPoint);
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
      var textShouldBe = testString.slice();
      var modifiedShouldBe = false;
      // test
      var result = wrapText(testString, givenNumber);
      expect(result.s).toBe(textShouldBe);
      expect(result.modified).toBe(modifiedShouldBe);
   }); 


   it("Shouldn't modify code block", () => {
      // assertions
      var givenNumber = 10;
      var testString = 
`\`\`\`
code code code code code code code code
\`\`\``;
      var textShouldBe = testString.slice();
      var modifiedShouldBe = false;
      // test
      var result = wrapText(testString, givenNumber);
      expect(result.s).toBe(textShouldBe);
      expect(result.modified).toBe(modifiedShouldBe);
   }); 


   it("Shouldn't modify TeX block", () => {
      // assertions
      var givenNumber = 10;
      var testString = 
`$$
math math math math math math math math
$$`;
      var textShouldBe = testString.slice();
      var modifiedShouldBe = false;
      // test
      var result = wrapText(testString, givenNumber);
      expect(result.s).toBe(textShouldBe);
      expect(result.modified).toBe(modifiedShouldBe);
   }); 


   it("Shouldn't modify code line", () => {
      // assertions
      var givenNumber = 10;
      var testString = `    code code code code code code code code`;
      var textShouldBe = testString.slice();
      var modifiedShouldBe = false;
      // test
      var result = wrapText(testString, givenNumber);
      expect(result.s).toBe(textShouldBe);
      expect(result.modified).toBe(modifiedShouldBe);
   }); 


   it("Shouldn't modify the list", () => {
      // assertions
      var givenNumber = 10;
      var testString = 
`- text text text text text
   - text
   - text
- text text text text text
   - text`;
      var textShouldBe = testString.slice();
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


   it("Should wrap as described", () => {
      // assertions
      var givenNumber = 25;
      var testString = 
`Vulputate dignissim suspendisse in est ante in. Sit amet massa vitae tortor condimentum.
$$
2x+5 - 6547 + 1254645y - 1244324z + 31532 = 0
this math block's insides shouldn't be affected.
$$
\`\`\`
print("hello world hello world hello world")
print("hello world hello world hello world")
\`\`\`
Congue quisque egestas diam in arcu. Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum.
    print("hello world hello world hello world")
List of favourite animals. The list shouldn't be wrapped but the text before it should.
- Cat
   - Birman
   - Maine Coon
      - Peruvian
   - Sphynx
- Lynx
- Cheetah

Should - wrap - this - even - through - there - are - hyphens`;
      var textShouldBe =
`Vulputate dignissim
suspendisse in est ante
in. Sit amet massa vitae
tortor condimentum.
$$
2x+5 - 6547 + 1254645y - 1244324z + 31532 = 0
this math block's insides shouldn't be affected.
$$
\`\`\`
print("hello world hello world hello world")
print("hello world hello world hello world")
\`\`\`
Congue quisque egestas
diam in arcu. Ante metus
dictum at tempor commodo
ullamcorper a lacus
vestibulum.
    print("hello world hello world hello world")
List of favourite
animals. The list
shouldn't be wrapped but
the text before it
should.
- Cat
   - Birman
   - Maine Coon
      - Peruvian
   - Sphynx
- Lynx
- Cheetah

Should - wrap - this -
even - through - there -
are - hyphens`;
      var modifiedShouldBe = true;
      // test
      var result = wrapText(testString, givenNumber);
      expect(result.s).toBe(textShouldBe);
      expect(result.modified).toBe(modifiedShouldBe);
   }); 
});