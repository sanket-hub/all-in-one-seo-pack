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
							class="clear-cache"
							type="blue"
							size="medium"
							@click="clearCache"
							:loading="loading.clearCache"
						>
							{{ strings.clearCache }}
						</base-button>

						<div class="aioseo-description">
							{{ strings.clearCacheDescription }}
						</div>
					</div>

					<div class="action-row">
						<base-button
							class="readd-capabilities"
							type="blue"
							size="medium"
							@click="readdCapabilities"
							:loading="loading.readdCapabilities"
						>
							{{ strings.readdCapabilities }}
						</base-button>

						<div class="aioseo-description">
							{{ strings.readdCapabilitiesDescription }}
						</div>
					</div>

					<div class="action-row">
						<base-button
							class="rerun-migrations"
							type="blue"
							size="medium"
							@click="rerunMigrations"
							:loading="loading.rerunMigrations"
						>
							{{ strings.rerunMigrations }}
						</base-button>

						<div class="aioseo-description">
							{{ strings.rerunMigrationsDescription }}
						</div>
					</div>

					<div class="action-row">
						<base-button
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
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.migration"
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
import DebugMixin from '@/vue/mixins/Debug.js'
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import CoreCard from '@/vue/components/common/core/Card'
import CoreModal from '@/vue/components/common/core/Modal'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import SvgClose from '@/vue/components/common/svg/Close'
export default {
	components : {
		CoreAlert,
		CoreCard,
		CoreModal,
		CoreSettingsRow,
		SvgClose
	},
	mixins : [ DebugMixin ]
}
</script>