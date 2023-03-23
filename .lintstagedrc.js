module.exports = {
  '*.lib/**/*': ['prettier --write', 'eslint --fix'],
  '*.{js,css,md}': 'prettier --write',
  '*.ts': [() => 'tsc --skipLibCheck --noEmit'],
  'package.json': ['prettier-package-json --write'],
};
