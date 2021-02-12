import _ from 'lodash';

const TYPE_MAP = {
  added: 'added',
  deleted: 'removed',
  updated: 'updated',
};

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

export default (diff) => {
  const iter = (ast, path = []) => {
    const changedItems = ast.filter(({ type }) => type !== 'unchanged');

    const result = changedItems.map((item) => {
      const {
        key,
        value,
        oldValue,
        type,
      } = item;

      const newPath = [...path, key];

      if (type === 'nested') {
        return iter(value, newPath);
      }

      const basicLine = (`Property '${newPath.join('.')}' was ${TYPE_MAP[type]}`);

      if (type === 'updated') {
        return `${basicLine}. From ${stringify(oldValue)} to ${stringify(value)}`;
      }

      if (type === 'added') {
        return `${basicLine} with value: ${stringify(value)}`;
      }

      return basicLine;
    });

    return result.join('\n');
  };

  return iter(diff);
};
