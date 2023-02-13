<template>
	<div
		class="aioseo-cta"
		:class="{
			floating: floating,
			'align-top' : alignTop
		}"
	>
		<div class="aioseo-cta-background">
			<div
				v-if="1 === type"
				class="type-1"
			>
				<div class="header-text">
					<slot name="header-text">
						{{ strings.ctaHeader }}
					</slot>
				</div>

				<div class="description">
					<slot name="description">
						{{ strings.ctaDescription }}
					</slot>
				</div>

				<grid-row
					v-if="featureList"
					class="feature-list"
				>
					<grid-column
						md="6"
						v-for="(feature, index) in featureList"
						:key="index"
					>
						<svg-circle-check />
						{{ feature }}
					</grid-column>
				</grid-row>

				<core-alert
					v-if="!ctaButtonVisible && ctaButtonVisibleWarning"
					type="yellow"
					v-html="ctaButtonVisibleWarning"
				/>

				<base-button
					v-if="ctaButtonVisible"
					type="green"
					tag="a"
					:href="ctaLink"
					:target="target"
					@click.native="ctaButtonClick"
					:loading="ctaButtonLoading"
				>
					{{ buttonText }}
				</base-button>

				<a
					v-if="showLink"
					class="learn-more"
					:href="learnMoreLink"
					target="_blank"
				>
					<slot name="learn-more-text">
						{{ strings.learnMoreAllFeatures }}
					</slot>
				</a>
			</div>

			<div
				v-if="2 === type"
				class="type-2"
			>
				<div>
					<div class="header-text">
						<slot name="header-text">
							{{ strings.ctaHeader }}
						</slot>
					</div>

					<div class="description">
						<slot name="description">
							{{ strings.ctaDescription }}
						</slot>
					</div>

					<grid-row
						v-if="featureList && featureList.length <= 5"
						class="feature-list"
					>
						<grid-column
							md="12"
							v-for="(feature, index) in featureList"
							:key="index"
						>
							<svg-circle-check />
							{{ feature }}
						</grid-column>
					</grid-row>

					<grid-row
						v-if="featureList && featureList.length > 5"
						class="feature-list"
					>
						<grid-column
							md="6"
							v-for="(feature, index) in featureList"
							:key="index"
						>
							<svg-circle-check />
							{{ feature }}
						</grid-column>
					</grid-row>

					<core-alert
						v-if="!ctaButtonVisible && ctaButtonVisibleWarning"
						type="yellow"
						v-html="ctaButtonVisibleWarning"
					/>

					<base-button
						v-if="ctaButtonVisible"
						type="green"
						tag="a"
						:href="ctaLink"
						:target="target"
						@click.native="ctaButtonClick"
						:loading="ctaButtonLoading"
					>
						{{ buttonText }}
					</base-button>

					<br>
					<br>

					<a
						v-if="showLink"
						class="learn-more"
						:href="learnMoreLink"
						target="_blank"
					>
						<slot name="learn-more-text">
							{{ strings.learnMoreAllFeatures }}
						</slot>
					</a>
				</div>

				<div class="featured-image">
					<slot name="featured-image" />
				</div>
			</div>

			<div
				v-if="3 === type"
				class="type-3"
			>
				<div class="sub-header">
					{{ strings.upgradeToPro }}
				</div>
				<div class="header-text">
					<slot name="header-text">
						{{ strings.ctaHeader }}
					</slot>
				</div>

				<grid-row
					v-if="featureList"
					class="feature-list"
				>
					<grid-column
						md="6"
						v-for="(feature, index) in featureList"
						:key="index"
					>
						<svg-circle-check />
						{{ feature }}
					</grid-column>
				</grid-row>

				<core-alert
					v-if="!ctaButtonVisible && ctaButtonVisibleWarning"
					type="yellow"
					v-html="ctaButtonVisibleWarning"
				/>

				<base-button
					v-if="ctaButtonVisible"
					type="green"
					tag="a"
					:href="ctaLink"
					:target="target"
					@click.native="ctaButtonClick"
					:loading="ctaButtonLoading"
					size="medium"
				>
					{{ buttonText }}
				</base-button>

				<base-button
					v-if="showLink"
					type="gray"
					tag="a"
					:href="learnMoreLink"
					target="_blank"
					size="medium"
				>
					<slot name="learn-more-text">
						{{ strings.seeAllFeatures }}
					</slot>
				</base-button>
			</div>

			<div
				v-if="4 === type"
				class="type-4"
			>
				<div class="header-text">
					<slot name="header-text">
						{{ strings.ctaHeader }}
					</slot>
				</div>

				<div class="description">
					<slot name="description">
						{{ strings.ctaDescription }}
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
import SvgCircleCheck from '@/vue/components/common/svg/circle/Check'
export default {
	components : {
		CoreAlert,
		GridColumn,
		GridRow,
		SvgCircleCheck
	},
	props : {
		type : {
			type : Number,
			default () {
				return 1
			},
			validator (value) {
				return [ 1, 2, 3, 4, 5 ].includes(value)
			}
		},
		featureList      : Array,
		sameTab          : Boolean,
		ctaButtonAction  : Boolean,
		ctaButtonLoading : Boolean,
		ctaLink          : {
			type     : String,
			required : false
		},
		learnMoreLink : {
			type     : String,
			required : false
		},
		buttonText : {
			type     : String,
			required : false
		},
		floating : {
			type : Boolean,
			default () {
				return true
			}
		},
		showLink : {
			type : Boolean,
			default () {
				return true
			}
		},
		ctaButtonVisible : {
			type : Boolean,
			default () {
				return true
			}
		},
		ctaButtonVisibleWarning : String,
		alignTop                : {
			type : Boolean,
			default () {
				return false
			}
		}
	},
	data () {
		return {
			target  : '_blank',
			strings : {
				upgradeToPro : this.$t.sprintf(
					// Translators: 1 - "Pro".
					this.$t.__('Upgrade to %1$s', this.$td),
					'Pro'
				),
				ctaHeader : this.$t.sprintf(
					// Translators: 1 - The plugin name ("All in One SEO"), 2 - "Pro".
					this.$t.__('This feature is only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				),
				ctaDescription : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('%1$s %2$s comes with many additional features to help take your site\'s SEO to the next level!', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				),
				learnMoreAllFeatures : this.$t.__('Learn more about all features', this.$td),
				seeAllFeatures       : this.$t.__('See all features', this.$td)
			}
		}
	},
	methods : {
		ctaButtonClick (event) {
			if (this.ctaButtonAction) {
				event.preventDefault()
				this.$emit('cta-button-click')
			}
		}
	},
	mounted () {
		if (this.sameTab) {
			this.target = '_self'
		}
	}
}
</script>

<style lang="scss">
.aioseo-app {
	.aioseo-cta {
		margin-top: 30px;
		width: 100%;

		&.floating {
			margin-top: 0;
			position: absolute;
			max-width: 850px;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
			padding: 20px;

			.aioseo-cta-background {
				box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
				border-radius: 3px;
			}

			&.align-top {
				top: 50px;
				transform: translateX(-50%) translateY(0);
			}
		}

		.aioseo-cta-background {
			background: #fff;
			padding: 40px;
			box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
			border: 1px solid $border;

			.header-text {
				line-height: 1.4;
				font-weight: 600;
				font-size: 24px;
				text-align: center;
				color: $black;

				span.large {
					line-height: 1.4;
					font-size: 32px;
				}
			}

			.description {
				margin: 30px 0 50px 0;
				width: 100%;
				max-width: 600px;
				text-align: center;
				font-size: 16px;
				color: $black;
				line-height: 1.4;

				.aioseo-alert {
					margin-bottom: 30px;
					text-align: left;
				}
			}

			.feature-list {
				color: $black;
				font-size: 16px;
				width: 100%;
				max-width: 500px;
				margin-bottom: 50px;

				.aioseo-col {
					display: flex;
					align-items: flex-start;

					svg.aioseo-circle-check {
						color: $green;
						width: 18px;
						min-width: 18px;
						min-height: 18px;
						margin-right: 10px;
					}
				}
			}

			a.learn-more {
				margin-top: 20px;
				color: $placeholder-color;
				font-size: 14px;
			}

			.type-1 {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.type-2 {
				margin: 30px 0 30px 50px;
				display: flex;

				.header-text,
				.description {
					text-align: left;
				}

				.description {
					margin: 30px 0;
				}

				.feature-list {
					margin: 30px 0;
				}

				> div {
					margin-right: 20px;
					flex: 0 0 50%;
				}

				.featured-image {
					max-height: 540px;
					border: 1px solid $border;
					flex: 1;
					overflow: hidden;
					margin-right: -41px;
					margin-bottom: -71px;
					border-radius: 5px 0 0;

					img {
						max-height: 600px;
					}
				}

				@media only screen and (max-width: 912px) {
					flex-direction: column;
					align-items: center;

					.header-text,
					.description {
						text-align: center;
					}

					> div {
						text-align: center;
						margin-right: 0;
						margin-bottom: 30px;
						flex: 1 0 100%;
						width: 100%;
					}

					.featured-image {
						margin: 0 -10px -41px -10px;
						border-radius: 5px 5px 0 0;
						max-height: 300px;
					}
				}
			}

			.type-3 {
				.sub-header {
					line-height: 1.4;
					font-size: 16px;
					font-weight: 600;
					color: $blue;
					margin-bottom: 5px;
				}

				.header-text {
					text-align: left;
				}

				.feature-list {
					margin: 30px 0 30px;

					.aioseo-col {
						svg.aioseo-circle-check {
							color: $green;
							width: 21px;
							min-width: 21px;
							min-height: 21px;
							margin-right: 5px;
						}
					}
				}

				.aioseo-button {
					margin-right: 12px;
				}
			}

			.type-4 {
				.header-text {
					font-weight: 700;
					font-size: 16px;
					margin-bottom: 5px;
				}

				.description {
					font-weight: 400;
					font-size: 14px;
					margin: 0;
				}
			}
		}
	}
}
</style>