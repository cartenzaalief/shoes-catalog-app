import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-480 mx-auto px-4 md:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/jrj-logo.png"
              alt="PT Jeka Rizky Jaya"
              width={160}
              height={60}
              className="object-contain mb-4"
            />

            <p className="text-sm text-gray-600 leading-relaxed">
              PT Jeka Rizky Jaya provides quality footwear and accessories
              designed for comfort, durability, and modern lifestyle.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/pria">Pria</Link>
              </li>
              <li>
                <Link href="/wanita">Wanita</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/partners">Partners</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+62 812 3456 7890</span>
              </li>

              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@jekarizkyjaya.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PT Jeka Rizky Jaya. All rights reserved.
      </div>
    </footer>
  );
}
