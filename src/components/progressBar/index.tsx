import { ProgressProps } from '@radix-ui/react-progress'

import { Progress } from '../ui/progress'

interface ProgressBarProps extends ProgressProps {
  step: number
  progress: number
}

export function ProgressBar({ progress, step, ...props }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <span>
        Etapa <strong className="text-primary">{step}</strong> de{' '}
        <strong className="text-primary">2</strong>
      </span>
      <Progress {...props} value={progress} className="w-[100%]"></Progress>
    </div>
  )
}
