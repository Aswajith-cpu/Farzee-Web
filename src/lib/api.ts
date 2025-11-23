import { supabase, JewelleryPiece, ContactSubmission } from './supabase';

export const getAllJewellery = async (): Promise<JewelleryPiece[]> => {
  const { data, error } = await supabase
    .from('jewellery_pieces')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getFeaturedJewellery = async (): Promise<JewelleryPiece[]> => {
  const { data, error } = await supabase
    .from('jewellery_pieces')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw error;
  return data || [];
};

export const getJewelleryByCollection = async (collection: string): Promise<JewelleryPiece[]> => {
  const { data, error } = await supabase
    .from('jewellery_pieces')
    .select('*')
    .eq('collection', collection)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getJewelleryById = async (id: string): Promise<JewelleryPiece | null> => {
  const { data, error } = await supabase
    .from('jewellery_pieces')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const submitContactForm = async (submission: ContactSubmission): Promise<void> => {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([submission]);

  if (error) throw error;
};
