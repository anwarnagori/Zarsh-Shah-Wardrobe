export function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Shop the best women clothing brand in Pakistan
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Finding the perfect outfit should not be difficult. That's why Zarsh Shah, one of the top online clothing
              stores in Pakistan, offers a seamless shopping experience. Our collection of women's ready-to-wear in
              Lahore is designed for modern women who love fashion but also value comfort and quality.
            </p>
            <div className="space-y-4">
              <h3 className="font-playfair text-2xl font-bold text-foreground">
                Trendy styles, premium quality, affordable price
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We bring you trendy styles, high-quality fabrics, and affordable rates all at prices that make style
                easy to access. When it comes to women clothing brands in Pakistan, Zarsh Shah stands out with fashion
                that speaks to every woman.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="animate-fade-in-up">
            <img
              src="/elegant-pakistani-women-in-traditional-clothing-sh.jpg"
              alt="Pakistani Fashion Showcase"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
