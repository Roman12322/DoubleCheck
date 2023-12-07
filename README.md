# DoubleCheck

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

- Facial Reenactment
--Face2Face (F2F) [Dataset](https://github.com/ondyari/FaceForensics)
--Neural Texture (NT) [Dataset]()
-Identity Swap
--DeepFake (DF) [Dataset] [GitHub](https://github.com/ondyari/FaceForensics)
--FaceSwap (FS) [Dataset] [GitHub](https://github.com/ondyari/FaceForensics)
-DeepFake Detection (DFD) [Dataset](https://github.com/ondyari/FaceForensics)
--DeepFake Detection Challenge (DFDC) [Dataset](https://dfdc.ai/login)

## Fine-tuning
For fine-tuning model was used specific LoraConfig. You may wanna play with lora_dropout, lora_r, lora_alpha as well and adjust it more precisely.
```
lora_alpha = 16
lora_dropout = 0.1
lora_r = 64

config = LoraConfig(
    lora_alpha=lora_alpha,
    lora_dropout=lora_dropout,
    r=lora_r,
    bias="none",
    task_type="CAUSAL_LM",
    target_modules=[
        "query_key_value",
        "dense",
        "dense_h_to_4h",
        "dense_4h_to_h",
    ]
)
```
## Metrics
