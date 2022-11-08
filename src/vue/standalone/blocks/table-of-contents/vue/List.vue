<template>
	<Draggable
		class="aioseo-toc-list"
		:class="[
			{ 'orderable' : this.allowReorder }
		]"
		v-bind="dragOptions"
		handle=".aioseo-drag-handle"
		:list="headings"
		@input="(value) => $emit('input', value)"
		@change="(value) => setReorder(value)"
	>

			<li
				v-for="(heading, index) in headings"
				:key="index"
				:class="[
					'aioseo-toc-list-item',
					{ 'heading-hidden' : heading.hidden }
				]"
			>

				<div class="aioseo-toc-list-item__inner">
					<button
						class="aioseo-drag-handle has-icon"
						v-if="allowReorder"
					>
						<Drag/>
					</button>

					<base-input
						class="row-input row-input--content"
						:value="heading.editedContent || heading.content"
						:placeholder="heading.content"
						@input="value => setEditedContent(value, index)"
					>
						<template #append-icon>
							<div
								class="append-icon"
								v-if="!allowReorder"
							>
								<toc-link @click.native="handleAnchorInput"/>
							</div>
						</template>
					</base-input>

					<base-input
						class="row-input row-input--anchor"
						:spellcheck=false
						:value="heading.anchor"
						@input="value => setAnchor(value, index)"
						v-if="!allowReorder"
					>
						<template #append-icon>
							<div
								class="append-icon"
							>

								<core-tooltip>
									<Info />

									<template #tooltip>
										<p class="aioseo-tooltip__header">{{strings.tooltipHeader}}</p>

										<p>{{strings.tooltipDescription}}</p>
									</template>
								</core-tooltip>
								<Close @click.native="handleAnchorInput"/>
							</div>
						</template>
					</base-input>

					<button
						v-if="!allowReorder"
						:class="[
							{ 'active' : heading.hidden },
							'aioseo-hide-heading-toggle',
							'has-icon'
						]"
						@click="setHiddenStatus(heading)"
						>
						<EyeOff v-if="heading.hidden"/>
						<Eye v-else/>
					</button>

					<List
						class="aioseo-toc-list-nested"
						v-if="heading.headings"
						:headings="heading.headings"
						:allowReorder="allowReorder"
					/>
				</div>
			</li>
	</Draggable>
</template>

<script>
import Close from '@/vue/components/common/svg/Close'
import CoreTooltip from '@/vue/components/common/core/Tooltip'
import Drag from '@/vue/components/common/svg/Drag'
import Draggable from 'vuedraggable'
import Eye from '@/vue/components/common/svg/Eye'
import EyeOff from '@/vue/components/common/svg/EyeOff'
import Info from '@/vue/components/common/svg/Info'
import TocLink from '@/vue/components/common/svg/Link'
import { mapMutations, mapState } from 'vuex'
import { cleanForSlug } from '@/vue/utils/cleanForSlug'
import { deepCopy, cleanHtml } from '@/vue/standalone/blocks/utils'
import { formatHeadingList, orderHeadings } from '../helpers'

