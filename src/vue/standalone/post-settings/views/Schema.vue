<template>
	<div class="aioseo-post-schema-view">
		<schema
			v-if="!isUnlicensed"
		/>
		<schema-lite
			v-if="isUnlicensed"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Schema from './AIOSEO_VERSION/Schema'
import SchemaLite from './lite/Schema'
export default {
	components : {
		Schema,
		SchemaLite
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>