# AnyChart Themes Collection
Source files ot the themes for AnyChart products.

Themes are supposed to be used in **browser**, not in **nodejs environment** directly, so you should bundle them with your favourite bundler.

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

After you've done so, you can access theme through `anychart.themes` object using the theme name: `anychart.themes['coffee']`.

If you want to set the theme for AnyChart, you can use a string `anychart.theme('coffee')`.

Please refer to [AnyChart Theme Documentation](https://docs.anychart.com/Appearance_Settings/Themes) for the detailed explanation.


#### Examples
Run the `npm run samples` command to build samples.

The command will create a `samples` directory in the project folder with html examples.


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
You can find themes files (both minified and not minified) in the `./dist` folder.

If you are insterested in a certain theme, you can pass the themeName parameter (theme names are the same as source JS file names).

Refer to [building](#building) section for the detailed information.


#### Package managers

You can install AnyChart Themes Collection using **npm** or **yarn**:

* `npm install anychart-themes`
* `yarn add anychart-themes`

After installation you can add files to your project by theme name using the `require` statement.

```
const darkBlue = require('anychart-themes/darkBlue');
```

There is no way to require all themes simultaneously.

If you are using Webpack release 2+ or Rollup and code ES6, you can use `import` statement to add a theme.

```
import { darkBlue } from 'anychart-themes';
```

## Building
To build themes you should run the command below:

```bash
npm run build
```
It will create 2 additional folders: `cjs` and `dist`.

* `dist` folder contains [IIFE](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) files to load direcly in browser.
* `cjs` folder contains files with the `module.exports` export section.

If you are interested in building certain theme you can specify it name using the parameter. Theme names are the same as their source files names. E.g. darkBlue.js is darkBlue

```
npm run build darkBlue
```

## Versioning
Since `anychart-themes` became a separate package, it has own versions.
If you don't sure which version works best with you version of AnyChart, you can access proper themes using AnyChart CDN links, such as:

`https://cdn.anychart.com/releases/8.6.0/themes/coffee.min.js`
