import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createMediaBucket() {
    console.log("Creating 'media' bucket...");
    const { data, error } = await supabase.storage.createBucket('media', {
        public: true,
        allowedMimeTypes: ['image/*', 'video/*', 'audio/*'],
        fileSizeLimit: 52428800 // 50MB
    });

    if (error) {
        if (error.message.includes('already exists') || error.message.includes('Duplicate')) {
            console.log("Bucket 'media' already exists. Updating it to be completely public...");
            await supabase.storage.updateBucket('media', { public: true });
        } else {
            console.error('Error creating bucket:', error.message);
        }
    } else {
        console.log('Bucket created successfully via API:', data);
    }
}

createMediaBucket();
