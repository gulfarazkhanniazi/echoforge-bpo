/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.echoforgebpo.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/404'],
  outDir: './public',
  sourceDir: './.next',
};
