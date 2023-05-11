<template>
	<div class="aioseo-deprecated-options">
		<grid-row
			class="settings"
		>
			<grid-column
				v-for="(option, index) in $aioseo.deprecatedOptions"
				:key="index"
				xl="6"
				sm="12"
			>
				<base-checkbox
					size="medium"
					v-model="options[option.value]"
					:disabled="disabled"
				>
					{{ option.label }}
				</base-checkbox>
			</grid-column>
		</grid-row>

		<br />

		<base-button
			type="blue"
			size="medium"
			@click="$emit('update', options)"
			:loading="loading"
			:disabled="disabled"
		>
			{{ strings.updateOptions }}
		</base-button>

		<br />
		<br />
	</div>
</template>

<script>
import BaseCheckbox from '@/vue/components/common/base/Checkbox'
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
export default {
	emits      : [ 'update' ],
	components : {
		BaseCheckbox,
		GridColumn,
		GridRow
	},
	props : {
		loading  : Boolean,
		disabled : Boolean
	},
	data () {
		return {
			options : {},
			strings : {
				updateOptions : this.$t.__('Update Options', this.$td)
			}
		}
	},
	mounted () {
		this.$aioseo.deprecatedOptions.forEach(option => {
			if (option.enabled) {
				this.options[option.value] = true
			}
		})
	}
}
</script>