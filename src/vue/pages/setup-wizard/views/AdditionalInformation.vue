<template>
	<div class="aioseo-wizard-additional-information">
		<wizard-header />
		<wizard-container>

			<wizard-body>
				<wizard-steps />

				<div class="header">
					{{ strings.additionalSiteInformation }}
				</div>

				<div class="person-or-organization aioseo-settings-row no-border no-margin">
					<div class="settings-name">
						<div class="name small-margin">{{ strings.personOrOrganization }}</div>
					</div>
					<base-radio-toggle
						v-model="additionalInformation.siteRepresents"
						name="siteRepresents"
						:options="[
							{ label: strings.person, value: 'person' },
							{ label: strings.organization, value: 'organization' }
						]"
					/>

					<div class="aioseo-description">
						{{ strings.personOrOrganizationDescription }}
					</div>
				</div>

				<div
					v-if="'person' === additionalInformation.siteRepresents"
					class="aioseo-settings-row no-border no-margin"
				>
					<div class="settings-name">
						<div class="name small-margin">{{ strings.choosePerson }}</div>
					</div>
					<base-select
						class="person-chooser"
						:options="users"
						:value="getPersonOptions(additionalInformation.person)"
						@input="value => additionalInformation.person = value.value"
					>
						<template #singleLabel="{ option }">
							<div class="person-label">
								<div
									v-if="option.gravatar"
									class="person-avatar"
								>
									<img :src="option.gravatar" />
								</div>
								<div class="person-name">
									{{ option.label }}
								</div>
							</div>
						</template>
						<template #option="{ option }">
							<div class="person-label">
								<div
									v-if="option.gravatar"
									class="person-avatar"
								>
									<img :src="option.gravatar" />
								</div>
								<div class="person-name">
									{{ option.label }}
								</div>
							</div>
						</template>
					</base-select>
				</div>

				<div
					v-if="'organization' === additionalInformation.siteRepresents"
					class="schema-graph-name aioseo-settings-row no-border no-margin"
				>
					<div class="settings-name">
						<div class="name small-margin">{{ strings.organizationName }}</div>
					</div>
					<base-input
						size="medium"
						v-model="additionalInformation.organizationName"
					/>
				</div>

				<div
					v-if="'organization' !== additionalInformation.siteRepresents && 'manual' === additionalInformation.person"
					class="schema-graph-name aioseo-settings-row no-border no-margin"
				>
					<div class="settings-name">
						<div class="name small-margin">{{ strings.name }}</div>
					</div>
					<base-input
						size="medium"
						v-model="additionalInformation.personName"
					/>
				</div>

				<div
					v-if="'organization' === additionalInformation.siteRepresents"
					class="schema-graph-phone aioseo-settings-row no-border no-margin"
				>
					<div class="settings-name">
						<div class="name small-margin">{{ strings.phone }}</div>
					</div>
					<base-phone
						v-model="additionalInformation.phone"
					/>
				</div>

				<div
					v-if="'organization' === additionalInformation.siteRepresents"
					class="schema-graph-contact-type aioseo-settings-row no-border no-margin"
				>
					<div class="settings-name">
						<div class="name small-margin">{{ strings.contactType }}</div>
					</div>
					<base-select
						size="medium"
						:options="$constants.CONTACT_TYPES"
						:placeholder="strings.chooseContactType"
						:value="getContactTypeOptions(additionalInformation.contactType)"
						@input="value => additionalInformation.contactType = value.value"
					/>
					<div class="aioseo-description">
						{{ strings.contactTypeDescription }}
					</div>
				</div>

				<div
					v-if="'organization' === additionalInformation.siteRepresents && 'manual' === additionalInformation.contactType"
					class="schema-graph-contact-type-manual aioseo-settings-row no-border no-margin"
				>
					<div class="settings-name">
						<div class="name small-margin">{{ strings.contactType }}</div>
					</div>
					<base-input
						size="medium"
						v-model="additionalInformation.contactTypeManual"
					/>
				</div>

				<div
					v-if="'organization' === additionalInformation.siteRepresents"
					class="schema-graph-image aioseo-settings-row no-border no-margin"
				>
					<div class="settings-name">
						<div class="name small-margin">{{ strings.logo }}</div>
					</div>
					<div class="image-upload">
						<base-input
							size="medium"
							v-model="additionalInformation.organizationLogo"
							:placeholder="strings.pasteYourImageUrl"
						/>
						<base-button
							class="insert-image"
							@click="openUploadModal('organizationLogo', ['additionalInformation', 'organizationLogo'])"
							size="medium"
							type="black"
						>
							<svg-circle-plus />
							{{ strings.uploadOrSelectImage }}
						</base-button>

						<base-button
							class="remove-image"
							@click="additionalInformation.organizationLogo = null"
							size="medium"
							type="gray"
						>
							{{ strings.remove }}
						</base-button>
					</div>

					<div class="aioseo-description">
						{{ strings.minimumSize }}
					</div>

					<base-img :src="additionalInformation.organizationLogo" />
				</div>

				<div
					v-if="'organization' !== additionalInformation.siteRepresents && 'manual' === additionalInformation.person"
					class="schema-graph-image aioseo-settings-row no-border no-margin"
				>
					<div class="settings-name">
						<div class="name small-margin">{{ strings.logo }}</div>
					</div>
					<div class="image-upload">
						<base-input
							size="medium"
							v-model="additionalInformation.personLogo"
							:placeholder="strings.pasteYourImageUrl"
						/>
						<base-button
							class="insert-image"
							@click="openUploadModal('personLogo', ['additionalInformation', 'personLogo'])"
							size="medium"
							type="black"
						>
							<svg-circle-plus />
							{{ strings.uploadOrSelectImage }}
						</base-button>

						<base-button
							class="remove-image"
							@click="additionalInformation.personLogo = null"
							size="medium"
							type="gray"
						>
							{{ strings.remove }}
						</base-button>
					</div>

					<div class="aioseo-description">
						{{ strings.minimumSize }}
					</div>

					<base-img :src="additionalInformation.personLogo" />
				</div>

				<div
					class="schema-graph-image aioseo-settings-row"
				>
					<div class="settings-name">
						<div class="name small-margin">{{ strings.defaultSocialShareImage }}</div>
					</div>
					<div class="image-upload">
						<base-input
							size="medium"
							v-model="additionalInformation.socialShareImage"
							:placeholder="strings.pasteYourImageUrl"
						/>
						<base-button
							class="insert-image"
							@click="openUploadModal('socialShareImage', ['additionalInformation', 'socialShareImage'])"
							size="medium"
							type="black"
						>
							<svg-circle-plus />
							{{ strings.uploadOrSelectImage }}
						</base-button>

						<base-button
							class="remove-image"
							@click="additionalInformation.socialShareImage = null"
							size="medium"
							type="gray"
						>
							{{ strings.remove }}
						</base-button>
					</div>

					<div class="aioseo-description">
						{{ strings.minimumSize }}
					</div>

					<base-img :src="additionalInformation.socialShareImage" />
				</div>

				<div class="header social">
					{{ strings.yourSocialProfiles }}
				</div>

				<div v-if="loaded" class="social-profiles">
					<core-social-profiles
						:options="additionalInformation"
						leftSize="4"
						rightSize="8"
						sameUsernameWidth="4"
					/>
				</div>

				<template #footer>
					<div class="go-back">
						<router-link :to="getPrevLink" class="no-underline">&larr;</router-link>
						&nbsp;
						<router-link :to="getPrevLink">{{ strings.goBack }}</router-link>
					</div>
					<div class="spacer"></div>
					<base-button
						type="blue"
						:loading="loading"
						@click="saveAndContinue"
					>{{ strings.saveAndContinue }} &rarr;</base-button>
				</template>
			</wizard-body>

			<wizard-close-and-exit />
		</wizard-container>
	</div>
