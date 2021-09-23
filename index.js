const fs = require("fs");
const jsonlines = require("jsonlines");
const os = require("os");
const parser = jsonlines.parse();
let output = [];

parser.on("data", (data) => {
  if (data.body.length) {
    if (data.body[0].toUpperCase() === "IEEE") {
      output.push(JSON.stringify(data));
    }
  }
});

let stringified;
try {
  stringified = fs.readFileSync("norm_standard_000000000000.jsonl", "utf8");
} catch (err) {
  console.error(err);
} finally {
  parser.write(stringified);
}

parser.end();
output.forEach((line) => {
  fs.appendFileSync("./IEEE.jsonl", line + os.EOL);
});
