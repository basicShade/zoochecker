FROM python:3.9
WORKDIR /app
COPY ./backend_requirements.txt .
RUN apt-get install libmagickwand-dev
RUN pip install --no-cache-dir --upgrade -r backend_requirements.txt 
COPY . .
CMD ["uvicorn", "api.server:server", "--host", "0.0.0.0", "--port", "8000"]
