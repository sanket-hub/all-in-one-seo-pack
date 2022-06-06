import { mapGetters, mapState } from 'vuex'
import { MetaTag } from '@/vue/mixins'
export const WebmasterTools = {
	mixins : [ MetaTag ],
	props  : {
		tool : {
			type     : Object,
			required : true
		},
		isConnected : {
			type : Boolean,
			default () {
				return false
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'options' ])
	}
}