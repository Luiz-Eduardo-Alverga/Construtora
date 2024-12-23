import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function FormCheckbox () {
    return (
        <div className="space-y-0.5">
            <Label>Status:</Label>
            <RadioGroup
            defaultValue="ativado"
            className="flex flex-col sm:flex-row"
            >
            <div className="flex items-center mt-3 space-x-2">
                <RadioGroupItem value="ativado" id="ativado" />
                <Label htmlFor="ativado">Ativado</Label>
            </div>

            <div className="flex items-center mt-3 space-x-2">
                <RadioGroupItem value="desativado" id="desativado" />
                <Label htmlFor="desativado">Desativado</Label>
            </div>
            </RadioGroup>
            </div>
    )
}