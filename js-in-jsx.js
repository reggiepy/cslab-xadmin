import url from "node:url";
import * as vite from "vite";

// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
}

// NOTE: Keep trailing slash to use resulting path in prefix matching.
const srcDir = url.fileURLToPath(new URL("./src/", import.meta.url));
// NOTE: Since ESBuild evaluates this regex using Go's engine, it is not
// clear whether the JS-specific regex escape logic is sound.
const srcJsRegex = new RegExp(`^${escapeRegExp(srcDir)}.*\\.js$`);

const vitePlugin = () => ({
  name: "js-in-jsx",
  enforce: "pre",
  config: () => ({
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    esbuild: {
      loader: "jsx",
      include: /\/src\/.*\.js$|\/src\/.*\.jsx$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          ".js": "jsx",
          ".ts": "tsx",
          ".svg": "text",
        },
      },
    },
  }),
  async transform(code, id) {
    // Ignore Rollup virtual modules.
    if (id.startsWith("\0")) {
      return;
    }
    // Strip off any "proxy id" component before testing against path.
    // See: https://github.com/vitejs/vite-plugin-react-swc/blob/a1bfc313612a8143a153ce87f52925059459aeb2/src/index.ts#L89
    // See: https://rollupjs.org/plugin-development/#inter-plugin-communication
    [id] = id.split("?");
    if (id.startsWith(srcDir) && id.endsWith(".js")) {
      return await vite.transformWithEsbuild(code, id, {
        loader: "jsx",
        jsx: "automatic",
        jsxDev: false,
      });
    }
  }
});

export default vitePlugin