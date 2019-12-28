// https://stackoverflow.com/questions/11924452/iterating-over-basic-for-loop-using-handlebars-js
// http://jsfiddle.net/ambiguous/WNbrL/

const Handlebars = require('hbs');

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// Example
// {{#times 10}}
//   <span>{{this}}</span>
// {{/times}}

Handlebars.registerHelper('for', function(from, to, incr, offset, block) {
    var accum = '';
    for (var i = from; i < to; i += incr)
        accum += block.fn(i + offset);
    return accum;
});

// Example
// {{#for 0 10 1 }}
//  <span>{{this}}</span>
// {{/for}}

Handlebars.registerHelper('concat', function() {
  return [...arguments].filter(n => typeof n !== 'object').join('');
});

// Example
// {{url (concat './samples/' this '/')}}

