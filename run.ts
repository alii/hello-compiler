import { parse } from "./parser";
import { readFile } from "fs/promises";

readFile("./hello.ali")
	.then(file => parse(file.toString("utf-8")))
	.then(console.log);
