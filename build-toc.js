import { expandGlob } from "https://deno.land/std/fs/mod.ts";
import { relative } from "https://deno.land/std/path/mod.ts";

const posts = [];
const cwd = Deno.cwd();

for await(const file of expandGlob("posts/*.md")) {6
	const name = file.name.split(".")[0];
	const relpath = relative(cwd, file.path);
	posts.push([name, relpath]);
}

const tocContent = posts.map(p => `* [${p[0]}](${p[1]})`).join("\n");

const toc = await Deno.readTextFile("table-of-contents.md");

const tocOutput = toc.replace("{{toc}}", tocContent);

await Deno.writeTextFile("README.md", tocOutput);