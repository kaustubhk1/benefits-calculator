import { createClient } from '@supabase/supabase-js';

// Use environment variables for security
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log('--- Testing User Sign Up ---');
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'SecurePassword123!';
  
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
  });

  if (signUpError) {
    console.error('Sign Up Failed:', signUpError.message);
    return;
  }
  
  console.log(`SUCCESS! Created account for ${testEmail}`);
  console.log(`User ID Generated: ${signUpData.user?.id}`);

  console.log('\n--- Testing User Sign In ---');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });

  if (signInError) {
    console.error('Sign In Failed:', signInError.message);
    return;
  }

  console.log('SUCCESS! Securely logged back into the account.');
  console.log('Session Access Token retrieved successfully.');
  console.log(`Test passed. Email Confirms are correctly disabled, enabling instant access!`);
}

testAuth();
