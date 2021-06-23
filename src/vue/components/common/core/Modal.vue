<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div
						v-if="!noHeader"
						class="modal-header"
					>
						<slot name="header">
							<slot name="headerTitle" />
							<button
								class="close"
								@click.stop="$emit('close')"
							>
								<svg-close @click="$emit('close')" />
							</button>
						</slot>
					</div>

					<div class="modal-body">
						<slot name="body"></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props : {
		noHeader : Boolean
	},
	methods : {
		scrollToElement () {
			const container = this.$el.getElementsByClassName('component-wrapper')[0]
			setTimeout(() => {
				if (container) {
					container.firstChild.scrollTop = 0
				}
			}, 10)
		}
	},
	mounted () {
		this.scrollToElement()
	}
}
</script>

<style lang="scss">
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(20,27,56,.3);
	display: table;
	transition: opacity .3s ease;

	@media screen and (max-width: 520px) {
		display: block;
		top: 46px;
	}

	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;

			@media screen and (max-width: 520px) {
				display: block;
				height: 100%;
			}

		.modal-container {
			width: 100%;
			max-width: 750px;
			max-height: 90vh;
			overflow-y: hidden;
			overflow-x: hidden;
			margin: 0 auto;
			background-color: #fff;
			box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
			transition: all .3s ease;

			@media screen and (max-width: 520px) {
				width: 100%;
				max-width: 100%;
				max-height: calc(100vh - 46px);
				height: 100%;
			}

			.modal-header {
				color: $black;
				position: sticky;
				top: 0;
				z-index: 15;
				padding: 0 0 0 40px;
				height: 70px;
				font-size: 20px;
				font-weight: bold;
				line-height: 1.4;
				border-bottom: 1px solid $border;
				background-color: #fff;
				display: flex;
				align-items: center;

				@media screen and (max-width: 520px) {
					padding: 15px 0 0 20px;
				}

				button.close {
					position: absolute;
					right: 11px;
					top: 11px;
					width: 24px;
					height: 24px;
					background-color: #fff;
					border: none;
					display: flex;
					align-items: center;

					svg.aioseo-close {
						cursor: pointer;
						width: 14px;
						height: 14px;
					}
				}
			}

			.modal-body .aioseo-post-general,
			.modal-body .aioseo-post-social {
				height: calc( 90vh - 120px );
				max-height: 600px;
				overflow-y: auto;
				overflow-x: hidden;
			}

			.modal-body {
				.aioseo-modal-content {
					&.has-padding {
						padding: 40px;
					}
				}
			}

			@media screen and (max-width: 520px) {
				.modal-body,
				.modal-body > div,
				.aioseo-modal-content,
				.aioseo-modal-content > .component-wrapper {
					height: 100%;
				}
				.aioseo-modal-content > .component-wrapper {
					display: flex;
					align-items: flex-end;
				}
				.aioseo-post-social,
				.aioseo-post-general {
					height: 100%!important;
					max-height: 100%!important;
					padding: 20px!important;
					.mobile-radio-buttons {
						margin-bottom: 0;
					}
				}
				.aioseo-add-template-tag {
					display: none;
				}
				.tab-facebook,
				.tab-twitter {
					.aioseo-settings-row:last-of-type {
						margin-bottom: 64px!important;
						padding-bottom: 32px!important;
					}
				}
			}
		}
	}
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>