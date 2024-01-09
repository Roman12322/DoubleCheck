# [DoubleCheck](https://doublecheck-production.up.railway.app/)

## Task description

Goal: create CNN-model set up to detect deepfake video. In addition, try out some unique gesture to as mark of confirmation.  

## Paper-part

### Introduction

Deepfakes (portmanteau of "deep learning" and "fake") are synthetic media that have been digitally manipulated to replace one person's likeness convincingly with that of another. 
Deepfakes are the manipulation of facial appearance through deep generative methods. 
While the act of creating fake content is not new, deepfakes leverage powerful techniques from machine learning and artificial intelligence to manipulate or generate visual and audio content that can more easily deceive. 
The main machine learning methods used to create deepfakes are based on deep learning and involve training generative neural network architectures, such as autoencoders,
or generative adversarial networks (GANs). In turn the field of image forensics develops techniques to detect manipulated images.

### Pretrained weights for models

The following link contains the weights for the models (CLRNet [CLR], ShallowNetV3 [SNV3], MesoInception4 [M14], and Xception [XCE]) used in our experiments
[link to download](https://drive.google.com/drive/folders/1CE-HzZh76ejAsrIFSlbaEGmQHyzoj9EQ?usp=sharing)

### Dataset to both train and validate model:
*    Face2Face (F2F) [Dataset](https://github.com/ondyari/FaceForensics)
*    Neural Texture (NT) [Dataset](https://github.com/ondyari/FaceForensics)
*    DeepFake (DF) [Dataset] [GitHub](https://github.com/ondyari/FaceForensics)
*    FaceSwap (FS) [Dataset] [GitHub](https://github.com/ondyari/FaceForensics)
*    DeepFake Detection (DFD) [Dataset](https://github.com/ondyari/FaceForensics)
*    DeepFake Detection Challenge (DFDC) [Dataset](https://dfdc.ai/login)

### [Link to test of the models](https://github.com/shahroztariq/CLRNet)
