import { ColumnDef, flexRender, getCoreRowModel, Row, RowData, useReactTable } from "@tanstack/react-table";

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, ReactElement, useState } from "react";
import { Skeleton } from "@heroui/skeleton";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: {
      header?: string;
      cell?: string;
    };
    getRowSpan?: (options: { row: Row<TData>; rowIndex: number; table: ReturnType<typeof useReactTable<TData>> }) => number;
  }
}

type DragHandleProps = {
  dragHandleAttributes: ReturnType<typeof useSortable>["attributes"];
  dragHandleListeners: ReturnType<typeof useSortable>["listeners"];
  setActivatorNodeRef: ReturnType<typeof useSortable>["setActivatorNodeRef"];
};

const DraggableRow = ({ row, containerId, children }: { row: any; containerId: string; children: (props: DragHandleProps) => React.ReactNode }) => {
  const { attributes, listeners, setActivatorNodeRef, setNodeRef, transform, transition } = useSortable({
    id: `${containerId}-${row.original.id}`,
    data: { containerId, rowId: row.original.id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b">
      {children({
        dragHandleAttributes: attributes,
        dragHandleListeners: listeners,
        setActivatorNodeRef,
      })}
    </tr>
  );
};

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  expandedIndex?: number;
  expandedEl?: ReactElement;
  onRowClick?: (data: TData & { rowIndex: number }) => void;
  className?: string;
  hideHeader?: boolean;
  id?: string;
  draggable?: boolean;
  onDragEnd?: (args: { activeId: string; overId: string; fromGroupId: string; toGroupId: string }) => void;
};

export function DataTable<TData extends { id: string | number }>({ columns, data, expandedIndex, onRowClick, expandedEl, className, hideHeader, id, draggable, onDragEnd }: DataTableProps<TData>) {
  // Ensure data is always an array to prevent undefined length errors
  const safeData = Array.isArray(data) ? data : [];

  const table = useReactTable({
    data: safeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderRow = (row: Row<TData>, rowIndex: number) => {
    const rowContent = (
      <>
        {row.getVisibleCells().map((cell) => {
          const rowSpan = cell.column.columnDef.meta?.getRowSpan?.({ row, rowIndex, table }) ?? 1;
          const isWithinMergedRow = rowSpan === 0;
          if (isWithinMergedRow) return null;

          return (
            <TableCell key={cell.id} className={cn("truncate px-1 sm:px-2", cell.column.columnDef.meta?.className?.cell)} rowSpan={rowSpan}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
        })}
      </>
    );

    const onClick = () => {
      onRowClick?.({ rowIndex, ...(row.original as TData) });
    };

    const content = draggable ? (
      <DraggableRow row={row} key={row.id} containerId={id as string}>
        {({ dragHandleAttributes, dragHandleListeners, setActivatorNodeRef }) => (
          <>
            <TableCell className="px-1">
              <button {...dragHandleAttributes} {...dragHandleListeners} ref={setActivatorNodeRef} className="cursor-grab active:cursor-grabbing">
                <IconGripVertical size={14} />
              </button>
            </TableCell>
            {row.getVisibleCells().map((cell) => {
              const rowSpan = cell.column.columnDef.meta?.getRowSpan?.({ row, rowIndex, table }) ?? 1;
              const isWithinMergedRow = rowSpan === 0;
              if (isWithinMergedRow) return null;

              return (
                <TableCell key={cell.id} className={cn("truncate px-1 sm:px-2", cell.column.columnDef.meta?.className?.cell)} rowSpan={rowSpan}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </>
        )}
      </DraggableRow>
    ) : (
      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={cn(onRowClick && "cursor-pointer")} onClick={onClick}>
        {rowContent}
      </TableRow>
    );

    return (
      <Fragment key={row.id}>
        {content}
        <AnimatePresence>
          {expandedIndex === rowIndex && (
            <motion.tr>
              <td colSpan={columns.length}>
                <motion.div
                  initial={{ height: 0, paddingBlock: 0 }}
                  animate={{ height: "auto", paddingBlock: "8px" }}
                  exit={{ height: 0, paddingBlock: 0 }}
                  className="dark:bg-darkBorder bg-lightBorder p-2 overflow-hidden"
                >
                  {expandedEl}
                </motion.div>
              </td>
            </motion.tr>
          )}
        </AnimatePresence>
      </Fragment>
    );
  };

  return (
    <div className={cn("rounded-md p-0 md:p-2", className)}>
      <Table className="text-xs">
        {!hideHeader && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {draggable && <TableHead />}
                {headerGroup.headers.map((header) => {
                  const columnRelativeDepth = header.depth - header.column.depth;
                  if (columnRelativeDepth > 1) return null;
                  const rowSpan = header.isPlaceholder ? (header.getLeafHeaders().at(-1)?.depth ?? 0) - header.depth : 1;
                  return (
                    <TableHead
                      colSpan={header.colSpan}
                      rowSpan={rowSpan}
                      key={header.id}
                      className={cn("whitespace-nowrap font-body-10-500 sm:font-body-12-500", header.column.columnDef.meta?.className?.header)}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          <SortableContext items={table?.getRowModel()?.rows?.length ? table?.getRowModel()?.rows?.map((row) => `${id}-${row.original.id}`) : []} strategy={verticalListSortingStrategy}>
            {table?.getRowModel()?.rows?.map((row, i) => renderRow(row, i)) ?? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </SortableContext>
        </TableBody>
      </Table>
    </div>
  );
}

export const TableSkeleton = ({ rows, columns }: { rows: string[] | number; columns: string[] | number }) => {
  const columnsArray: string[] = typeof columns === "number" ? Array.from({ length: columns }) : columns;
  const rowsArray: string[] = typeof rows === "number" ? Array.from({ length: rows }) : rows;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columnsArray.map((colSize, i) => (
            <TableHead key={i} className={cn(colSize ?? "")}>
              <Skeleton className="h-4 rounded-lg w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowsArray.map((rowSize, i) => (
          <TableRow key={i}>
            {columnsArray.map((_, i) => (
              <>
                <TableHead key={i} className={cn("py-2", rowSize ?? "h-10")}>
                  <Skeleton className="w-full rounded-lg h-full" />
                </TableHead>
              </>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
