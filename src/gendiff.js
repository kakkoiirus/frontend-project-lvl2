import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
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

  const iter = (obj1, obj2) => {
    const keysToCompare = Object.keys({ ...obj1, ...obj2 }).sort();

    return keysToCompare.reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const isObj1HasKey = _.has(obj1, key);
      const isObj2HasKey = _.has(obj2, key);

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return [...acc, { key, value: iter(value1, value2), hasChildren: true }];
      }

      if (value1 === value2) {
        return [...acc, { key, status: 'unchanged', value: value1 }];
      }

      if (isObj1HasKey && isObj2HasKey) {
        return [
          ...acc,
          {
            key,
            status: 'updated',
            value: value2,
            oldValue: value1,
          }];
      }

      if (isObj1HasKey) {
        return [...acc, { key, status: 'deleted', value: value1 }];
      }

      if (isObj2HasKey) {
        return [...acc, { key, status: 'added', value: value2 }];
      }

      return acc;
    }, []);
  };

  const ast = iter(parsedFile1, parsedFile2);

  return format(ast, formaterName);
};
