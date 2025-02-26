import { CircleCheck } from 'lucide-react'

export function ConfirmedCode() {
  return (
    <div className="flex items-center flex-col gap-4 text-center">
      <CircleCheck className="h-28 w-28 text-emerald-500" />
      <span className="font-bold text-xl">Código confirmado com sucesso</span>
      <span className="font-medium">
        Siga o passo a passo para começar a usar o sistema:
      </span>

      <ol className="text-left space-y-4">
        <li>1 - Envie o e-mail cadastrado para o responsável.</li>
        <li>2 - Aguarde até o responsável lhe adicionar à empresa.</li>
        <li>
          3 - Após ser adicionado, acesse o link:{' '}
          <a
            className="text-primary underline"
            href="https://construtora-pied.vercel.app/sign-in"
            target="_blank"
            rel="noopener noreferrer"
          >
            construtora-pied.vercel.app/sign-in
          </a>
        </li>
        <li>4 - Agora basta fazer login com seu e-mail e senha cadastrados.</li>
      </ol>
    </div>
  )
}
