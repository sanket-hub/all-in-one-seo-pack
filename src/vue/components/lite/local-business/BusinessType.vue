<template>
	<div>
		<base-select
			size="large"
			:options="$constants.LOCAL_SEO_BUSINESS_TYPES"
		/>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				businessType : this.$t.__('Type', this.$td)
			}
		}
	}
}
</script>