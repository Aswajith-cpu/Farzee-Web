import { Sparkles, Heart, Award } from 'lucide-react';

type AboutProps = {
  onNavigate: (page: string) => void;
};

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-burgundy/10 to-black pt-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-serif text-gold mb-4">
            Our Story
          </h1>
          <p className="text-pale-pink text-lg max-w-2xl mx-auto">
            Where passion meets precision in the art of jewellery design
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="animate-slide-in-left">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8989561/pexels-photo-8989561.jpeg"
                alt="Designer at work"
                className="w-full h-[600px] object-cover border border-gold/30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <h2 className="text-3xl md:text-4xl font-serif text-gold">
              Crafting Dreams into Reality
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              For over two decades, Atelier has been synonymous with exceptional craftsmanship
              and timeless design. Every piece that leaves our studio is a testament to our
              unwavering commitment to excellence.
            </p>
            <p className="text-white/80 leading-relaxed">
              Founded with a vision to create jewellery that transcends trends, we blend
              traditional techniques with contemporary aesthetics. Each design begins with
              a story, yours, and transforms into a wearable masterpiece that celebrates
              life's most precious moments.
            </p>
            <p className="text-white/80 leading-relaxed">
              Our atelier is more than a workshop; it's where dreams take form. From the
              first sketch to the final polish, every step is infused with passion, precision,
              and an uncompromising attention to detail.
            </p>
          </div>
        </div>

        <div className="bg-black/30 border border-gold/20 p-12 mb-20 animate-fade-in">
          <h2 className="text-3xl font-serif text-gold text-center mb-12">
            Our Design Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 border border-gold/30 mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                <Sparkles className="text-gold" size={32} />
              </div>
              <h3 className="text-xl text-pale-pink mb-3">Timeless Elegance</h3>
              <p className="text-white/70">
                We create pieces that transcend fleeting trends, designed to be cherished
                for generations to come.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 border border-gold/30 mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                <Heart className="text-gold" size={32} />
              </div>
              <h3 className="text-xl text-pale-pink mb-3">Personal Connection</h3>
              <p className="text-white/70">
                Every piece tells your unique story, crafted with deep understanding of
                your vision and desires.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 border border-gold/30 mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                <Award className="text-gold" size={32} />
              </div>
              <h3 className="text-xl text-pale-pink mb-3">Masterful Craft</h3>
              <p className="text-white/70">
                Decades of expertise combined with innovative techniques ensure flawless
                execution in every detail.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-burgundy/20 border border-gold/20 p-8 animate-fade-in">
            <h3 className="text-2xl font-serif text-gold mb-4">The Process</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-gold font-serif text-xl">01</span>
                <div>
                  <h4 className="text-pale-pink mb-1">Consultation</h4>
                  <p className="text-white/70 text-sm">
                    We begin with understanding your vision, preferences, and the story you want to tell.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-gold font-serif text-xl">02</span>
                <div>
                  <h4 className="text-pale-pink mb-1">Design</h4>
                  <p className="text-white/70 text-sm">
                    Our designers create detailed sketches and 3D renderings for your approval.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-gold font-serif text-xl">03</span>
                <div>
                  <h4 className="text-pale-pink mb-1">Craftsmanship</h4>
                  <p className="text-white/70 text-sm">
                    Master artisans bring the design to life with meticulous handcrafting.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-gold font-serif text-xl">04</span>
                <div>
                  <h4 className="text-pale-pink mb-1">Perfection</h4>
                  <p className="text-white/70 text-sm">
                    Final inspection and finishing ensure every detail meets our exacting standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-gold/20 p-8 animate-fade-in">
            <h3 className="text-2xl font-serif text-gold mb-4">Our Promise</h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Only the finest materials, ethically sourced and certified</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Lifetime warranty on craftsmanship</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Complimentary cleaning and maintenance services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Authenticity certificate with every piece</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Bespoke customization available on all designs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-burgundy/20 via-gold/10 to-burgundy/20 border border-gold/30 p-12 animate-slide-up">
          <h2 className="text-3xl font-serif text-gold mb-4">
            Begin Your Journey
          </h2>
          <p className="text-pale-pink text-lg mb-8 max-w-2xl mx-auto">
            Let us create something extraordinary together. Schedule a consultation to
            discuss your vision and explore the possibilities.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-gold hover:bg-burgundy text-black hover:text-white px-10 py-4 rounded-none text-sm tracking-wider transition-all duration-300"
          >
            SCHEDULE CONSULTATION
          </button>
        </div>
      </div>
    </div>
  );
}
