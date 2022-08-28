import { AliasOptions, UserConfigExport } from 'vite';
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
   * @default process.cwd()
   */
  configDir?: string;

  /**
   * enviroment files directory. Can be an absolute path, or a path relative from
   * the location of the config file itself.
   * @default process.cwd()
   */
  envDir?: string;

  /**
   * quasar's SCSS/Sass variables
   * @default '~/css/variables.scss'
   */
  quasarSassVariables?: string;

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
   * If true, generate dist/visualizer.html, and open it.
   * apply at build time only.
   * @default false
   */
  openVisualizer?: true;

  /**
   * Enables css sourcemaps during dev
   * @default false
   */
  cssDevSourceMap?: boolean;

  /**
   * If `true`, a separate sourcemap file will be created. If 'inline', the
   * sourcemap will be appended to the resulting output file as data URI.
   * 'hidden' works like `true` except that the corresponding sourcemap
   * comments in the bundled files are suppressed.
   * @default false
   */
  buildSourceMap?: boolean;

  /**
   * Force optimize listed dependencies (must be resolvable import paths,
   * cannot be globs).
   */
  optimizeDepsInclude?: string[];
}

export function defineConfig(config: CustomConfigExport): UserConfigExport;
