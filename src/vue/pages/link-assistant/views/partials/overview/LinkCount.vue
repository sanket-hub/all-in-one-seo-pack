<template>
	<a
		class="aioseo-link-count"
		:href="getLink"
	>
		<div class="aioseo-link-count-top">
			<component
				:is="getType.icon"
			/>
			<util-animated-number
				:number="parseInt(count)"
			/>
		</div>
		<div class="aioseo-link-count-bottom">
			<span>{{ getType.name }}</span>

			<core-tooltip
				v-if="'orphaned' === type"
			>
				<div
					class="disabled-button gray"
				>
					<svg-circle-question-mark />
				</div>

				<template #tooltip>
					<span>
						{{ strings.orphanedPostsDescription }}
					</span>
				</template>
			</core-tooltip>
		</div>
	</a>
</template>

<script>
export default {
	props : {
		type : {
			type     : String,
			required : true
		},
		count : {
			type     : Number,
			required : true
		}
	},
	data () {
		return {
			strings : {
				orphanedPostsDescription : this.$t.__('Orphaned posts are posts that have no inbound internal links yet and may be more difficult to find by search engines.', this.$t.tdPro)
			},
			icons : [
				{
					type : 'posts',
					name : this.$t.__('Posts Crawled', this.$t.tdPro),
					icon : 'svg-search'
				},
				{
					type : 'external',
					name : this.$t.__('External Links', this.$t.tdPro),
					icon : 'svg-link-external'
				},
				{
					type : 'internal',
					name : this.$t.__('Internal Links', this.$t.tdPro),
					icon : 'svg-link-internal-inbound'
				},
				{
					type : 'affiliate',
					name : this.$t.__('Affiliate Links', this.$t.tdPro),
					icon : 'svg-link-affiliate'
				},
				{
					type : 'orphaned',
					name : this.$t.__('Orphaned Posts', this.$t.tdPro),
					icon : 'svg-link-orphaned'
				}
			]
		}
	},
	computed : {
		getType () {
			return this.icons.find(object => object.type === this.type)
		},
		getLink () {
			switch (this.type) {
				case 'posts':
				case 'affiliate':
				case 'internal':
					return '#/links-report?fullReport=1'
				case 'external':
					return '#/domains-report'
				case 'orphaned':
					return '#/links-report?orphaned-posts=1'
				default:
					return ''
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-link-count {
	display: flex;
	padding: 5px 20px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-decoration: none;

	.aioseo-link-count-top {
		display: flex;
		align-items: center;
		height: 20px;

		span {
			color: $black;
			font-size: 28px;
			font-weight: bold;
		}

		svg {
			margin-right: 12px;
			width: 15.75px;
			height: 15.75px;

			&.aioseo-search {
				$color: $black2-hover;
			}

			&.aioseo-link-external {
				color: $blue;
			}

			&.aioseo-link-internal-inbound {
				color: $green;
			}

			&.aioseo-link-affiliate {
				max-width: 17.5px;
				max-height: 17.5px;
				color: $orange;
			}

			&.aioseo-link-orphaned {
				max-width: 17.5px;
				margin-right: 10px;
				color: $red;
			}
		}
	}
	.aioseo-link-count-bottom {
		display: flex;
		margin-top: 15px;

		span {
			font-size: 14px;
			line-height: 120%;
			color: $black2;
		}

		.aioseo-tooltip {
			display: inline-block;
			margin-left: 8px;
			margin-top: 1.5px;

			svg.aioseo-circle-question-mark {
				display: inline-flex;
				width: 15px;
				height: 15px;
			}
		}
	}

	@media screen and (max-width: 912px) {
		.aioseo-row {
			justify-content: center;
			row-gap: 15px;

			.counter {
				display: inline-flex;

				&.aioseo-col {
					flex-basis: auto;
					padding: 5px 20px;
				}
			}
		}
	}
}
</style>