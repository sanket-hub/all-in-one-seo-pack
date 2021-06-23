<template>
	<div class="aioseo-post-type-options-toggle">
		<div
			class="post-type-options-settings"
		>

			<core-alert
				v-if="0 === postTypes.length && 'postTypes' === type"
				type="blue"
			>
				<strong>{{ strings.noPostTypes }}</strong>
				{{ strings.noPostTypesDescription }}

			</core-alert>
			<core-alert
				v-if="0 === postTypes.length && 'taxonomies' === type"
				type="blue"
			>
				<strong>{{ strings.noTaxonomies }}</strong>
				{{ strings.noTaxonomiesDescription }}
			</core-alert>
			<grid-row
				v-if="0 < postTypes.length"
			>
				<grid-column
					md="6"
					v-for="(type, index) in postTypes"
					:key="index"
				>
					<base-highlight-toggle
						size="medium"
						:active="isActive(type)"
						:name="type.name"
						type="checkbox"
						:value="getValue(type)"
						@input="checked => updateValue(checked, type)"
					>
						<core-tooltip>
							<span
								class="icon dashicons"
								:class="`${type.icon || 'dashicons-admin-post'}`"
							/>

							<template #tooltip>
								<div class="aioseo-description">
									{{ strings.label }} <strong>{{ type.label }}</strong><br>
									{{ strings.name }} <strong>{{ type.name }}</strong>
								</div>
							</template>
						</core-tooltip>
						{{ type.label }}
					</base-highlight-toggle>
				</grid-column>
			</grid-row>
		</div>
	</div>
</template>

<script>
export default {
	props : {
		disabled : {
			type : Boolean,
			default () {
				return false
			}
		},
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
				label                   : this.$t.__('Label:', this.$td),
				name                    : this.$t.__('Slug:', this.$td),
				noPostTypes             : this.$t.__('No post types available.', this.$td),
				noTaxonomies            : this.$t.__('No taxonomies available.', this.$td),
				noPostTypesDescription  : this.$t.__('All post types are set to noindex or your site does not have any post types registered that are supported by this feature.', this.$td),
				noTaxonomiesDescription : this.$t.__('All taxonomies are set to noindex or your site does not have any taxonomies registered that are supported by this feature.', this.$td)
			}
		}
	},
	computed : {
		postTypes () {
			return this.$aioseo.postData[this.type].filter(postType => {
				return !this.excluded.includes(postType.name)
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
				included.push(type.name)
				this.$set(this.options[this.type], 'included', included)
				return
			}

			const index = this.options[this.type].included.findIndex(t => t === type.name)
			if (-1 !== index) {
				this.$delete(this.options[this.type].included, index)
			}
		},
		getValue (type) {
			return this.options[this.type].included.includes(type.name)
		},
		isActive (type) {
			const index = this.options[this.type].included.findIndex(t => t === type.name)
			if (-1 !== index) {
				return true
			}

			return false
		}
	}
}
</script>

<style lang="scss">
.aioseo-post-type-options-toggle {
	margin-top: 20px;
}
</style>