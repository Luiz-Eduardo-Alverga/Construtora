import { ComponentType } from 'react'

interface HeaderPageProps {
  title: string
  description?: string
  icon: ComponentType<{ className?: string }>
}

export function HeaderPages({
  title,
  description,
  icon: Icon,
}: HeaderPageProps) {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <span className="text-zinc-600 dark:text-zinc-400 font-medium">
        {description}
      </span>
    </div>
  )
}
