import yaml from 'js-yaml';

export default (content, extension = '.json') => {
  if (extension === '.yml') {
    return yaml.load(content);
  }

  return JSON.parse(content);
};
