import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getFeaturedJewellery } from '../lib/api';
import { JewelleryPiece } from '../lib/supabase';

type HomeProps = {
  onNavigate: (page: string, productId?: string) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  const [featured, setFeatured] = useState<JewelleryPiece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await getFeaturedJewellery();
        setFeatured(data);
      } catch (error) {
        console.error('Error loading featured pieces:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <div className="animate-fade-in">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-4 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-serif text-gold mb-6">
            Timeless Elegance
          </h1>
          <p className="text-xl md:text-2xl text-pale-pink mb-8 max-w-2xl mx-auto">
            Where artistry meets luxury in every handcrafted piece
          </p>
          <button
            onClick={() => onNavigate('collections')}
            className="group bg-gold hover:bg-burgundy text-black hover:text-white px-8 py-4 rounded-none text-sm tracking-wider transition-all duration-300 inline-flex items-center gap-2"
          >
            EXPLORE COLLECTIONS
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gold rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-burgundy/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif text-gold mb-4">
              Featured Pieces
            </h2>
            <p className="text-pale-pink text-lg">
              Discover our most exquisite creations
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gold">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((piece, index) => (
                <div
                  key={piece.id}
                  className="group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => onNavigate('product', piece.id)}
                >
                  <div className="relative overflow-hidden bg-black/50 border border-gold/20 hover:border-gold/60 transition-all duration-500">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={piece.image_urls[0]}
                        alt={piece.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-6 w-full">
                        <p className="text-gold text-xs tracking-widest mb-2">{piece.collection}</p>
                        <h3 className="text-white text-xl font-serif mb-2">{piece.name}</h3>
                        <p className="text-pale-pink text-sm">{piece.price_range}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:hidden">
                    <p className="text-gold text-xs tracking-widest mb-1">{piece.collection}</p>
                    <h3 className="text-white text-lg font-serif mb-1">{piece.name}</h3>
                    <p className="text-pale-pink text-sm">{piece.price_range}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-burgundy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-serif text-gold mb-6">
                Bespoke Creations
              </h2>
              <p className="text-pale-pink text-lg mb-6 leading-relaxed">
                Every piece tells a story. Let us craft yours with meticulous attention
                to detail and unparalleled craftsmanship.
              </p>
              <p className="text-white/80 mb-8">
                From concept to creation, we work closely with you to design jewellery
                that reflects your unique style and celebrates life's most precious moments.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-transparent border-2 border-gold hover:bg-gold text-gold hover:text-black px-8 py-3 rounded-none text-sm tracking-wider transition-all duration-300"
              >
                START YOUR JOURNEY
              </button>
            </div>
            <div className="animate-slide-in-right">
              <img
                src="https://images.pexels.com/photos/1887946/pexels-photo-1887946.jpeg"
                alt="Craftsmanship"
                className="w-full h-[500px] object-cover border border-gold/30"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
