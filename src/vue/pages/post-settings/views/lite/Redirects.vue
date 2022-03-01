<template>
	<div class="aioseo-tab-content aioseo-link-assistant">
		<div v-if="'metabox' === $root._data.screenContext">
			<RedirectsLite
				:noCoreCard="true"
				:parentComponentContext="parentComponentContext"
			/>
		</div>

		<core-modal
			class="aioseo-redirects-modal"
			v-if="currentPost.redirects.modalOpen && 'sidebar' === $root._data.screenContext"
			@close="toggleRedirectsModal"
			isolate
		>
			<div slot="headerTitle">
				{{ strings.modalHeader }}
			</div>

			<div slot="body">
				<div class="bd">
					<RedirectsLite
						:noCoreCard="true"
						:parentComponentContext="parentComponentContext"
					/>
				</div>
			</div>
		</core-modal>

		<redirects-side-bar v-if="'modal' !== this.parentComponentContext" />
	</div>
</template>

<script>
import RedirectsSideBar from './../RedirectsSideBar'
import RedirectsLite from '@/vue/pages/redirects/views/lite/redirects/Redirects'

import { mapMutations, mapState } from 'vuex'

export default {
	components : {
		RedirectsSideBar,
		RedirectsLite
	},
	props : {
		parentComponentContext : String
	},
	data () {
		return {
			strings : {
				modalHeader : this.$t.__('Redirects', this.$t.tdPro)
			}
		}
	},
	computed : {
		...mapState([ 'currentPost' ])
	},
	methods : {
		...mapMutations([ 'toggleRedirectsModal' ])
	}
}
</script>