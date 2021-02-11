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

const getFormatOfFile = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2, formaterName = 'stylish') => {
  const formatOfFile1 = getFormatOfFile(filepath1);
  const formatOfFile2 = getFormatOfFile(filepath2);

  const parsedFile1 = parse(readFile(filepath1), formatOfFile1);
  const parsedFile2 = parse(readFile(filepath2), formatOfFile2);

  const buildedAst = ast(parsedFile1, parsedFile2);

  return format(buildedAst, formaterName);
};
