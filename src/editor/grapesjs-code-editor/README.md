# GrapesJS Code Editor

A plugin to allow users to edit html and css code on GrapesJS.

## Download

* CDN
  * `https://unpkg.com/grapesjs-code-editor`
* NPM
  * `npm i grapesjs-code-editor`
* GIT
  * `git clone https://github.com/portablemind/grapesjs-code-editor.git`

## Usage

```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-code-editor.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      commands: {
        defaults: [
          window['grapesjs-code-editor'].codeCommand,
        ],
      },
      panels: window['grapesjs-code-editor'].panels,
  });
</script>
```

## Development

Clone the repository

```sh
$ git clone https://github.com/portablemind/grapesjs-code-editor.git
$ cd grapesjs-code-editor
```

Install dependencies

```sh
$ npm i
```

The plugin relies on GrapesJS via `peerDependencies` so you have to install it manually (without adding it to package.json)

```sh
$ npm i grapesjs --no-save
```

Start the dev server

```sh
$ npm start
```

## License

BSD 3-Clause
