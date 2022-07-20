"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  let entries = [];  // combine all sources entries
  logSources.forEach((s, index) => {  // loop through each source
    while (!s.drained) { // run untill source drained
      const entry = s.pop();
      if (!entry) break;

      entries.push(entry);
      
      entries.sort((a, b) => {  // must sort all entries
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c - d;
      });

      printer.print(entry);
    }
    printer.last = new Date(0);
    console.log('Now drained is true => ', s.drained, index);
  });
  printer.done();
  return console.log("Sync sort complete.");
};
