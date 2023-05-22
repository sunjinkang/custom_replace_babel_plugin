var UglifyJS = require('uglify-js');

var compressor = UglifyJS.Compressor();

class LocationFixer extends UglifyJS.TreeWalker {
  constructor(path) {
    var filename = path.hub.file.opts.filenameRelative;
    super((node) => {
      node.start.file = node.end.file = filename;
    });
  }
}

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
        const uAST = UglifyJS.AST_Node.from_mozilla_ast(ast);
        uAST.walk(new LocationFixer(this));

        uAST.figure_out_scope();
        uAST = uAST.transform(compressor);

        uAST.figure_out_scope();
        uAST.compute_char_frequency();
        uAST.mangle_names();

        return uAST.to_mozilla_ast();
      },
    },
  };
};
