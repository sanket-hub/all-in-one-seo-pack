<template>
	<component
		class="aioseo-toc-list--rendered"
		:is="listStyle"
	>
		<li
			class="aioseo-toc-list-item--rendered"
			:class="[
				{ 'hidden' : heading.hidden }
			]"
			v-for="(heading, index) in headings"
			:key="index"
		>
			<a :href="`#${heading.anchor}`">{{ heading.editedContent || heading.content }}</a>

			<ListRendered
				class="aioseo-toc-list-nested--rendered"
				v-if="heading.headings"
				:headings="heading.headings"
			/>
		</li>
	</component>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name  : 'ListRendered',
	props : {
		headings : {
			required : true,
			type     : Array
		}
	},
	computed : {
		...mapState([ 'listStyle' ])
	}
}
</script>