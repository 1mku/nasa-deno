import { Application } from "jsr:@oak/oak@14";

const app = new Application();
const PORT = 8000;

app.use(async (ctx, next) => {
  ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API`;
  await next();
});

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  app.listen({ port: PORT });
}
