interface NoDataLayoutProps {
  contentTop?: string
  contentBottom?: string
  image: string
}

export function NoDataLayout({
  image,
  contentBottom,
  contentTop,
}: NoDataLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-12 w-full h-full lg:h-56 mt-12 sm:mt-32">
      <div className="flex flex-col gap-4 lg:gap-0 justify-evenly max-w-[750px]">
        <div className="check-text">
          <span>{contentTop}</span>
        </div>

        <div className="check-text">
          <span>{contentBottom}</span>
        </div>
      </div>

      <img src={image} alt="" className="w-full" />
    </div>
  )
}
