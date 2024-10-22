import { Loader } from 'lucide-react'

export function LoadingRequests() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-500 bg-opacity-50 z-50">
      <Loader className="w-10 h-10 text-violet-500 animate-spin" />
    </div>
  )
}
