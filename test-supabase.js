import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ezgtpraifwtwrtcaojou.supabase.co', 'sb_publishable_xfNlNtu2NFm00CZEHiOfMw_-q2YI744');

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
