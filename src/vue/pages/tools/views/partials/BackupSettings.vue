<template>
	<core-card
		class="aioseo-backup-settings"
		slug="backupSettings"
		:toggles="false"
		no-slide
		:header-text="strings.backupSettings"
	>
		<template #header-icon>
			<svg-history />
		</template>

		<core-alert
			v-if="backupsDeleteSuccess"
			type="green"
		>
			{{ strings.backupSuccessfullyDeleted }}
		</core-alert>

		<core-alert
			v-if="backupsRestoreSuccess"
			type="green"
		>
			{{ strings.backupSuccessfullyRestored }}
		</core-alert>

		<div
			v-if="!backups.length"
			class="aioseo-section-description"
		>
			{{ strings.noBackups }}
		</div>

		<template v-if="backups.length">
			<div class="backups-table">
				<div class="backups-rows">
					<div
						class="backup-row"
						:class="{ even: 0 === index % 2 }"
						v-for="(backup, index) in backups"
						:key="index"
					>
						<div class="backup-name" v-html="getBackupName(backup)" />
						<div class="backup-actions">
							<core-tooltip
								type="action"
							>
								<svg-refresh
									@click.native="processRestoreBackup(backup)"
								/>

								<template #tooltip>
									{{ strings.restore }}
								</template>
							</core-tooltip>

							<core-tooltip
								type="action"
							>
								<svg-trash
									@click.native="processDeleteBackup(backup)"
								/>

								<template #tooltip>
									{{ strings.delete }}
								</template>
							</core-tooltip>
						</div>
					</div>
				</div>
			</div>
		</template>

		<base-button
			type="blue"
			size="medium"
			@click="processCreateBackup"
			:loading="loading"
		>
			<svg-circle-plus />
			{{ strings.createBackup }}
		</base-button>
	</core-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
	data () {
		return {
			timeout               : null,
			backupsDeleteSuccess  : false,
			backupsRestoreSuccess : false,
			loading               : false,
			strings               : {
				backupSettings             : this.$t.__('Backup Settings', this.$td),
				noBackups                  : this.$t.__('You have no saved backups.', this.$td),
				createBackup               : this.$t.__('Create Backup', this.$td),
				restore                    : this.$t.__('Restore', this.$td),
				delete                     : this.$t.__('Delete', this.$td),
				backupSuccessfullyDeleted  : this.$t.__('Success! The backup was deleted.', this.$td),
				backupSuccessfullyRestored : this.$t.__('Success! The backup was restored.', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'backups' ])
	},
	methods : {
		...mapActions([ 'createBackup', 'deleteBackup', 'restoreBackup' ]),
		processCreateBackup () {
			this.loading = true
			this.createBackup()
				.then(() => {
					this.loading = false
				})
		},
		processDeleteBackup (backup) {
			this.loading = true
			this.deleteBackup(backup)
				.then(() => {
					clearTimeout(this.timeout)
					this.loading              = false
					this.backupsDeleteSuccess = true
					this.timeout = setTimeout(() => {
						this.backupsDeleteSuccess  = false
						this.backupsRestoreSuccess = false
					}, 3000)
				})
		},
		processRestoreBackup (backup) {
			this.loading = true
			this.restoreBackup(backup)
				.then(() => {
					clearTimeout(this.timeout)
					this.loading              = false
					this.backupsRestoreSuccess = true
					this.timeout = setTimeout(() => {
						this.backupsDeleteSuccess  = false
						this.backupsRestoreSuccess = false
					}, 3000)
				})
		},
		getBackupName (backup) {
			return this.$t.sprintf(
				// Translators: 1 Date, 2 - Timestamp.
				this.$t.__('%1$s at %2$s', this.$td),
				'<strong>' + this.$moment(backup * 1000).tz(this.$moment.tz.guess()).format('MMMM D, YYYY') + '</strong>',
				'<strong>' + this.$moment(backup * 1000).tz(this.$moment.tz.guess()).format('h:mmA z') + '</strong>'
			)
		}
	}
}
</script>

<style lang="scss">
.aioseo-backup-settings {
	.aioseo-alert {
		margin-bottom: 20px;
	}

	.backups-table {
		border: 1px solid $input-border;
		border-radius: 3px;
		margin-bottom: 20px;
		font-size: 16px;

		.backup-actions {
			max-width: 50px;

			.aioseo-tooltip {
				display: inline-block;
				margin: 0;
			}
		}

		.backups-rows {
			font-size: 14px;

			.backup-row {
				background-color: #fff;
				height: 70px;
				display: flex;
				align-items: center;
				padding: 0 30px;

				&:last-of-type {
					border-radius: 0 0 3px 3px;
				}

				&.even {
					background-color: $box-background;
				}

				> div {
					flex: 1 0 auto;
					padding-right: 30px;

					&:last-child {
						padding-right: 0;
					}
				}

				.backup-actions {
					svg {
						width: 20px;
						height: 20px;
						color: $placeholder-color;
						cursor: pointer;
						transition: color 0.1s ease;
					}

					svg.aioseo-trash {
						&:hover {
							color: $red;
						}
					}

					svg.aioseo-refresh {
						margin-right: 10px;

						&:hover {
							color: $green;
						}
					}
				}
			}
		}
	}

	svg.aioseo-circle-plus {
		width: 14px;
		height: 14px;
		margin-right: 10px;
	}
}
</style>