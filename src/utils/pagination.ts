export const PAGE_SIZE = 5

export function getPageCount(itemCount: number): number {
  return Math.max(1, Math.ceil(itemCount / PAGE_SIZE))
}

export function clampPage(page: number, pageCount: number): number {
  return Math.min(Math.max(page, 1), pageCount)
}

export function getPageItems<T>(items: readonly T[], page: number): T[] {
  const start = (page - 1) * PAGE_SIZE
  return items.slice(start, start + PAGE_SIZE)
}

export type PageRangeItem = number | "ellipsis"

export function getPageRange(
  currentPage: number,
  pageCount: number
): PageRangeItem[] {
  const pages = [1, currentPage - 1, currentPage, currentPage + 1, pageCount]
    .filter((page) => page >= 1 && page <= pageCount)
    .sort((a, b) => a - b)

  const range: PageRangeItem[] = []
  for (const page of new Set(pages)) {
    const previous = range.at(-1)
    if (typeof previous === "number" && page - previous > 1) {
      range.push("ellipsis")
    }
    range.push(page)
  }
  return range
}
