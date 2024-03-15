import { Application, log, send } from "./deps.ts";
import api from "./api.ts";

const app = new Application();
const PORT = 8000;

app.use(async (ctx, next) => {
  await next();
  const time = ctx.response.headers.get("X-Response-Time");
  log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
  const startTime = Date.now();
  await next();
  const delta = Date.now() - startTime;
  ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});

app.use(api.routes());
app.use(api.allowedMethods());

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = [
    "/index.html",
    "/js/script.js",
    "/css/style.css",
    "/videos/bg.mp4",
  ];
  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public`,
    });
  }
});

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await app.listen({ port: PORT });
}
