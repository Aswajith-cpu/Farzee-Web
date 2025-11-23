import { useEffect, useState } from 'react';
import { getAllJewellery, getJewelleryByCollection } from '../lib/api';
import { JewelleryPiece } from '../lib/supabase';

type CollectionsProps = {
  onNavigate: (page: string, productId?: string) => void;
};

const collections = [
  {
    id: 'all',
    name: 'All Collections',
    description: 'Browse our complete catalogue of exquisite pieces',
  },
  {
    id: 'Bridal',
    name: 'Bridal',
    description: 'Celebrate eternal love with our bridal collection',
  },
  {
    id: 'Daily',
    name: 'Daily Elegance',
    description: 'Sophisticated pieces for everyday wear',
  },
  {
    id: 'Custom',
    name: 'Custom Creations',
    description: 'Bespoke designs crafted to your vision',
  },
  {
    id: 'Luxury Gold',
    name: 'Luxury Gold',
    description: 'Pure gold masterpieces of timeless beauty',
  },
];

export default function Collections({ onNavigate }: CollectionsProps) {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [jewellery, setJewellery] = useState<JewelleryPiece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJewellery = async () => {
      setLoading(true);
      try {
        const data = selectedCollection === 'all'
          ? await getAllJewellery()
          : await getJewelleryByCollection(selectedCollection);
        setJewellery(data);
      } catch (error) {
        console.error('Error loading jewellery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJewellery();
  }, [selectedCollection]);

  const currentCollection = collections.find(c => c.id === selectedCollection) || collections[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-burgundy/10 to-black pt-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-serif text-gold mb-4">
            Collections
          </h1>
          <p className="text-pale-pink text-lg max-w-2xl mx-auto">
            {currentCollection.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id)}
              className={`px-6 py-3 rounded-none text-sm tracking-wider transition-all duration-300 ${
                selectedCollection === collection.id
                  ? 'bg-gold text-black'
                  : 'bg-transparent border border-gold/40 text-gold hover:border-gold hover:bg-gold/10'
              }`}
            >
              {collection.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gold py-20">
            <div className="animate-pulse">Loading exquisite pieces...</div>
          </div>
        ) : jewellery.length === 0 ? (
          <div className="text-center text-pale-pink py-20">
            <p>No pieces available in this collection yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jewellery.map((piece, index) => (
              <div
                key={piece.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => onNavigate('product', piece.id)}
              >
                <div className="relative overflow-hidden bg-black/50 border border-gold/20 hover:border-gold/60 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/20">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={piece.image_urls[0]}
                      alt={piece.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-gold/90 text-black text-xs px-3 py-1 tracking-wider">
                      {piece.collection}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <h3 className="text-white text-2xl font-serif mb-2">{piece.name}</h3>
                    <p className="text-pale-pink text-sm mb-2 line-clamp-2">{piece.description}</p>
                    <p className="text-gold text-sm tracking-wide">{piece.price_range}</p>
                    <p className="text-white/70 text-xs mt-2">{piece.material}</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-black/30 border border-gold/10 md:opacity-0 md:group-hover:opacity-0">
                  <h3 className="text-white text-xl font-serif mb-2">{piece.name}</h3>
                  <p className="text-gold text-sm mb-2">{piece.price_range}</p>
                  <p className="text-pale-pink text-sm">{piece.material}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
