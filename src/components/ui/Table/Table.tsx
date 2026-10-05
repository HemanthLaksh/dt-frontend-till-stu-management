import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: keyof T;
  emptyMessage?: string;
  className?: string;
}

export default function Table<T>({
  columns,
  data,
  rowKey,
  emptyMessage = "No data available.",
  className = "",
}: TableProps<T>) {
  return (
    <div
      className={`
        w-full overflow-x-auto
        rounded-xl border border-border
        bg-surface
        ${className}
      `}
    >
      <table className="w-full min-w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-secondary-light">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`
                  px-4 py-3
                  text-xs font-semibold uppercase tracking-wide
                  text-text-secondary
                  ${column.className ?? ""}
                `}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="
                  px-4 py-10
                  text-center
                  text-sm text-text-muted
                "
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={String(row[rowKey])}
                className="
                  border-b border-border
                  last:border-b-0
                  transition-colors
                  hover:bg-secondary-light
                "
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`
                      px-4 py-3
                      text-sm text-text-primary
                      ${column.className ?? ""}
                    `}
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key as keyof T] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}