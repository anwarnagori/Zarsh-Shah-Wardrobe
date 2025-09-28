import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Embroidered Summer Dress",
    price: 2795,
    originalPrice: 7000,
    image: "/elegant-pink-pakistani-embroidered-dress.jpg",
    badge: "SAVE 60%",
    category: "Summer Collection",
  },
  {
    id: 2,
    name: "Black Rose Swiss Cambric",
    price: 2795,
    originalPrice: 7000,
    image: "/elegant-black-pakistani-dress-with-embroidery.jpg",
    badge: "SAVE 60%",
    category: "Formal Wear",
  },
  {
    id: 3,
    name: "Blueberry 2Pc Dress",
    price: 2795,
    originalPrice: 7000,
    image: "/elegant-blue-pakistani-traditional-dress.jpg",
    badge: "SAVE 60%",
    category: "Traditional",
  },
  {
    id: 4,
    name: "SOOYA 2PC Swiss Cambric",
    price: 2795,
    originalPrice: 7000,
    image: "/elegant-teal-pakistani-embroidered-outfit.jpg",
    badge: "SAVE 60%",
    category: "Premium",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            New Arrival 2025
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our latest collection featuring exquisite embroidery and premium fabrics
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="w-full">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary">Rs.{product.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      Rs.{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
