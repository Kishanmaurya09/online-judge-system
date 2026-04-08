import { exec } from "child_process";
import fs from "fs";

export const runCode = (code, language, input = "") => {
  return new Promise((resolve) => {

    const filename = "temp.py"; // python only for now

    fs.writeFileSync(filename, code);

    exec(`python ${filename}`, { input }, (error, stdout, stderr) => {

      if (error) {
        resolve("Runtime Error");
        return;
      }

      if (stderr && stderr.trim() !== "") {
        resolve(stderr);
        return;
      }

      resolve(stdout.trim());
    });
  });
};