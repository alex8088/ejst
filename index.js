const fs = require('fs')
const path = require('path')

let cacheTemplates = [], cacheFunctions = []

/**
 * Compile a string template
 * @param {String} tpl
 */
const compile = (tpl) => {
  const arg = 'var p=[];with(data){p.push(\'' +
    tpl
      .replace(/[\r\t\n]/g, ' ')
      .split('<%').join('\t')
      .replace(/((^|%>)[^\t]*)'/g, '$1\r')
      .replace(/\t=(.*?)%>/g, '\',$1,\'')
      .split('\t').join('\');')
      .split('%>').join('p.push(\'')
      .split('\r').join('\\\'')
    + '\');}return p.join(\'\');'
  return new Function('data', arg)
}

// exports.compile = compile

/**
 * Render a string template
 * @param {string} tpl
 * @param {object} data
 */
const render = (tpl, data = {}) => {
  let func = cacheFunctions[tpl]
  if (!func) {
    func = compile(tpl)
    cacheFunctions[tpl] = func
  }
  return func(data)
}

exports.render = render

/**
 * Render a file template
 * @param {string} name
 * @param {object} data
 */
const renderFile = (name, data = {}) => {
  let tpl = cacheTemplates[name]
  if (tpl) {
    data.include = renderFile
    return render(tpl, data)
  } else {
    let _path = path.join(__dirname, '..', '..', name)
    if (fs.existsSync(_path)) {
      data.include = renderFile
      tpl = fs.readFileSync(_path, 'utf8')
      cacheTemplates[name] = tpl
      return render(tpl, data)
    }
    return ''
  }
}

exports.renderFile = renderFile
