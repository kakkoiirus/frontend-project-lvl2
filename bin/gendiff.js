#!/usr/bin/env node

import commander from 'commander';
import gendiff from '../src/gendiff.js';

const { program } = commander;

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, { format: program.opts().format }));
  });

program.parse(process.argv);
