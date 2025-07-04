import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase credentials
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('goals').select('*').limit(1);

        if (error) {
            console.error('❌ Supabase error:', error.message);
            process.exit(1);
        }

        console.log('✅ Supabase connection successful!');
        console.log('Sample row from `goals` table:', data[0] ?? 'No data found');
    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
        process.exit(1);
    }
}

testConnection();
