function matchPattern(inputLine, pattern) {
  if (pattern.length === 1) {
    return inputLine.includes(pattern);
  } else if (pattern === "\\d") {
    return /\d/.test(inputLine);
  } else if (pattern === "\\w") {
    return /\w/.test(inputLine);
  } else if (
    pattern[0] === "[" &&
    pattern[1] === "^" &&
    pattern[pattern.length - 1] === "]"
  ) {
    const chars = pattern.slice(1, -1);
    return chars.split("").every((char) => !inputLine.includes(char));
  } else if (pattern[0] === "[" && pattern[pattern.length - 1] === "]") {
    const chars = pattern.slice(1, -1);
    return chars.split("").some((char) => inputLine.includes(char));
  } else {
    throw new Error(`Unhandled pattern ${pattern}`);
  }
}

function main() {
  const pattern = process.argv[3];
  const inputLine = require("fs").readFileSync(0, "utf-8").trim();

  if (process.argv[2] !== "-E") {
    console.log("Expected first argument to be '-E'");
    process.exit(1);
  }

  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.log("Logs from your program will appear here");

  // Uncomment this block to pass the first stage
  if (matchPattern(inputLine, pattern)) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();
