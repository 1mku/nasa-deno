import { assertEquals } from "https://deno.land/std@0.219.0/assert/mod.ts";
import { add } from "./utils.ts";

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});
