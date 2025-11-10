// Converts any string to kebab-case IDs for URLs and object keys
export function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove punctuation
    .trim()
    .replace(/\s+/g, "-");        // replace spaces with dashes
}
