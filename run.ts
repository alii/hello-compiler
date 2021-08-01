import { parse } from "./parser";
import { readFile } from "fs/promises";

const stringify = (buffer: Buffer) => buffer.toString("utf-8");

// prettier-ignore
readFile("./hello.ali")
  .then(stringify)
  .then(parse)
  .then(console.log);
