module.exports = {
  mode: "development",
  entry: "./public/js/index.js",
  output: {
    "path": __dirname + "/public",
    "filename": "main.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }  
}