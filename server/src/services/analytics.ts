export function countWordsWithNumbers(text: string): number {
  if (!text) return 0;

  const matches = text.match(/\b(?:\d+\w*|\w*\d+)\b/g) || [];
  return matches.length;
}

export function countCapitalWords(text: string): number {
  if (!text) return 0;

  const matches = text.match(/\b[A-Z][a-z]*\b/g) || [];
  return matches.length;
}
