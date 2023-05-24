const traverse = require('@babel/traverse');
const parse = require('@babel/parser');
const path = require('path');
const fs = require('fs');
const UglifyJS = require('uglify-js');

const rootPath = path.resolve(__dirname, './origin.js');

const checkFile = (filePath) => {
  const content = fs.readFileSync(filePath).toString();
  const ast = parse.parse(content, {
    sourceType: 'module',
  });

  traverse.default(ast, {
    Program(ast) {
      console.log(ast);
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
  });
};

checkFile(rootPath);
