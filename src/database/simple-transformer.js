module.exports = {
  process(src) {
    const code = src
      .replace(/import { (.*) } from "(.*)";/g, 'const { $1 } = require("$2");')
      .replace(/import (.*) from "(.*)";/g, 'const $1 = require("$2");')
      .replace(/export { (.*) };/g, 'module.exports = { $1 };');
    return {
      code: code
    };
  }
};
