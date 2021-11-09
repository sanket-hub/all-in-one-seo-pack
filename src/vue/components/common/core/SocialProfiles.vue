<template>
	<div class="aioseo-social-profiles">
		<div class="same-username">
			<div class="use-same">
				<base-checkbox
					size="medium"
					v-model="options.social.profiles.sameUsername.enable"
				>
					<span>{{ strings.useSameUsername }}</span>
				</base-checkbox>

				<core-settings-row
					:name="strings.yourUsername"
					v-if="options.social.profiles.sameUsername.enable"
					align
				>
					<template #content>
						<base-input
							size="medium"
							v-model="options.social.profiles.sameUsername.username"
						/>

						<grid-row
							class="profiles"
						>
							<grid-column
								v-for="(profile, index) in profiles"
								:key="index"
								:md="sameUsernameWidth"
								sm="6"
								:class="profile.value"
							>
								<base-checkbox
									size="medium"
									:value="getValue(profile)"
									@input="checked => updateValue(checked, profile)"
								>
									{{ profile.name }}
								</base-checkbox>
							</grid-column>
						</grid-row>
					</template>
				</core-settings-row>
			</div>
		</div>

		<div class="aioseo-social-profile-list">
			<core-settings-row
				class="social-profile"
				v-for="(profile, index) in profiles"
				:key="index"
				align
				:leftSize="leftSize"
				:rightSize="rightSize"
				:class="profile.value"
			>
				<template #name>
					<component
						class="logo-svg"
						:is="profile.svg"
					/> {{ profile.label }}
				</template>

				<template #content>
					<base-input
						v-if="!options.social.profiles.sameUsername.enable || !options.social.profiles.sameUsername.included.includes(profile.value)"
						size="medium"
						:value="options.social.profiles.urls[profile.value]"
						@blur="validateUrl($event, profile)"
					/>
					<core-alert
						class="profile-error"
						v-if="profile.error && (!options.social.profiles.sameUsername.enable || !options.social.profiles.sameUsername.included.includes(profile.value))"
						type="red"
					>
						<strong>{{ profile.error }}</strong>
					</core-alert>
					<base-input
						v-if="options.social.profiles.sameUsername.enable && options.social.profiles.sameUsername.included.includes(profile.value)"
						size="medium"
						disabled
						:value="getUrl(profile)"
					/>
				</template>
			</core-settings-row>
		</div>
	</div>
</template>

