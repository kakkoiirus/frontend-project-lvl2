import _ from 'lodash';

const STATUS_MAP = {
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
    const changedItems = ast.filter(({ status }) => status !== 'unchanged');

    const result = changedItems.map((item) => {
      const {
        key,
        value,
        oldValue,
        status,
        hasChildren,
      } = item;

      const newPath = [...path];
      newPath.push(key);

      if (hasChildren) {
        return iter(value, newPath);
      }

      const resultString = [];
      resultString.push(`Property '${newPath.join('.')}' was ${STATUS_MAP[status]}`);

      if (status === 'updated') {
        resultString.push(`. From ${stringify(oldValue)} to ${stringify(value)}`);
      }

      if (status === 'added') {
        resultString.push(` with value: ${stringify(value)}`);
      }

      return resultString.join('');
    });

    return result.join('\n');
  };

  return iter(diff);
};
