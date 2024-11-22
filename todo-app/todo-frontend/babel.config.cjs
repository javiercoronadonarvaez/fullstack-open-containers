module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react", // If you're using React, this is necessary as well.
  ],
  plugins: [
    "@babel/plugin-syntax-jsx", // Add this to enable JSX syntax
  ],
};
