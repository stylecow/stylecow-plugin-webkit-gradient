stylecow plugin webkit-gradient
===============================

[![Build Status](https://travis-ci.org/stylecow/stylecow-plugin-webkit-gradient.svg)](https://travis-ci.org/stylecow/stylecow-plugin-webkit-gradient)

Stylecow plugin to generate the css fallback code with the old webkit syntax for css gradients. 

Note: this plugin does not add vendor prefixes to the new syntax, use [stylecow-plugin-prefixes](https://github.com/stylecow/stylecow-plugin-prefixes) to do that.

You write:

```css
body {
    background-image: linear-gradient(to bottom, red, blue);
}
```

And stylecow converts to:

```css
body {
    background-image: -webkit-gradient(linear, left top, left bottom, from(red), to(blue));
    background-image: linear-gradient(to bottom, red, blue);
}
```

More demos in [the tests folder](https://github.com/stylecow/stylecow-plugin-webkit-gradient/tree/master/tests/cases)
