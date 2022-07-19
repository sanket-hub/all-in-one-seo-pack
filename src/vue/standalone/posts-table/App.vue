<template>
	<div>
		<PostColumn
			v-if="$isPro"
			:post="post"
			:index="index"
		/>

		<PostColumnLite
			v-if="!$isPro"
			:post="post"
			:index="index"
		/>
	</div>
</template>

<script>
import PostColumn from './AIOSEO_VERSION/PostColumn'
import PostColumnLite from './lite/PostColumn'
export default {
	components : {
		PostColumn,
		PostColumnLite
	},
	props : {
		post  : Object,
		index : Number
	}
}
</script>