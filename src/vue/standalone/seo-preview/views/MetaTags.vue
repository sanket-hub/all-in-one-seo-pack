<template>
	<div class="aioseo-seo-preview-standalone-view-meta-tags">
		<dl>
			<template v-for="(item,index) in metaTags">
				<dt
					:key="index+'label'"
					v-html="item.label"
				>
				</dt>
				<dd
					:key="index+'value'"
					v-html="item.value"
				>
				</dd>
			</template>
		</dl>
	</div>
</template>

<script>
import { isUrl } from '@/vue/utils/helpers'
import { sprintf } from '@wordpress/i18n'

export default {
	computed : {
		metaTags () {
			const output = []
			const basicTags = [
				{
					label : this.$t.__('Title', this.$td),
					value : document.title || ''
				},
				{
					label : this.$t.__('Description', this.$td),
					value : document.querySelector('meta[name="description"]')?.content || ''
				},
				{
					label : this.$t.__('Canonical', this.$td),
					value : document.querySelector('link[rel="canonical"]')?.href || ''
				}
			]
			const socialMetaTags = document.querySelectorAll(
				'meta[property^="og:"][content],' +
				'meta[name^="twitter:"][content]'
			)

			basicTags.forEach((tag) => {
				if (tag.value) {
					output.push({
						label : tag.label,
						value : tag.value
					})
				}
			})

			if (0 < socialMetaTags?.length) {
				socialMetaTags.forEach((tag) => {
					if (tag.content) {
						output.push({
							label : tag.getAttribute('name') ? tag.getAttribute('name') : tag.getAttribute('property'),
							value : tag.content
						})
					}
				})
			}

			output.forEach((tag) => {
				if (isUrl(tag.value)) {
					tag.value = sprintf(
						'<a href="%1$s" target="_blank">%2$s</a>',
						tag.value,
						tag.value
					)
				}
			})

			return output
		}
	}
}
</script>

<style lang="scss" scoped>
.aioseo-seo-preview-standalone-view-meta-tags {
	dl {
		margin: 0;
		padding: 0 0 0 10px;

		dt,
		dd {
			font-family: $font-family;
			line-height: 1.4;
			margin: 0;
			padding: 0;
		}

		dt {
			color: $black;
			font-size: 14px;
			font-weight: 700;

			+ dd {
				margin-top: 0;
				padding-left: 10px;
			}
		}

		dd {
			color: $black2;
			font-size: 13px;
			font-weight: 400;

			+ dt {
				margin-top: 8px;
			}

			::v-deep {
				a {
					border-bottom: 1px dotted $blue;
					color: $blue;
					text-decoration: none;
				}
			}
		}
	}
}
</style>