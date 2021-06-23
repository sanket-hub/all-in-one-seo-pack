<template>
	<div class="aioseo-html-settings">
		<core-card
			slug="htmlSitemap"
			:header-text="strings.html"
		>
		</core-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				html : this.$t.__('HTML Sitemap', this.$td)
			}
		}
	}
}
</script>