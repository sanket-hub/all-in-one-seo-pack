<template>
	<div
		v-if="buttonTarget"
		class="aioseo-card-footer"
		:class="{ 'aioseo-card-footer--no-border' : !params }"
	>
		<router-link :to="{ name : buttonTarget, params : params }">
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
		params       : Object
	}
}
</script>

<style lang="scss">
.aioseo-card-footer {
	border-top: 1px solid $border;
	margin-top: auto;
	padding-top: 30px;
	text-align: left;

	// Align it to footer.
	position: absolute;
	bottom: 30px;
	left: 30px;
	width: calc( 100% - 48px );

	&--no-border {
		border-top: 0;
	}

	a {
		text-decoration: none;
		color: $blue;
		font-weight: 700;
		font-size: 14px;
		list-style: 125%;
	}
}
</style>