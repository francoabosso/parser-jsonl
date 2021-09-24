import { readFileSync, appendFileSync } from "fs";
import { parse } from "jsonlines";
import { EOL } from "os";
const parser = parse();
const output = [];

parser.on("data", (data) => {
  const line = [];
  if (data.body.length) {
    if (data.body[0].toUpperCase() === "IEEE") {
      line.push("{");
      Object.entries(data).forEach((entry) => {
        line.push(JSON.stringify(entry[0]));
        line.push(":");
        line.push(JSON.stringify(entry[1]));
        line.push(",");
      });
      line.pop();
      line.push("}");
      output.push(line);
    }
  }
});

let stringified;
try {
  stringified = readFileSync("norm_standard_000000000000.jsonl", "utf8");
} catch (err) {
  console.error(err);
} finally {
  parser.write(stringified);
}

parser.end();
output.forEach((line) => {
  line.forEach((piece) => {
    appendFileSync("./IEEE.jsonl", piece);
  });
  appendFileSync("./IEEE.jsonl", EOL);
});
