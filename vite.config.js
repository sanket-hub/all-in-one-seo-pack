import { defineConfig } from 'vite'
import { createVuePlugin as vue } from 'vite-plugin-vue2'
// import vue from '@vitejs/plugin-vue' // TODO: This is for Vue 3.
import react from '@vitejs/plugin-react'
// import eslintPlugin from 'vite-plugin-eslint'
import liveReload from 'vite-plugin-live-reload'
import postcssRTLCSS from 'postcss-rtlcss'
import replace from '@rollup/plugin-replace'
import outputManifest, { isAsset } from 'rollup-plugin-output-manifest'
import copy from 'rollup-plugin-copy'
import path from 'path'
import fs from 'fs'

// i18n parser
import i18n from './build/aioseo-rollup-plugin-gettext-vue'

// Convert JSON to PHP.
import jsonToPhp from './build/aioseo-rollup-plugin-json-to-php'

// Pro only inputs.
const proInput = {
	'aioseo-gtm' : './src/app/gtm/main.js'
}

// Lite only inputs.
const liteInput = {}

// Vue settings pages.
const getPages = () => {
	return {
		about               : './src/vue/pages/about/main.js',
		dashboard           : './src/vue/pages/dashboard/main.js',
		'feature-manager'   : './src/vue/pages/feature-manager/main.js',
		'link-assistant'    : './src/vue/pages/link-assistant/main.js',
		'local-seo'         : './src/vue/pages/local-seo/main.js',
		monsterinsights     : './src/vue/pages/monsterinsights/main.js',
		redirects           : './src/vue/pages/redirects/main.js',
		'search-appearance' : './src/vue/pages/search-appearance/main.js',
		'seo-analysis'      : './src/vue/pages/seo-analysis/main.js',
		settings            : './src/vue/pages/settings/main.js',
		sitemaps            : './src/vue/pages/sitemaps/main.js',
		'social-networks'   : './src/vue/pages/social-networks/main.js',
		tools               : './src/vue/pages/tools/main.js'
	}
}

// Standalone Vue scripts.
const getStandalones = () => {
	return {
		app                      : './src/vue/standalone/app/main.js',
		blocks                   : './src/vue/standalone/blocks/main.js',
		connect                  : './src/vue/standalone/connect/main.js',
		'connect-pro'            : './src/vue/standalone/connect-pro/main.js',
		'dashboard-widgets'      : './src/vue/standalone/dashboard-widgets/main.js',
		'flyout-menu'            : './src/vue/standalone/flyout-menu/main.js',
		'limit-modified-date'    : './src/vue/standalone/limit-modified-date/main.js',
		'link-format'            : './src/vue/standalone/link-format/main.js',
		'local-business-seo'     : './src/vue/standalone/local-business-seo/main.js',
		'modal-portal'           : './src/vue/standalone/modal-portal/main.js',
		notifications            : './src/vue/standalone/notifications/main.js',
		'post-settings'          : './src/vue/standalone/post-settings/main.js',
		'posts-table'            : './src/vue/standalone/posts-table/main.js',
		'publish-panel'          : './src/vue/standalone/publish-panel/main.js',
		'redirects-add-redirect' : './src/vue/standalone/redirects/add-redirect/main.js',
		'setup-wizard'           : './src/vue/standalone/setup-wizard/main.js',
		'user-profile-tab'       : './src/vue/standalone/user-profile-tab/main.js',
		'wp-notices'             : './src/vue/standalone/wp-notices/main.js',
		// Third-party.
		divi                     : './src/vue/standalone/divi/main.js',
		'divi-admin'             : './src/vue/standalone/divi-admin/main.js',
		elementor                : './src/vue/standalone/elementor/main.js',
		seedprod                 : './src/vue/standalone/seedprod/main.js'
	}
}

