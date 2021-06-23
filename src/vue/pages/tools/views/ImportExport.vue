<template>
	<div class="aioseo-tools-import-export">
		<grid-row>
			<grid-column
				md="6"
			>
				<import-aioseo />
				<import-others />
			</grid-column>

			<grid-column
				md="6"
			>
				<export-settings />
			</grid-column>
		</grid-row>

		<grid-row>
			<grid-column>
				<backup-settings />
			</grid-column>
		</grid-row>
	</div>
</template>

<script>
import BackupSettings from './partials/BackupSettings'
import ExportSettings from './partials/ExportSettings'
import ImportAioseo from './partials/ImportAioseo'
import ImportOthers from './partials/ImportOthers'
export default {
	components : { BackupSettings, ExportSettings, ImportAioseo, ImportOthers },
	data () {
		return {
			strings : {
				exportBackupSettings : this.$t.__('Export / Backup Settings', this.$td)
			}
		}
	},
	computed : {
	},
	methods : {
	}
}
</script>

<style lang="scss">
.aioseo-tools-import-export {
	.aioseo-row {
		margin: -0.5rem;

		.aioseo-card {
			margin: 0 0 1rem;

			&:last-of-type {
				margin-bottom: 0.5rem;
			}
		}

		.aioseo-col {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>