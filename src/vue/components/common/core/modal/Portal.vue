<template>
	<teleport to="#aioseo-modal-portal">
		<core-modal
			:classes="[
				'aioseo-app',
				...classes
			]"
			:no-header="noHeader"
			@close="$emit('close')"
			:allow-overflow="allowOverflow"
			:confirmation="confirmation"
		>
			<template #headerTitle>
				<slot name="headerTitle" />
			</template>

			<template #body>
				<slot name="body" />
			</template>

			<template #footer>
				<slot name="footer" />
			</template>
		</core-modal>
	</teleport>
</template>

<script>
import CoreModal from './Index'
export default {
	emits      : [ 'close' ],
	components : {
		CoreModal
	},
	props : {
		noHeader      : Boolean,
		classes       : Array,
		allowOverflow : Boolean,
		confirmation  : Boolean
	}
}
</script>