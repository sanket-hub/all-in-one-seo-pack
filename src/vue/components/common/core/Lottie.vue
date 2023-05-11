<template>
	<div :style="style" ref="lavContainer"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
	emits : [ 'animCreated' ],
	props : {
		options : {
			type     : Object,
			required : true
		},
		height : Number,
		width  : Number
	},
	data () {
		return {
			style : {
				width    : this.width ? `${this.width}px` : '100%',
				height   : this.height ? `${this.height}px` : '100%',
				overflow : 'hidden'
			}
		}
	},
	mounted () {
		this.anim = lottie.loadAnimation({
			container        : this.$refs.lavContainer,
			renderer         : 'svg',
			loop             : false !== this.options.loop,
			autoplay         : false !== this.options.autoplay,
			animationData    : { ...this.options.animationData },
			rendererSettings : this.options.rendererSettings
		})
		this.$emit('animCreated', this.anim)
	}
}
</script>