export default function titleReplacer(title: string): string {
  return title
    .trim() // remove any extra spaces
    .replace(/&nbsp;/g, ' ') // replace html spaces
    .replace(/&lt;/g, '<') // replace html less-than
    .replace(/&gt;/g, '>') // replace html greater-than
    .replace(/\n/g, '') // remove line-breaks
}
