<template>
	<div class="preview-box">
		<span class="label" v-if="label">
			{{ label }}:
		</span>
		<template v-for="(item,index) in this.getPreviewData()">
			<span
				:key="index+'sep'"
				class="aioseo-breadcrumb-separator"
				v-if="1 < previewLength && index > 0 && index < previewLength"
				v-html="options.breadcrumbs.separator"
			/>
			<span
				:key="index+'crumb'"
				:class="{ 'aioseo-breadcrumb' : !item.match(/aioseo-breadcrumb/),  link : item !== options.breadcrumbs.breadcrumbPrefix && !item.match(/<a /) }"
				v-if="index < (previewLength -1)"
				v-html="item">
			</span>
			<span
				:key="index+'crumbLast'"
				v-if="index === (previewLength -1)"
				:class="{ last : true, link: options.breadcrumbs.linkCurrentItem && useDefaultTemplate && !item.match(/<a /), noLink : !options.breadcrumbs.linkCurrentItem && useDefaultTemplate, 'aioseo-breadcrumb' : !item.match(/aioseo-breadcrumb/) }"
				v-html="item"
			/>
		</template>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	props : {
		previewData : {
			type    : Array,
			default : null
		},
		useDefaultTemplate : {
			type    : Boolean,
			default : true
		},
		label : String
	},
	computed : {
		...mapState([ 'options' ]),
		previewLength () {
			return this.getPreviewData() ? this.getPreviewData().length : 0
		}
	},
	methods : {
		getPreviewData () {
			let crumbs = this.previewData.filter(item => !!item).map(item => this.$tags.decodeHTMLEntities(item).replace(/#breadcrumb_separator/g, '<span class="aioseo-breadcrumb-separator">' + this.options.breadcrumbs.separator + '</span>').replace(/#breadcrumb_link/g, 'Permalink'))
			if (this.useDefaultTemplate && !this.options.breadcrumbs.showCurrentItem) {
				crumbs = crumbs.slice(0, crumbs.length - 1)
			}
			return crumbs
		}
	}
}
</script>