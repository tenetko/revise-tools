# Build React application:

FROM node:alpine AS frontend_builder
WORKDIR /app/frontend

COPY ./frontend ./

RUN yarn
RUN yarn build


# Make a production image

FROM python:3.13-slim

WORKDIR /usr/src/revise-tools

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH="/usr/src/revise-tools"

COPY ./backend/pyproject.toml ./backend/poetry.lock .
COPY ./backend/ .

RUN apt update && apt -y upgrade && apt install -y ca-certificates \
&& pip install --upgrade pip && pip install poetry==2.0.1 && poetry install --no-root

COPY --from=frontend_builder app/frontend/build ./static

CMD [ "poetry", "run", "python", "-m", "uvicorn", "src.main:app", "--host=0.0.0.0", "--port=8080"]