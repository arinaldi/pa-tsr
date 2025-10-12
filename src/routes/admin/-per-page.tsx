import type { Table } from '@tanstack/react-table';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PER_PAGE } from '@/lib/constants';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

interface Props<TData> {
  table: Table<TData>;
}

export default function PerPage<TData>({ table }: Props<TData>) {
  return (
    <div className="flex items-center gap-x-2">
      <p className="font-medium text-sm">Rows per page</p>
      <Select
        onValueChange={(value) => table.setPageSize(Number(value))}
        value={`${table.getState().pagination.pageSize}`}
      >
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectPositioner side="top">
          <SelectContent>
            <SelectItem value={SMALL.toString()}>{SMALL}</SelectItem>
            <SelectItem value={MEDIUM.toString()}>{MEDIUM}</SelectItem>
            <SelectItem value={LARGE.toString()}>{LARGE}</SelectItem>
          </SelectContent>
        </SelectPositioner>
      </Select>
    </div>
  );
}
