# ejst

A embedded javascript template engine for nodejs.

- Auto cache template file to improving performance
- Include feature


## Installation

```bash
$ npm install ejst --save
```

## Usage

### Render string template

```js
const ejst = require('ejst')

// render HTML string
let str = ejst.render('<h5><%=title%></h5>', { title: 'Hello' })
console.log(str)
```

### Render file template

```html
<!--index.html-->
<div>
  <div class="dialog">
    <% if(typeof title === 'string'){ %>
    <div class="dialog__hd">
      <strong class="dialog__title"><%=title%></strong>
    </div>
    <% } %>
    <div class="dialog__bd"><%=content%></div>
    <div class="dialog__ft">
    <% for(var i = 0; i < buttons.length; i++){ %>
      <%=include('./examples/include.html', {button: buttons[i]})%>
    <% } %>
    </div>
  </div>
</div>
```

```html
<!--include.html-->
<a href="javascript:;" class="dialog__btn dialog__btn_<%=button.type%>"><%=button.label%></a>
```

```js
const ejst = require('ejst')

// render HTML file
let data = {
  title: 'Question',
  content: 'Are you sure?',
  buttons: [{ label: 'Yes', type: 'green' }, { label: 'No', type: 'gray' }]
}

let str = ejst.renderFile('./examples/index.html', data)
console.log(str)
```

### Include

```html
<div>
  <% for(var i = 0; i < buttons.length; i++){ %>
    <%=include('./examples/include.html', {button: buttons[i]})%>
  <% } %>
</div>
```

## License

[MIT](./LICENSE)