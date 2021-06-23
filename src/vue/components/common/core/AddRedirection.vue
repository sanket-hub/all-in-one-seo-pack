<template>
	<div
		class="aioseo-add-redirection"
		:class="{
			'edit-url' : edit,
			'log-404'  : log404
		}"
	>
		<core-alert
			class="generic-error"
			v-if="genericError"
			type="red"
		>
			{{ strings.genericErrorMessage }}
		</core-alert>
		<div class="urls">
			<div class="source">
				<div class="aioseo-settings-row no-border no-margin small-padding">
					<div class="settings-name">
						<div class="name small-margin">
							{{ sourceUrl }}:
						</div>
					</div>

					<core-add-redirection-url
						v-for="(url, index) in sourceUrls"
						:key="index"
						:url="url"
						:allow-delete="1 < sourceUrls.length"
						@remove-url="removeUrl(index)"
						:target-url="targetUrl"
						:log404="log404"
					>
						<template
							#source-url-description
							v-if="edit"
						>
							<div
								class="aioseo-description source-description"
								v-html="strings.sourceUrlDescription"
							/>
						</template>
					</core-add-redirection-url>

					<base-button
						v-if="!edit && !log404"
						size="small"
						type="gray"
						@click="addUrl"
					>
						{{ strings.addUrl }}
					</base-button>
				</div>
			</div>
			<div class="url-arrow" v-if="redirectTypeHasTarget()">
				<svg-right-arrow />
			</div>
			<div class="target" v-if="redirectTypeHasTarget()">
				<div class="aioseo-settings-row no-border no-margin small-padding">
					<div class="settings-name">
						<div class="name small-margin">
							{{ strings.targetUrl }}:
						</div>
					</div>

					<div class="url">
						<core-add-redirection-target-url
							:url="targetUrl"
							:errors="targetUrlErrors"
							:warnings="targetUrlWarnings"
							@input="updateTargetUrl"
						/>

						<div class="aioseo-description">
							{{ strings.targetUrlDescription }}
						</div>

						<transition-slide
							:active="!!targetUrlErrors.length"
						>
							<div>
								<core-alert
									v-for="(error, index) in targetUrlErrors"
									:key="index"
									class="target-url-error"
									type="red"
									size="small"
									v-html="error"
								/>
							</div>
						</transition-slide>

						<transition-slide
							:active="!!targetUrlWarnings.length"
						>
							<div>
								<core-alert
									v-for="(warning, index) in targetUrlWarnings"
									:key="index"
									class="target-url-warning"
									type="yellow"
									size="small"
									v-html="warning"
								/>
							</div>
						</transition-slide>
					</div>
				</div>
			</div>

			<template
				v-if="!edit && !log404"
			>
				<div class="break" />

				<div class="source">
					<div
						class="aioseo-description source-description"
						v-html="strings.sourceUrlDescription"
					/>
				</div>
				<div class="url-arrow" />
				<div class="target" />
			</template>
		</div>

		<div class="settings">
			<div class="all-settings">
				<div class="all-settings-content">
					<div class="redirect-type">
						{{ strings.redirectType }}
						<base-select
							:options="$constants.REDIRECT_TYPES"
							v-model="redirectType"
							size="medium"
						/>
					</div>

					<transition-slide
						class="advanced-settings"
						:active="showAdvancedSettings && !log404"
					>
						<div class="query-params">
							{{ strings.queryParams }}
							<base-select
								:options="$constants.REDIRECT_QUERY_PARAMS"
								v-model="queryParam"
								size="medium"
							/>
						</div>
					</transition-slide>

					<a
						v-if="!showAdvancedSettings && !log404"
						class="advanced-settings-link"
						href="#"
						@click.prevent="showAdvancedSettings = !showAdvancedSettings"
					>{{ strings.advancedSettings }}</a>
				</div>
				<transition-slide
					class="advanced-settings"
					:active="showAdvancedSettings && !log404"
				>
					<add-redirection-custom-rules :edit-custom-rules="customRules" />
				</transition-slide>
			</div>
			<div
				class="actions"
				:class="{ advanced : showAdvancedSettings }"
			>
				<base-button
					size="medium"
					type="blue"
					@click="edit ? saveChanges() : addRedirects()"
					:loading="addingRedirect"
					:disabled="saveIsDisabled"
				>
					{{ edit ? strings.saveChanges : addRedirect }}
				</base-button>

				<base-button
					v-if="edit"
					size="medium"
					type="gray"
					@click="$emit('cancel', true)"
					class="cancel-edit-row"
				>
					{{ strings.cancel }}
				</base-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { debounce } from '@/vue/utils/debounce'