</template>

<script>
import { MaxCounts, Uploader, Wizard } from '@/vue/mixins'
import { mapActions, mapState } from 'vuex'
export default {
	mixins : [ MaxCounts, Uploader, Wizard ],
	data () {
		return {
			loaded  : false,
			loading : false,
			stage   : 'additional-information',
			strings : {
				additionalSiteInformation       : this.$t.__('Additional Site Information', this.$td),
				personOrOrganization            : this.$t.__('Person or Organization', this.$td),
				choosePerson                    : this.$t.__('Choose a Person', this.$td),
				person                          : this.$t.__('Person', this.$td),
				organization                    : this.$t.__('Organization', this.$td),
				personOrOrganizationDescription : this.$t.__('Choose whether the site represents a person or an organization.', this.$td),
				name                            : this.$t.__('Name', this.$td),
				organizationName                : this.$t.__('Organization Name', this.$td),
				phone                           : this.$t.__('Phone Number', this.$td),
				chooseContactType               : this.$t.__('Choose a Contact Type', this.$td),
				contactType                     : this.$t.__('Contact Type', this.$td),
				contactTypeDescription          : this.$t.__('Select which team or department the phone number belongs to.', this.$td),
				logo                            : this.$t.__('Logo', this.$td),
				uploadOrSelectImage             : this.$t.__('Upload or Select Image', this.$td),
				pasteYourImageUrl               : this.$t.__('Paste your image URL or select a new image', this.$td),
				minimumSize                     : this.$t.__('Minimum size: 112px x 112px, The image must be in JPG, PNG, GIF, SVG, or WEBP format.', this.$td),
				remove                          : this.$t.__('Remove', this.$td),
				defaultSocialShareImage         : this.$t.__('Default Social Share Image', this.$td),
				yourSocialProfiles              : this.$t.__('Your Social Profiles', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'options' ]),
		...mapState('wizard', [ 'additionalInformation' ]),
		users () {
			return [ {
				label : this.$t.__('Manually Enter Person', this.$td),
				value : 'manual'
			} ].concat(this.$aioseo.users.map(u => ({
				label    : `${u.displayName} (${u.email})`,
				gravatar : u.gravatar,
				value    : u.id
			})))
		}
	},
	methods : {
		...mapActions('wizard', [ 'saveWizard' ]),
		getPersonOptions (option) {
			return this.users.find(u => parseInt(u.value) === parseInt(option))
		},
		getContactTypeOptions (option) {
			return this.$constants.CONTACT_TYPES.find(t => t.value === option)
		},
		saveAndContinue () {
			this.loading = true
			this.saveWizard('additionalInformation')
				.then(() => {
					this.$router.push(this.getNextLink)
				})
		}
	},
	mounted () {
		const searchAppearance = JSON.parse(JSON.stringify(this.options.searchAppearance))
		const social           = JSON.parse(JSON.stringify(this.options.social))
		this.additionalInformation.social.profiles   = JSON.parse(JSON.stringify(social.profiles))
		this.additionalInformation.socialShareImage  = social.facebook.general.defaultImagePosts
		this.additionalInformation.siteRepresents    = searchAppearance.global.schema.siteRepresents
		this.additionalInformation.person            = searchAppearance.global.schema.person
		this.additionalInformation.organizationName  = searchAppearance.global.schema.organizationName
		this.additionalInformation.organizationLogo  = searchAppearance.global.schema.organizationLogo
		this.additionalInformation.personName        = searchAppearance.global.schema.personName
		this.additionalInformation.personLogo        = searchAppearance.global.schema.personLogo
		this.additionalInformation.phone             = searchAppearance.global.schema.phone
		this.additionalInformation.contactType       = searchAppearance.global.schema.contactType
		this.additionalInformation.contactTypeManual = searchAppearance.global.schema.contactTypeManual
		this.loaded = true
	}
}
</script>

<style lang="scss">
.aioseo-wizard-additional-information {
	.header {
		font-size: 24px;
		color: $black;
		font-weight: 600;

		&.social {
			margin: 32px 0;
		}
	}

	.description {
		margin-top: 20px;
		font-size: 16px;
		color: $black2;
		margin-bottom: 40px;
	}

	.person-or-organization {
		margin-top: 30px;
		margin-bottom: 16px;
	}

	.schema-graph-phone {
		margin-bottom: 16px;
	}

	.schema-graph-name,
	.schema-graph-contact-type-manual {
		margin-bottom: 16px;

		.aioseo-input {
			max-width: 600px;
		}
	}
	.schema-graph-contact-type {
		margin-bottom: 16px;

		.aioseo-select {
			max-width: 300px;
		}
	}

	.schema-graph-image {
		margin-bottom: 16px;

		.image-upload {
			display: flex;

			.aioseo-input {
				max-width: 445px;
				margin-right: 10px;
			}

			.insert-image {
				min-width: 214px;
				margin-right: 10px;

				svg.aioseo-circle-plus {
					width: 13px;
					height: 13px;
					margin-right: 10px;
				}
			}
		}

		img {
			margin-top: 20px;
			width: auto;
			max-width: 525px;
			max-height: 525px;
			height: auto;
		}
	}

	.person-chooser {
		max-width: 600px;

		.person-label {
			display: flex;
			align-items: center;

			.person-avatar {
				margin-right: 16px;
				height: 30px;

				img {
					height: 30px;
					width: 30px;
					border-radius: 50%;
				}
			}
		}
	}

	.go-back {
		a {
			color: $black2;
			font-size: 14px;
		}
	}
}
</style>