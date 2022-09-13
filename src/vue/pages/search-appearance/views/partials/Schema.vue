<template>
	<div class="aioseo-sa-ct-schema-view">
		<schema
			v-if="!isUnlicensed"
			:type="type"
			:object="object"
			:options="options"
			:show-bulk="showBulk"
		/>

		<schema-lite
			v-if="isUnlicensed"
			:type="type"
			:object="object"
			:options="options"
			:show-bulk="showBulk"
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
	props : {
		type : {
			type     : String,
			required : true
		},
		object : {
			type     : Object,
			required : true
		},
		options : {
			type     : Object,
			required : true
		},
		showBulk : Boolean
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>