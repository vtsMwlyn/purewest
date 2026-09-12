const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const supabase = require('./config/supabase');

async function createBucket() {
  console.log("Checking buckets...");
  
  // Try to create the bucket
  const { data, error } = await supabase.storage.createBucket('uploads', {
    public: true,
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf'],
    fileSizeLimit: 10485760 // 10MB
  });
  
  if (error) {
    if (error.message.includes('already exists')) {
      console.log("Bucket already exists. Making sure it is public...");
      await supabase.storage.updateBucket('uploads', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf']
      });
      console.log("Bucket updated.");
    } else {
      console.error("Error creating bucket:", error);
    }
  } else {
    console.log("Bucket 'uploads' created successfully!");
  }
}

createBucket();
