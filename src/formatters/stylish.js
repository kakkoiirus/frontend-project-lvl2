import _ from 'lodash';

const TYPE_MAP = {
  added: '+',
  deleted: '-',
};
const GAP_SYMBOL = '    ';

const getSymbol = (type) => {
  if (!_.has(TYPE_MAP, type)) {
    return ' ';
  }

  return TYPE_MAP[type];
};

const getIndent = (depth) => `${GAP_SYMBOL.repeat(depth)}`;

const transformObject = (obj) => {
  const entries = Object.entries(obj);

  return entries.map(([key, value]) => ({ key, value }));
};

const getLine = (key, value, type, depth) => `${getIndent(depth)}  ${getSymbol(type)} ${key}: ${value}`;

export default (diff) => {
  const iter = (ast, depth = 0) => {
    const newAst = _.isPlainObject(ast) ? transformObject(ast) : [...ast];

    const result = newAst.flatMap((item) => {
      const {
        key,
        type,
      } = item;

      const oldValue = _.isPlainObject(item.oldValue)
        ? iter(item.oldValue, depth + 1)
        : item.oldValue;

      const value = _.isPlainObject(item.value) || type === 'nested'
        ? iter(item.value, depth + 1)
        : item.value;

      if (type === 'updated') {
        return [getLine(key, oldValue, 'deleted', depth), getLine(key, value, 'added', depth)];
      }

      return getLine(key, value, type, depth);
    });

    return `{\n${result.join('\n')}\n${getIndent(depth)}}`;
  };

  return iter(diff);
};
