import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function FilterFunctions() {
  return (
    <div className="flex justify-center">
      <form className="flex gap-2">
        <Input
          className="w-80 rounded-3xl"
          placeholder="Pesquise pelo nome da função"
        />
        <Button className="rounded-full">
          <Search className=" h-5 sm:w-5 text-center" />
        </Button>
      </form>
    </div>
  )
}
