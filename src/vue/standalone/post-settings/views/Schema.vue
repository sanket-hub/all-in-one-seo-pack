<template>
	<div class="aioseo-post-schema-view">
		<schema
			v-if="!isUnlicensed"
			:parentComponentContext="parentComponentContext"
		/>

		<schema-lite
			v-if="isUnlicensed"
			:parentComponentContext="parentComponentContext"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Schema from './AIOSEO_VERSION/Schema'
import SchemaLite from './lite/Schema'
export default {
	props : {
		parentComponentContext : String
	},
	components : {
		Schema,
		SchemaLite
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>