export function getCustomObject (state) {
	return {
		id        : '#aioseo-custom-' + new Date().getTime().toString(36),
		custom    : true,
		graphName : state.schema.custom.graphName,
		schema    : state.schema.custom.schema
	}
}

function resetSessionState (context, state) {
	context._vm.$set(state.schema, 'custom', {
		graphName : '',
		schema    : ''
	})

	context._vm.$set(state.schema, 'defaultGraphParent', '')
	context._vm.$set(state.schema, 'graph', null)

	context._vm.$set(state.schema, 'isEditingCustomGraph', false)
	context._vm.$set(state.schema, 'isEditingCustomTemplate', false)
	context._vm.$set(state.schema, 'isEditingDefaultGraph', false)
	context._vm.$set(state.schema, 'isEditingGraph', false)
	context._vm.$set(state.schema, 'isEditingTemplate', false)

	context._vm.$set(state.schema, 'isDirty', false)
}

export default {
	resetSessionState (state) {
		resetSessionState(this, state)
	},
	addCustomAsGraph (state) {
		state.currentPost.schema.customGraphs.push(getCustomObject(state))

		state.currentPost.schema.customGraphs = state.currentPost.schema.customGraphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	addCustomAsTemplate (state) {
		state.internalOptions.internal.schema.templates.push(getCustomObject(state))

		resetSessionState(this, state)

		this._vm.$set(state.schema.tabs, 'generator', 'schema-templates')
		this._vm.$set(state.schema.tabs, 'templates', 'your-templates')
	},
	addCustomTemplateAsGraph (state) {
		state.currentPost.schema.customGraphs.push(state.schema.graph)

		state.currentPost.schema.customGraphs = state.currentPost.schema.customGraphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	addDefaultGraph (state) {
		this._vm.$set(state.currentPost.schema.default, 'isEnabled', true)

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	addGraph (state) {
		state.currentPost.schema.graphs.push(state.schema.graph)

		state.currentPost.schema.graphs = state.currentPost.schema.graphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	addGraphAsTemplate (state) {
		state.internalOptions.internal.schema.templates.push(state.schema.graph)

		resetSessionState(this, state)

		this._vm.$set(state.schema.tabs, 'generator', 'schema-templates')
		this._vm.$set(state.schema.tabs, 'templates', 'your-templates')
	},
	addTemplateAsGraph (state, templateIndex) {
		if (undefined === templateIndex) {
			// If we don't have a template index, then we're adding the template from the edit screen. In that case, we just need to grab it from the session.
			templateIndex = state.internalOptions.internal.schema.templates.findIndex(x => x.id === state.schema.graph.id)
		}

		const template = JSON.parse(JSON.stringify(state.internalOptions.internal.schema.templates[templateIndex]))

		// Add a random suffix to the ID to prevent duplicate keys in case the same graph has been added twice.
		template.id = template.id + new Date().getTime().toString(18)

		if (template.custom) {
			state.currentPost.schema.customGraphs.push(template)

			state.currentPost.schema.customGraphs = state.currentPost.schema.customGraphs.sort((a, b) => {
				return (a.graphName < b.graphName) ? -1 : 1
			})
		} else {
			state.currentPost.schema.graphs.push(template)

			state.currentPost.schema.graphs = state.currentPost.schema.graphs.sort((a, b) => {
				return (a.graphName < b.graphName) ? -1 : 1
			})
		}

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	deleteCustomGraph (state, graphIndex) {
		if (undefined === graphIndex) {
			// If we don't have a graph index, then we're deleting the graph from the edit screen. In that case, we just need to grab it from the session.
			graphIndex = state.currentPost.schema.customGraphs.findIndex(x => x.id === state.schema.graph.id)
		}

		this._vm.$delete(state.currentPost.schema.customGraphs, graphIndex)

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	deleteDefaultGraph (state) {
		this._vm.$set(state.currentPost.schema.default, 'isEnabled', false)

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	deleteGraph (state, graphIndex) {
		if (undefined === graphIndex) {
			// If we don't have a graph index, then we're deleting the graph from the edit screen. In that case, we just need to grab it from the session.
			graphIndex = state.currentPost.schema.graphs.findIndex(x => x.id === state.schema.graph.id)
		}

		this._vm.$delete(state.currentPost.schema.graphs, graphIndex)

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	deleteTemplate (state, templateIndex) {
		if (undefined === templateIndex) {
			// If we don't have a template index, then we're adding the template from the edit screen. In that case, we just need to grab it from the session.
			templateIndex = state.internalOptions.internal.schema.templates.findIndex(x => x.id === state.schema.graph.id)
		}

		this._vm.$delete(state.internalOptions.internal.schema.templates, templateIndex)

		resetSessionState(this, state)

		this._vm.$set(state.schema.tabs, 'generator', 'schema-templates')
		this._vm.$set(state.schema.tabs, 'templates', 'your-templates')
	},
	editCustomGraph (state, { customGraphIndex, isSidebar }) {
		// It's important to create a clone so that we're not editing the existing graph object.
		const editedCustomGraph = JSON.parse(JSON.stringify(state.currentPost.schema.customGraphs[customGraphIndex]))
		this._vm.$set(state.schema, 'graph', editedCustomGraph)
		this._vm.$set(state.schema, 'isEditingCustomGraph', true)

		this._vm.$set(state.schema.tabs, 'generator', 'custom-schema')

		if (isSidebar) {
			this._vm.$set(state.schema, 'modalOpenSidebar', true)
		} else {
			this._vm.$set(state.schema, 'modalOpenMetabox', true)
		}
	},
	editDefaultGraph (state, { isSidebar, parentGraphName }) {
		this._vm.$set(state.schema, 'defaultGraphParent', parentGraphName)

		// First, check the default graph already has properties set.
		if (state.currentPost.schema.default.data[parentGraphName]) {
			this._vm.$set(state.schema, 'graph', state.currentPost.schema.default.data[parentGraphName])
		}

		this._vm.$set(state.schema, 'isEditingDefaultGraph', true)
		this._vm.$set(state.schema.tabs, 'generator', 'schema-templates')

		if (isSidebar) {
			this._vm.$set(state.schema, 'modalOpenSidebar', true)
		} else {
			this._vm.$set(state.schema, 'modalOpenMetabox', true)
		}
	},
	editGraph (state, { graphIndex, isSidebar }) {
		// It's important to create a clone so that we're not editing the existing graph object.
		const editedGraph = JSON.parse(JSON.stringify(state.currentPost.schema.graphs[graphIndex]))
		this._vm.$set(state.schema, 'graph', editedGraph)
		this._vm.$set(state.schema, 'isEditingGraph', true)

		this._vm.$set(state.schema.tabs, 'generator', 'schema-templates')

		if (isSidebar) {
			this._vm.$set(state.schema, 'modalOpenSidebar', true)
		} else {
			this._vm.$set(state.schema, 'modalOpenMetabox', true)
		}
	},
	editTemplate (state, templateIndex) {
		// It's important to create a clone so that we're not editing the existing template object.
		const editedTemplate = JSON.parse(JSON.stringify(state.internalOptions.internal.schema.templates[templateIndex]))

		this._vm.$set(state.schema, 'graph', editedTemplate)

		if (editedTemplate.custom) {
			this._vm.$set(state.schema, 'templateName', state.schema.graphName)

			this._vm.$set(state.schema, 'isEditingCustomTemplate', true)
			this._vm.$set(state.schema.tabs, 'generator', 'custom-schema')
		} else {
			const pattern            = new RegExp(`^${state.schema.graph.graphName} -`, 'i')
			const labelWithoutPrefix = state.schema.graph.label.replace(pattern, '')
			this._vm.$set(state.schema, 'templateName', labelWithoutPrefix)

			this._vm.$set(state.schema, 'isEditingTemplate', true)
		}
	},
	parseAndUpdateTemplates (state, templates) {
		templates = templates.map((template) => {
			if ('string' !== typeof template) {
				return template
			}
			template = JSON.parse(template)
			return template
		})

		// Sort alphabetically but also move custom schema templates to the rear.
		templates = templates.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : (a.custom) ? 0 : 1
		})

		this._vm.$set(state.internalOptions.internal.schema, 'templates', templates)
	},
	setIsDirty (state, isDirty) {
		this._vm.$set(state.schema, 'isDirty', isDirty)
	},
	setGraph (state, graph) {
		this._vm.$set(state.schema, 'graph', graph)
	},
	setModalOpen (state, { isOpen, initialTab, isSidebar }) {
		if (!isOpen) {
			resetSessionState(this, state)

			this._vm.$set(state.schema.tabs, 'generator', 'schema-templates')
			this._vm.$set(state.schema.tabs, 'templates', 'schema-catalog')
		}

		if (isSidebar) {
			this._vm.$set(state.schema, 'modalOpenSidebar', isOpen)
		} else {
			this._vm.$set(state.schema, 'modalOpenMetabox', isOpen)
		}

		if (initialTab) {
			this._vm.$set(state.schema.tabs, 'generator', initialTab)
		}
	},
	setTabGenerator (state, tabName) {
		this._vm.$set(state.schema.tabs, 'generator', tabName)
	},
	setTabTemplates (state, tabName) {
		this._vm.$set(state.schema.tabs, 'generator', 'schema-templates')
		this._vm.$set(state.schema.tabs, 'templates', tabName)
	},
	setTemplateName (state, templateName) {
		this._vm.$set(state.schema, 'templateName', templateName)
	},
	updateCustomGraph (state) {
		const index = state.currentPost.schema.customGraphs.findIndex(x => x.id === state.schema.graph.id)
		if (-1 === index) {
			return
		}

		this._vm.$set(state.currentPost.schema.customGraphs, index, state.schema.graph)

		state.currentPost.schema.customGraphs = state.currentPost.schema.customGraphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	updateDefaultGraph (state) {
		this._vm.$set(state.currentPost.schema.default.data, state.schema.defaultGraphParent, state.schema.graph)

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	updateGraph (state) {
		const index = state.currentPost.schema.graphs.findIndex(x => x.id === state.schema.graph.id)
		if (-1 === index) {
			return
		}

		this._vm.$set(state.currentPost.schema.graphs, index, state.schema.graph)

		state.currentPost.schema.graphs = state.currentPost.schema.graphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(this, state)

		this._vm.$set(state.schema, 'graphCardsKey', state.schema.graphsKey + 1)
		this._vm.$set(state.schema, 'modalOpenMetabox', false)
		this._vm.$set(state.schema, 'modalOpenSidebar', false)
	},
	updateTemplate (state) {
		const index = state.internalOptions.internal.schema.templates.findIndex(x => x.id === state.schema.graph.id)
		if (-1 === index) {
			return
		}

		this._vm.$set(state.internalOptions.internal.schema.templates, index, state.schema.graph)

		resetSessionState(this, state)

		this._vm.$set(state.schema.tabs, 'generator', 'schema-templates')
		this._vm.$set(state.schema.tabs, 'templates', 'your-templates')
	},
	updateSchemaOutput (state, output) {
		let object = null
		try {
			object = JSON.parse(output)
		} catch {
			return
		}

		output = JSON.stringify(object, null, '\t').trim()

		if (output === state.schema.output) {
			return
		}

		this._vm.$set(state.schema, 'output', output)
		this._vm.$set(state.schema, 'outputKey', state.schema.outputKey + 1)
	}
}