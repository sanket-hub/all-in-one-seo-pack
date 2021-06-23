export const SeoSiteScore = {
	data () {
		return {
			strings : {
				weveGotWorkToDo         : this.$t.__('We\'ve got some<br>work to do!', this.$td),
				needsImprovement        : this.$t.__('Needs<br>Improvement!', this.$td),
				veryGood                : this.$t.__('Very Good!', this.$td),
				excellent               : this.$t.__('Excellent!', this.$td),
				toSeeYourSiteScore      : this.$t.__('to see your Site Score.', this.$td),
				toAnalyzeCompetitorSite : this.$t.__('to analyze a competitor site.', this.$td),
				enterLicenseKey         : this.$t.__('A valid license key is required', this.$td)
			}
		}
	},
	computed : {
		connectWithAioseo () {
			// Translators: 1 - The plugin short name ("AIOSEO").
			return this.$t.sprintf(this.$t.__('Connect with %1$s', this.$td), process.env.VUE_APP_SHORT_NAME)
		},
		description () {
			return 25 >= this.score
				? this.strings.weveGotWorkToDo
				: (
					50 >= this.score
						? this.strings.needsImprovement
						: (
							75 >= this.score
								? this.strings.veryGood
								: this.strings.excellent
						)
				)
		}
	}
}