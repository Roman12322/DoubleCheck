FROM python:3.9

ENV PYTHONUNBUFFERED 1

WORKDIR /doublecheck

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install libgl1 -y

COPY . .

EXPOSE 8000

CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8000", "--noreload"]