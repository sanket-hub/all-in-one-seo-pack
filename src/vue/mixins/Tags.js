import { mapState } from 'vuex'
import { customFieldValue } from '@/vue/plugins/tru-seo/components'
export const Tags = {
	computed : {
		...mapState([ 'currentPost', 'tags' ]),
		...mapState('live-tags', [ 'liveTags' ])
	},
	methods : {
		truncate (string, length = 200) {
			if (!string) {
				return string
			}

			return length < string.length ? string.substr(0, length - 1) + this.$tags.decodeHTMLEntities('&hellip;') : string
		},
		parseTags (string) {
			if (!string) {
				return string
			}

			if (!this.tags.tags) {
				return string
			}

			this.tags.tags.forEach(tag => {
				if ('custom_field' === tag.id) {
					const customFieldRegex   = new RegExp(`#${tag.id}-([a-zA-Z0-9_-]+)`)
					const customFieldMatches = string.match(customFieldRegex)
					if (customFieldMatches && customFieldMatches[1]) {
						string = string.replace(customFieldRegex, customFieldValue(customFieldMatches[1]))
					}
					return
				}

				if ('tax_name' === tag.id) {
					const taxNameRegex = new RegExp(`#${tag.id}-([a-zA-Z0-9_-]+)`, 'g')
					string             = string.replace(taxNameRegex, `[${tag.name} - $1]`)
					return
				}

				// Pattern explained: Exact match of tag, not followed by any additional letter, number or underscore.
				// This allows us to have tags like: #post_link and #post_link_alt
				// and it will always replace the correct one.
				const regex = new RegExp(`#${tag.id}(?![a-zA-Z0-9_])`, 'g')

				// If this is the separator, use the most recent value from the props.
				if ('separator_sa' === tag.id && undefined !== this.separator) {
					string = string.replace(regex, this.separator)
				}

				const matches = string.match(regex)
				const value   = (this.liveTags[tag.id] || tag.value)
				if (matches) {
					string = string.replace(regex, '%|%' + value)
				}

				// Let's update our new value to the window object.
				this.$set(tag, 'value', value)
				const { tags }  = window.aioseo.tags
				const windowTag = tags.find(t => t.id === tag.id)
				if (windowTag) {
					this.$set(windowTag, 'value', value)
				}
			})

			// Since we added a delimiter, let's remove all of that now.
			string = string.replace(/%\|%/g, '')

			return this.$tags.decodeHTMLEntities(this.$tags.decodeHTMLEntities(string.replace(/<(?:.|\n)*?>/gm, ' ').replace(/\s/g, ' ')))
		}
	}
}