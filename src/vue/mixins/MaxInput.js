export const MaxInput = {
	data () {
		return {
			maxInput : 50000
		}
	},
	methods : {
		setMaxInput (event) {
			if (this.maxInput < event.target.value) {
				event.target.value = this.maxInput
			}
		}
	}
}