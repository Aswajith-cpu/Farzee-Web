/*
  # Jewellery Designer Website Schema

  1. New Tables
    - `jewellery_pieces`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the jewellery piece
      - `description` (text) - Detailed description
      - `material` (text) - Materials used (e.g., "18K Gold, Diamonds")
      - `price_range` (text) - Price range (e.g., "$5,000 - $10,000")
      - `collection` (text) - Collection category: Bridal, Daily, Custom, Luxury Gold
      - `image_urls` (text array) - Array of image URLs
      - `featured` (boolean) - Whether to show on homepage
      - `created_at` (timestamptz)
    
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `phone` (text) - WhatsApp/Phone number
      - `jewellery_type` (text) - Type of jewellery requested
      - `budget` (text) - Customer's budget
      - `message` (text) - Additional message
      - `reference_image_url` (text) - Uploaded reference image URL
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public can read jewellery_pieces
    - Public can insert contact_submissions (anonymous form submissions)
    - Only authenticated users can read contact_submissions
*/

CREATE TABLE IF NOT EXISTS jewellery_pieces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  material text NOT NULL,
  price_range text NOT NULL,
  collection text NOT NULL CHECK (collection IN ('Bridal', 'Daily', 'Custom', 'Luxury Gold')),
  image_urls text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  jewellery_type text NOT NULL,
  budget text,
  message text,
  reference_image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE jewellery_pieces ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jewellery pieces"
  ON jewellery_pieces FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

INSERT INTO jewellery_pieces (name, description, material, price_range, collection, image_urls, featured) VALUES
  ('Eternal Bloom Ring', 'A delicate rose gold ring featuring a central diamond surrounded by intricate floral engravings, symbolizing eternal love and beauty.', '18K Rose Gold, 1ct Diamond', '$8,000 - $12,000', 'Bridal', ARRAY['https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg'], true),
  ('Vintage Pearl Necklace', 'Classic pearl strand necklace with a modern twist, featuring graduated pearls and a gold clasp with vintage-inspired details.', 'Freshwater Pearls, 14K Gold', '$2,500 - $4,000', 'Daily', ARRAY['https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'], true),
  ('Royal Sapphire Set', 'Luxurious bridal set featuring a stunning blue sapphire surrounded by diamonds, complete with matching earrings and bracelet.', 'Platinum, Sapphires, Diamonds', '$25,000 - $40,000', 'Bridal', ARRAY['https://images.pexels.com/photos/1457846/pexels-photo-1457846.jpeg'], true),
  ('Minimalist Gold Studs', 'Simple yet elegant 14K gold stud earrings, perfect for everyday wear with a touch of sophistication.', '14K Yellow Gold', '$500 - $800', 'Daily', ARRAY['https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg'], false),
  ('Bespoke Diamond Band', 'Custom-designed eternity band with hand-selected diamonds, crafted to your exact specifications.', '18K Gold, Diamonds', '$5,000 - $15,000', 'Custom', ARRAY['https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg'], false),
  ('Heritage Gold Bangles', 'Traditional solid gold bangles with contemporary finishing, honoring heritage while embracing modern elegance.', '22K Pure Gold', '$3,000 - $8,000', 'Luxury Gold', ARRAY['https://images.pexels.com/photos/1445505/pexels-photo-1445505.jpeg'], true);