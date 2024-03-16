FROM denoland/deno:alpine-1.41.3

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN deno cache ./src/deps.ts

CMD ["run", "--allow-net", "--allow-read", "src/main.ts"]