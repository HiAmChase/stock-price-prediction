FROM python:3.10.4

ADD requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

CMD ["python3", "-m", "flask", "run"]