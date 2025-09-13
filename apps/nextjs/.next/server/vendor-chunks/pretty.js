"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/pretty";
exports.ids = ["vendor-chunks/pretty"];
exports.modules = {

/***/ "(rsc)/../../node_modules/pretty/index.js":
/*!******************************************!*\
  !*** ../../node_modules/pretty/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*!\n * pretty <https://github.com/jonschlinkert/pretty>\n *\n * Copyright (c) 2013-2015, 2017, Jon Schlinkert.\n * Released under the MIT License.\n */\n\n\n\nvar beautify = __webpack_require__(/*! js-beautify */ \"(rsc)/../../node_modules/js-beautify/js/index.js\");\nvar condense = __webpack_require__(/*! condense-newlines */ \"(rsc)/../../node_modules/condense-newlines/index.js\");\nvar extend = __webpack_require__(/*! extend-shallow */ \"(rsc)/../../node_modules/extend-shallow/index.js\");\nvar defaults = {\n  unformatted: ['code', 'pre', 'em', 'strong', 'span'],\n  indent_inner_html: true,\n  indent_char: ' ',\n  indent_size: 2,\n  sep: '\\n'\n};\n\nmodule.exports = function pretty(str, options) {\n  var opts = extend({}, defaults, options);\n  str = beautify.html(str, opts);\n\n  if (opts.ocd === true) {\n    if (opts.newlines) opts.sep = opts.newlines;\n    return ocd(str, opts);\n  }\n\n  return str;\n};\n\nfunction ocd(str, options) {\n  // Normalize and condense all newlines\n  return condense(str, options)\n    // Remove empty whitespace the top of a file.\n    .replace(/^\\s+/g, '')\n    // Remove extra whitespace from eof\n    .replace(/\\s+$/g, '\\n')\n\n    // Add a space above each comment\n    .replace(/(\\s*<!--)/g, '\\n$1')\n    // Bring closing comments up to the same line as closing tag.\n    .replace(/>(\\s*)(?=<!--\\s*\\/)/g, '> ');\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL3ByZXR0eS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLHFFQUFhO0FBQ3BDLGVBQWUsbUJBQU8sQ0FBQyw4RUFBbUI7QUFDMUMsYUFBYSxtQkFBTyxDQUFDLHdFQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ac2Fhc2ZseS9uZXh0anMvLi4vLi4vbm9kZV9tb2R1bGVzL3ByZXR0eS9pbmRleC5qcz8wYTAxIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogcHJldHR5IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9wcmV0dHk+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTUsIDIwMTcsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGJlYXV0aWZ5ID0gcmVxdWlyZSgnanMtYmVhdXRpZnknKTtcbnZhciBjb25kZW5zZSA9IHJlcXVpcmUoJ2NvbmRlbnNlLW5ld2xpbmVzJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kLXNoYWxsb3cnKTtcbnZhciBkZWZhdWx0cyA9IHtcbiAgdW5mb3JtYXR0ZWQ6IFsnY29kZScsICdwcmUnLCAnZW0nLCAnc3Ryb25nJywgJ3NwYW4nXSxcbiAgaW5kZW50X2lubmVyX2h0bWw6IHRydWUsXG4gIGluZGVudF9jaGFyOiAnICcsXG4gIGluZGVudF9zaXplOiAyLFxuICBzZXA6ICdcXG4nXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHByZXR0eShzdHIsIG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSBleHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgc3RyID0gYmVhdXRpZnkuaHRtbChzdHIsIG9wdHMpO1xuXG4gIGlmIChvcHRzLm9jZCA9PT0gdHJ1ZSkge1xuICAgIGlmIChvcHRzLm5ld2xpbmVzKSBvcHRzLnNlcCA9IG9wdHMubmV3bGluZXM7XG4gICAgcmV0dXJuIG9jZChzdHIsIG9wdHMpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbmZ1bmN0aW9uIG9jZChzdHIsIG9wdGlvbnMpIHtcbiAgLy8gTm9ybWFsaXplIGFuZCBjb25kZW5zZSBhbGwgbmV3bGluZXNcbiAgcmV0dXJuIGNvbmRlbnNlKHN0ciwgb3B0aW9ucylcbiAgICAvLyBSZW1vdmUgZW1wdHkgd2hpdGVzcGFjZSB0aGUgdG9wIG9mIGEgZmlsZS5cbiAgICAucmVwbGFjZSgvXlxccysvZywgJycpXG4gICAgLy8gUmVtb3ZlIGV4dHJhIHdoaXRlc3BhY2UgZnJvbSBlb2ZcbiAgICAucmVwbGFjZSgvXFxzKyQvZywgJ1xcbicpXG5cbiAgICAvLyBBZGQgYSBzcGFjZSBhYm92ZSBlYWNoIGNvbW1lbnRcbiAgICAucmVwbGFjZSgvKFxccyo8IS0tKS9nLCAnXFxuJDEnKVxuICAgIC8vIEJyaW5nIGNsb3NpbmcgY29tbWVudHMgdXAgdG8gdGhlIHNhbWUgbGluZSBhcyBjbG9zaW5nIHRhZy5cbiAgICAucmVwbGFjZSgvPihcXHMqKSg/PTwhLS1cXHMqXFwvKS9nLCAnPiAnKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/pretty/index.js\n");

/***/ })

};
;