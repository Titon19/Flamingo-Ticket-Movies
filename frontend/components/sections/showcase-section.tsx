import Image from "next/image"

export function ShowcaseSection() {
  return (
    <section id="showcase" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Gallery Showcase</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how others are using our platform to capture their special moments
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-12 md:grid-cols-3">
          <GalleryColumn
            images={[
              { src: "/gallery-1.jpg", alt: "Wedding gallery", width: 400, height: 300, aspect: "aspect-[4/3]" },
              { src: "/gallery-2.jpg", alt: "Corporate event", width: 400, height: 500, aspect: "aspect-[4/5]" },
            ]}
          />
          <GalleryColumn
            images={[
              { src: "/gallery-3.jpg", alt: "Birthday party", width: 400, height: 500, aspect: "aspect-[4/5]" },
              { src: "/gallery-4.jpg", alt: "Family reunion", width: 400, height: 300, aspect: "aspect-[4/3]" },
            ]}
          />
          <GalleryColumn
            images={[
              { src: "/gallery-5.jpg", alt: "Graduation ceremony", width: 400, height: 300, aspect: "aspect-[4/3]" },
              { src: "/gallery-6.jpg", alt: "Concert photos", width: 400, height: 500, aspect: "aspect-[4/5]" },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
  aspect: string
}

interface GalleryColumnProps {
  images: GalleryImage[]
}

function GalleryColumn({ images }: GalleryColumnProps) {
  return (
    <div className="grid gap-4">
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg">
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={`${image.aspect} object-cover transition-all hover:scale-105`}
          />
        </div>
      ))}
    </div>
  )
}
