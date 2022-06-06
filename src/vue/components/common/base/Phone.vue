<template>
	<maz-phone-number-input
		class="aioseo-phone-number"
		:class="{ invalidNumber: isInvalidNumber, validNumber: isValidNumber }"
		v-model="phoneNumber"
		noValidation
		noExample
		showCodeOnList
		:ignored-countries="['KP']"
		:preferredCountries="['US', 'GB', 'CA', 'AU', 'JP', 'RU', 'IN', 'TR', 'BR', 'MX']"
		:placeholder="' '"
		@update="emit"
	/>
</template>

<script>
import MazPhoneNumberInput from 'maz-ui/lib/maz-phone-number-input'
import '@/vue/assets/scss/maz/maz.scss'
export default {
	components : { MazPhoneNumberInput },
	props      : {
		value : String
	},
	data () {
		return {
			phoneNumber     : this.value,
			isInvalidNumber : false,
			isValidNumber   : false
		}
	},
	methods : {
		emit (phoneNumber) {
			this.isInvalidNumber = false
			this.isValidNumber   = false
			if (!phoneNumber.isValid) {
				if (phoneNumber.formattedNumber) {
					this.isInvalidNumber = true
				}
				return this.$emit('input', '')
			}
			this.isValidNumber = true

			// The formatted value is used for display inside our Business Info block/widget/shortcode.
			this.$emit('inputFormatted', '+' + phoneNumber.countryCallingCode + ' ' + phoneNumber.formatNational)
			return this.$emit('input', phoneNumber.formattedNumber)
		}
	},
	mounted () {
		// Prevent the browser from autofilling in a phone number.
		const timestamp = this.$moment().unix()
		const value     = 'aioseo-phone-number-' + timestamp.toString()
		document.querySelectorAll('.aioseo-phone-number input').forEach((node) => {
			node.setAttribute('autocomplete', value)
		})
	}
}
</script>

<style lang="scss">
.aioseo-phone-number {
	max-width: 600px;
	label {
		display: none;
	}

	// Both input fields.
	.maz-input__input {
		height: 40px;
		min-height: 40px;
		padding-top: 0 !important;
		border: 1px solid $input-border;
		cursor: text;

		&:focus {
			border-color: $blue;
			box-shadow: 0 0 0 1px $blue;
			z-index: 10;
		}
	}

	// Hide the clear icon.
	.maz-input__toggle-btn.--clear {
		display: none;
	}

	// Left input field.
	.country-selector {
		flex: 0 0 100px;
		width: 100px;
		min-width: 100px;
		max-width: 100px;

		&:hover{
			z-index: 1;
		}

		> div.maz-base-component.maz-input.has-value.has-1-right-icon.maz-input--primary > input {
			padding-left: 50px !important;
			padding-right: 0;
			cursor: pointer;
			max-width: 110px;
		}

		.maz-input.is-focused {
			border-color: $blue;
		}

		.maz-select__options-list__item.selected.keyboard-selected {
			background-color: $blue;
		}
	}

	.maz-phone-number-input__country-flag {
		height: fit-content;
		top: 0;
		bottom: 0;
		margin-top: auto;
		margin-bottom: auto;
		z-index: auto;
	}

	.maz-input__icon {
		display: none;
	}

	.maz-select__toggle {
		z-index: 2;
		height: 24px;

		svg {
			height: 18px;
			width: 18px;

			&.maz-select__toggle__arrow .arrow {
				fill: $black;
			}
		}
	}

	.maz-select__options-list {
		margin-top: 5px;
		margin-left: -2px;

		input {
			border-color: $blue;
			box-shadow: 0 0 0 1px $blue;
		}
	}

	.maz-input.is-focused.maz-input--primary .maz-input__input {
		border-color: $blue;
		box-shadow: 0 0 0 1px $blue;
	}

	.maz-input.is-focused.maz-input--primary .maz-input__icon .arrow {
		fill: $black !important;
	}

	.maz-input__input {
		border-radius: 3px;
		margin-left: 0px !important;
	}

	&.invalidNumber {
		div.maz-flex-1 > div > input {
			border-color: red;

			&:focus {
				border-color: $red;
				box-shadow: 0 0 0 1px $red;
			}
		}
	}

	&.validNumber {
		div.maz-flex-1 > div > input {
			&:focus {
				border-color: $green;
				box-shadow: 0 0 0 1px $green;
			}
		}
	}

	&.maz-phone-number-input {
		.maz-input {
			&.input-phone-number {
				&:not(.has-border-radius) {
					.maz-input__input {
						margin-left: 0;
						border-left-width: 0;
					}
				}
			}

			&.is-focused {
				.maz-input__input {
					border-left-width: 1px;
				}
			}
		}
	}
}
</style>