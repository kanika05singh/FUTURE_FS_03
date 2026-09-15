import { MessageCircle } from "lucide-react";
import { businessData } from "../data/businessData";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent(
    businessData.whatsappMessage
  )}`;

  return (
    <div className="group fixed bottom-5 right-5 z-40 flex items-center">
      <span
        role="tooltip"
        className="mr-3 hidden translate-x-2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-sm font-medium text-paper opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
      >
        Chat with us
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] animate-ring-pulse" aria-hidden="true" />
        <MessageCircle className="h-6 w-6" strokeWidth={2} />
      </a>
    </div>
  );
}
