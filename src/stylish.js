import _ from 'lodash';

const STATUS_MAP = {
  added: '+',
  deleted: '-',
};
const START_SYMBOL = '{\n';
const END_SYMBOL = '}';
const GAP_SYMBOL = '    ';

const getSymbol = (status) => {
  if (!_.has(STATUS_MAP, status)) {
    return ' ';
  }

  return STATUS_MAP[status];
};

const getIndent = (depth) => `${GAP_SYMBOL.repeat(depth)}`;

const transformObject = (obj) => {
  const entries = Object.entries(obj);

  return entries.map(([key, value]) => ({ key, value }));
};

export default (diff) => {
  const stylish = (ast, depth = 0) => {
    let result = START_SYMBOL;

    const newAst = _.isPlainObject(ast) ? transformObject(ast) : [...ast];

    newAst.forEach((item) => {
      const { key, value, status } = item;

      if (item.hasChildren || _.isPlainObject(value)) {
        result += `${getIndent(depth)}  ${getSymbol(status)} ${key}: ${stylish(value, depth + 1)}\n`;
        return;
      }

      result += `${getIndent(depth)}  ${getSymbol(status)} ${key}: ${value}\n`;
    });

    result += `${getIndent(depth)}${END_SYMBOL}`;

    return result;
  };

  return stylish(diff);
};
