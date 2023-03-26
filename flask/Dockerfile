FROM python:slim-buster

WORKDIR /app

COPY ./requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["flask","run","--host=0.0.0.0","--debug"]
