module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
  },
};
