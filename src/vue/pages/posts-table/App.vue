<template>
	<div>
		<PostColumn
			v-if="$isPro"
			:post="post"
		/>

		<PostColumnLite
			v-if="!$isPro"
			:post="post"
		/>
	</div>
</template>

<script>
import PostColumn from './pro/PostColumn'
import PostColumnLite from './lite/PostColumn'
export default {
	components : {
		PostColumn,
		PostColumnLite
	},
	props : {
		post : Object
	}
}
</script>