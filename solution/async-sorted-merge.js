"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {

  return new Promise((resolve, reject) => {
    let entries = [];  // combine all sources entries

    for(let i = 0; i < logSources.length; i++) { // loop through each source
      const s = logSources[i];
      while (!s.drained) { // run untill source drained
        const entry = s.pop();
        if (!entry) break;
  
        entries.push(entry);
          
        printer.print(entry);
      }
      printer.last = new Date(0);
    };

    if (entries.length < 25) {
      entries = require("../utils/general").insertionSortByDate(entries);
    } else {
      // entries = require("../utils/general").quickSortByDate(entries, 0, entries.length - 1);
      entries.sort((a, b) => {  // must sort all entries
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c - d;
      });
    }
    // console.log('all source entries => ', entries);

    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
