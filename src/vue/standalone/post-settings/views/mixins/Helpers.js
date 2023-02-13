import { mapState } from 'vuex'
export default {
	computed : {
		...mapState([ 'schema' ]),
		hasFeature () {
			if (this.schema.isEditingDefaultGraph) {
				return true
			}

			switch (this.schema.graph.graphName) {
				case 'Event':
				case 'JobPosting':
					break
				default:
					// Return true for all graphs that aren't limited to specific plans.
					return true
			}

			// First convert the graph name to kebab case.
			const graphName = this.schema.graph.graphName.replace(/(?<!^)([A-Z][a-z]|(?<=[a-z])[A-Z])/, '-$1').toLowerCase()

			return this.$license.hasCoreFeature('schema', graphName)
		},
		graphNotIncluded () {
			const upgradeLink = this.$links.getPricingUrl(
				'graph-' + this.schema.graph.graphName.toLowerCase(),
				'schema-generator',
				'graph-' + this.schema.graph.graphName.toLowerCase(),
				'pricing'
			)

			return this.$t.__('This feature is not available in your current plan.', this.$tdPro) + ' ' +
				this.$t.sprintf(
					'<a href="%1$s" target="_blank">%2$s</a>',
					upgradeLink,
					this.$t.sprintf(
						// Translators: 1 - The name of a schema type (e.g. "Event", "Job Posting", etc.).
						this.$t.__('Upgrade your plan and unlock %1$s schema', this.$tdPro),
						// Convert PascalCase to spaced out words.
						this.schema.graph.graphName.replace(/([A-Z].*?)([A-Z])(?![A-Z])/, '$1 $2')
					)
				)
		},
		isEditing () {
			return this.schema.isEdtingCustomGraph ||
				this.schema.isEditingCustomTemplate ||
				this.schema.isEditingDefaultGraph ||
				this.schema.isEditingGraph ||
				this.schema.isEditingTemplate
		}
	}
}