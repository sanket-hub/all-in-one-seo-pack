<template>
	<th
		scope="col"
		:style="{ width: column.width }"
		class="aioseo-manage-column manage-column"
		:class="[{
			sortable : !disableTable && column.sortable,
			asc      : 'asc' === column.sortDir && column.sortable,
			desc     : 'desc' === column.sortDir && column.sortable,
			sorted   : column.sortable && column.sorted,
		}, column.slug]"
	>
		<template
			v-if="allowTooltipIcon && column.tooltipIcon"
		>
			<div class="aioseo-table-header-tooltip-icon">
				<core-tooltip class="action" type="action">
					<component :is="column.tooltipIcon"></component>

					<template #tooltip>
						{{ column.label }}
					</template>
				</core-tooltip>
			</div>
		</template>

		<template
			v-if="!allowTooltipIcon || !column.tooltipIcon"
		>
			<template
				v-if="column.sortable"
			>
				<a
					href="#"
					@click.prevent="event => $emit('sort-column', column, event)"
				>
					<span>{{ column.label }}</span>
					<span class="sorting-indicator" />
				</a>
			</template>

			<template
				v-if="!column.sortable"
			>
				{{ column.label }}
			</template>
		</template>
	</th>
</template>

<script>
import CoreTooltip from '@/vue/components/common/core/Tooltip'
export default {
	compnents : {
		CoreTooltip
	},
	props : {
		column : {
			type     : Object,
			required : true
		},
		disableTable     : Boolean,
		allowTooltipIcon : Boolean
	}
}
</script>

<style lang="scss">
.aioseo-manage-column {
	.aioseo-table-header-tooltip-icon {
		display: flex;
		justify-content: center;

		.aioseo-tooltip {
			margin: 0;
		}
	}
}
</style>