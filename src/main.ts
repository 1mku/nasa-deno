import {
  Hono as Application,
  HTTPException,
  logger,
  poweredBy,
  serveStatic,
} from "./deps.ts";
import api from "./api.ts";

const app = new Application();
const PORT = 8000;

app.use(logger());
app.use(poweredBy());

app.use(async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  c.res.headers.set("X-Response-Time", `${end - start}`);
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse();
  }
  c.status(500);
  return c.body("Internal server error");
});

addEventListener("error", (event) => {
  logger(event.error);
});

app.get("/", serveStatic({ path: "public/index.html" }));
app.route("/api", api);
app.use("/public/*", serveStatic({ root: "/" }));

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  Deno.serve({ port: PORT }, app.fetch);
}
