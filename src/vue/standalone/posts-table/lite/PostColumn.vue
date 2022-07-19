<template>
	<core-post-column
		:post="post"
		:index="index"
	/>
</template>

<script>
import CorePostColumn from '@/vue/components/common/core/PostColumn'
export default {
	components : {
		CorePostColumn
	},
	props : {
		post  : Object,
		index : Number
	}
}
</script>