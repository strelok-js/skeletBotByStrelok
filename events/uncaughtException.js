'use strict';
module.exports = (bot, err) => {
    console.log(`\x1b[32m${Date.now()}[39m | \x1b[31mОшибка: \x1b[35m\x1b[4muncaughtException[24m[39m[39m | \x1b[33mИнфо: \x1b[36m\x1b[4m${err.message}[24m[39m[39m`);
    console.log(`Native Error: `+err);
    process.exit(1);
};