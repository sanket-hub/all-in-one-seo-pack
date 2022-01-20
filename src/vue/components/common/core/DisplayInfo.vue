<template>
	<core-settings-row
		class="aioseo-display-info"
		:name="label"
		align
	>
		<template #content>
			<base-box-toggle
				v-model="currentItem"
				name="displayInfo"
				:options="boxToggleOptions"
				@input="(value) => inputEvent(value)"
			>
				<template #extra>
					<slot name="extra" />
				</template>
				<template #shortcode>
					<svg-shortcode />
					<p>{{ strings.shortcode }}</p>
				</template>
				<template #block>
					<svg-gutenberg-block />
					<p>{{ strings.gutenbergBlock }}</p>
				</template>
				<template #php>
					<svg-php />
					<p>{{ strings.phpCode }}</p>
				</template>
				<template #widget>
					<svg-widget />
					<p>{{ strings.widget }}</p>
				</template>
			</base-box-toggle>

			<div class="displayInfo-show-content">
				<transition-slide
					:key="index" v-for="(item, index) in boxToggleOptions"
					:active="item.value === currentItem"
				>
					<div
						class="copy-box"
						v-if="'extra' !== item.slot"
					>
						<div>
							<div
								class="aioseo-description"
								v-if="item.desc"
								v-html="item.desc"
							/>
							<core-copy-block v-if="item.copy" :message="item.copy"/>

							<a
								v-if="$slots[item.slot + 'Advanced'] && !showAdvancedSettings"
								class="advanced-settings-link"
								href="#"
								@click.prevent="showAdvancedSettings = !showAdvancedSettings"
							>{{ strings.advancedSettings }}</a>
						</div>

						<transition-slide
							v-if="$slots[item.slot + 'Advanced']"
							:class="{ 'advanced-settings' : true, 'advanced-settings-hidden' : !showAdvancedSettings }"
							:active="showAdvancedSettings"
						>
							<slot :name="item.slot + 'Advanced'"/>
						</transition-slide>
					</div>

					<div
						class="extra-box"
						v-if="'extra' === item.slot"
					>
						<slot
							name="extraBox"
							:item="item"
						/>
					</div>
				</transition-slide>
			</div>
		</template>
	</core-settings-row>
</template>

<script>
export default {
	props : {
		label : {
			type : String,
			default () {
				return this.$t.__('Display Info', this.$td)
			}
		},
		options : {
			type : Object,
			default () {
				return {
					block     : { copy: '', desc: '', input: false },
					shortcode : { copy: '', desc: '', input: false },
					widget    : { copy: '', desc: '', input: false },
					php       : { copy: '', desc: '', input: false },
					extra     : { copy: '', desc: '', input: false }
				}
			}
		}
	},
	data () {
		return {
			currentItem          : Object.keys(this.options)[0],
			errors               : [],
			showAdvancedSettings : false,
			strings              : {
				advancedSettings : this.$t.__('Advanced Settings', this.$td),
				gutenbergBlock   : this.$t.__('Gutenberg Block', this.$td),
				phpCode          : this.$t.__('PHP Code', this.$td),
				shortcode        : this.$t.__('Shortcode', this.$td),
				widget           : this.$t.__('Widget', this.$td)
			}
		}
	},
	computed : {
		boxToggleOptions () {
			const boxOptions = Object.keys(this.options)
			return boxOptions.map((key) => ({
				value : key,
				slot  : key,
				copy  : this.options[key].copy,
				desc  : this.options[key].desc
			}))
		}
	},
	watch : {
		currentItem (newValue) {
			this.currentItem = newValue
		}
	},
	methods : {
		inputEvent (value) {
			this.$emit('input', value)
			this.showAdvancedSettings = false
		}
	}
}
</script>

<style lang="scss">
.aioseo-display-info {
	.aioseo-box-toggle {
		svg {
			margin-top: -15px;
			color: $black2;
		}
	}

	svg.aioseo-widget,
	svg.aioseo-new-page,
	svg.aioseo-shortcode {
		width: 100%;
		height: auto;
		max-width: 60px;
	}

	svg.aioseo-gutenberg-block {
		width: 59px;
		height: 54px;

		rect {
			width: 100%;
			width: 56px;
			height: 51px;
		}
	}

	svg.aioseo-php {
		width: 110px;
	}

	.copy-box,
	.extra-box {
		margin-top: 10px;
		padding: 30px;
		border-radius: 3px;
		background-color: $box-background;

		.aioseo-description {
			margin: 0;
		}

		.aioseo-copy-block {
			margin: 20px 0 0;
		}

		.advanced-settings-link {
			display: inline-block;
			padding-top: 5px;
			margin: 16px 0 0 16px;
			color: $placeholder-color;
			text-decoration: underline;
			font-size: 13px;

			&:hover {
				text-decoration: none;
			}
		}

		.advanced-settings {
			padding-top: 20px;
		}
	}

	.advanced-settings.advanced-settings-hidden {
		display: none;
	}

	.aioseo-tooltip {
		margin-left: 0;
	}
}
</style>