import AddRedirectionCustomRules from './AddRedirectionCustomRules'
export default {
	components : { AddRedirectionCustomRules },
	props      : {
		edit   : Boolean,
		log404 : Boolean,
		url    : Object,
		urls   : Array,
		target : String,
		type   : Number,
		query  : String,
		slash  : Boolean,
		case   : Boolean,
		rules  : {
			type : Array,
			default () {
				return []
			}
		}
	},
	data () {
		return {
			genericError         : false,
			showAdvancedSettings : false,
			addingRedirect       : false,
			targetUrl            : null,
			targetUrlErrors      : [],
			targetUrlWarnings    : [],
			sourceUrls           : [],
			redirectType         : null,
			queryParam           : null,
			customRules          : [],
			strings              : {
				redirectType         : this.$t.__('Redirect Type:', this.$td),
				targetUrl            : this.$t.__('Target URL', this.$td),
				targetUrlDescription : this.$t.__('Enter a URL or start by typing a page or post title, slug or ID.', this.$td),
				addUrl               : this.$t.__('Add URL', this.$td),
				// Translators: 1 - Oening link tag, 2 - Closing link tag.
				sourceUrlDescription : this.$t.sprintf(this.$t.__('Enter a relative URL to redirect from or start by typing in page or post title, slug or ID. You can also use regex (%1$s)', this.$td), this.$links.getDocLink(this.$t.__('what\'s this?', this.$td), 'redirectManagerRegex')),
				advancedSettings     : this.$t.__('Advanced Settings', this.$td),
				queryParams          : this.$t.__('Query Parameters:', this.$td),
				saveChanges          : this.$t.__('Save Changes', this.$td),
				cancel               : this.$t.__('Cancel', this.$td),
				genericErrorMessage  : this.$t.__('An error occurred while adding your redirects. Please try again later.', this.$td)
			}
		}
	},
	watch : {
		sourceUrls : {
			deep : true,
			handler () {
				debounce(() => this.checkForDuplicates(), 500)
			}
		}
	},
	computed : {
		saveIsDisabled () {
			const sourceUrls = this.sourceUrls.map(url => url.url)
			return !sourceUrls.every(a => a) || (this.redirectTypeHasTarget() && !this.targetUrl)
		},
		getRelativeAbsolute () {
			const matched = this.targetUrl.match(/^\/([a-zA-Z0-9_\-%]*\..*)\//)

			if (matched) {
				return matched[0]
			}

			return null
		},
		sourceUrl () {
			return 1 < this.sourceUrls.length ? this.$t.__('Source URL\'s', this.$td) : this.$t.__('Source URL', this.$td)
		},
		addRedirect () {
			return 1 < this.sourceUrls.length ? this.$t.__('Add Redirects', this.$td) : this.$t.__('Add Redirect', this.$td)
		},
		hasTargetUrlErrors () {
			if (!this.targetUrl) {
				return []
			}

			const errors = []
			if (
				this.targetUrl &&
				!this.beginsWith(this.targetUrl, 'https://') &&
				!this.beginsWith(this.targetUrl, 'http://') &&
				'/' !== this.targetUrl.substr(0, 1)
			) {
				// Translators: 1 - Adds a html tag with an option like: <code>^</code>, 2 - Adds a html tag with an option like: <code>^</code>.
				errors.push(this.$t.sprintf(this.$t.__('Your target URL should be an absolute URL like %1$s or start with a slash.', this.$td), '<code>https://domain.com/' + this.targetUrl + '</code>', '<code>/' + this.targetUrl + '</code>'))
			}

			const matches = this.targetUrl.match(/[|\\$]/g)
			if (null !== matches) {
				// Let's make sure that all URL's have regex enabled or else we fail.
				const regex = this.sourceUrls.map(u => u.regex)
				if (!regex.every(a => a)) {
					// Translators: 1 - Adds a html tag with an option like: <code>^</code>.
					errors.push(this.$t.sprintf(this.$t.__('Your target URL contains the invalid character(s) %1$s', this.$td), '<code>' + matches + '</code>'))
				}
			}

			return errors
		},
		hasTargetUrlWarnings () {
			if (!this.targetUrl) {
				return []
			}

			const warnings = []
			if (this.getRelativeAbsolute) {
				warnings.push(this.$t.sprintf(this.$t.__('Your URL appears to contain a domain inside the path: %1$s. Did you mean to use %2$s instead?', this.$td), '<code>' + this.getRelativeAbsolute + '</code>', '<code>https:/' + this.getRelativeAbsolute + '</code>'))
			}

			return warnings
		},
		getDefaultSourceUrls () {
			return [ JSON.parse(JSON.stringify(this.getDefaultSourceUrl)) ]
		},
		getDefaultSourceUrl () {
			return {
				id          : null,
				url         : null,
				regex       : false,
				ignoreSlash : this.slash || false,
				ignoreCase  : this.case || false,
				errors      : [],
				warnings    : []
			}
		}
	},
	methods : {
		...mapActions('redirects', [ 'create', 'update' ]),
		beginsWith (str, match) {
			return 0 === match.indexOf(str) || str.substr(0, match.length) === match
		},
		addUrl () {
			this.sourceUrls.push(JSON.parse(JSON.stringify(this.getDefaultSourceUrl)))
		},
		removeUrl (index) {
			this.$delete(this.sourceUrls, index)
		},
		addRedirects () {
			this.genericError   = false
			this.addingRedirect = true

			this.sourceUrls.map(url => {
				if ('http' !== url.url.substr(0, 4) && '/' !== url.url.substr(0, 1) && 0 < url.url.length && !url.regex) {
					url.url = '/' + url.url
				}

				return url
			})

			this.create({
				sourceUrls            : this.sourceUrls,
				targetUrl             : this.targetUrl,
				queryParam            : this.queryParam.value,
				customRules           : this.customRules,
				redirectType          : this.redirectType.value,
				redirectTypeHasTarget : this.redirectTypeHasTarget(),
				group                 : this.log404 ? '404' : 'manual'
			})
				.then(() => {
					this.$emit('added-redirect')
					this.reset()
				})
				.catch(error => {
					this.handleGenericError(error)
				})
		},
		saveChanges () {
			this.genericError   = false
			this.addingRedirect = true

			if ('http' !== this.sourceUrls[0].url.substr(0, 4) && '/' !== this.sourceUrls[0].url.substr(0, 1) && 0 < this.sourceUrls[0].url.length && !this.sourceUrls[0].regex) {
				this.sourceUrls[0].url = '/' + this.sourceUrls[0].url
			}

			this.update({
				id      : this.sourceUrls[0].id,
				payload : {
					sourceUrls            : this.sourceUrls,
					targetUrl             : this.targetUrl,
					queryParam            : this.queryParam.value,
					customRules           : this.customRules,
					redirectType          : this.redirectType.value,
					redirectTypeHasTarget : this.redirectTypeHasTarget()
				}
			})
				.then(() => {
					this.reset()
				})
				.catch(error => {
					console.error(error)
					this.handleGenericError(error)
				})
		},
		handleGenericError (error) {
			if (409 !== error.response.status || !error.response.body.failed || !error.response.body.failed.length) {
				this.genericError   = true
				this.addingRedirect = false
				return
			}

			const urlIndexes = []
			const failed     = error.response.body.failed
			failed.forEach(f => {
				const urlIndex = this.sourceUrls.findIndex(u => u.url === f)
				if (-1 !== urlIndex) {
					this.sourceUrls[urlIndex].errors.push(this.$t.__('A redirect already exists for this source URL. To make changes, edit the original instead.', this.$td))
					urlIndexes.push(urlIndex)
				}
			})

			for (let i = this.sourceUrls.length - 1; 0 <= i; i--) {
				if (urlIndexes.includes(i)) {
					continue
				}

				this.$delete(this.sourceUrls, i)
			}

			this.addingRedirect = false
		},
		updateTargetUrl (value) {
			this.targetUrl         = value
			this.targetUrlErrors   = this.hasTargetUrlErrors
			this.targetUrlWarnings = this.hasTargetUrlWarnings
		},
		reset () {
			this.showAdvancedSettings = false
			this.addingRedirect       = false

			// Don't reset an edited URL.
			if (this.edit) {
				return
			}

			const redirectType = this.$constants.REDIRECT_TYPES.find(t => t.value === this.type)
			const queryParam   = this.$constants.REDIRECT_QUERY_PARAMS.find(t => t.value === this.query)

			this.sourceUrls        = [ JSON.parse(JSON.stringify(this.getDefaultSourceUrl)) ]
			this.targetUrl         = null
			this.targetUrlErrors   = []
			this.targetUrlWarnings = []
			this.redirectType      = redirectType || { label: '301 ' + this.$t.__('Moved Permanently', this.$td), value: 301 }
			this.queryParam        = queryParam || { label: this.$t.__('Ignore all parameters', this.$td), value: 'ignore' }
			this.customRules       = []
		},
		checkForDuplicates () {
			const urls = []
			this.sourceUrls.forEach((u, i) => {
				// Prevent endless loop with the error message.
				if (!u.url || u.errors.length) {
					return
				}

				if (
					urls.includes(u.url.replace(/\/$/, ''))
				) {
					this.sourceUrls[i].errors.push(this.$t.__('This is a duplicate of a URL you are already adding. You can only add unique source URL\'s.', this.$td))
					return
				}

				urls.push(u.url.replace(/\/$/, ''))
			})

			this.updateTargetUrl(this.targetUrl)
		},
		redirectTypeHasTarget () {
			return this.redirectType && ('undefined' === typeof this.redirectType.noTarget || !this.redirectType.noTarget)
		}
	},
	mounted () {
		this.sourceUrls = this.getDefaultSourceUrls
		if (this.url) {
			this.sourceUrls = [ this.url ]
		}

		if (this.urls && this.urls.length) {
			this.sourceUrls = this.urls
		}

		if (this.target) {
			this.targetUrl = this.target
		}

		if (this.rules) {
			this.customRules = this.rules
		}

		if (null !== this.type) {
			const redirectType = this.$constants.REDIRECT_TYPES.find(t => t.value === this.type)
			if (redirectType) {
				this.redirectType = redirectType
			}
		}

		if (this.query) {
			const queryParam = this.$constants.REDIRECT_QUERY_PARAMS.find(t => t.value === this.query)
			if (queryParam) {
				this.queryParam = queryParam
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-add-redirection {
	&.edit-url {
		margin-bottom: 30px;

		.urls {
			align-items: flex-start;

			.url-arrow {
				margin: -8px 30px 0;
			}
		}

		.advanced-settings-link {
			text-decoration: underline;
			margin-top: 21px;
		}
	}

	&.log-404 {
		.urls {
			.source {
				min-height: 103px;
				align-items: flex-start;
			}
		}
	}

	.generic-error {
		margin-bottom: 20px;
	}

	.aioseo-settings-row {
		.settings-name {
			.name {
				font-size: 14px;
			}
		}
	}

	.urls {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;

		.break {
			flex-basis: 100%;
			height: 0;
		}

		.url-arrow {
			width: 36px;
			margin: -15px 30px 0;
			display: flex;
			align-items: center;
			justify-content: center;

			svg {
				height: 103px;
				color: $blue;
			}
		}

		.source,
		.target {
			flex: 1;
			display: flex;
			align-items: center;

			> * {
				flex: 1;
			}

			.aioseo-input {
				margin-bottom: 10px;
			}
		}

		.target {
			.aioseo-description {
				height: 30px;
			}
		}

		.target {
			.append-icon {
				width: 60px;
				justify-content: flex-end;

				svg {
					max-width: 16px;
					margin-right: 5px;

					&:last-of-type {
						margin-right: 0;
					}

					&.aioseo-circle-check {
						color: $green;
					}

					&.aioseo-circle-close {
						color: $red;
					}
				}
			}

			.target-url-warning,
			.target-url-error {
				margin-bottom: 10px;
			}
		}
	}

	.settings {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30px;

		.all-settings {
			width: 100%;
			.all-settings-content {
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.advanced-settings-link {
					margin: 16px 0 0 16px;
					color: $placeholder-color;
				}

				@media (max-width: 767px) {
					align-items: start;
				}
			}
		}

		> .actions {
			align-self: flex-end;
			margin-top: -50px;

			&.advanced {
				margin-top: -40px;
			}
		}

		.redirect-type,
		.query-params {
			margin-bottom: 10px;
			flex: 0 1 auto;
			.aioseo-select {
				margin-top: 5px;
			}
		}

		.query-params {
			width: 340px;
		}

		.redirect-type{
			width: 300px;
			margin-right: 24px;
		}

		.aioseo-button {
			align-self: flex-end;
		}

		.cancel-edit-row {
			margin-left: 10px;
		}
	}
}
</style>