export default {
	name       : 'List',
	components : {
		Close,
		CoreTooltip,
		Drag,
		Draggable,
		Eye,
		EyeOff,
		Info,
		TocLink
	},
	props : {
		headings : {
			required : true,
			type     : Array
		},
		allowReorder : {
			required : false,
			type     : Boolean,
			default () {
				return false
			}
		}
	},
	data () {
		return {
			showAnchorField : -1,
			strings         : {
				tooltipHeader      : this.$t.__('Edit HTML Anchor:', this.$tdPro),
				tooltipDescription : this.$t.sprintf(
					// Translators: 1 - The plugin short name ("AIOSEO").
					this.$t.__('The HTML anchor allows %1$s to link directly to your header from this table of contents block. Feel free to edit if you want, but an anchor is required. For headings without an anchor, %1$s will automatically generate them.', this.$tdPro),
					import.meta.env.VITE_SHORT_NAME
				)
			}
		}
	},
	computed : {
		...mapState({
			listStyle     : state => state.listStyle,
			storeHeadings : state => state.headings
		}),
		dragOptions () {
			return {
				tag        : this.listStyle,
				animation  : 300,
				group      : 'description',
				disabled   : !this.allowReorder,
				ghostClass : 'aioseo-drag-ghost',
				dragClass  : 'aioseo-dragging'
			}
		}
	},
	methods : {
		...mapMutations([ 'setHeadings' ]),
		setEditedContent (newValue, index) {
			if (newValue === this.storeHeadings[index].content) {
				this.storeHeadings[index].editedContent = ''

				return
			}

			this.storeHeadings[index].editedContent = cleanHtml(newValue, true)
		},
		setReorder () {
			this.$store.state.reOrdered = true
			const rearrangedList = orderHeadings(deepCopy(this.storeHeadings))

			this.setHeadings(rearrangedList)
			window.aioseoBus.$emit('updateHeadings' + this.$store.state.blockClientId, rearrangedList)
		},
		setAnchor (newValue, index) {
			this.storeHeadings[index].anchor = cleanForSlug(newValue)
			if (!newValue) {
				this.storeHeadings[index].anchor = 'aioseo-' + cleanForSlug(this.storeHeadings[index].content)
			}

			const clientId = this.storeHeadings[index].blockClientId
			const block    = window.wp.data.select('core/block-editor').getBlock(clientId)
			if (!block) {
				return
			}

			window.wp.data.dispatch('core/block-editor').updateBlockAttributes(clientId, {
				anchor : this.storeHeadings[index].anchor
			})
		},
		setHiddenStatus (heading) {
			heading.hidden = !heading.hidden

			if (9 === heading.editedLevel) {
				heading.editedLevel = 0
			} else {
				heading.editedLevel = 9
			}
			this.setHeadings(formatHeadingList([ ...this.storeHeadings ]))
		},
		handleAnchorInput (event) {
			const inputRow = event.target.closest('.aioseo-toc-list-item')
			const anchorInput = inputRow?.querySelector('.row-input--anchor input')

			if (!anchorInput) {
				return
			}

			if (!inputRow.classList.contains('anchor-edit')) {
				anchorInput.focus({ preventScroll: true })
				inputRow.classList.add('anchor-edit', 'anchor-is-animating')

				anchorInput.addEventListener('animationend', function anchorIn () {
					inputRow.classList.remove('anchor-is-animating')
					inputRow.classList.add('done')

					anchorInput.removeEventListener('animationend', anchorIn, false)
				})
			} else {
				inputRow.classList.add('anchor-is-animating')
				inputRow.classList.remove('anchor-edit')
				inputRow.classList.remove('done')

				anchorInput.addEventListener('animationend', function anchorOut () {
					inputRow.classList.remove('anchor-is-animating')

					inputRow.removeEventListener('animationend', anchorOut, false)
				})
			}
		}
	}
}
</script>

