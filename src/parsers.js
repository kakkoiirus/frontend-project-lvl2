import yaml from 'js-yaml';

export default (content, format = 'json') => {
  switch (format) {
    case 'json':
      return JSON.parse(content);

    case 'yml':
      return yaml.load(content);

    default:
      throw new Error(`Unknown format ${format}.`);
  }
};
