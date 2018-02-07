const APIError = require('../rest').APIError;

var gid = 0;

function nextId() {
    gid ++;
    return 't' + gid;
}

var todos = [
    {
        id: nextId(),
        name: 'Learn Git',
        description: 'Learn how to use git as distributed version control.'
    },
    {
        id: nextId(),
        name: 'Learn Java',
        description: 'Learn Java,Servlet,Maven and Spring.'
    },
    {
        id: nextId(),
        name: 'Learn Javascript',
        description: 'Learn JavaScript,Node.js,NPM and other libraries.'
    },
    {
        id: nextId(),
        name: 'Learn Python',
        description: 'Learn Python,asyncio,numpy,scripy.'
    }
];

module.exports = [{
    method: 'GET',
    path: '/api/todos',
    func: async (ctx,next) => {
        ctx.rest({
            todos: todos
        });
    }
},{
    method: 'POST',
    path: '/api/todos',
    func: async (ctx,next) => {
        var
            t = ctx.request.body,
            todo;
        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input','Missing name');
        }
        if (!t.description || !t.description.trim()) {
            throw new APIError('invalid_input','Missing description');
        }
        todo = {
            id: nextId(),
            name: t.name.trim(),
            description: t.description.trim()
        };
        todos.push(todo);
        ctx.rest(todo);
    }
},{
    method: 'PUT',
    path: '/api/todos/:id',
    func: async (ctx,next) => {
        var
            t = ctx.request.body,
            index = -1,
            i,todo;
        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input','Missing name');
        }
        if (!t.description || !t.description.trim()) {
            throw new APIError('invalid_input','Missing description');
        }
        for (i=0;i<todos.length;i++) {
            if (todos[i].id === ctx.params.id) {        //ctx.params koa-router赋予的特性
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new APIError('not found','Todo not found by id:' + ctx.params.id);
        }
        todo = todos[index];
        todo.name = t.name.trim();
        todo.description = t.description.trim();
        ctx.rest(todo);
    }
},{
    method: 'DELETE',
    path: '/api/todos/:id',
    func: async (ctx,next) => {
        var i,index = -1;
        for (i=0;i<todos.length;i++) {
            if (todos[i].id === ctx.params.id) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new APIError('not found','Todo not found by id:' + ctx.params.id)
        }
        ctx.rest(todos.splice(index,1)[0]);
    }
}]