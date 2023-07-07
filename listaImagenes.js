import * as tf from '@tensorflow/tfjs-node';
//import sharp from 'sharp';
import fs from 'fs';
//import Jimp from 'jimp';
let inputHeight = 50;
let inputWidth = 50;
let imagenes = [{ imagen: "img_Bichos/bee/bee-0.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-1.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-2.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-3.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-4.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-5.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-6.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-7.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-8.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-9.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-10.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-11.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-12.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-13.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-14.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-15.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-16.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-17.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-18.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/bee/bee-19.jpg", label: "abeja", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-0.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-1.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-2.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-3.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-4.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-5.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-6.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-7.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-8.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-9.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-10.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-11.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-12.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-13.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-14.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-15.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-16.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-17.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-18.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-19.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/mosquito/mosquitos-0.jpg", label: "mosquito", tensor: null },
{ imagen: "img_Bichos/none/none-0.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-1.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-2.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-3.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-4.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-5.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-6.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-7.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-8.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-9.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-10.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-11.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-12.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-13.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-14.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-15.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-16.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-17.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-18.jpg", label: "nada", tensor: null },
{ imagen: "img_Bichos/none/none-19.jpg", label: "nada", tensor: null }
]

async function loadAndPreprocessImage(imageData) {
  const { imagen, label, tensor } = imageData;

  // Load the image using the sharp package
  const imageBuffer = fs.readFileSync(imagen);
  const image = sharp(imageBuffer);

  // Get the image metadata (width, height)
  const metadata = await image.metadata();
  const originalWidth = metadata.width;
  const originalHeight = metadata.height;

  // Calculate the aspect ratio and determine the maximum width or height
  const aspectRatio = originalWidth / originalHeight;
  const maxWidth = inputWidth;
  const maxHeight = inputHeight;
  let targetWidth = maxWidth;
  let targetHeight = Math.round(targetWidth / aspectRatio);

  // If the calculated height exceeds the maxHeight, use maxHeight as the target height
  if (targetHeight > maxHeight) {
    targetHeight = maxHeight;
    targetWidth = Math.round(targetHeight * aspectRatio);
  }

  // Resize the image while maintaining the aspect ratio
  const resizedImageBuffer = await image
    .resize(targetWidth, targetHeight)
    .toBuffer();

  // Create a new image buffer with the maximum width and height
  const paddedImageBuffer = Buffer.alloc(inputWidth * inputHeight * 3);

  // Calculate the padding offsets to center the resized image
  const offsetX = Math.floor((inputWidth - targetWidth) / 2);
  const offsetY = Math.floor((inputHeight - targetHeight) / 2);

  // Copy the resized image buffer into the padded image buffer at the correct offsets
  resizedImageBuffer.copy(
    paddedImageBuffer,
    (offsetY * inputWidth + offsetX) * 3,
    0,
    resizedImageBuffer.length
  );

  // Convert the padded image buffer to a tensor
  const imageArray = Array.from(paddedImageBuffer);
  console.log(imageArray.length);
  const normalizedArray = imageArray.map((value) => value / 255.0); // Normalize the values
  const imageTensor = tf.tensor(normalizedArray, [inputHeight, inputWidth, 3], 'float32');
  const normalizedTensor = imageTensor.div(255.0);
  console.log(normalizedTensor);
  return { imagen, label, tensor: normalizedTensor };
}

// Create a directory to save the resized images
const outputDir = 'resized_images';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Preprocess all images using Promise.all
const preprocessPromises = imagenes.map(loadAndPreprocessImage);
const preprocessedImages = await Promise.all(preprocessPromises);

preprocessedImages.forEach(async (preprocessedImage, index) => {
  imagenes[index].tensor = preprocessedImage.tensor;

  // Convert the tensor to a pixel array
  const pixels = preprocessedImage.tensor.dataSync();

  // Create a new Jimp image with the pixel array
  const image = new Jimp(inputWidth, inputHeight);
  image.bitmap.data = Buffer.from(pixels);
  image.bitmap.width = inputWidth;
  image.bitmap.height = inputHeight;

  // Save the resized image
  const outputFilePath = `${outputDir}/resized_${index}.jpg`;
  await image.writeAsync(outputFilePath);

  // Print the file path of the resized image
  console.log(`Resized image saved: ${outputFilePath}`);
});
export {imagenes, inputHeight, inputWidth};



/*
// Load and compile the model
const modelPath = 'probando/modeloProbando.js'; // Replace with the actual file path
const model = require(`./${modelPath}`);
model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });


// Training parameters
const batchSize = 32;
const numEpochs = 10;

// Create a dataset from the preprocessed images
const dataset = tf.data.generator(function* () {
  const numPicaduras = imagenes.length;
  // Iterate through your training data
  for (let i = 0; i < numPicaduras - 1; i++) {
    // Load and preprocess your image
    const imgTensor = imagenes[i].tensor;
    const label = imagenes[i].label;

    // Yield the image tensor and its label as an object
    yield { xs: imgTensor, ys: label };
  }
}).batch(batchSize).shuffle(bufferSize);

// Train the model
await model.fit(dataset.xs, dataset.ys, {
  batchSize: batchSize,
  epochs: numEpochs,
  callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 3 }),
});
*/