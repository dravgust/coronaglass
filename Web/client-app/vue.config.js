module.exports = {
    publicPath: "/",
    // Put this in the ASP.NET Core directory
    outputDir: "../wwwroot/app",
    chainWebpack: config => {
        // aspnet uses the other hmr so remove this one
        config.plugins.delete('hmr');
    },
    filenameHashing: false,

    pages: {
        form: "src/pages/form.js",
        tools: "src/pages/tools.js"
    },

    configureWebpack: {
        devtool: 'source-map',
        //entry: { // creates app.js !!! not by any page name
        //    home: "src/pages/home/home.js",
        //    used: "src/pages/used/used.js"
        //}
    },
    css: {
        extract: true
    }

    //pluginOptions: {
    //  i18n: {
    //    locale: 'en',
    //    fallbackLocale: 'en',
    //    localeDir: 'locales',
    //    enableInSFC: false
    //  }
    //}
};
