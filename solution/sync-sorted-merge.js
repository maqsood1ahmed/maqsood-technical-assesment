"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = async (logSources, printer) => {
  let entries = [];  // combine all sources entries

  for(let i = 0; i < logSources.length; i++) { // loop through each source
    const s = logSources[i];
    await new Promise((resolve, reject) => {
      while (!s.drained) { // run untill source drained
        const entry = s.pop();
        if (!entry) {
          resolve(null);
          break;
        }
  
        entries.push(entry);
        
        entries.sort((a, b) => {  // must sort all entries
          var c = new Date(a.date);
          var d = new Date(b.date);
          return c - d;
        });
  
        printer.print(entry);
      }
    });
    printer.last = new Date(0);
  };
  printer.done();
  return console.log("Sync sort complete.");
};
