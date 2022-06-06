<template>
	<div class="aioseo-keyphrase-tag">
		<span class="aioseo-add-keyphrase-tag" :class="edit ? 'hidden' : ''">
			<span class="keyphrase-name" @click="toggleKeyphrasesPanel(index)">
				{{ keyphrase }}
			</span>
			<span class="keyphrase-edit" @click="editKeyphraseEv(index)">
				<svg-pencil />
			</span>
			<span class="keyphrase-score" :class="scoreClass" @click="toggleKeyphrasesPanel(index)">{{ score }}/100</span>
		</span>
		<span class="aioseo-edit-keyphrase-tag" v-if="edit">
			<input
				size="medium"
				:value="keyphrase"
				@blur="closeEdit"
				@keydown.enter="pressEnter"
			/>
			<span class="keyphrase-delete" @click="deleteKeyphraseEv(index)">
				<svg-trash />
				<md-tooltip md-direction="top" >{{ strings.delete }}</md-tooltip>
			</span>
		</span>
	</div>
</template>

<script>
import SvgPencil from '@/vue/components/common/svg/Pencil'
import SvgTrash from '@/vue/components/common/svg/Trash'
export default {
	components : {
		SvgPencil,
		SvgTrash
	},
	props : {
		index : {
			type : Number
		},
		keyphrase : {
			type : String
		},
		score : {
			type : Number
		}
	},
	data () {
		return {
			edit    : false,
			strings : {
				delete : this.$t.__('Delete', this.$td)
			}
		}
	},
	computed : {
		scoreClass () {
			return 80 < this.score ? 'score-green' : 50 < this.score ? 'score-orange' : 1 < this.score ? 'score-red' : 'score-none'
		}
	},
	methods : {
		editKeyphraseEv (index) {
			this.edit = true
			this.$emit('selectedKeyphrase', index)
		},
		deleteKeyphraseEv (index) {
			this.edit = false
			this.$emit('deleted', index)
		},
		toggleKeyphrasesPanel (panel) {
			this.$emit('selectedKeyphrase', panel)
		},
		closeEdit (event) {
			const value = event.target.value
			const index = this.index
			this.$emit('saved', { index, value })
			this.edit = false
		},
		pressEnter (event) {
			event.preventDefault()
			event.target.blur()
			this.edit = false
		}
	}
}
</script>

<style lang="scss">
</style>