
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
    'index.csr.html': {size: 27912, hash: '8cb9ca703e16570bef014cad7dc7e6a25ce4c43cbb4a046d0922f9b37506e164', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 19966, hash: '78cbe82d5cc61f794f62c1f476e4fd95d370adfdf36e683ba23b3ec748f2b8b3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 175105, hash: '38134955f50e53f4bd736cbece25a5daa790909d0ab879893e7fe0f2b6a076d2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-IWZHIGBU.css': {size: 54117, hash: '/vtOShbZ/r8', text: () => import('./assets-chunks/styles-IWZHIGBU_css.mjs').then(m => m.default)}
  },
};
