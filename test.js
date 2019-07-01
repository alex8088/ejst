const ejst = require('.')

// render HTML string

let str1 = ejst.render('<h5><%=title%></h5>', { title: 'Hello' })
console.log(str1)

// render HTML file

let data = {
  title: 'Question',
  content: 'Are you sure?',
  buttons: [{ label: 'Yes', type: 'green' }, { label: 'No', type: 'gray' }]
}

let str2 = ejst.renderFile('./examples/index.html', data)
console.log(str2)
