import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type JewelleryPiece = {
  id: string;
  name: string;
  description: string;
  material: string;
  price_range: string;
  collection: 'Bridal' | 'Daily' | 'Custom' | 'Luxury Gold';
  image_urls: string[];
  featured: boolean;
  created_at: string;
};

export type ContactSubmission = {
  name: string;
  phone: string;
  jewellery_type: string;
  budget?: string;
  message?: string;
  reference_image_url?: string;
};
