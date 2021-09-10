<template>
	<div class="aioseo-access-control">
		<access-control
			v-if="!isUnlicensed"
		/>

		<access-control-lite
			v-if="isUnlicensed"
		/>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AccessControl from './AIOSEO_VERSION/AccessControl'
import AccessControlLite from './lite/AccessControl'
export default {
	components : {
		AccessControl,
		AccessControlLite
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>