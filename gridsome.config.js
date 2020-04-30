// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'AZ Vital Stats',
  siteUrl: 'https://0averyan.github.io',
  pathPrefix: '/azvitalstats',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'API',
        path: './static/api/**/*.json',
      }
    }
  ]
}
