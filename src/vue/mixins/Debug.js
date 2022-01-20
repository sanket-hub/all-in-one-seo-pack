import { mapActions } from 'vuex'

export default {
	data () {
		const scheduledActionsLink = this.$t.sprintf('<a href="%1$s" target="_blank">Scheduled Actions</a>', this.$aioseo.urls.admin.scheduledActions)
		return {
			showAreYouSureModal : false,
			loading             : {
				clearCache             : false,
				readdCapabilities      : false,
				rerunMigrations        : false,
				removeDuplicates       : false,
				unescapeData           : false,
				clearImageData         : false,
				clearVideoData         : false,
				restartMigration       : false,
				undismissSuggestions   : false,
				clearLinkAssistantData : false
			},
			strings : {
				debug                        : 'Debug',
				warning                      : 'Before you run any of these actions, make sure that you have fully read the description and understand the consequences as these cannot be reverted.',
				general                      : 'General',
				clearCache                   : 'Clear Cache',
				clearCacheDescription        : 'This action deletes all cache records in the database.',
				rerunMigrations              : 'Rerun Migrations',
				rerunMigrationsDescription   : 'This action will rerun all update migrations since 4.0.0, excluding the V3 migration (which can be retriggered below).',
				readdCapabilities            : 'Readd Capabilities',
				readdCapabilitiesDescription : 'This action will readd our capabilities (permissions) for all users.',
				removeDuplicates             : 'Remove Duplicates',
				removeDuplicatesDescription  : 'This action will remove any duplicate records that are found in the <code>aioseo_posts</code> or <code>aioseo_terms</code> table.',
				unescapeData                 : 'Unescape Data',
				unescapeDataDescription      : this.$t.sprintf(
					'This action will clean posts/terms whose data is corrupted via Action Scheduler. To speed up this process, go to %1$s and run the <code>aioseo_unslash_escaped_data_posts</code> or <code>aioseo_unslash_escaped_data_terms</code> action.',
					scheduledActionsLink
				),
				sitemap                   : 'Sitemap',
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
				linkAssistant                   : 'Link Assistant',
				undismissSuggestions            : 'Undismiss Suggestions',
				undismissSuggestionsDescription : this.$t.sprintf(
					'This action removes the dismissed state from all suggestions, which makes them appear in the UI again.',
					scheduledActionsLink
				),
				clearLinkAssistantData            : 'Clear Data',
				clearLinkAssistantDataDescription : this.$t.sprintf(
					'This action removes all Link Assistant data from the database, forcing a site-wide rescan via Action Scheduler. The various Link Assistant scans can be sped up through the %1$s',
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
				noChangedMind   : 'No, I changed my mind',
				migration       : 'Migration'
			}
		}
	},
	methods : {
		...mapActions([ 'doTask' ]),
		clearCache () {
			this.loading.clearingCache = true
			this.doTask('clear-cache').then(() => {
				this.loading.clearingCache = false
				console.log('Cache has been cleared.')
			}, (error) => (console.error('Cache could not be cleared:', error)))
		},
		readdCapabilities () {
			this.loading.readdCapabilities = true
			this.doTask('readd-capabilities').then(() => {
				this.loading.readdCapabilities = false
				console.log('Capabilities have been readded.')
			}, (error) => (console.error('Capabilities could not be readded:', error)))
		},
		rerunMigrations () {
			this.loading.rerunMigrations = true
			this.doTask('rerun-migrations').then(() => {
				this.loading.rerunMigrations = false
				console.log('Migrations have been restarted.')
			}, (error) => (console.error('Migrations could not be restarted:', error)))
		},
		removeDuplicates () {
			this.loading.removeDuplicates = true
			this.doTask('remove-duplicates').then(() => {
				this.loading.removeDuplicates = false
				console.log('Duplicates have been removed.')
			}, (error) => (console.error('Duplicates could not be removed:', error)))
		},
		unescapeData () {
			this.loading.unescapeData = true
			this.doTask('unescape-data').then(() => {
				this.loading.unescapeData = false
				console.log('Cleaning procedure for escaped data has been scheduled.')
			}, (error) => (console.error('Cleaning procedure for escaped data could not be scheduled:', error)))
		},
		clearImageData () {
			this.loading.clearImageData = true
			this.doTask('clear-image-data').then(() => {
				this.loading.clearImageData = false
				console.log('Image data has been wiped.')
			}, (error) => (console.error('Image data could not be wiped:', error)))
		},
		clearVideoData () {
			this.loading.clearVideoData = true
			this.doTask('clear-video-data').then(() => {
				this.loading.clearVideoData = false
				console.log('Video data has been cleared.')
			}, (error) => (console.error('Video data could not be cleared:', error)))
		},
		undismissSuggestions () {
			this.loading.undismissSuggestions = true
			this.doTask('undismiss-suggestions').then(() => {
				this.loading.undismissSuggestions = false
				console.log('Suggestions have been undismissed.')
			}, (error) => (console.error('Suggestions could not be undismissed:', error)))
		},
		clearLinkAssistantData () {
			this.loading.clearLinkAssistantData = true
			this.doTask('clear-link-assistant-data').then(() => {
				this.loading.clearLinkAssistantData = false
				console.log('Link Assistant data has been cleared.')
			}, (error) => (console.error('Link data Assistant could not be cleared:', error)))
		},
		maybeRestartMigration () {
			this.showAreYouSureModal = true
		},
		restartMigration () {
			this.showAreYouSureModal = false
			this.loading.restartMigration    = true
			this.doTask('restart-v3-migration').then(() => {
				this.loading.restartMigration = false
				console.log('Migration has been restarted.')
			}, (error) => (console.error('Migration could not be restarted:', error)))
		}
	}
}