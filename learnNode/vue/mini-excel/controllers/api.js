const APIError = require('../rest').APIError;
const path = require('path');
const fs = require('mz/fs');
const saved_dir = path.normalize(__dirname + path.sep + '..' + path.sep + 'saved-docs');

console.log(`documents will be saved in ${saved_dir}.`);

module.exports = [{
    method: 'GET',
    path: '/api/sheets/:id',
    func: async (ctx,next) => {
        var s,fp = path.join(saved_dir,'.' + ctx.params.id);
        console.log(`load from file ${fp}...`);
        s = await fs.readFile(fp,'utf8');
        ctx.rest(JSON.parse(s));
    }
},{
    method: 'PUT',
    path: '/api/sheets/:id',
    func: async (ctx,next) => {
        var
            fp = path.join(saved_dir,'.' + ctx.params.id),
            title = ctx.request.body.title,
            rows = ctx.request.body.rows,
            data;
        if (!title) {
            throw new APIError('invalid_input','Missing title');
        }
        if (!Array.isArray(rows)) {
            throw new APIError('invalid_input','invalid rows');
        }
        data = {
            title: title,
            rows: rows
        };
        await fs.writeFile(fp, JSON.stringify({
            title: title,
            rows: rows
        }),'utf8');
        console.log(`wrote to file ${fp}.`)
        ctx.rest({
            id: ctx.params.id
        });
    }
}]