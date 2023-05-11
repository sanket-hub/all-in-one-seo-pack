export const TruSeoScore = {
	data () {
		return {
			weveGotWorkToDoString : this.$t.sprintf(
				// Translators: 1 - HTML Line break tag.
				this.$t.__('We\'ve got some%1$swork to do!', this.$td),
				'<br>'
			),
			needsImprovementString : this.$t.sprintf(
				// Translators: 1 - HTML Line break tag.
				this.$t.__('Needs%1$sImprovement!', this.$td),
				'<br>'
			),
			veryGoodString  : this.$t.__('Very Good!', this.$td),
			excellentString : this.$t.__('Excellent!', this.$td),
			allGoodString   : this.$t.__('All Good!', this.$td)
		}
	},
	computed : {
		description () {
			return 25 >= this.score
				? this.weveGotWorkToDoString
				: (
					50 >= this.score
						? this.needsImprovementString
						: (
							75 >= this.score
								? this.veryGoodString
								: this.excellentString
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
			return this.allGoodString
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
			this.$truSeo.runAnalysis(postId)
		}
	}
}