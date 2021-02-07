import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, formater) => {
  if (formater === 'plain') {
    return plain(diff);
  }

  return stylish(diff);
};
