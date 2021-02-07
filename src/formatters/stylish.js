import _ from 'lodash';

const STATUS_MAP = {
  added: '+',
  deleted: '-',
};
const START_SYMBOL = '{';
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

const getLine = (key, value, status, depth) => `${getIndent(depth)}  ${getSymbol(status)} ${key}: ${value}`;

export default (diff) => {
  const iter = (ast, depth = 0) => {
    const result = [];
    result.push(START_SYMBOL);

    const newAst = _.isPlainObject(ast) ? transformObject(ast) : [...ast];

    newAst.forEach((item) => {
      const {
        key,
        status,
        hasChildren,
      } = item;

      const oldValue = _.isPlainObject(item.oldValue)
        ? iter(item.oldValue, depth + 1)
        : item.oldValue;

      const value = _.isPlainObject(item.value) || hasChildren
        ? iter(item.value, depth + 1)
        : item.value;

      if (status === 'updated') {
        result.push(getLine(key, oldValue, 'deleted', depth));
        result.push(getLine(key, value, 'added', depth));
        return;
      }

      result.push(getLine(key, value, status, depth));
    });

    result.push(`${getIndent(depth)}${END_SYMBOL}`);

    return result.join('\n');
  };

  return iter(diff);
};
