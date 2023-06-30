
import * as tf from '@tensorflow/tfjs-node';
import { imagenes, inputHeight, inputWidth } from './listaImagenes';
const imageChannels = 1;
const epochs = 10;
const batchSize = 32
//crea el modelo
const model = tf.sequential();
model.add(tf.layers.conv2d({
  inputShape: [inputWidth, inputHeight, imageChannels],
  filters: 8,
  kernelSize: 5,
  padding: 'same',
  activation: 'relu'
}));
model.add(tf.layers.maxPooling2d({
  poolSize: 2,
  strides: 2
}));
model.add(tf.layers.conv2d({
  filters: 16,
  kernelSize: 5,
  padding: 'same',
  activation: 'relu'
}));
model.add(tf.layers.maxPooling2d({
  poolSize: 3,
  strides: 3
}));
model.add(tf.layers.flatten());
model.add(tf.layers.dense({
  units: numOfClasses,
  activation: 'softmax'
}));

//lo compila
model.compile({
  optimizer: 'adam',
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy']
});


/*
 model.add(tf.layers.maxPooling2d({ ... }));  // Ejemplo de capa de agrupación
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ ... }));  // Ejemplo de capa completamente conectada
  model.add(tf.layers.softmax());
*/

//entrena el modelo

const opciones = {
  epochs: epochs,
  verbose: 0,
  callbacks: {
    onEpochBegin: async (epoch, logs) => {
      console.log(`Epoch ${epoch + 1} of ${epochs}`)
    },
    onEpochEnd: async (epoch, logs) => {
      console.log(`  train-set loss: ${logs.loss.toFixed(4)}`)
      console.log(`  train-set accuracy: ${logs.acc.toFixed(4)}`)

    }
  }
}; 
let info =model.fitDataset(imagenes.tensor, opciones);

console.log('\r\n', info);
console.log('\r\nEvaluating model...');
//evalua la eficiencia del modelo
const evalResult = model.evaluate(testData, testLabels);
console.log('Test Loss:', evalResult[0].dataSync()[0]);
console.log('Test Accuracy:', evalResult[1].dataSync()[0]);