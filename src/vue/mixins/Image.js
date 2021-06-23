export const CanShowImage = {
	data () {
		return {
			images : {}
		}
	},
	methods : {
		async canShowImage (url) {
			if (!url) {
				return false
			}

			let canShow = false

			const image = new Image()
			image.onload = await (() => {
				canShow = true

				let ratio    = 0
				const width  = image.width
				const height = image.height

				if (width && height) {
					ratio = width / height
				}

				if (this.images[url]) {
					return
				}

				this.$set(this.images, url, {
					image,
					ratio,
					vertical : (1.5 > ratio || 2 < ratio) || 600 > width || 315 > height
				})
			})

			image.src = url

			return canShow
		}
	}
}

export const ImageSourceOptions = {
	data () {
		return {
			excludedTermOptions       : [ 'featured', 'attach', 'content', 'author', 'auto' ],
			excludedAttachmentOptions : [ 'featured', 'content', 'author' ]
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

export const Uploader = {
	data () {
		return {
			customUploader : {}
		}
	},
	methods : {
		openUploadModal (uploader, options) {
			const option   = this.$optionsFromArray(this, options)
			const callback = () => {
				const attachment = this.customUploader[uploader].state().get('selection').first().toJSON()
				this.$set(option.option, option.index, attachment.url)
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