<template>
	<util-draggable
		ref="modal-container"
		:completelyDraggable="false"
	>
		<div
			class="aioseo-modal"
			:class="{'aioseo-modal-is-closed' : !isOpen}"
			>
			<div
				class="aioseo-modal-header"
				@mousedown.prevent="mouseEvent => $refs['modal-container'].dragMouseDown(mouseEvent)"
			>
				<div class="aioseo-modal-header-title">{{ strings.header }}</div>

				<div
					class="aioseo-modal-header-close"
					v-on:click="isOpen = false"
				>
					<svg-close />
				</div>
			</div>

			<div class="aioseo-modal-body edit-post-sidebar">
				<PostSettings/>
			</div>
		</div>
	</util-draggable>
</template>

<script>
import PostSettings from '@/vue/standalone/post-settings/App'
import SvgClose from '@/vue/components/common/svg/Close'
import UtilDraggable from '@/vue/components/common/util/Draggable'
export default {
	components : {
		PostSettings,
		SvgClose,
		UtilDraggable
	},
	data () {
		return {
			isOpen  : false,
			strings : {
				header : this.$t.sprintf(
					// Translators: 1 - The plugin name ("All in One SEO").
					this.$t.__('%1$s settings', this.$td),
					import.meta.env.VITE_NAME
				)
			}
		}
	},
	methods : {
		toggleModal () {
			this.isOpen = !this.isOpen
		}
	},
	beforeUnmount () {
		document.removeEventListener('aioseo-divi-toggle-modal', this.toggleModal)
	},
	mounted () {
		this.$nextTick(function () {
			document.addEventListener('aioseo-divi-toggle-modal', this.toggleModal)
		})
	}
}
</script>