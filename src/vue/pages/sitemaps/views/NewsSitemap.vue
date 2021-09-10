<template>
	<div class="aioseo-news-sitemap">
		<news-sitemap
			v-if="!isUnlicensed && $addons.isActive('aioseo-news-sitemap') && !$addons.requiresUpgrade('aioseo-news-sitemap')"
		/>

		<news-sitemap-activate
			v-if="!isUnlicensed && !$addons.isActive('aioseo-news-sitemap') && $addons.canActivate('aioseo-news-sitemap') && !$addons.requiresUpgrade('aioseo-news-sitemap')"
		/>

		<news-sitemap-lite
			v-if="isUnlicensed || $addons.requiresUpgrade('aioseo-news-sitemap')"
		/>

	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import NewsSitemap from './AIOSEO_VERSION/NewsSitemap'
import NewsSitemapActivate from './AIOSEO_VERSION/NewsSitemapActivate'
import NewsSitemapLite from './lite/NewsSitemap'
export default {
	components : {
		NewsSitemap,
		NewsSitemapActivate,
		NewsSitemapLite
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'options', 'settings' ])
	}
}
</script>

<style lang="scss">
.aioseo-news-sitemap {
	.aioseo-content-width,
	.aioseo-links-per-site {
		max-width: 110px;
	}

	.aioseo-sitemap-preview {
		margin-right: 10px;
		display: flex;
		align-items: center;
		margin-bottom: 10px;

		.aioseo-select {
			max-width: 180px;
			margin-right: 10px;
		}

		svg.aioseo-external {
			width: 14px;
			height: 14px;
			margin-right: 10px;
		}
	}

	.aioseo-exclude-pages-posts {
		.aioseo-select {
			max-width: 600px;
			display: inline-block;
			margin-right: 10px;

			.multiselect__option {
				display: flex;
			}

			.multiselect__option--highlight {
				.option-title {
					color: $blue;
				}
			}
		}

		.option {
			flex: 1 0 auto;

			.option-title {
				font-weight: 500;
				font-size: 16px;
				color: $black;

				.search-term {
					font-weight: 700;
				}
			}

			.option-details {
				display: flex;
				align-items: center;
				font-size: 14px;
				color: $placeholder-color;

				span {
					margin-right: 15px;
				}
			}
		}

		.option-permalink {
			display: flex;
			align-items: center;

			svg.aioseo-external {
				width: 15px;
				height: 15px;
				color: $black2;
			}
		}

		.multiselect-toggle {
			padding: 10px 13px;
			width: 40px;
			position: absolute;
			height: 36px;
			right: 2px;
			top: 2px;
			text-align: center;
			z-index: 1;

			svg.aioseo-add-plus {
				width: 14px;
				height: 14px;
				color: black;
			}
		}
	}

	.aioseo-news-embed {
		.aioseo-checkbox {
			&:first-child {
				margin-bottom: 10px;
			}
		}
	}
}
</style>