"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const WHATSAPP_NUMBER = "6281234567890"; // 🔁 replace with your number

type Props = {
  productName: string;
};

export default function WhatsAppButton({ productName }: Props) {
  const message = `Halo, saya ingin bertanya tentang produk ${productName}. Apakah produk ini tersedia?`;

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="w-full gap-2 rounded-none bg-[#25D366] hover:bg-[#1ebe5d] text-white"
    >
      <Image src="/whatsapp.svg" alt="WhatsApp" width={16} height={16} />
      Tanya via WhatsApp
    </Button>
  );
}
