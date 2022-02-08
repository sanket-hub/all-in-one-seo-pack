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
import PostSettings from '@/vue/pages/post-settings/App.vue'
export default {
	data () {
		return {
			isOpen  : false,
			strings : {
				// Translators: 1 - The plugin name ("All in One SEO").
				header : this.$t.sprintf(this.$t.__('%1$s settings', this.$td), process.env.VUE_APP_NAME)
			}
		}
	},
	components : {
		PostSettings
	},
	methods : {
		openModal () {
			this.isOpen = true
		}
	},
	beforeUnmount () {
		document.removeEventListener('aioseo-divi-toggle-modal', this.openModal)
	},
	mounted () {
		this.$nextTick(function () {
			document.addEventListener('aioseo-divi-toggle-modal', this.openModal)
		})
	}
}
</script>