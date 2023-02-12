const parseHtmlString = (htmlString: string) => {
  let parsed = ''
  parsed = htmlString.replace(/\[([^\[]+)\]\(([^\)]+)\)/g, (match: any, p1: string, p2: string) => {
    return `<a href="${p2}">${p1}</a>`;
  })
  parsed = parsed.replace(/`([^`]+)`/g, (match: any, p1: string) => {
    return `<code>${p1}</code>`
  })
  return parsed
}

export default parseHtmlString;