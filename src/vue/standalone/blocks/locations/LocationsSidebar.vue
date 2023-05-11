<template>
	<div>
		<div class="sidebar-row">
			<p class="title">{{ strings.selectLocation }}</p>
			<base-select
				size="medium"
				:options="locationCategories"
				:modelValue="getCategoryOptions(this.$root.$data.categoryId)"
				@update:modelValue="values => this.$root.$data.categoryId = values.value"
				track-by="value"
			/>
		</div>
	</div>
</template>

<script>
import BaseSelect from '@/vue/components/common/base/Select'
export default {
	components : {
		BaseSelect
	},
	data () {
		return {
			locationCategories : [],
			strings            : {
				selectLocation : window.aioseo.localBusiness.taxonomySingleLabel
			}
		}
	},
	methods : {
		getCategoryOptions (option) {
			let selected = this.locationCategories.find(u => u.value === option)

			// Try to find the current category ( inside a location ) or default to the first category in the list.
			if (!selected) {
				selected = this.locationCategories.find(u => u.value === window.aioseo.currentPost.localBusinessCategory) || this.locationCategories.find(u => !!u)
				if (selected) {
					this.$root.$data.categoryId = selected.value
				}
			}

			return selected
		}
	},
	created () {
		if (this.$root.$data.categories) {
			this.$root.$data.categories.forEach(category => {
				this.locationCategories.push({
					value : category.id,
					label : category.name
				})
			})
		}
	}
}
</script>

<style lang="scss">
.sidebar-row {
	margin-bottom: 16px;
	.title {
		font-weight: 700;
	}
}
</style>