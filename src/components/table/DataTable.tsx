'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns: props.columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-background overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={'cursor-pointer'}
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
                onClick={() => props.onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className={'p-4 text-sm'} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="text-muted-foreground h-24 text-center"
                colSpan={props.columns.length}
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
