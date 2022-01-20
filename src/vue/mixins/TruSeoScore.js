export const TruSeoScore = {
	data () {
		return {
			strings : {
				// Translators: 1 - HTML Line break tag.
				weveGotWorkToDo            : this.$t.sprintf(this.$t.__('We\'ve got some%1$swork to do!', this.$td), '<br>'),
				// Translators: 1 - HTML Line break tag.
				needsImprovement           : this.$t.sprintf(this.$t.__('Needs%1$sImprovement!', this.$td), '<br>'),
				veryGood                   : this.$t.__('Very Good!', this.$td),
				excellent                  : this.$t.__('Excellent!', this.$td),
				criticalIssues             : this.$t.__('Important Issues', this.$td),
				recommendedImprovements    : this.$t.__('Recommended Improvements', this.$td),
				goodResults                : this.$t.__('Good Results', this.$td),
				completeSiteAuditChecklist : this.$t.__('Complete Site Audit Checklist', this.$td),
				allGood                    : this.$t.__('All Good!', this.$td),
				errors                     : this.$t.__('Errors', this.$td)
			}
		}
	},
	computed : {
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
	},
	methods : {
		getErrorDisplay (amountOfErrors) {
			if (0 < amountOfErrors) {
				return this.$t.sprintf(
					// Translators: 1 - The amount of errors.
					this.$t._n('%1$s Error', '%1$s Errors', amountOfErrors, this.$td),
					amountOfErrors
				)
			}
			return this.strings.allGood
		},
		getErrorClass (errors) {
			if (5 < errors) {
				return 'red'
			}
			if (0 < errors) {
				return 'orange'
			}
			return 'green'
		},
		getScoreClass (score) {
			return 80 < score ? 'green' : 50 < score ? 'orange' : 1 < score ? 'red' : 'none'
		},
		runAnalysis (postId) {
			this.$truSEO.runAnalysis(postId)
		}
	}
}