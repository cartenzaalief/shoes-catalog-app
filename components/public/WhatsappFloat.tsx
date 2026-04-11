"use client";

import Link from "next/link";
import Image from "next/image";

export default function WhatsAppFloat() {
  const phone = "6281234567890";
  const message = "Hello, I would like to ask about your products.";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      aria-label="Chat on WhatsApp"
      className="whatsapp-pulse fixed bottom-6 right-6 z-50 flex items-center justify-center md:gap-2 rounded-full bg-[#25D366] p-4 md:px-4 md:py-3 text-white shadow-xl hover:bg-[#20ba5a] transition"
    >
      <Image src="/whatsapp.svg" alt="WhatsApp" width={22} height={22} />

      <span className="hidden md:inline font-medium">Hubungi kami</span>
    </Link>
  );
}