// Non-vue standalones.
const getNonVueStandalones = () => {
	return {
		// CSS only.
		'admin-bar'     : './src/vue/assets/scss/app/admin-bar.scss',
		integrations    : './src/vue/assets/scss/integrations/main.scss',
		'blocks-editor' : './src/vue/assets/scss/blocks-editor.scss',

		// Native JS.
		plugins                    : './src/app/plugins/main.js',
		autotrack                  : './src/app/autotrack/autotrack.js',
		'follow-up-emails-nav-bar' : './src/vue/standalone/user-profile-tab/follow-up-emails-nav-bar.js',
		'tru-seo-analyzer'         : './src/app/tru-seo/analyzer/main.js',

		// React.
		'headline-analyzer' : './src/react/headline-analyzer/main.js'
	}
}

const getInputs = version => {
	const versionedInputs = 'Pro' === version ? proInput : liteInput

	return {
		...getStandalones(),
		...getPages(),
		...getNonVueStandalones(),
		...versionedInputs
	}
}

export default ({ mode }) => {
	mode = mode || 'pro'

	require('dotenv').config({ path: './build/.env' })

	// Get the version from the env variable.
	const version = 'Lite'

	if (fs.existsSync(`./build/.env.${mode}`)) {
		require('dotenv').config({ path: `./build/.env.${mode}` })
	}

	return defineConfig({
		plugins : getPlugins(version),
		base    : '',
		envDir  : './build',
		build   : {
			// minify            : false, // Uncomment this for debugging production builds.
			// sourcemap         : true, // Uncomment this for debugging production builds.
			assetsInlineLimit : 0, // We need to disable this as it converts small images to base64 inline, but that breaks our inline image function that we use to dynamically set the image url.
			manifest          : true, // We use a manifest to load our files inside of WordPress.
			emptyOutDir       : true, // This will delete the directory set below.
			outDir            : `dist/${version}/`, // This is where we put the assets for the current build. Version is either 'Lite' or 'Pro'.
			assetsDir         : '',
			rollupOptions     : {
				input  : getInputs(version),
				output : {
					dir            : `dist/${version}/assets/`,
					assetFileNames : assetInfo => {
						const images = [
							'.png',
							'.jpg',
							'.jpeg',
							'.gif'
						]

						if (images.includes(path.extname(assetInfo.name))) {
							return 'images/[name].[hash][extname]'
						}

						return '[ext]/[name].[hash][extname]'
					},
					chunkFileNames : 'js/[name].[hash].js'
				},
				plugins : [
					i18n({
						exclude               : 'node_modules/**',
						include               : '**/*@(vue|js|jsx)',
						output                : `./languages/aioseo-${version.toLowerCase()}.php`,
						textDomains           : getTextDomains(version),
						recognizedTextDomains : getTextDomains()
					}),
					outputManifest({
						fileName    : 'manifest-assets.json',
						outputPath  : path.resolve(__dirname, `dist/${version}`),
						nameWithExt : false,
						filter      : a => {
							const names = [
								'admin-bar.scss',
								'integrations/main.scss',
								'blocks-editor.scss'
							]
							let nameFound = false
							names.forEach(name => {
								if (a.name?.includes(name)) {
									nameFound = true
								}
							})
							return isAsset(a) && nameFound
						}
					}),
					jsonToPhp([
						{
							from : `dist/${version}/assets/manifest.json`,
							to   : `dist/${version}/manifest.php`
						},
						{
							from : `dist/${version}/manifest-assets.json`,
							to   : `dist/${version}/manifest-assets.php`
						}
					])
				]
			}
		},
		optimizeDeps : {
			force   : true,
			include : [
				'@codemirror/lang-json',
				'@codemirror/view',
				'animate-vanilla-js',
				'clipboard/dist/clipboard.min.js',
				'codemirror',
				'emoji-mart',
				'js-base64',
				'lodash-es',
				'maz-ui/lib/maz-phone-number-input',
				'moment',
				'moment-timezone',
				'quill',
				'superagent',
				'vue-material/dist/components',
				'vue-multiselect',
				'vue-popperjs',
				'vue-scrollto',
				'vue2-daterange-picker'
			],
			exclude : [
				'@/vue/plugins/constants',
				'@/vue/store'
			]
		},
		server : {
			https      : getHttps(),
			cors       : true,
			strictPort : true,
			port       : process.env.VITE_AIOSEO_DEV_PORT,
			host       : process.env.VITE_AIOSEO_DOMAIN,
			hmr        : {
				port : process.env.VITE_AIOSEO_DEV_PORT,
				host : process.env.VITE_AIOSEO_DOMAIN
			}
		},
		resolve : {
			alias : [
				{
					find        : '@',
					replacement : path.resolve(__dirname, 'src')
				}
			],
			extensions : [
				'.mjs',
				'.js',
				'.ts',
				'.jsx',
				'.tsx',
				'.json',
				'.vue'
			]
		},
		css : {
			postcss : {
				plugins : [
					postcssRTLCSS()
				]
			},
			preprocessorOptions : {
				scss : {
					additionalData : [
						'@import "./src/vue/assets/scss/app/variables.scss";',
						''
					].join('\n')
				}
			}
		},
		experimental : {
			renderBuiltUrl : (filename, { hostType }) => {
				return 'js' === hostType
					? { runtime: `window.__aioseoDynamicImportPreload__(${JSON.stringify(filename)})` }
					: { relative: true }
			}
		}
	})
}

