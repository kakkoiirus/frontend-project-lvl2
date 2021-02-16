import _ from 'lodash';

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const mapping = {
  nested: (path, { value }, fn) => fn(value, path),
  added: (path, { value }) => `Property '${path.join('.')}' was added with value: ${stringify(value)}`,
  deleted: (path) => `Property '${path.join('.')}' was removed`,
  unchanged: () => [],
  updated: (path, { value, oldValue }) => `Property '${path.join('.')}' was updated. From ${stringify(oldValue)} to ${stringify(value)}`,
};

const iter = (ast, path = []) => {
  const result = ast.flatMap((item) => {
    const newPath = [...path, item.key];

    return mapping[item.type](newPath, item, iter);
  });

  return result.join('\n');
};

export default iter;
