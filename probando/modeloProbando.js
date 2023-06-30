import * as tf from '@tensorflow/tfjs';
import * as qsy from 'tensorflow/tfjs-node';
import {imagenes, inputHeight, inputWidth} from './listaImagenes';
const epochs =10;
const batchSize = 32 
//crea el modelo
const model = tf.sequential();
model.add(tf.layers.conv2d({/*aca no se que va */}));
/*
 model.add(tf.layers.maxPooling2d({ ... }));  // Ejemplo de capa de agrupación
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ ... }));  // Ejemplo de capa completamente conectada
  model.add(tf.layers.softmax());
*/
//lo compila
model.compile({
    loss: 'categoricalCrossentropy',
    optimizer: 'adam',
    metrics: ['accuracy']
  });

  await model.fit(trainData, trainLabels, {
    epochs: epochs,
    batchSize: batchSize,
    //validationData: [testData, testLabels],
    callbacks: tf.node.tensorBoard('logs')
  });

//evalua la eficiencia del modelo
  const evalResult = model.evaluate(testData, testLabels);
console.log('Test Loss:', evalResult[0].dataSync()[0]);
console.log('Test Accuracy:', evalResult[1].dataSync()[0]);