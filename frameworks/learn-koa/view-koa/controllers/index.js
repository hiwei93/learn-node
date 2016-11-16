/**
 * index:
 */
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome'
        });
        console.log('in GET url...')
    }
};