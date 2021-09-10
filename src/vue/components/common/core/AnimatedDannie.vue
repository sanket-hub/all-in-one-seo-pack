<template>
	<div class="aioseo-animated-dannie">
		<component
			:is="`svg-dannie-${mascot}-animate-${number}`"
		/>
	</div>
</template>

<script>
export default {
	props : {
		mascot : {
			type     : String,
			required : true
		}
	},
	data () {
		return {
			number   : 'one',
			interval : null
		}
	},
	mounted () {
		this.interval = setInterval(() => {
			if ('one' === this.number) {
				this.number = 'two'
			} else {
				this.number = 'one'
			}
		}, 500)
	}
}
</script>

<style lang="scss">
.aioseo-animated-dannie {
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;

	svg {
		max-width: 250px;
	}
}
</style>