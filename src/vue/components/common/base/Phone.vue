<template>
	<maz-phone-number-input
		class="aioseo-phone-number"
		:class="{ invalidNumber: isInvalidNumber, validNumber: isValidNumber }"
		v-model="phoneNumber"
		noValidation
		noExample
		showCodeOnList
		:ignored-countries="['KP']"
		@update="emit"
	>
	</maz-phone-number-input>
</template>

<script>
import { MazPhoneNumberInput } from 'maz-ui'
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
		&:focus {
			border-color: $blue;
			box-shadow: 0 0 0 1px $blue;
		}
	}

	// Left input field.
	.country-selector {
		flex: 0 0 140px;
		width: 140px;
		min-width: 140px;
		max-width: 140px;
		&:hover{
			z-index: 1;
		}
		> div.maz-base-component.maz-input.has-value.has-1-right-icon.maz-input--primary > input {
			padding-left: 50px !important;
		}
		.maz-input.is-focused {
			border-color: $blue;
		}
		.maz-select__options-list__item.selected.keyboard-selected {
			background-color: $blue;
		}
	}
	.maz-phone-number-input__country-flag {
			left: 20px;
			bottom: 12px;
			z-index: auto;
	}

	.maz-input__icon {
		z-index: auto;
	}

	.maz-select__options-list {
		input {
			border-color: $blue;
			box-shadow: 0 0 0 1px $blue;
		}
	}

	.maz-input__input {
		border-radius: 3px;
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
}
</style>