<template>
	<div class="aioseo-headline-score">
		<div class="aioseo-headline-score-score">
			<core-site-score
				:loading="isAnalyzing"
				:score="score"
				:description="description"
			/>
		</div>
		<div
			class="aioseo-headline-score-overall"
			v-html="strings.overallScore"
		/>
		<div
			class="aioseo-headline-score-recommendations"
			v-html="`${strings.veryGoodScore} ${strings.forBestResults}`"
		/>
	</div>
</template>

<script>
import { HeadlineScore } from '@/vue/mixins'
export default {
	mixins : [ HeadlineScore ],
	props  : {
		score   : Number,
		loading : Boolean
	},
	data () {
		return {
			isAnalyzing : false,
			strings     : {
				overallScore   : this.$t.__('Overall Score', this.$td),
				// Translators: 1 - Opening bold HTML tag, 2 - Closing bold HTML tag, 3 - Initial score range, 4 - Final score range.
				veryGoodScore  : this.$t.sprintf(this.$t.__('A very good score is between %1$s%3$d and %4$d%2$s.', this.$td), '<strong>', '</strong>', 70, 90),
				// Translators: 1 - Opening bold HTML tag, 2 - Closing bold HTML tag, 3 - Score.
				forBestResults : this.$t.sprintf(this.$t.__('For best results, you should strive for %1$s%3$d and above%2$s.', this.$td), '<strong>', '</strong>', 70)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-headline-score {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 30px;
	max-width: 25%;

	@media (max-width: 1280px) {
		padding: 0;
		max-width: 100%;
	}

	&-score {
		position: relative;
		min-width: 175px;
		max-width: 217px;
		margin-right: 1em;
		margin-bottom: 45px;
		margin-right: auto;
		margin-left: auto;

		svg {
			width: 100%;
			height: auto;
		}
	}

	&-overall {
		font-size: 18px;
		line-height: 150%;
		font-weight: bold;
		text-align: center;
		margin-bottom: 12px;
	}

	&-recommendations {
		font-size: 14px;
		line-height: 150%;
		text-align: center;
		max-width: 220px;
	}
}
</style>