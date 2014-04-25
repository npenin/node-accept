process.env.DEBUG='accept';
console.log(require('accept')('application/json, text/javascript, */*; q=0.01', ['text/html', 'application/json'], 'text/plain'));
