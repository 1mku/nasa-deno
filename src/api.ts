import { Hono, HTTPException } from "./deps.ts";
import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const api = new Hono();

api.get("/ascii", (c) => {
  return c.body(`
      {___     {__      {_         {__ __        {_       
      {_ {__   {__     {_ __     {__    {__     {_ __     
      {__ {__  {__    {_  {__     {__          {_  {__    
      {__  {__ {__   {__   {__      {__       {__   {__   
      {__   {_ {__  {______ {__        {__   {______ {__  
      {__    {_ __ {__       {__ {__    {__ {__       {__ 
      {__      {__{__         {__  {__ __  {__         {__
                      Mission Control API`);
});

api.get("/planets", (c) => {
  return c.json(planets.getAll());
});

api.get("/launches", (c) => {
  return c.json(launches.getAll());
});
api.get("/launches/:id", async (c, next) => {
  if (c.req.param("id")) {
    const launchesList = launches.getOne(Number(c.req.param("id")));
    if (launchesList) return c.json(launchesList);
    else {
      throw new HTTPException(400, {
        message: "Launch with this ID does not exist",
      });
    }
  }
  await next();
});

api.delete("/launches/:id", async (c, next) => {
  const { id } = c.req.param();
  if (id) {
    const result = launches.removeOne(Number(id));
    return c.json({ success: result });
  }
  await next();
});

api.post("/launches", async (c) => {
  const body = await c.req.json();

  launches.addOne(body);
  return c.json({ success: true }, 201);
});

export default api;
