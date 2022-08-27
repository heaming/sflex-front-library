import { AliasOptions, UserConfigExport } from 'vite';
import { QuasarPluginOpts } from '@quasar/vite-plugin';
import { HtmlTemplateOptions } from 'vite-plugin-html-template';

declare interface Pages {
  [pageName: string]: {
    /**
     * @default public/index.html
     */
    template?: string;
    /**
     * @default 'Home Page'
     */
    title?: string;
  };
}

declare interface CustomConfigExport {
  /**
   * pages options
   * @see {@link https://cli.vuejs.org/config/#pages}
   */
  pages?: Pages;

  /**
   * entry directory. Should be path relative from
   * the location of the config file itself.
   * @default 'src/entries'
   */
  pagesDir?: string;

  /**
   * config files directory. Can be an absolute path, or a path relative from
   * the location of the config file itself.
   */
  configDir?: string;

  /**
   * enviroment files directory. Can be an absolute path, or a path relative from
   * the location of the config file itself.
   */
  envDir?: string;

  /**
   * Quasar plugin options.
   */
  quasarOptions?: QuasarPluginOpts;

  /**
   * If true, generate dist/visualizer.html, and open it.
   * apply at build time only.
   */
  openVisualizer?: true;

  /**
   * Define global variable replacements.
   * Entries will be defined on `window` during dev and replaced during build.
   */
  define?: Record<string, any>;

  /**
   * Specifies an `Object`, or an `Array` of `Object`,
   * which defines aliases used to replace values in `import` or `require` statements.
   * With either format, the order of the entries is important,
   * in that the first defined rules are applied first.
   *
   * This is passed to \@rollup/plugin-alias as the "entries" field
   * https://github.com/rollup/plugins/tree/master/packages/alias#entries
   */
  alias?: AliasOptions;

  /**
   * Force optimize listed dependencies (must be resolvable import paths,
   * cannot be globs).
   */
  optimizeDepsInclude?: string[];
}

export function defineConfig(config: CustomConfigExport): UserConfigExport;
