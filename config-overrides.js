const {
  override,
  addLessLoader,
  fixBabelImports,
  addBabelPlugins
} = require('customize-cra')

module.exports = override(
  addLessLoader(),
  ...addBabelPlugins(
    [
      '@babel/plugin-proposal-decorators',
      { legacy: true}
    ]
  ),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)