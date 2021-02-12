import _ from 'lodash';

const ast = (obj1, obj2) => {
  const keysToCompare = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return keysToCompare.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const isObj1HasKey = _.has(obj1, key);
    const isObj2HasKey = _.has(obj2, key);

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return [...acc, { key, value: ast(value1, value2), hasChildren: true }];
    }

    if (value1 === value2) {
      return [...acc, { key, status: 'unchanged', value: value1 }];
    }

    if (isObj1HasKey && isObj2HasKey) {
      return [
        ...acc,
        {
          key,
          status: 'updated',
          value: value2,
          oldValue: value1,
        }];
    }

    if (isObj1HasKey) {
      return [...acc, { key, status: 'deleted', value: value1 }];
    }

    if (isObj2HasKey) {
      return [...acc, { key, status: 'added', value: value2 }];
    }

    return acc;
  }, []);
};

export default ast;
