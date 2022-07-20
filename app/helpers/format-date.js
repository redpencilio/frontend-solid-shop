import { helper } from '@ember/component/helper';

export default helper(function formatDate(params) {
  const date = new Date(params[0]);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
});
