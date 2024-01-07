import numpy as np
from keras.layers import Input, Dense, Flatten, Conv2D, MaxPooling2D, BatchNormalization, Dropout, Reshape, Concatenate, LeakyReLU
from keras.optimizers import Adam
from keras.models import Model
from keras.models import load_model
from moviepy.editor import VideoFileClip
import numpy as np
from datetime import timedelta
from PIL import Image
from keras.utils import img_to_array
import imageio.v3 as iio
import cv2 as cv
import io
import subprocess

image_dimensions = {'height':256, 'width':256, 'channels':3}
SAVING_FRAMES_PER_SECOND = 1

def preprocessing_video(video_file):
    # load video-file
    
    try:
        frames = iio.imread(video_file, index=None, format_hint='.webm')
        print(f"frames' shape: {frames.shape}")
        return frames
    except Exception as e:
        video_file.seek(0)
        image_stream = io.BytesIO()
        image_stream.write(video_file.read())
        image_stream.seek(0)
        # file_bytes = np.asarray(bytearray(image_stream.read()), dtype=np.uint8)
        # print(f"bytes: {file_bytes}")
        print("writed to image_stream")
        frames = iio.imread(image_stream, index=1, format_hint='.webm')
        print(frames)
        return frames

def prepare_frames(frames):
    images = []
    for img in frames:
        img = Image.fromarray(img, "RGB")
        img = img.resize((image_dimensions['height'], image_dimensions['width']))
        img = img_to_array(img)
        img = (img)/255
        img = np.expand_dims(img, axis=0)
        images.append(img)
    return images

def get_average_predict_score(images_list, model):
    score = 0
    for img in images_list:
        score += model.predict(img)[0][0]
    return score/len(images_list)    

def pipeline_InMemory(file):
        frames = preprocessing_video(file)
        meso = Meso4()
        meso.load("main/model_weights/model.h5")
        images = prepare_frames(frames)
        print("processing video-file")
        avg_score = get_average_predict_score(images_list=images, model=meso)
        return avg_score

# Create a Classifier class
class Classifier:
    def __init__():
        self.model = 0
    
    def predict(self, x):
        return self.model.predict(x)
    
    def fit(self, x, y):
        return self.model.train_on_batch(x, y)
    
    def get_accuracy(self, x, y):
        return self.model.test_on_batch(x, y)
    
    def load(self, path):
        self.model = load_model(path)

# Create a MesoNet class using the Classifier
class Meso4(Classifier):
    def __init__(self, learning_rate = 0.001):
        self.model = self.init_model()
        optimizer = Adam(learning_rate = learning_rate)
        self.model.compile(optimizer = optimizer,
                           loss = 'mean_squared_error',
                           metrics = ['accuracy'])
    
    def init_model(self): 
        x = Input(shape = (image_dimensions['height'],
                           image_dimensions['width'],
                           image_dimensions['channels']))
        
        x1 = Conv2D(8, (3, 3), padding='same', activation = 'relu')(x)
        x1 = BatchNormalization()(x1)
        x1 = MaxPooling2D(pool_size=(2, 2), padding='same')(x1)
        
        x2 = Conv2D(8, (5, 5), padding='same', activation = 'relu')(x1)
        x2 = BatchNormalization()(x2)
        x2 = MaxPooling2D(pool_size=(2, 2), padding='same')(x2)
        
        x3 = Conv2D(16, (5, 5), padding='same', activation = 'relu')(x2)
        x3 = BatchNormalization()(x3)
        x3 = MaxPooling2D(pool_size=(2, 2), padding='same')(x3)
        
        x4 = Conv2D(16, (5, 5), padding='same', activation = 'relu')(x3)
        x4 = BatchNormalization()(x4)
        x4 = MaxPooling2D(pool_size=(4, 4), padding='same')(x4)
        
        y = Flatten()(x4)
        y = Dropout(0.5)(y)
        y = Dense(16)(y)
        y = LeakyReLU(alpha=0.1)(y)
        y = Dropout(0.5)(y)
        y = Dense(1, activation = 'sigmoid')(y)

        return Model(inputs = x, outputs = y)        
