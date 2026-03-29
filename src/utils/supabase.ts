import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
// It will fail gracefully if the environment variables are not yet provided in .env
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
