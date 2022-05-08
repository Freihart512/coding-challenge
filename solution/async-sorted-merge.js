"use strict";
const _ = require("lodash");

// Print all entries, across all of the *async* sources, in chronological order.
module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    while (logSources.length > 0) {
      logSources.sort((a, b) => a.last.date - b.last.date)
      const nextSourceToPrint = logSources[0]
      printer.print(nextSourceToPrint.last)
      try {
        if (await nextSourceToPrint.popAsync() === false) {
          logSources.shift()
        }
      } catch (error) {
        reject(error)
      }
    }

    printer.done();
    resolve(console.log("Async sort complete."));
  })
};
