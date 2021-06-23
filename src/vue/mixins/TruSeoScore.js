export const TruSeoScore = {
	data () {
		return {
			strings : {
				weveGotWorkToDo            : this.$t.__('We\'ve got some<br>work to do!', this.$td),
				needsImprovement           : this.$t.__('Needs<br>Improvement!', this.$td),
				veryGood                   : this.$t.__('Very Good!', this.$td),
				excellent                  : this.$t.__('Excellent!', this.$td),
				criticalIssues             : this.$t.__('Critical Issues', this.$td),
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
		getErrorDisplay (errors) {
			if (0 < errors) {
				return `${errors} ${this.strings.errors}`
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