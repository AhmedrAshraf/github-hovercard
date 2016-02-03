let data = require('sdk/self').data;
let domains = require('sdk/simple-prefs').prefs.domains || '';
let pageMod = require('sdk/page-mod');

domains = domains.split(/[,\s]/)
  .map((domain) => [`http://${domain}/*`, `https://${domain}/*`])
  .reduce((prev, current) => prev.concat(current), [
    'http://github.com/*', 'https://github.com/*'
  ]);

pageMod.PageMod({
  include: domains,
  contentScriptFile: [
    data.url('jquery.js'),
    data.url('mustache.js'),
    data.url('tooltipster.js'),
    data.url('remarkable.js'),
    data.url('highlight.pack.js'),
    data.url('js-xss.js'),
    data.url('hovercard.js')
  ],
  contentStyleFile: [
    data.url('octicons/octicons.css'),
    data.url('tooltipster.css'),
    data.url('highlight.css'),
    data.url('hovercard.css')
  ]
});

let installerDomains = [
  'http://justineo.github.io/github-hovercard/*',
  'https://justineo.github.io/github-hovercard/*',
  'http://localhost:8848/*',
];

pageMod.PageMod({
  include: installerDomains,
  contentScriptFile: [
    data.url('installer.js')
  ]
});
