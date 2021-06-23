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
			>
				<template #shortcode>
					<svg-shortcode/>
					<p>{{ strings.shortcode }}</p>
				</template>
				<template #block>
					<svg-gutenberg-block/>
					<p>{{ strings.gutenbergBlock }}</p>
				</template>
				<template #php>
					<svg-php/>
					<p>{{ strings.phpCode }}</p>
				</template>
				<template #widget>
					<svg-widget/>
					<p>{{ strings.widget }}</p>
				</template>
			</base-box-toggle>

			<div class="displayInfo-show-content">
				<transition-slide
					:key="index" v-for="(item, index) in boxToggleOptions"
					:active="item.value === currentItem"
				>
					<div class="copy-box">
						<div>
							<div class="aioseo-description" v-if="item.desc" v-html="item.desc"></div>
							<core-copy-block v-if="item.copy" :message="item.copy"/>
						</div>
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
					shortcode : { copy: '', desc: '' },
					block     : { copy: '', desc: '' },
					php       : { copy: '', desc: '' },
					widget    : { copy: '', desc: '' }
				}
			}
		}
	},
	computed : {
		boxToggleOptions : function () {
			const boxOptions = Object.keys(this.options)
			return boxOptions.map((key) => ({
				value : key,
				slot  : key,
				copy  : this.options[key].copy,
				desc  : this.options[key].desc
			}))
		}
	},
	data () {
		return {
			currentItem : Object.keys(this.options)[0],
			strings     : {
				shortcode      : this.$t.__('Shortcode', this.$td),
				gutenbergBlock : this.$t.__('Gutenberg Block', this.$td),
				phpCode        : this.$t.__('PHP Code', this.$td),
				widget         : this.$t.__('Widget', this.$td)
			}
		}
	},
	watch : {
		currentItem (newValue) {
			this.currentItem = newValue
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

	.copy-box {
		padding-top: 0.5rem;

		> div {
			padding: 30px;
			border-radius: 3px;
			background-color: $box-background;
		}

		.aioseo-description {
			margin: 0;
		}

		.aioseo-copy-block {
			margin: 20px 0 0;
		}
	}

	.aioseo-tooltip {
		margin-left: 0;
	}
}
</style>