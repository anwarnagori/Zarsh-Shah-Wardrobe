import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/elegant-pakistani-women-in-traditional-embroidered.jpg" alt="Elegant Pakistani Fashion" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in-up">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Timeless elegance meets
            <span className="text-primary block">modern sophistication</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Discover our exquisite collection of Pakistani women's clothing, where traditional craftsmanship meets
            contemporary design for the modern woman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              View Lookbook
            </Button>
          </div>
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm md:text-base font-medium">
            ✨ New Arrival 2025 Collection Now Available • Free Delivery All Over Pakistan
          </p>
        </div>
      </div>
    </section>
  )
}
