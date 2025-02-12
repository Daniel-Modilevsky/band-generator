import {
  countWordsWithNumbers,
  countCapitalWords,
} from "../services/analytics.ts";

describe("countWordsWithNumbers", () => {
  test("should return correct count for words with numbers", () => {
    const text =
      "With a deep appreciation for the classic rock legends of the 60s and 70s, this band keeps the spirit of old-school rock alive.";
    expect(countWordsWithNumbers(text)).toBe(2);
  });

  test("should return 0 when no words contain numbers", () => {
    const text = "This is a simple sentence with no numbers.";
    expect(countWordsWithNumbers(text)).toBe(0);
  });

  test("should count standalone numbers", () => {
    const text = "The years 1990 and 2020 were significant.";
    expect(countWordsWithNumbers(text)).toBe(2);
  });

  test("should count numbers inside words", () => {
    const text = "Version1 and GenX are examples of words with numbers.";
    expect(countWordsWithNumbers(text)).toBe(1);
  });

  test("should handle an empty string", () => {
    expect(countWordsWithNumbers("")).toBe(0);
  });

  test("should handle special cases", () => {
    const text = "1234 5678 year2000 event99 thisText123";
    expect(countWordsWithNumbers(text)).toBe(5);
  });
});

describe("countCapitalWords", () => {
  test("should count words starting with capital letters", () => {
    const text = "This is a Test Sentence With Capitalized Words.";
    expect(countCapitalWords(text)).toBe(5);
  });

  test("should return 0 when no capital words are present", () => {
    const text = "this is a lowercase sentence.";
    expect(countCapitalWords(text)).toBe(0);
  });

  test("should count capital words even with punctuation", () => {
    const text = "Hello, world! This is a Test.";
    expect(countCapitalWords(text)).toBe(3);
  });

  test("should count single-letter capital words", () => {
    const text = "A B C D are letters.";
    expect(countCapitalWords(text)).toBe(4);
  });

  test("should handle an empty string", () => {
    expect(countCapitalWords("")).toBe(0);
  });

  test("should not count capital words inside mixed-case words", () => {
    const text = "TheWord JavaScript TypeScript isAwesome but NotAwesome.";
    expect(countCapitalWords(text)).toBe(3);
  });
});
