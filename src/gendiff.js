import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildAst from './ast.js';
import formater from './formatters/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);

  const data = fs.readFileSync(fullPath, 'utf-8');

  return data;
};

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2, format = 'stylish') => {
  const fileFormat1 = getFileFormat(filepath1);
  const fileFormat2 = getFileFormat(filepath2);

  const parsedData1 = parse(readFile(filepath1), fileFormat1);
  const parsedData2 = parse(readFile(filepath2), fileFormat2);

  const ast = buildAst(parsedData1, parsedData2);

  return formater(ast, format);
};
