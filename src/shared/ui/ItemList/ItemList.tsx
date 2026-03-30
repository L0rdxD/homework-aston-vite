import type { ReactNode } from 'react'

type ItemListProps<T> = {
  items: T[]
  getKey: (item: T) => string | number
  renderItem: (item: T) => ReactNode
  className?: string
  emptyState?: ReactNode
}

export default function ItemList<T>({
  items,
  getKey,
  renderItem,
  className,
  emptyState = null,
}: ItemListProps<T>) {
  if (items.length === 0) {
    return <>{emptyState}</>
  }

  return <ul className={className}>{items.map((item) => <li key={getKey(item)}>{renderItem(item)}</li>)}</ul>
}
