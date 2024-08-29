import { ChevronDown, ChevronUp } from 'lucide-react'
import { ComponentType, ReactNode, useEffect, useRef, useState } from 'react'

interface ExpandableMenuProps {
  title: string
  icon: ComponentType<{ className?: string }>
  children: ReactNode
}

export function ExpandableMenu({
  title,
  icon: Icon,
  children,
}: ExpandableMenuProps) {
  const [expanded, setExpanded] = useState(false)
  const [height, setHeight] = useState('0px')
  const contentRef = useRef<HTMLDivElement | null>(null)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    if (expanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`)
    } else {
      setHeight('0px')
    }
  }, [expanded])

  return (
    <div>
      <button
        onClick={toggleExpanded}
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground w-full text-left"
      >
        <span className="flex items-center gap-4">
          <Icon className="h-5 w-5" />
          {title}
        </span>
        {expanded ? (
          <ChevronUp className="h-5 w-5 ml-auto" />
        ) : (
          <ChevronDown className="h-5 w-5 ml-auto" />
        )}
      </button>
      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="pl-10 mt-2 transition-opacity duration-300 ease-in-out">
          {children}
        </div>
      </div>
    </div>
  )
}
