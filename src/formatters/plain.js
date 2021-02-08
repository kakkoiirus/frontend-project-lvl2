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

      const newPath = [...path, key];

      if (hasChildren) {
        return iter(value, newPath);
      }

      const basicLine = (`Property '${newPath.join('.')}' was ${STATUS_MAP[status]}`);

      if (status === 'updated') {
        return `${basicLine}. From ${stringify(oldValue)} to ${stringify(value)}`;
      }

      if (status === 'added') {
        return `${basicLine} with value: ${stringify(value)}`;
      }

      return basicLine;
    });

    return result.join('\n');
  };

  return iter(diff);
};