<script>
export default {
	props : {
		options : {
			type     : Object,
			required : true
		},
		leftSize : {
			type : String,
			default () {
				return '3'
			}
		},
		rightSize : {
			type : String,
			default () {
				return '9'
			}
		},
		sameUsernameWidth : {
			type : String,
			default () {
				return '3'
			}
		}
	},
	data () {
		return {
			profiles : [
				{
					value      : 'facebookPageUrl',
					name       : 'Facebook',
					label      : 'Facebook Page URL',
					url        : 'https://facebook.com',
					svg        : 'svg-icon-facebook',
					validation : [
						v => /^https:\/\/(?:www\.)?(?:[a-zA-Z0-9]+.)?facebook\.[a-z.]+\/.*$/.test(v) || this.$t.__('Your Facebook URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'twitterUrl',
					name       : 'Twitter',
					label      : 'Twitter URL',
					url        : 'https://twitter.com',
					svg        : 'svg-icon-twitter',
					validation : [
						v => /^https:\/\/(?:www\.)?(?:[a-zA-Z0-9]+.)?twitter\.[a-z.]+\/.*$/.test(v) || this.$t.__('Your Twitter URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'instagramUrl',
					name       : 'Instagram',
					label      : 'Instagram URL',
					url        : 'https://instagram.com',
					svg        : 'svg-icon-instagram',
					validation : [
						v => /^https:\/\/(?:www\.)?(?:[a-zA-Z0-9]+.)?instagram\.[a-z.]+\/.*$/.test(v) || this.$t.__('Your Instagram URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'pinterestUrl',
					name       : 'Pinterest',
					label      : 'Pinterest URL',
					url        : 'https://pinterest.com',
					svg        : 'svg-icon-pinterest',
					validation : [
						v => /^https:\/\/(?:www\.)?(?:[a-zA-Z0-9]+.)?pinterest\.[a-z.]+\/.*$/.test(v) || this.$t.__('Your Pinterest URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'youtubeUrl',
					name       : 'YouTube',
					label      : 'YouTube URL',
					url        : 'https://youtube.com',
					svg        : 'svg-icon-youtube',
					validation : [
						v => /^https:\/\/(?:www\.)?(?:[a-zA-Z0-9]+.)?youtube\.[a-z.]+\/.*$/.test(v) || this.$t.__('Your YouTube URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'linkedinUrl',
					name       : 'LinkedIn',
					label      : 'LinkedIn URL',
					url        : 'https://linkedin.com/in',
					svg        : 'svg-icon-linkedin',
					validation : [
						v => /^https:\/\/(?:www\.)?(?:[a-zA-Z0-9]+.)?linkedin\.[a-z.]+\/(?:in|company|school|groups)\/.*$/.test(v) || this.$t.__('Your LinkedIn URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'tumblrUrl',
					name       : 'Tumblr',
					label      : 'Tumblr URL',
					url        : 'https://{profile}.tumblr.com',
					svg        : 'svg-icon-tumblr',
					validation : [
						v => /^https:\/\/([^/]+)\.tumblr\.[a-z.]+(?:.*)?$/.test(v) || this.$t.__('Your Tumblr URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'yelpPageUrl',
					name       : 'Yelp',
					label      : 'Yelp Page URL',
					url        : 'https://yelp.com/biz',
					svg        : 'svg-icon-yelp',
					validation : [
						v => /^https:\/\/(?:www\.)?yelp\.[a-z.]+\/biz\/.*$/.test(v) || this.$t.__('Your Yelp URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'soundCloudUrl',
					name       : 'SoundCloud',
					label      : 'SoundCloud URL',
					url        : 'https://soundcloud.com',
					svg        : 'svg-icon-sound-cloud',
					validation : [
						v => /^https:\/\/(?:www\.)?(?:[a-zA-Z0-9]+.)?soundcloud\.[a-z.]+\/.*$/.test(v) || this.$t.__('Your SoundCloud URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'wikipediaUrl',
					name       : 'Wikipedia',
					label      : 'Wikipedia URL',
					url        : 'https://en.wikipedia.org/wiki',
					svg        : 'svg-icon-wikipedia',
					validation : [
						v => /^https:\/\/([a-z-]+)\.wikipedia\.org\/wiki\/.*$/.test(v) || this.$t.__('Your Wikipedia URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				},
				{
					value      : 'myspaceUrl',
					name       : 'MySpace',
					label      : 'MySpace URL',
					url        : 'https://myspace.com',
					svg        : 'svg-icon-myspace',
					validation : [
						v => /^https:\/\/(?:www\.)?(?:[a-zA-Z0-9]+.)?myspace\.[a-z.]+\/.*$/.test(v) || this.$t.__('Your MySpace URL is invalid. Please check the format and try again.', this.$td)
					],
					error : ''
				}
			],
			pagePostOptions : [],
			strings         : {
				useSameUsername : this.$t.__('Use the same username for multiple social networks', this.$td),
				yourUsername    : this.$t.__('Your Username:', this.$td)
			}
		}
	},
	methods : {
		updateValue (checked, profile) {
			if (checked) {
				const included = this.options.social.profiles.sameUsername.included
				included.push(profile.value)
				this.$set(this.options.social.profiles.sameUsername, 'included', included)
				return
			}

			const index = this.options.social.profiles.sameUsername.included.findIndex(t => t === profile.value)
			if (-1 !== index) {
				this.$delete(this.options.social.profiles.sameUsername.included, index)
			}
		},
		getValue (profile) {
			return this.options.social.profiles.sameUsername.included.includes(profile.value)
		},
		getUrl (profile) {
			const username = this.options.social.profiles.sameUsername.username || ''
			if ('tumblrUrl' === profile.value) {
				return profile.url.replace('{profile}', username)
			}
			return profile.url + '/' + username
		},
		validateUrl (value, profile) {
			if (value.startsWith('http://')) {
				value = value.replace('http://', 'https://')
			}

			if (value && !value.startsWith('https://')) {
				value = `https://${value}`
			}

			this.options.social.profiles.urls[profile.value] = value

			profile.error = ''
			if (!profile.validation || !value) {
				return
			}

			const errors = []
			profile.validation.forEach(validator => {
				const result = validator(value)
				if (true !== result) {
					errors.push(result)
				}
			})

			if (errors.length) {
				profile.error = errors.join(', ')
			}
		}
	},
	mounted () {
		// Validate the profiles on load.
		this.profiles.forEach(profile => {
			const errors = []
			profile.validation.forEach(validator => {
				if (!this.options.social.profiles.urls[profile.value]) {
					return
				}

				const result = validator(this.options.social.profiles.urls[profile.value])
				if (true !== result) {
					errors.push(result)
				}
			})

			if (errors.length) {
				profile.error = errors.join(', ')
			}
		})
	}
}
</script>

<style lang="scss">
.aioseo-social-profiles {
	.same-username {
		.use-same {
			padding: 30px;
			background: $box-background;

			.aioseo-checkbox {
				font-size: 16px;
			}

			.aioseo-settings-row {
				margin-top: 20px;
			}

			.profiles {
				margin-top: 20px;
			}
		}
	}

	.aioseo-social-profile-list {
		margin-top: 20px;

		.social-profile {
			margin-bottom: 0;
			padding-bottom: 0;
			border-bottom: none;

			.logo-svg {
				margin-right: 10px;
			}

			.profile-error {
				margin-top: 10px;
			}

			.name {
				margin-bottom: 0;
			}
		}
	}
}
</style>