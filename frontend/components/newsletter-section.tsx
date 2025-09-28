import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stay Updated with Latest Collections
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and fashion
            inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button className="px-8">Subscribe</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            By subscribing, you agree to our privacy policy and terms of service.
          </p>
        </div>
      </div>
    </section>
  )
}
