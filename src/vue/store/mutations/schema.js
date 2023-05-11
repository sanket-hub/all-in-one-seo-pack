export function getCustomObject (state) {
	return {
		id        : '#aioseo-custom-' + new Date().getTime().toString(36),
		custom    : true,
		graphName : state.schema.custom.graphName,
		schema    : state.schema.custom.schema
	}
}

function resetSessionState (state) {
	state.schema.custom = {
		graphName : '',
		schema    : ''
	}

	state.schema.defaultGraphParent = ''
	state.schema.graph = null

	state.schema.isEditingCustomGraph = false
	state.schema.isEditingCustomTemplate = false
	state.schema.isEditingDefaultGraph = false
	state.schema.isEditingGraph = false
	state.schema.isEditingTemplate = false

	state.schema.isDirty = false
}

export default {
	resetSessionState (state) {
		resetSessionState(state)
	},
	addCustomAsGraph (state) {
		state.currentPost.schema.customGraphs.push(getCustomObject(state))

		state.currentPost.schema.customGraphs = state.currentPost.schema.customGraphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	addCustomAsTemplate (state) {
		state.internalOptions.internal.schema.templates.push(getCustomObject(state))

		resetSessionState(state)

		state.schema.tabs.generator = 'schema-templates'
		state.schema.tabs.templates = 'your-templates'
	},
	addCustomTemplateAsGraph (state) {
		state.currentPost.schema.customGraphs.push(state.schema.graph)

		state.currentPost.schema.customGraphs = state.currentPost.schema.customGraphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	addDefaultGraph (state) {
		state.currentPost.schema.default.isEnabled = true

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	addGraph (state) {
		state.currentPost.schema.graphs.push(state.schema.graph)

		state.currentPost.schema.graphs = state.currentPost.schema.graphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	addGraphAsTemplate (state) {
		state.internalOptions.internal.schema.templates.push(state.schema.graph)

		resetSessionState(state)

		state.schema.tabs.generator = 'schema-templates'
		state.schema.tabs.templates = 'your-templates'
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

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	deleteCustomGraph (state, graphIndex) {
		if (undefined === graphIndex) {
			// If we don't have a graph index, then we're deleting the graph from the edit screen. In that case, we just need to grab it from the session.
			graphIndex = state.currentPost.schema.customGraphs.findIndex(x => x.id === state.schema.graph.id)
		}

		state.currentPost.schema.customGraphs.splice(graphIndex, 1)

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	deleteDefaultGraph (state) {
		state.currentPost.schema.default.isEnabled = false

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	deleteGraph (state, graphIndex) {
		if (undefined === graphIndex) {
			// If we don't have a graph index, then we're deleting the graph from the edit screen. In that case, we just need to grab it from the session.
			graphIndex = state.currentPost.schema.graphs.findIndex(x => x.id === state.schema.graph.id)
		}

		state.currentPost.schema.graphs.splice(graphIndex, 1)

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	deleteTemplate (state, templateIndex) {
		if (undefined === templateIndex) {
			// If we don't have a template index, then we're adding the template from the edit screen. In that case, we just need to grab it from the session.
			templateIndex = state.internalOptions.internal.schema.templates.findIndex(x => x.id === state.schema.graph.id)
		}

		state.internalOptions.internal.schema.templates.splice(templateIndex, 1)

		resetSessionState(state)

		state.schema.tabs.generator = 'schema-templates'
		state.schema.tabs.templates = 'your-templates'
	},
	editCustomGraph (state, { customGraphIndex, isSidebar }) {
		// It's important to create a clone so that we're not editing the existing graph object.
		const editedCustomGraph = JSON.parse(JSON.stringify(state.currentPost.schema.customGraphs[customGraphIndex]))
		state.schema.graph = editedCustomGraph
		state.schema.isEditingCustomGraph = true

		state.schema.tabs.generator = 'custom-schema'

		if (isSidebar) {
			state.schema.modalOpenSidebar = true
		} else {
			state.schema.modalOpenMetabox = true
		}
	},
	editDefaultGraph (state, { isSidebar, parentGraphName }) {
		state.schema.defaultGraphParent = parentGraphName

		// First, check the default graph already has properties set.
		if (state.currentPost.schema.default.data[parentGraphName]) {
			state.schema.graph = state.currentPost.schema.default.data[parentGraphName]
		}

		state.schema.isEditingDefaultGraph = true
		state.schema.tabs.generator = 'schema-templates'

		if (isSidebar) {
			state.schema.modalOpenSidebar = true
		} else {
			state.schema.modalOpenMetabox = true
		}
	},
	editGraph (state, { graphIndex, isSidebar }) {
		// It's important to create a clone so that we're not editing the existing graph object.
		const editedGraph = JSON.parse(JSON.stringify(state.currentPost.schema.graphs[graphIndex]))
		state.schema.graph = editedGraph
		state.schema.isEditingGraph = true

		state.schema.tabs.generator = 'schema-templates'

		if (isSidebar) {
			state.schema.modalOpenSidebar = true
		} else {
			state.schema.modalOpenMetabox = true
		}
	},
	editTemplate (state, templateIndex) {
		// It's important to create a clone so that we're not editing the existing template object.
		const editedTemplate = JSON.parse(JSON.stringify(state.internalOptions.internal.schema.templates[templateIndex]))

		state.schema.graph = editedTemplate

		if (editedTemplate.custom) {
			state.schema.templateName = state.schema.graphName

			state.schema.isEditingCustomTemplate = true
			state.schema.tabs.generator = 'custom-schema'
		} else {
			const pattern            = new RegExp(`^${state.schema.graph.graphName} -`, 'i')
			const labelWithoutPrefix = state.schema.graph.label.replace(pattern, '')
			state.schema.templateName = labelWithoutPrefix

			state.schema.isEditingTemplate = true
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

		state.internalOptions.internal.schema.templates = templates
	},
	setIsDirty (state, isDirty) {
		state.schema.isDirty = isDirty
	},
	setGraph (state, graph) {
		state.schema.graph = graph
	},
	setModalOpen (state, { isOpen, initialTab, isSidebar }) {
		if (!isOpen) {
			resetSessionState(state)

			state.schema.tabs.generator = 'schema-templates'
			state.schema.tabs.templates = 'schema-catalog'
		}

		if (isSidebar) {
			state.schema.modalOpenSidebar = isOpen
		} else {
			state.schema.modalOpenMetabox = isOpen
		}

		if (initialTab) {
			state.schema.tabs.generator = initialTab
		}
	},
	setTabGenerator (state, tabName) {
		state.schema.tabs.generator = tabName
	},
	setTabTemplates (state, tabName) {
		state.schema.tabs.generator = 'schema-templates'
		state.schema.tabs.templates = tabName
	},
	setTemplateName (state, templateName) {
		state.schema.templateName = templateName
	},
	updateCustomGraph (state) {
		const index = state.currentPost.schema.customGraphs.findIndex(x => x.id === state.schema.graph.id)
		if (-1 === index) {
			return
		}

		state.currentPost.schema.customGraphs[index] = state.schema.graph

		state.currentPost.schema.customGraphs = state.currentPost.schema.customGraphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	updateDefaultGraph (state) {
		state.currentPost.schema.default.data[state.schema.defaultGraphParent] = state.schema.graph

		resetSessionState(state)

		state.schema.graphCardsKey = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	updateGraph (state) {
		const index = state.currentPost.schema.graphs.findIndex(x => x.id === state.schema.graph.id)
		if (-1 === index) {
			return
		}

		state.currentPost.schema.graphs[index] = state.schema.graph

		state.currentPost.schema.graphs = state.currentPost.schema.graphs.sort((a, b) => {
			return (a.graphName < b.graphName) ? -1 : 1
		})

		resetSessionState(state)

		state.schema.graphCardsKey    = state.schema.graphCardsKey + 1
		state.schema.modalOpenMetabox = false
		state.schema.modalOpenSidebar = false
	},
	updateTemplate (state) {
		const index = state.internalOptions.internal.schema.templates.findIndex(x => x.id === state.schema.graph.id)
		if (-1 === index) {
			return
		}

		state.internalOptions.internal.schema.templates[index] = state.schema.graph

		resetSessionState(state)

		state.schema.tabs.generator = 'schema-templates'
		state.schema.tabs.templates = 'your-templates'
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

		state.schema.output = output
		state.schema.outputKey = state.schema.outputKey + 1
	}
}