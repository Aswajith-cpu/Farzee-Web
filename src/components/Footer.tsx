import { Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif text-gold mb-4">ATELIER</h3>
            <p className="text-gray-400 text-sm">
              Crafting timeless elegance through exquisite jewellery design.
            </p>
          </div>

          <div>
            <h4 className="text-gold text-sm tracking-wider mb-4">CONNECT</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-gold text-sm tracking-wider mb-4">HOURS</h4>
            <p className="text-gray-400 text-sm">
              Monday - Friday: 10AM - 6PM<br />
              Saturday: By Appointment<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Atelier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
