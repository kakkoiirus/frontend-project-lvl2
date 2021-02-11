import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import ast from './ast.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);

  const file = fs.readFileSync(fullPath, 'utf-8');

  return file;
};

export default (filepath1, filepath2, formaterName = 'stylish') => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath1);

  const parsedFile1 = parse(readFile(filepath1), extension1);
  const parsedFile2 = parse(readFile(filepath2), extension2);

  const buildedAst = ast(parsedFile1, parsedFile2);

  return format(buildedAst, formaterName);
};
