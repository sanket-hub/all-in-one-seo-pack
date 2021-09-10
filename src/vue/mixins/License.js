export const License = {
	computed : {
		yourLicenseIsText () {
			let text = this.$t.__('You have not yet added a license key.', this.$td)

			if (this.$aioseo.license.isExpired) {
				text = this.$t.__('Your license has expired.', this.$td)
			}

			if (this.$aioseo.license.isDisabled) {
				text = this.$t.__('Your license has been disabled.', this.$td)
			}

			if (this.$aioseo.license.isInvalid) {
				text = this.$t.__('Your license key is invalid.', this.$td)
			}

			return text
		}
	}
}