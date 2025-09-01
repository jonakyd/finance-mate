/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require("@yarnpkg/types");

module.exports = defineConfig({
  async constraints({ Yarn }) {
    console.log("running constraints");
  },
});
