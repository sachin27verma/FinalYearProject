import { promises as fs } from 'fs';
import client from '../../../utils/googlevisionclient'; // Adjust the path as needed
import { NextResponse } from 'next/server';

// Helper function to stream the file data from request
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

// Disable body parsing to handle file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    // Convert the request's body to a buffer
    const buffer = await streamToBuffer(req.body);
    
    // Save the file locally (temporary storage)
    const filePath = './tmp/uploadedFile.png'; // This could be any path where you want to store the file
    await fs.writeFile(filePath, buffer);

    // Send the file to Google Cloud Vision for text extraction
    const [result] = await client.textDetection(filePath);
    const textAnnotations = result.textAnnotations;
    const extractedText = textAnnotations.length > 0 ? textAnnotations[0].description : '';

    // Clean up uploaded file after processing
    await fs.unlink(filePath);

    // Return the extracted text as a JSON response
    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('Error extracting text:', error);
    return NextResponse.json({ error: 'Failed to process the image' }, { status: 500 });
  }
}
