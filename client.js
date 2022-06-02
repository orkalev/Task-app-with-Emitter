const EventEmitter = require('events'); 
const readline = require('readline');


const readln = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new EventEmitter();
const server = require('./server')(client);
server.on('response', (res) => {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    process.stdout.write(res);
    process.stdout.write('\n\> ');
});
let comment, args;
readln.on('line', (input) => {
    [comment, ...args] = input.split(' ');
    client.emit('comment', comment, args);
})
