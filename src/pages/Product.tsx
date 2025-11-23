import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getJewelleryById } from '../lib/api';
import { JewelleryPiece } from '../lib/supabase';

type ProductProps = {
  productId: string;
  onNavigate: (page: string, productId?: string) => void;
};

export default function Product({ productId, onNavigate }: ProductProps) {
  const [product, setProduct] = useState<JewelleryPiece | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await getJewelleryById(productId);
        setProduct(data);
        setCurrentImageIndex(0);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const nextImage = () => {
    if (product && product.image_urls.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === product.image_urls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product && product.image_urls.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.image_urls.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-gold text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-pale-pink text-xl mb-4">Product not found</p>
          <button
            onClick={() => onNavigate('collections')}
            className="text-gold hover:text-pale-pink transition-colors"
          >
            Return to Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-burgundy/10 to-black pt-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => onNavigate('collections')}
          className="flex items-center gap-2 text-gold hover:text-pale-pink transition-colors mb-8 group"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
          <span className="text-sm tracking-wider">BACK TO COLLECTIONS</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4 animate-slide-in-left">
            <div className="relative aspect-square bg-black/50 border border-gold/30 overflow-hidden group">
              <img
                src={product.image_urls[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {product.image_urls.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-gold/90 text-gold hover:text-black p-2 transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-gold/90 text-gold hover:text-black p-2 transition-all duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.image_urls.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-gold w-8'
                            : 'bg-gold/40 hover:bg-gold/70'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {product.image_urls.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.image_urls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square border-2 transition-all duration-300 overflow-hidden ${
                      index === currentImageIndex
                        ? 'border-gold'
                        : 'border-gold/20 hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <div>
              <span className="inline-block bg-gold/20 text-gold px-4 py-1 text-xs tracking-widest mb-4">
                {product.collection}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-gold mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-pale-pink mb-2">{product.price_range}</p>
            </div>

            <div className="border-t border-gold/20 pt-6">
              <h2 className="text-gold text-sm tracking-widest mb-3">DESCRIPTION</h2>
              <p className="text-white/90 leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t border-gold/20 pt-6">
              <h2 className="text-gold text-sm tracking-widest mb-3">MATERIALS</h2>
              <p className="text-white/90">{product.material}</p>
            </div>

            <div className="border-t border-gold/20 pt-6 space-y-4">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-gold hover:bg-burgundy text-black hover:text-white py-4 rounded-none text-sm tracking-wider transition-all duration-300"
              >
                REQUEST CUSTOM ORDER
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-transparent border-2 border-gold hover:bg-gold/10 text-gold py-4 rounded-none text-sm tracking-wider transition-all duration-300"
              >
                INQUIRE ABOUT THIS PIECE
              </button>
            </div>

            <div className="border-t border-gold/20 pt-6">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="text-gold mb-2 tracking-wider">CRAFTSMANSHIP</h3>
                  <p className="text-white/80">Handcrafted with meticulous attention to detail</p>
                </div>
                <div>
                  <h3 className="text-gold mb-2 tracking-wider">CUSTOMIZATION</h3>
                  <p className="text-white/80">Available in various metals and settings</p>
                </div>
                <div>
                  <h3 className="text-gold mb-2 tracking-wider">DELIVERY</h3>
                  <p className="text-white/80">4-6 weeks for custom orders</p>
                </div>
                <div>
                  <h3 className="text-gold mb-2 tracking-wider">CERTIFICATION</h3>
                  <p className="text-white/80">Includes authenticity certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
