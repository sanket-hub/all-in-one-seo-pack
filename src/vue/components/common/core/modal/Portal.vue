<template>
	<portal to="aioseo-modal-portal">
		<core-modal
			:classes="[
				'aioseo-app',
				...classes
			]"
			:no-header="noHeader"
			@close="$emit('close')"
			:allow-body-overflow="allowBodyOverflow"
		>
			<template #headerTitle>
				<slot name="headerTitle" />
			</template>

			<template #body>
				<slot name="body" />
			</template>
		</core-modal>
	</portal>
</template>

<script>
import CoreModal from './Index'
export default {
	components : {
		CoreModal
	},
	props : {
		noHeader          : Boolean,
		classes           : Array,
		allowBodyOverflow : Boolean
	}
}
</script>