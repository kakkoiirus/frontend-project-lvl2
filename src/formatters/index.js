import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, formater) => {
  switch (formater) {
    case 'stylish':
      return stylish(diff);

    case 'plain':
      return plain(diff);

    case 'json':
      return JSON.stringify(diff);

    default:
      throw new Error(`Unknown formater ${formater}.`);
  }
};
