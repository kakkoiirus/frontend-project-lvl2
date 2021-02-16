import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import gendiff from '../src/gendiff.js';

const JSON_FILEPATH1 = '__fixtures__/file1.json';
const JSON_FILEPATH2 = '__fixtures__/file2.json';
const YML_FILEPATH1 = '__fixtures__/file1.yml';
const YML_FILEPATH2 = '__fixtures__/file2.yml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylishResult = readFixture('expected_result.txt');
const expectedPlainResult = readFixture('expected_plain.txt');
const expectedJSONResult = readFixture('expected_json.txt');

describe('Test diff of', () => {
  test.each([
    [JSON_FILEPATH1, JSON_FILEPATH2, 'stylish', expectedStylishResult],
    [YML_FILEPATH1, YML_FILEPATH2, 'stylish', expectedStylishResult],
    [JSON_FILEPATH1, JSON_FILEPATH2, 'plain', expectedPlainResult],
    [YML_FILEPATH1, YML_FILEPATH2, 'plain', expectedPlainResult],
    [JSON_FILEPATH1, JSON_FILEPATH2, 'json', expectedJSONResult],
    [YML_FILEPATH1, YML_FILEPATH2, 'json', expectedJSONResult],
  ])('files: ( %s, %s ), style: %p', (filepath1, filepath2, style, expected) => {
    const result = gendiff(filepath1, filepath2, style);
    expect(result).toEqual(expected);
  });
});
