const EventEmitter = require('events'); 


class Server extends EventEmitter{
    constructor(client){
        super();
        this.tasks = {};
        this.numOfTasks = 0;
        this.taskId = 1;
        process.nextTick(() => {
            this.emit('response', 'Please type a comment (help to list comments)');
        });
        client.on('comment', (comment, args) => {
            //The type of comments that we like to support is 'help', 'add', 'ls', 'delete'
            switch(comment){
                case 'help':
                case 'add':
                case 'ls':
                case 'delete':
                    this[comment](args);
                    break;
                default:
                    this.emit('response', 'Unknown comment....');
                }
        })
    }

    taskToString(){
        return Object.keys(this.tasks).map(key => {
            return `${key}: ${this.tasks[key]}`;
        }).join('\n');
    }

    help(){
        this.emit('response', `The Avaliable Commands:
        add task
        ls
        delete :id`
        );

    }

    add(args){
        this.tasks[this.taskId] = args.join(' ');
        this.numOfTasks++;
        this.emit('response', `Add task ${this.taskId}
Number of tasks at the system are: ${this.numOfTasks}`);
        this.taskId++;

    }

    ls(){
        this.emit('response', `There are ${this.numOfTasks} at the system.
Tasks:\n${this.taskToString()}`);
    }

    delete(args){
        delete(this.tasks[args[0]]);
        this.numOfTasks--;
        this.emit(`Deleted task ${args[0]}
        Number of tasks at the system are: ${this.numOfTasks}`);

    }

}

module.exports = (client) => new Server(client);