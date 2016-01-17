module.exports = {
    development: {
        js: ['out/angular.js', 'out/angular-animate.js', 'out/angular-aria.js', 'out/angular-material.js', 'out/angular-messages.js',
                'out/ng-map.js', 'src/ziggi.js' ],
        css: ['out/angular-material.css', 'src/ziggi.css'],
    },
    production: {
        js: ['js/zm.js'],
        css: ['css/zm.css'],
    }
}