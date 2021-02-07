import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, formater) => {
  if (formater === 'plain') {
    return plain(diff);
  }

  if (formater === 'json') {
    return json(diff);
  }

  return stylish(diff);
};
