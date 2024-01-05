import numpy as np
import os
from keras.layers import Input, Dense, Flatten, Conv2D, MaxPooling2D, BatchNormalization, Dropout, Reshape, Concatenate, LeakyReLU
from keras.optimizers import Adam
from keras.models import Model
from keras.models import load_model
import cv2
from moviepy.editor import VideoFileClip
import numpy as np
import os
from datetime import timedelta
from PIL import Image
from keras.utils import img_to_array
import imageio.v3 as iio


image_dimensions = {'height':256, 'width':256, 'channels':3}
SAVING_FRAMES_PER_SECOND = 1


def format_timedelta(td):
    """Служебная функция для классного форматирования объектов timedelta (например, 00: 00: 20.05)
    исключая микросекунды и сохраняя миллисекунды"""
    result = str(td)
    try:
        result, ms = result.split(".")
    except ValueError:
        return result + ".00".replace(":", "-")
    ms = int(ms)
    ms = round(ms / 1e4)
    return f"{result}.{ms:02}".replace(":", "-")

def preprocessing_video(video_file, video_filename):
    # загрузить видеоклип
    frames = iio.imread(video_file, index=None, format_hint=".webm")
    print(f"frames: {frames.shape}")
    for frame in frames:
        print(frame.shape)
    return frames
    # video_clip = VideoFileClip('output.webm')
    # # создаем папку по названию видео файла
    # filename, _ = os.path.splitext(video_filename)
    # filename += "-moviepy"
    # if not os.path.isdir(filename):
    #     os.mkdir(filename)
    # # если SAVING_FRAMES_PER_SECOND выше видео FPS, то установите его на FPS (как максимум)
    # saving_frames_per_second = min(video_clip.fps, SAVING_FRAMES_PER_SECOND)
    # # если SAVING_FRAMES_PER_SECOND установлен в 0, шаг равен 1 / fps, иначе 1 / SAVING_FRAMES_PER_SECOND
    # step = 1 / video_clip.fps if saving_frames_per_second == 0 else 1 / saving_frames_per_second
    # # перебираем каждый возможный кадр
    # for current_duration in np.arange(0, video_clip.duration, step):
    #     # отформатируйте имя файла и сохраните его
    #     frame_duration_formatted = format_timedelta(timedelta(seconds=current_duration)).replace(":", "-")
    #     frame_filename = os.path.join(filename, f"frame{frame_duration_formatted}.jpg")
    #     # сохраняем кадр с текущей длительностью
    #     video_clip.save_frame(frame_filename, current_duration)

def prepare_frames(frames):
    # init_directory = f"output-moviepy"
    # files = os.listdir(init_directory)
    # images = []
    # for path_img in files:
    #     img = Image.open(init_directory+'/'+path_img)
    #     img = img.resize((image_dimensions['height'], image_dimensions['width']))
    #     img = img_to_array(img)/255
    #     img = np.expand_dims(img, axis=0)
    #     images.append(img)
    # return images
    pass


def get_average_predict_score(images_list, model):
    score = 0
    for img in images_list:
        score += model.predict(img)[0][0]
    return score/len(images_list)    

def pipeline(file, video_filename):
    frames = preprocessing_video(file, video_filename)
    meso = Meso4()
    meso.load("main/model_weights/model.h5")
    images = prepare_frames(frames)
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
