import { Router } from "./deps.ts";
import * as planets from "./models/planets.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
      {___     {__      {_         {__ __        {_       
      {_ {__   {__     {_ __     {__    {__     {_ __     
      {__ {__  {__    {_  {__     {__          {_  {__    
      {__  {__ {__   {__   {__      {__       {__   {__   
      {__   {_ {__  {______ {__        {__   {______ {__  
      {__    {_ __ {__       {__ {__    {__ {__       {__ 
      {__      {__{__         {__  {__ __  {__         {__
                      Mission Control API`;
});

router.get("/planets", (ctx) => {
  ctx.response.body = planets.getAll();
});

export default router;