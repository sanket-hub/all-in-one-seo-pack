<template>
	<div
		v-if="buttonTarget"
		class="aioseo-card-footer"
	>
		<router-link :to="{ name : buttonTarget, query : query }">
			<span v-html="strings.openReport" />
		</router-link>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				openReport : this.$t.sprintf(
					// Translators: 1 - Right arrow.
					this.$t.__('Open Report %1$s', this.$td),
					'<span>&rarr;</span>'
				)
			}
		}
	},
	props : {
		buttonTarget : String,
		query        : Object
	}
}
</script>

<style lang="scss">
.aioseo-card-footer {
	margin-top: auto;
	padding-top: var(--aioseo-gutter);
	text-align: left;

	// Align it to footer.
	position: absolute;
	bottom: var(--aioseo-gutter);
	left: var(--aioseo-gutter);
	width: calc( 100% - 40px );

	a {
		text-decoration: none;
		color: $blue;
		font-weight: 700;
		font-size: 14px;
		list-style: 125%;
	}
}
</style>