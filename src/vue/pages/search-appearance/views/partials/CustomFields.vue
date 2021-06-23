<template>
	<div class="aioseo-sa-ct-custom-fields-view">
		<custom-fields
			v-if="!isUnlicensed"
			:type="type"
			:object="object"
			:options="options"
			:show-bulk="showBulk"
		/>
		<custom-fields-lite
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
import CustomFields from './AIOSEO_VERSION/CustomFields'
import CustomFieldsLite from './lite/CustomFields'
export default {
	components : {
		CustomFields,
		CustomFieldsLite
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