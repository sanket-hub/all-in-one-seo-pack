<template>
	<div class="aioseo-post-status-options-toggle">
		<div
			class="post-status-options-settings"
		>

			<core-alert
				v-if="0 === postStatuses.length && 'postStatuses' === type"
				type="blue"
			>
				<strong>{{ strings.noPostStatuses }}</strong>
				{{ strings.noPostStatusesDescription }}

			</core-alert>
			<core-alert
				v-if="0 === postStatuses.length && 'taxonomies' === type"
				type="blue"
			>
				<strong>{{ strings.noTaxonomies }}</strong>
				{{ strings.noTaxonomiesDescription }}
			</core-alert>
			<grid-row
				v-if="0 < postStatuses.length"
			>
				<grid-column
					md="6"
					v-for="(status, index) in postStatuses"
					:key="index"
				>
					<base-highlight-toggle
						size="medium"
						:active="isActive(status)"
						:name="status.label"
						type="checkbox"
						:value="getValue(status)"
						@input="checked => updateValue(checked, status)"
					>
						{{ status.label }} ({{ status.status }})
					</base-highlight-toggle>
				</grid-column>
			</grid-row>
		</div>
	</div>
</template>

<script>
export default {
	props : {
		type : {
			type     : String,
			required : true
		},
		options : {
			type     : Object,
			required : true
		},
		excluded : {
			type : Array,
			default () {
				return []
			}
		}
	},
	data () {
		return {
			strings : {
				label                     : this.$t.__('Label:', this.$td),
				name                      : this.$t.__('Status:', this.$td),
				noPostStatuses            : this.$t.__('No post statuses available.', this.$td),
				noTaxonomies              : this.$t.__('No taxonomies available.', this.$td),
				noPostStatusesDescription : this.$t.__('All post statuses are set to noindex or your site does not have any post statuses registered that are supported by this feature.', this.$td),
				noTaxonomiesDescription   : this.$t.__('All taxonomies are set to noindex or your site does not have any taxonomies registered that are supported by this feature.', this.$td)
			}
		}
	},
	computed : {
		postStatuses () {
			return this.$aioseo.postData[this.type].filter(postStatus => {
				return !this.excluded.includes(postStatus.status)
			})
		}
	},
	methods : {
		emitInput (value) {
			this.$emit('input', value)
		},
		updateValue (checked, type) {
			if (checked) {
				const included = this.options[this.type].included
				included.push(type.status)
				this.$set(this.options[this.type], 'included', included)
				return
			}

			const index = this.options[this.type].included.findIndex(t => t === type.status)
			if (-1 !== index) {
				this.$delete(this.options[this.type].included, index)
			}
		},
		getValue (type) {
			return this.options[this.type].included.includes(type.status)
		},
		isActive (type) {
			const index = this.options[this.type].included.findIndex(t => t === type.status)
			if (-1 !== index) {
				return true
			}

			return false
		}
	}
}
</script>

<style lang="scss">
.aioseo-post-status-options-toggle {
	margin-top: 20px;
}
</style>