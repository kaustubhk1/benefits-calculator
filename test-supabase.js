import { createClient } from '@supabase/supabase-js';

// Use environment variables for security
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTest() {
  console.log('Testing pure INSERT without reading it back...');
  const { error } = await supabase.from('assessments').insert([{ answers: { test_source: "Validation Script", success: true } }]);
  
  if (error) {
    console.error('ERROR inserting:', error);
  } else {
    console.log('SUCCESS! Inserted data securely without reading back.');
  }
}

runTest();
