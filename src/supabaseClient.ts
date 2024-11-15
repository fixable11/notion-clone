import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error('Missing supabase url or key');
}

export const supabase = createClient(supabaseUrl, supabaseApiKey);
