
import vision from '@google-cloud/vision';

// Create a new client instance

// use es6 export syntax


console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// export const client = new vision.ImageAnnotatorClient({
//   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
// });




// // Create a new client instance
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

module.exports = client;
