const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
const IS_PROD = ['production'].includes(process.env.NODE_ENV) 

module.exports = {
    publicPath: IS_PROD ? './': '/',
    // publicPath: IS_PROD ? '/personal_record/': '/',
    outputDir: 'personal_record',
    configureWebpack: config => {
        if (!IS_PROD) return;
        return {
            plugins: [
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname,'personal_record'),
                    routes: ['/', '/about', '/blogs'],
                    renderer: new Renderer({
                        inject: {
                            foo: 'bar'
                        },
                        headless: false,
                        renderAfterTime: 10000,
                        //renderAfterDocumentEvent: 'render-event'
                    })
                }),
            ]
        };
    }
}