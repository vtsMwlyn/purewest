const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const supabase = require('./config/supabase');

async function testUpload() {
  console.log("Testing Supabase Storage...");
  if (!supabase) {
    console.error("Supabase client is null");
    return;
  }
  
  const buffer = Buffer.from('test file content');
  const fileName = 'test-upload.txt';
  
  const { data, error } = await supabase.storage.from('uploads').upload(fileName, buffer, {
    contentType: 'text/plain',
    upsert: true
  });
  
  if (error) {
    console.error("Upload Error:", error);
  } else {
    console.log("Upload Success:", data);
  }
}

testUpload();
