import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import format from './stylish.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);

  const file = fs.readFileSync(fullPath, 'utf-8');

  return file;
};

export default (filepath1, filepath2) => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath1);

  const parsedFile1 = parse(readFile(filepath1), extension1);
  const parsedFile2 = parse(readFile(filepath2), extension2);

  const iter = (obj1, obj2) => {
    const keysToCompare = Object.keys({ ...obj1, ...obj2 }).sort();

    return keysToCompare.reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        acc.push({ key, value: iter(value1, value2), hasChildren: true });
        return acc;
      }

      if (value1 === value2) {
        acc.push({ key, status: 'unchanged', value: value1 });
        return acc;
      }

      if (_.has(obj1, key)) {
        acc.push({ key, status: 'deleted', value: value1 });
      }

      if (_.has(obj2, key)) {
        acc.push({ key, status: 'added', value: value2 });
      }

      return acc;
    }, []);
  };

  const ast = iter(parsedFile1, parsedFile2);

  return format(ast);
};
