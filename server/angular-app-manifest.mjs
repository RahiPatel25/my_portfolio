
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 29964, hash: 'f0d86f5ccdd4a96156dbdd09af7a6a2d3579d9035d62fcae9679b40fccc90e18', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22018, hash: '77ed926089d3ba296b9b740458251e98ecf2e03e6c17b7416b1085fe9f94faee', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 177157, hash: '49d14a38bfbcaa41879b47f64a5f48b6dd19a13de0015a3a14ca8f712f7f1f45', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-IWZHIGBU.css': {size: 54117, hash: '/vtOShbZ/r8', text: () => import('./assets-chunks/styles-IWZHIGBU_css.mjs').then(m => m.default)}
  },
};
