<template>
	<div class="aioseo-tools-debug">
		<core-card
			slug="debug"
			:header-text="strings.debug"
		>
			<core-alert
				class="warning"
				type="yellow"
			>
				{{ strings.warning }}
			</core-alert>

			<core-settings-row
				class="first-row"
				:name="strings.general"
				align
			>
				<template #content>
					<div class="action-row">
						<base-button
							v-if="$aioseo.data.isDev"
							class="clear-cache"
							type="blue"
							size="medium"
							@click="clearCache"
							:loading="loading.clearingCache"
						>
							{{ strings.clearCache }}
						</base-button>

						<div class="aioseo-description">
							{{ strings.clearCacheDescription }}
						</div>
					</div>

					<div class="action-row">
						<base-button
							v-if="$aioseo.data.isDev"
							class="remove-duplicates"
							type="blue"
							size="medium"
							@click="removeDuplicates"
							:loading="loading.removeDuplicates"
						>
							{{ strings.removeDuplicates }}
						</base-button>

						<div
							class="aioseo-description"
							v-html="strings.removeDuplicatesDescription"
						/>
					</div>

					<div class="action-row">
						<base-button
							v-if="$aioseo.data.isDev"
							class="unescape-data"
							type="blue"
							size="medium"
							@click="unescapeData"
							:loading="loading.unescapeData"
						>
							{{ strings.unescapeData }}
						</base-button>

						<div
							class="aioseo-description"
							v-html="strings.unescapeDataDescription"
						/>
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				name="Sitemap"
				align
			>
				<template #content>
					<div class="action-row">
						<base-button
							v-if="$aioseo.data.isDev"
							class="clear-image-data"
							type="blue"
							size="medium"
							@click="clearImageData"
							:loading="loading.clearImageData"
						>
							{{ strings.clearImageData }}
						</base-button>

						<div
							class="aioseo-description"
							v-html="strings.clearImageDataDescription"
						/>
					</div>

					<div
						class="action-row"
						v-if="$isPro"
					>
						<base-button
							v-if="$aioseo.data.isDev"
							class="clear-video-data"
							type="blue"
							size="medium"
							@click="clearVideoData"
							:loading="loading.clearVideoData"
						>
							{{ strings.clearVideoData }}
						</base-button>

						<div
							class="aioseo-description"
							v-html="strings.clearVideoDataDescription"
						/>
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				name="Migration"
				align
			>
				<template #content>
					<base-button
						v-if="$aioseo.data.isDev"
						class="redo-v3-migration"
						type="blue"
						size="medium"
						@click="maybeRestartMigration"
						:loading="loading.restartMigration"
					>
						{{ strings.restartMigration }}
					</base-button>

					<div class="aioseo-description">
						{{ strings.restartMigrationDescriptionPart1 }}
					</div>
					<div
						class="aioseo-description"
						v-html="strings.restartMigrationDescriptionPart2"
					/>
				</template>
			</core-settings-row>

			<core-modal
				v-if="showAreYouSureModal"
				no-header
			>
				<template #body >
					<div class="aioseo-modal-body">
						<button
							class="close"
							@click.stop="showAreYouSureModal = false"
						>
							<svg-close @click="showDeleteModal = false" />
						</button>

						<h3>{{ strings.areYouSureTitle }}</h3>
						<div class="reset-description" v-html="strings.cannotBeUndone" />

						<base-button
							type="blue"
							size="medium"
							@click="restartMigration"
						>
							{{ strings.startMigration }}
						</base-button>

						<base-button
							type="gray"
							size="medium"
							@click="showAreYouSureModal = false"
						>
							{{ strings.noChangedMind }}
						</base-button>
					</div>
				</template>
			</core-modal>
		</core-card>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data () {
		const scheduledActionsLink = this.$t.sprintf('<a href="%1$s" target="_blank">Scheduled Actions</a>', this.$aioseo.urls.admin.scheduledActions)
		return {
			showAreYouSureModal : false,
			loading             : {
				clearingCache    : false,
				removeDuplicates : false,
				unescapeData     : false,
				clearImageData   : false,
				clearVideoData   : false,
				restartMigration : false
			},
			strings : {
				debug                       : 'Debug',
				warning                     : 'Before you run any of these actions, make sure that you have fully read the description and understand the consequences as these cannot be reverted.',
				general                     : 'General',
				clearCache                  : 'Clear Cache',
				clearCacheDescription       : 'This action deletes all cache records in the database.',
				removeDuplicates            : 'Remove Duplicates',
				removeDuplicatesDescription : 'This action will remove any duplicate records that are found in the <code>aioseo_posts</code> or <code>aioseo_terms</code> table.',
				unescapeData                : 'Unescape Data',
				unescapeDataDescription     : this.$t.sprintf(
					'This action will clean posts/terms whose data is corrupted via Action Scheduler. To speed up this process, go to %1$s and run the <code>aioseo_unslash_escaped_data_posts</code> or <code>aioseo_unslash_escaped_data_terms</code> action.',
					scheduledActionsLink
				),
				clearImageData            : 'Clear Image Data',
				clearImageDataDescription : this.$t.sprintf(
					'This action removes all image data from the database, forcing a site-wide rescan via Action Scheduler. To speed up the image scan, go to %1$s and run the <code>aioseo_video_sitemap_scan</code> action.',
					scheduledActionsLink
				),
				clearVideoData            : 'Clear Video Data',
				clearVideoDataDescription : this.$t.sprintf(
					'This action removes all video data from the database, forcing a site-wide rescan via Action Scheduler. To speed up the video scan, go to %1$s and run the <code>aioseo_video_sitemap_scan</code> action.',
					scheduledActionsLink
				),
				restartMigration                 : 'Restart v3 Migration',
				restartMigrationDescriptionPart1 : 'This action restarts the migration from v3 to v4. All settings are overidden immediately; the post/term meta will gradually be updated via Action Scheduler.',
				restartMigrationDescriptionPart2 : this.$t.sprintf(
					'To speed up the post/term meta migration, go to %1$s and run the <code>aioseo_migrate_post_meta</code> or <code>aioseo_migrate_term_meta action</code>.',
					scheduledActionsLink
				),
				areYouSureTitle : 'Are you sure you want to restart the migration?',
				cannotBeUndone  : 'This action cannot be undone.',
				startMigration  : 'Yes, restart the migration',
				noChangedMind   : 'No, I changed my mind'
			}
		}
	},
	methods : {
		...mapActions([ 'doTask' ]),
		clearCache () {
			this.loading.clearingCache = true
			this.doTask('clear-cache')
				.then(() => {
					this.loading.clearingCache = false
					console.log('Cache has been cleared.')
				}, () => (console.error('Cache could not be cleared.')))
		},
		removeDuplicates () {
			this.loading.removeDuplicates = true
			this.doTask('remove-duplicates')
				.then(() => {
					this.loading.removeDuplicates = false
					console.log('Duplicates have been removed.')
				}, () => (console.error('Duplicates could not be removed.')))
		},
		unescapeData () {
			this.loading.unescapeData = true
			this.doTask('unescape-data')
				.then(() => {
					this.loading.unescapeData = false
					console.log('Cleaning procedure for escaped data has been scheduled.')
				}, () => (console.error('Cleaning procedure for escaped data could not be scheduled.')))
		},
		clearImageData () {
			this.loading.clearImageData = true
			this.doTask('clear-image-data')
				.then(() => {
					this.loading.clearImageData = false
					console.log('Image data has been wiped.')
				}, () => (console.error('Image data could not be wiped.')))
		},
		clearVideoData () {
			this.loading.clearVideoData = true
			this.doTask('clear-video-data')
				.then(() => {
					this.loading.clearVideoData = false
					console.log('Video data has been cleared.')
				}, () => (console.error('Video data could not be cleared.')))
		},
		maybeRestartMigration () {
			this.showAreYouSureModal = true
		},
		restartMigration () {
			this.showAreYouSureModal = false
			this.loading.restartMigration    = true
			this.doTask('restart-v3-migration')
				.then(() => {
					this.loading.restartMigration = false
					console.log('Migration has been restarted.')
				}, () => (console.error('Migration could not be restarted.')))
		}
	}
}
</script>

<style lang="scss">
	.aioseo-app .aioseo-tools-debug {
		.aioseo-alert.warning {
			margin-bottom: 30px;
		}
		div.first-row {
			border-top: 1px solid #E8E8EB;
			margin-top: 22px;
			padding-top: 16px;
		}
		div.action-row {
			margin: 20px 0 0 0;

			&:first-child {
				margin: 0;
			}
		}

		.aioseo-modal-body {
		padding: 20px 50px 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;

		h3 {
			font-size: 20px;
			margin-bottom: 16px;
		}

		.reset-description {
			font-size: 16px;
			color: $black;
			margin-bottom: 16px;
			text-align: center;
			max-width: 515px;
		}

		button.close {
			position: absolute;
			right: 11px;
			top: 11px;
			width: 24px;
			height: 24px;
			background-color: #fff;
			border: none;
			display: flex;
			align-items: center;

			svg.aioseo-close {
				cursor: pointer;
				width: 14px;
				height: 14px;
			}
		}

		.aioseo-description {
			max-width: 510px;
			text-align: center;
		}

		.aioseo-button:not(.close) {
			margin-top: 16px;
		}
	}
	}
</style>