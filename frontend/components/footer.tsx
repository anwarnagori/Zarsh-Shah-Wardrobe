import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ZS</span>
              </div>
              <span className="font-playfair text-xl font-bold">Zarsh Shah</span>
            </div>
            <p className="text-background/80 mb-4">
              Premium Pakistani women's clothing with traditional elegance and modern sophistication.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Size Chart
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About Zarsh Shah</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Blogs & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-background/80">
              <li>zarshshah@gmail.com</li>
              <li>0300 910 0881</li>
              <li>0308 910 0888</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/60">© 2025 - Zarsh Shah Wardrobe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
