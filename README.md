# AnyChart Themes Collection
Source files ot the themes for AnyChart products.

Themes supposed to be used in **browser**, not in **nodejs environment** directly, so you should bundle them with your favourite bundler.

## Table of Contents
* [Usage](#usage)
* [Building](#building)
* [Versioning](#versioning)

## Usage

#### CDN
If you don't want to download and host theme yourself, you can include it from the AnyChart CDN (Content Delivery Network).

```html
<head>
<script src="https://cdn.anychart.com/themes/2.0.0/coffee.min.js"></script>
</head>
```

After, you will be able to access it through `anychart.themes` object by the theme name: `anychart.themes['coffee']`.

If you want to set the theme for AnyChart, you can use just a string `anychart.theme('coffee')`.

Please refer to [documentation](https://docs.anychart.com/Appearance_Settings/Themes) for detailed explanation.


#### Usage samples
Run command `npm run samples` to build samples of usage.

It will create a `samples` directory in the project folder with html examples.


#### Cloning the repository
```bash
git clone git@github.com:AnyChart/anychart-themes.git
cd anychat-themes
npm install
```
Now you should run the build command to build themes

```
npm run build
```
You can find themes files in `./dist` folder. Both minified and not.

If you are insterested in a certain theme, you can pass the themeName parameter (theme names are equal to source JS filenames).

Refer to [building](#building) section for detailed information.


#### Package managers

You can install AnyChart Themes Collection using **npm** or **yarn**:

* `npm install anychart-themes`
* `yarn add anychart-themes`

After installation you can add files to your project by theme name through `require` statement.

```
const darkBlue = require('anychart-themes/darkBlue');
```

There is no way to require all themes simultaneously.

If you are using Webpack release 2+ or Rollup and code ES6, you can use `import` statement to add theme.

```
import { darkBlue } from 'anychart-themes';
```

## Building
To build themes you should run the command below:

```bash
npm run build
```
It will create 2 additional folders `cjs` and `dist`.

* `dist` folder contains [IIFE](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) files to load direcly in browser.
* `cjs` folder contains files with `module.exports` export section.

If you are interested in building certain theme you can specify it name through the parameter. Theme names are equal to their source files names. E.g. darkBlue.js is darkBlue

```
npm run build darkBlue
```

## Versioning
Since `anychart-themes` became separate package, it has own versions.
So if you don't sure which version work's finest with AnyChart, you can access them through AnyChart project CDN links. Such as:

`https://cdn.anychart.com/releases/v8/themes/coffee.min.js`