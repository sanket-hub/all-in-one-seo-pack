import { isBlockEditor } from '@/vue/utils/context'
import { getCustomObject } from '../mutations/schema'

export default {
	addCustomAsGraph ({ commit, dispatch }) {
		commit('addCustomAsGraph')
		dispatch('updateSchemaOutput')
	},
	addCustomAsTemplate ({ commit, state }) {
		const template = JSON.parse(JSON.stringify(getCustomObject(state)))

		commit('addCustomAsTemplate')

		this._vm.$http.post(this._vm.$links.restUrl('schema/templates'))
			.send({
				template : template
			})
			.then((response) => {
				if (response.body.success && response.body.templates) {
					commit('parseAndUpdateTemplates', response.body.templates)
				}
			})
	},
	addCustomTemplateAsGraph ({ commit, dispatch }) {
		commit('addCustomTemplateAsGraph')
		dispatch('updateSchemaOutput')
	},
	addDefaultGraph ({ commit, dispatch }) {
		commit('addDefaultGraph')
		dispatch('updateSchemaOutput')
	},
	addGraph ({ commit, dispatch }) {
		commit('addGraph')
		dispatch('updateSchemaOutput')
	},
	addGraphAsTemplate ({ commit, state }) {
		// First, set the name the user entered for the template.
		state.schema.graph.label = state.schema.graph.graphName + ' - ' + state.schema.templateName

		const template = JSON.parse(JSON.stringify(state.schema.graph))
		commit('addGraphAsTemplate')

		this._vm.$http.post(this._vm.$links.restUrl('schema/templates'))
			.send({
				template : template
			})
			.then((response) => {
				if (response.body.success && response.body.templates) {
					commit('parseAndUpdateTemplates', response.body.templates)
				}
			})
	},
	addTemplateAsGraph ({ commit, dispatch }, templateIndex) {
		commit('addTemplateAsGraph', templateIndex)
		dispatch('updateSchemaOutput')
	},
	deleteCustomGraph ({ commit, dispatch }, graphIndex) {
		commit('deleteCustomGraph', graphIndex)
		dispatch('updateSchemaOutput')
	},
	deleteDefaultGraph ({ commit, dispatch }) {
		commit('deleteDefaultGraph')
		dispatch('updateSchemaOutput')
	},
	deleteGraph ({ commit, dispatch }, graphIndex) {
		commit('deleteGraph', graphIndex)
		dispatch('updateSchemaOutput')
	},
	deleteTemplate ({ commit, state }) {
		const templateId = state.schema.graph.id
		commit('deleteTemplate')

		this._vm.$http.delete(this._vm.$links.restUrl('schema/templates'))
			.send({
				templateId : templateId
			})
			.then((response) => {
				if (response.body.success && response.body.templates) {
					commit('parseAndUpdateTemplates', response.body.templates)
				}
			})
	},
	updateCustomGraph ({ commit, dispatch }) {
		commit('updateCustomGraph')
		dispatch('updateSchemaOutput')
	},
	updateDefaultGraph ({ commit, dispatch }) {
		commit('updateDefaultGraph')
		dispatch('updateSchemaOutput')
	},
	updateGraph ({ commit, dispatch }) {
		commit('updateGraph')
		dispatch('updateSchemaOutput')
	},
	updateSchemaOutput ({ commit, state }) {
		let postId = this._vm.$aioseo.currentPost.id
		if (isBlockEditor()) {
			postId = window.wp.data.select('core/editor').getCurrentPostId()
		}

		this._vm.$http.post(this._vm.$links.restUrl('schema/validator/output'))
			.send({
				postId       : postId,
				graphs       : state.currentPost.schema.graphs,
				customGraphs : state.currentPost.schema.customGraphs,
				defaultGraph : state.currentPost.schema.defaultGraph
			})
			.then((response) => {
				if (response.body.success && response.body.output) {
					commit('updateSchemaOutput', response.body.output)
				}
			})
	},
	updateTemplate ({ commit, state }) {
		// First, set the name the user entered for the template.
		state.schema.graph.label = state.schema.graph.graphName + ' - ' + state.schema.templateName

		const template = JSON.parse(JSON.stringify(state.schema.graph))
		commit('updateTemplate')

		this._vm.$http.put(this._vm.$links.restUrl('schema/templates'))
			.send({
				template : template
			})
			.then((response) => {
				if (response.body.success && response.body.templates) {
					commit('parseAndUpdateTemplates', response.body.templates)
				}
			})
	}
}