import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  console.log(fullPath);

  const file = fs.readFileSync(fullPath, 'utf-8');

  return file;
};

export default (filepath1, filepath2) => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath1);

  const parsedFile1 = parse(readFile(filepath1), extension1);
  const parsedFile2 = parse(readFile(filepath2), extension2);

  const keysToCompare = Object.keys({ ...parsedFile1, ...parsedFile2 }).sort();

  let result = '{\n';

  keysToCompare.forEach((key) => {
    const key1 = parsedFile1[key];
    const key2 = parsedFile2[key];

    if (key1 === key2) {
      result += `    ${key}: ${key1}\n`;
      return;
    }

    if (_.has(parsedFile1, key)) {
      result += `  - ${key}: ${key1}\n`;
    }

    if (_.has(parsedFile2, key)) {
      result += `  + ${key}: ${key2}\n`;
    }
  });

  result += '}';

  return result;
};
