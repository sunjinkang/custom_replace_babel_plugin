var UglifyJS = require('uglify-js');

module.exports = function (babel) {
  var t = babel.types;

  function getOptions(opts) {
    if (opts.customOptions) return opts;
    var options = {};
    Object.keys(opts).forEach(function (k) {
      if (k === 'compressJs') {
        options[k] = opts[k];
      } else {
        opts[k].forEach((item) => (options[item] = new RegExp(item)));
      }
    });
    opts.customOptions = options;
    return opts;
  }

  const sourceVisitor = {
    Literal(path) {
      if (!this.opts) return;

      var opts = getOptions(this.opts);
      var keys = Object.keys(opts.customOptions);

      for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== 'compressJs') {
          var regex = opts.customOptions[keys[i]];
          if (regex.test(path.node.value)) {
            var replacement = path.node.value.replace(regex, opts[keys[i]]);
            path.replaceWith(t.stringLiteral(replacement));
            return;
          }
        }
      }
    },
  };

  return {
    visitor: {
      JsxElement: function (path, state) {
        path.traverse(sourceVisitor, state);
      },
      JSXOpeningElement: function (path, state) {
        path.traverse(sourceVisitor, state);
      },
      Program(ast) {
        // https://lisperator.net/uglifyjs/spidermonkey
        var uglifyAST = UglifyJS.AST_Node.from_mozilla_ast(ast);
        // compress code
        uglifyAST.figure_out_scope();
        var compressor = UglifyJS.Compressor();
        uglifyAST = uglifyAST.transform(compressor);
        // mangle names after compression
        uglifyAST.figure_out_scope();
        uglifyAST.compute_char_frequency();
        uglifyAST.mangle_names();

        return uglifyAST.to_mozilla_ast();
      },
    },
  };
};
