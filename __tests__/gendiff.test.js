import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Stylish diff of two json-file', () => {
  const expectedResult = readFixture('expected_result.txt');
  const result = gendiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(result).toEqual(expectedResult);
});

test('Stylish diff of two yaml-file', () => {
  const expectedResult = readFixture('expected_result.txt');
  const result = gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
  expect(result).toEqual(expectedResult);
});

test('Plain diff of two json-file', () => {
  const expectedResult = readFixture('expected_plain.txt');
  const result = gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain');
  expect(result).toEqual(expectedResult);
});

test('Plain diff of two yaml-file', () => {
  const expectedResult = readFixture('expected_plain.txt');
  const result = gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain');
  expect(result).toEqual(expectedResult);
});