<style lang="scss">
.wp-block-aioseo-table-of-contents .aioseo-toc-menu,
.aioseo-toc-modal {

	.aioseo-toc-list {
		margin: 0;
		padding: 0;

		li.aioseo-toc-list-item {
			margin: 0;

			&.heading-hidden {
				display: block;
			}
		}

		.aioseo-toc-list-nested:is(ul, ol) {
			padding-left: 30px;
			width: 100%;
		}
	}

	svg {
		width: 24px;
		height: 24px;
		fill: currentColor;
	}

	button.has-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		width: 40px;
		cursor: pointer;
		text-decoration: none;
		text-shadow: none;
		outline: 1px solid transparent;
		border-width: 0;
		color: $placeholder-color;
		padding: 0;
		background: none;
	}

	button.aioseo-hide-heading-toggle {
		background-color: $background;
	}

	.aioseo-toc-list-item {

		.aioseo-toc-list-item__inner {
			display: flex;
			flex-wrap: wrap;
			position: relative;
		}

		> .aioseo-toc-list-item__inner > :not(.aioseo-toc-list) {
			margin-block: 4px;
		}

		.row-input {
			position: relative;
			width: 100%;
			max-width: calc(100% - 40px);
			transition: opacity 0.2s;

			&:not(:hover, :focus-within) {
				overflow: hidden;
			}

			input {
				color: $black;
				font-size: 16px;
				line-height: 1.25;
				padding: 15px;
				transition: background-color, border-color, opacity 0.3s;
			}

			&.row-input--anchor {
				position: absolute;
				right: 40px;
				z-index: -1;

				input {
					animation: anchorInputOut 0.3s ease-out;
				}
			}

			.append-icon {
				display: flex;
				align-content: center;
				justify-content: end;
				position: absolute;
				top: 1px;
				right: 1px;
				padding-left: 14px;
				padding-right: 16px;
				width: fit-content;
				max-height: calc(100% - 2px);
				border-radius: 0 3px 3px 0;
				background-image: linear-gradient(to right, transparent, rgb(255, 255, 255) 8px);
				opacity: 1;

				.aioseo-tooltip {
					margin-left: 0;
				}

				svg {
					color: $placeholder-color;
					width: 24px;
					height: 24px;
					cursor: pointer;

					&.aioseo-close {
						width: 14px;
						height: 14px;
						margin-right: 5px;
						margin-left: 12px
					}
				}
			}
		}

		&.anchor-edit {

			> .aioseo-toc-list-item__inner > .row-input {

				&.row-input--content {
					z-index: 0;
				}

				&.row-input--anchor {
					z-index: 1;

					input {
						padding-right: 78px;
						animation: anchorInputIn 0.3s ease-in;
					}
				}
			}
		}

		&.anchor-is-animating {

			> .aioseo-toc-list-item__inner > .row-input {
				overflow: hidden;

				.append-icon {
					opacity: 0;
					transition: none;
				}
			}

			> .aioseo-toc-list-item__inner > .row-input--anchor {
					z-index: 1;
			}

			&.anchor-edit {
				> .aioseo-toc-list-item__inner > .row-input--content {

					input {
						animation: contentInputOut 0.3s ease-out;
					}
				}
			}

			&:not(.anchor-edit) {
				> .aioseo-toc-list-item__inner > .row-input--content {

					input {
						animation: contentInputIn 0.3s ease-in;
					}
				}
			}
		}
	}

	.heading-hidden {

		> .aioseo-toc-list-item__inner > .row-input {
				pointer-events: none;

			input {
				opacity: 0.5;
			}

			.append-icon {
				display: none;
			}
		}
	}

	.aioseo-tooltip {
		.popper {
			z-index: 100;
			width: 300px;
			text-align: left;
			padding: 20px;
			line-height: 1.3;
			font-size: 13px;
			background-color: #fff;
			border-width: 0;
			box-shadow: 0px 3px 4.8px rgba(32, 71, 102, 0.27);

			p {
				margin: 0;
				line-height: 1.3;
				font-size: 13px;
			}

			.aioseo-tooltip__header {
				font-weight: bold;
				margin: 0;

				+ p {
					margin-top: 1em;
				}
			}
		}

		svg {
			color: $placeholder-color;
			cursor: pointer;
		}
	}

	.aioseo-toc-content > .aioseo-toc-list:not(.orderable) {

		.row-input--content input {
			padding-right: 48px;
		}

		&:not(.aioseo-toc-list-nested) {
			margin-left: 24px;
		}
	}
}

.is-highlighted > .wp-block-aioseo-table-of-contents .aioseo-toc-list-item,
.wp-block-aioseo-table-of-contents .aioseo-toc-list-item.anchor-edit.done:not(:focus-within) {

	> .aioseo-toc-list-item__inner > .row-input input {
		animation-duration: 0s!important;
	}
}

.aioseo-toc-modal .modal-body {

	.heading-hidden {
		display: none;
	}

	li.aioseo-toc-list-item {
		list-style: none;

		.row-input input {
			pointer-events: none;
		}
	}

	.aioseo-drag-ghost {

		input {
			color: $blue3!important;
			background: $box-background;
			border-color: transparent;
			outline-color: transparent;
			overflow: hidden;
		}

		.aioseo-drag {
			opacity: 0;
		}

		.aioseo-drag-handle {
			color: $blue3!important;
			opacity: 1!important;
		}
	}

	.aioseo-dragging {
		input {
			display: none;
		}
	}

	.aioseo-drag-handle {
		cursor: grab!important;
	}
}

@keyframes anchorInputIn {
	0% {
		transform: translateX(100%);
	}

	100% {
		transform: translateX(0);
	}
}

@keyframes anchorInputOut {
	0% {
		transform: translateX(0);
	}

	100% {
		transform: translateX(100%);
	}
}

@keyframes contentInputIn {
	0% {
		transform: scale(.95);
		opacity: 0.3;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}

@keyframes contentInputOut {
	0% {
		transform: scale(1);
		opacity: 1;
	}

	100% {
		transform: scale(.95);
		opacity: 0.3;
	}
}
</style>