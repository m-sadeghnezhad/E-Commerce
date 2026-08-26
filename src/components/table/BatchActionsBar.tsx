import { Download, Trash2, X } from 'lucide-react'
import { Button } from '../ui/Button'

interface BatchActionsBarProps {
  selectedCount: number
  onDelete: () => void
  onExport: () => void
  onClear: () => void
}

export function BatchActionsBar({
  selectedCount,
  onDelete,
  onExport,
  onClear,
}: BatchActionsBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-brand-900 dark:bg-brand-950/30">
      <p className="text-sm font-medium text-brand-800 dark:text-brand-200">
        {selectedCount} {selectedCount === 1 ? 'order' : 'orders'} selected
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" size="sm" onClick={onExport}>
          <Download className="h-4 w-4" />
          Export Selected
        </Button>
        <Button variant="danger" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
          Delete Selected
        </Button>
        <Button variant="ghost" size="sm" onClick={onClear} aria-label="Clear selection">
          <X className="h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  )
}
