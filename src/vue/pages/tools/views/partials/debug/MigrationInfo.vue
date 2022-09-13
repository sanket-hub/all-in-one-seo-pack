<template>
	<div class="v3-migration-info aioseo-description">
		<ul class="info-items">
			<li
				v-for="(infoItemObject, index) in infoItems"
				:key="index"
			>
				<span v-if="infoItemObject.value">{{infoItemObject.label}}</span>
				<span v-if="infoItemObject.value">{{infoItemObject.value}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed : {
		...mapState([ 'internalOptions' ]),
		infoItems () {
			return [
				{
					label : 'Migrated Version',
					value : this.internalOptions.internal.migratedVersion
				},
				{
					label : 'First Activated',
					value : 0 !== this.internalOptions.internal.firstActivated ? this.$moment.unix(this.internalOptions.internal.firstActivated).format('MMMM D, YYYY') : false
				}
			]
		}
	}
}
</script>

<style lang="scss">
.aioseo-app .v3-migration-info {
	border-top: 1px solid $border;
	padding-top: 10px;
	margin-top: 15px;

	ul.info-items {
		margin: 0;

		li {
			display: flex;

			span:first-of-type {
				flex: 0 0 130px;
			}
		}
	}
}
</style>