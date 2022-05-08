"use strict";
const _ = require("lodash");
// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  while (logSources.length > 0) {
    logSources.sort((a, b) => a.last.date - b.last.date)
    const nextToPrint = logSources[0]
    printer.print(nextToPrint.last)
    nextToPrint.pop()
    if (nextToPrint.drained) {
      logSources.shift()
    }
  }
  printer.done();
  return console.log("Sync sort complete.");
};