const getHttps = () => {
	let https = false
	try {
		// Generate a certificate using: `mkcert aioseo.local` in the build/ directory.
		if (fs.existsSync('./build/' + process.env.VITE_AIOSEO_DOMAIN + '-key.pem')) {
			https = {
				key  : fs.readFileSync('./build/' + process.env.VITE_AIOSEO_DOMAIN + '-key.pem'),
				cert : fs.readFileSync('./build/' + process.env.VITE_AIOSEO_DOMAIN + '.pem'),
				ca   : fs.readFileSync(process.env.CRT_ROOT_CA)
			}
		}
	} catch (error) {
		console.log(error)
	}

	return https
}

let autotrackFilename
const getPlugins = version => {
	const plugins = [
		// eslintPlugin(),
		{
			name : 'getAutotrackHashedName',
			writeBundle (options, bundle) {
				autotrackFilename = path.basename(Object.keys(bundle).find(key => false !== key.startsWith('autotrack')))
			}
		},
		replace({
			preventAssignment : true,
			values            : {
				AIOSEO_VERSION : version.toLowerCase()
			}
		}),
		vue(),
		react(),
		copy({
			targets : [
				{
					src    : './src/app/autotrack/autotrack.js',
					dest   : `dist/${version}/assets`,
					rename : () => autotrackFilename
				}
			],
			hook     : 'writeBundle',
			verbose  : true,
			copyOnce : true
		})
	]

	const reload = [
		`${process.cwd()}/build/.env`
	]
	if (process.env.PHP_LIVE_RELOAD) {
		if (process.env.WP_CONFIG_LOCATION) {
			reload.push(`${process.cwd()}/app/**/*.php`)
			reload.push(process.env.WP_CONFIG_LOCATION)
		}
	}
	plugins.push(liveReload(reload, { root: '/' }))

	return plugins
}

const getTextDomains = version => {
	const liteTextDomains = {
		'this.$td'            : 'all-in-one-seo-pack',
		td                    : 'all-in-one-seo-pack',
		'all-in-one-seo-pack' : 'all-in-one-seo-pack'
	}

	const proTextDomains = {
		'this.$tdPro' : 'aioseo-pro',
		tdPro         : 'aioseo-pro',
		'aioseo-pro'  : 'aioseo-pro'
	}

	let textDomains = {
		...liteTextDomains
	}
	if (!version || 'Pro' === version) {
		textDomains = {
			...textDomains,
			...proTextDomains
		}
	}

	return textDomains
}