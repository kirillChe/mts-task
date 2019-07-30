module.exports = {
    apps: [{
        name: 'API',
        script: 'app.js',
        instances: 1,
        autorestart: true,
        ignore_watch: ['node_modules', 'public'],
        watch: true,
        env: {
            NODE_ENV: 'development'
        }
    }]
};
