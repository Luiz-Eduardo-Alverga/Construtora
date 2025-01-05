interface NoDataLayoutProps {
  content?: string
  image: string
}

export function NoDataLayout({ image }: NoDataLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-12 w-full h-full lg:h-56 mt-12 sm:mt-32">
      <div className="flex flex-col gap-4 lg:gap-0 justify-evenly max-w-[550px]">
        <div className="check-text">
          <span>Acompanhe de perto os pontos de seu funcionário</span>
        </div>

        <div className="check-text">
          <span>
            Visualize ou Edite os pontos do seu funcionário. A simplicidade com
            a eficiência nas operações é o elemento decisivo para o sucesso da
            sua empresa.
          </span>
        </div>
      </div>

      <img src={image} alt="" className="w-full" />
    </div>
  )
}
