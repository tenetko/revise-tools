# Build React application:

FROM node:alpine AS frontend_builder
WORKDIR /app/frontend

COPY ./frontend ./

RUN yarn
RUN yarn build


# Make a production image

FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip && pip install poetry

COPY ./backend/pyproject.toml ./backend/poetry.lock ./
RUN poetry install --no-root

COPY ./backend/ .
COPY --from=frontend_builder app/frontend/build ./static

CMD [ "poetry", "run", "python", "-m", "uvicorn", "src.main:app", "--host=0.0.0.0", "--port=8080"]