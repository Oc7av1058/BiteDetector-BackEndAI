import * as tf from "@tensorflow/tfjs";

let inputHeight=50;
let inputWidth=50;
let imagenes=[{imagen:"img_Bichos/bee/bee-0.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-1.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-2.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-3.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-4.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-5.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-6.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-7.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-8.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-9.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-10.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-11.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-12.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-13.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-14.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-15.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-16.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-17.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-18.jpg", label:"abeja" },
{imagen:"img_Bichos/bee/bee-19.jpg", label:"abeja" },
{imagen:"img_Bichos/mosquito/mosquitos-0.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-1.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-2.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-3.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-4.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-5.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-6.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-7.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-8.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-9.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-10.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-11.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-12.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-13.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-14.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-15.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-16.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-17.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-18.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-19.jpg", label:"mosquito"},
{imagen:"img_Bichos/mosquito/mosquitos-0.jpg", label:"mosquito"},
{imagen:"img_Bichos/none/none-0.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-1.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-2.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-3.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-4.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-5.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-6.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-7.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-8.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-9.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-10.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-11.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-12.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-13.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-14.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-15.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-16.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-17.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-18.jpg", label:"nada"},
{imagen:"img_Bichos/none/none-19.jpg", label:"nada"}
]
imagenes.map((picadura)=>{
picadura.imagen=tf.browser.fromPixels(picadura.imagen).resizeNearestNeighbor([inputWidth, inputHeight]).toFloat().div(255.0).expandDims;
});
//todo lo que viene a partir de abajo probablemente haya que cambiarlo o agregar muchas cosas
const model = await tf.loadLayersModel('tensorflowProbando.js');
model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

const batchSize = 32;
const numEpochs = 10;

const dataset = tf.data.generator(function* () {
  // Iterate through your training data
  imagenes.map((picadura)=>{
    // Load and preprocess your image
   // const imgTensor = ...; // Load and preprocess your image tensor
    
    // Yield the image tensor and its label
   // yield [picadura.imagen, picadura.label];
  });
}).batch(batchSize).shuffle(bufferSize);

export default {imagenes}