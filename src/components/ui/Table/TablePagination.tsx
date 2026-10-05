import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: TablePaginationProps) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const handlePrevious = () => {
    if (!isFirstPage && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-3">
      <p className="text-sm text-text-secondary">
        Page{" "}
        <span className="font-medium text-text-primary">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-medium text-text-primary">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isFirstPage || disabled}
          aria-label="Previous page"
          className="
            inline-flex items-center justify-center
            rounded-lg
            border border-border
            bg-surface
            p-2
            text-text-secondary
            transition-all duration-200
            hover:border-primary
            hover:text-primary
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isLastPage || disabled}
          aria-label="Next page"
          className="
            inline-flex items-center justify-center
            rounded-lg
            border border-border
            bg-surface
            p-2
            text-text-secondary
            transition-all duration-200
            hover:border-primary
            hover:text-primary
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}