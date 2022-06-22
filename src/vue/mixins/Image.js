import Vue from 'vue'
import store from '@/vue/store'
import { getPostEditedAuthor, getPostEditedFeaturedImage, getPostEditedContent, customFieldImage } from '../plugins/tru-seo/components'

export const ImageSourceOptions = {
	data () {
		return {
			excludedTermOptions        : [ 'featured', 'attach', 'content', 'author', 'auto' ],
			excludedAttachmentOptions  : [ 'featured', 'content', 'author' ],
			excludedPageBuilderOptions : [ 'auto' ]
		}
	},
	computed : {
		imageSourceOptions () {
			return [
				{ label: this.$t.__('Default Image (Set Below)', this.$td), value: 'default' },
				{ label: this.$t.__('Featured Image', this.$td), value: 'featured' },
				{ label: this.$t.__('Attached Image', this.$td), value: 'attach' },
				{ label: this.$t.__('First Image in Content', this.$td), value: 'content' },
				{ label: this.$t.__('Image from Custom Field', this.$td), value: 'custom' },
				{ label: this.$t.__('Post Author Image', this.$td), value: 'author' },
				{ label: this.$t.__('First Available Image', this.$td), value: 'auto' }
			]
		},
		imageSourceOptionsFiltered () {
			const options = this.imageSourceOptions
				.map(option => {
					if ('default' === option.value) {
						option.label = this.$t.__('Default Image Source (Set in Social Networks)', this.$td)
					}
					return option
				}).concat({ label: this.$t.__('Custom Image', this.$td), value: 'custom_image' })

			if ('term' === this.currentPost.context) {
				return options.filter(option => !this.excludedTermOptions.includes(option.value))
			}
			if ('post' === this.currentPost.context && 'attachment' === this.currentPost.postType) {
				return options.filter(option => !this.excludedAttachmentOptions.includes(option.value))
			}
			if (this.$aioseo.integration) {
				if ('seedprod' === this.$aioseo.integration) {
					this.excludedPageBuilderOptions.push('featured', 'custom')
				}
				return options.filter(option => !this.excludedPageBuilderOptions.includes(option.value))
			}
			return options
		}
	},
	methods : {
		getTermImageSourceOptions () {
			return this.imageSourceOptions.filter(option => !this.excludedTermOptions.includes(option.value))
		},
		getImageSourceOption (option) {
			return this.imageSourceOptions.find(o => o.value === option)
		},
		getImageSourceOptionFiltered (option) {
			return this.imageSourceOptionsFiltered.find(o => o.value === option)
		}
	}
}

const getFirstImageInContent = () => {
	let image = null
	const images = /<img.*?src=['"](.*?)['"].*?>/i.exec(getPostEditedContent())
	if (images && images[1]) {
		image = images[1]
	}

	return image
}

const getFirstAvailableImage = async (currentPost, type, prefix) => {
	let image = customFieldImage(currentPost[`${prefix}image_custom_fields`])

	if (!image) {
		await getPostEditedFeaturedImage().then(url => {
			image = url
		})
	}

	if (!image) {
		await store.dispatch('getFirstAttachedImage', { postId: currentPost.id }).then((url) => {
			image = url
		})
	}

	if (!image) {
		image = getFirstImageInContent()
	}

	if (!image) {
		image = this.options.social[type].homePage.image
	}

	return image
}

const getAuthorImage = () => {
	const authorId = getPostEditedAuthor()
	const authorData = Vue.prototype.$aioseo.user.siteAuthors.find(user => authorId === user.id)

	if (authorData && authorData.gravatar) {
		const url = new URL(authorData.gravatar)
		// We need to add .jpg extension to the end of URL on Gravatar.
		return `${url.origin + url.pathname}.jpg${url.search}`
	}

	return ''
}

export const ImagePreview = {
	data () {
		return {
			imageUrl : '',
			loading  : false
		}
	},
	async mounted () {
		await this.setImageUrl()
	},
	methods : {
		async setImageUrl (socialNetwork = '') {
			const currentPost = this.currentPost
			const tab         = socialNetwork || this.metaBoxTabs?.social || 'facebook'
			const prefix      = 'facebook' === tab || ('twitter' === tab && currentPost.twitter_use_og) ? 'og_' : 'twitter_'

			let imageSource = currentPost[`${prefix}image_type`] || 'default'
			if ('default' === imageSource) {
				imageSource = this.options.social[tab].general.defaultImageSourcePosts
			}

			this.imageUrl = ''

			switch (imageSource) {
				case 'featured':
					this.loading = true
					await getPostEditedFeaturedImage().then(url => {
						this.imageUrl = url
						this.loading = false
					})
					break

				case 'attach':
					this.loading = true
					await store.dispatch('getFirstAttachedImage', { postId: currentPost.id }).then((url) => {
						this.imageUrl = url
						this.loading = false
					})
					break

				case 'content':
					this.imageUrl = getFirstImageInContent()
					break

				case 'author':
					this.imageUrl = getAuthorImage()
					break

				case 'auto':
					this.loading = true
					await getFirstAvailableImage(currentPost, tab, prefix).then(url => {
						this.imageUrl = url
						this.loading = false
					})
					break

				case 'custom':
					this.imageUrl = customFieldImage(currentPost[`${prefix}image_custom_fields`])
					break

				case 'custom_image':
					this.imageUrl = currentPost[`${prefix}image_custom_url`]
					break

				case 'default':
				default:
					this.imageUrl = this.options.social[tab].general.defaultImagePosts
					break
			}

			if (!this.imageUrl && this.$aioseo.urls.siteLogo) {
				this.imageUrl = this.$aioseo.urls.siteLogo
			}

			this.$bus.$emit('updateSocialImagePreview', { social: tab, image: this.imageUrl })
		}
	}
}

export const Uploader = {
	data () {
		return {
			customUploader : {}
		}
	},
	methods : {
		openUploadModal (uploader, setter) {
			const callback = () => {
				const attachment = this.customUploader[uploader].state().get('selection').first().toJSON()
				setter(attachment.url)
			}

			// If the uploader object has already been created, reopen the dialog
			if (this.customUploader[uploader]) {
				this.customUploader[uploader].open()
				return
			}

			// Extend the wp.media object
			this.customUploader[uploader] = window.wp.media({
				title  : this.$t.__('Choose Image', this.$td),
				button : {
					text : this.$t.__('Choose Image', this.$td)
				},
				multiple : false
			})

			// When a file is selected, grab the URL and set it as the text field's value
			this.customUploader[uploader].on('select', callback)

			// Open the uploader dialog
			this.customUploader[uploader].open()
		}
	}
}