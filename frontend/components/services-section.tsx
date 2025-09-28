import { Headphones, RefreshCw, Shield } from "lucide-react"

const services = [
  {
    icon: Headphones,
    title: "Need Help",
    description:
      "Our team is here to assist you! Whether you have questions about sizing, styling, or anything else, we're just a message away.",
    contact: "Contact us on 0300 910 0881",
    details:
      "Delivery All Over Pakistan\nDelivery Timeline from 4 to 5 Business Days.\nShipping Questions 0308 910 0888",
  },
  {
    icon: RefreshCw,
    title: "Exchange or Refunded",
    description:
      "We offer a hassle-free exchange policy within 7 days of purchase. If you're not completely satisfied with your purchase or if there's a sizing issue, simply contact us within 7 days of receiving your order to initiate the exchange process.",
    details:
      "Items must be unworn, unwashed, and in their original condition with tags attached. We are pleased to offer exchanges within 7 days of purchase for items that meet our exchange criteria. Please note that we do not provide cash refunds.",
  },
  {
    icon: Shield,
    title: "Care Instructions",
    description: "To ensure the longevity and quality of your clothing, please follow these care instructions:",
    details:
      "1: Dry clean\n2: Do not soak\n3: Do not bleach\n4: Iron on low heat if needed, avoiding direct contact with embellishment. If you have any further questions about caring for your garments, feel free to reach out to us for assistance.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 lg:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-6">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
              {service.contact && <p className="font-semibold text-foreground mb-2">{service.contact}</p>}
              <p className="text-sm text-muted-foreground whitespace-pre-line">{service.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
