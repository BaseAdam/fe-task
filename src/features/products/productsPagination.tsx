import type { ComponentProps } from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { formatProductCount } from "@/utils/format.ts"
import { getPageRange } from "@/utils/pagination.ts"

type ProductsPaginationProps = {
  currentPage: number
  pageCount: number
  productCount: number
  onPageChange: (page: number) => void
}

export function ProductsPagination({
  currentPage,
  pageCount,
  productCount,
  onPageChange,
}: ProductsPaginationProps) {
  const linkTo = (
    page: number,
    isDisabled = false
  ): ComponentProps<typeof PaginationLink> => ({
    href: `?page=${page}`,
    "aria-disabled": isDisabled || undefined,
    tabIndex: isDisabled ? -1 : undefined,
    onClick: (event) => {
      event.preventDefault()
      if (!isDisabled) onPageChange(page)
    },
  })

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:border-t md:bg-muted/50 md:p-4">
      <p className="text-xs text-muted-foreground">
        Strona {currentPage} z {pageCount} · {formatProductCount(productCount)}
      </p>
      <Pagination className="mx-0 w-full md:w-auto">
        <PaginationContent className="flex-wrap justify-center">
          <PaginationItem>
            <PaginationPrevious
              {...linkTo(currentPage - 1, currentPage === 1)}
            />
          </PaginationItem>
          {getPageRange(currentPage, pageCount).map((item, index) => (
            <PaginationItem
              key={item === "ellipsis" ? `ellipsis-${index}` : item}
            >
              {item === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  {...linkTo(item)}
                  isActive={item === currentPage}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              {...linkTo(currentPage + 1, currentPage === pageCount)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
