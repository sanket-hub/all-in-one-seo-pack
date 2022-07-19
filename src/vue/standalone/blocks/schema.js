import state from './../../store/state'
import { debounce } from 'lodash-es'

if ('post' === window.aioseo?.currentPost?.context) {
	let blockList = []
	window.wp.data.subscribe(() => {
		checkBlocksLength()
	})

	const checkBlocksLength = debounce(() => {
		const newBlockList = window.wp.data.select('core/block-editor').getBlocks()

		if (newBlockList.length < blockList.length) {
			updateBlockGraphs()
		}

		blockList = newBlockList
	}, 200)

	window.aioseoBus.$on('schemaBlockUpdated', () => { updateBlockGraphs() })

	const updateBlockGraphs = debounce(() => {
		// First, grab all schema supported blocks from the editor.
		let blocks = window.wp.data.select('core/block-editor').getBlocks().filter(block => block?.attributes?.schemaBlockId)

		// Now, map their type to their attributes so that we can identify their type in the backend.
		blocks = blocks.map((block) => {
			block.attributes.type = block.name
			return block
		})

		// Then, grab the existing stored block graphs and loop over them to see if any of them were removed.
		const blockGraphs = state.currentPost.schema_type_options?.blockGraphs || []
		blockGraphs.forEach((blockGraph, blockGraphIndex) => {
			const blockIndex = blocks.findIndex(block => block?.attributes?.schemaBlockId === blockGraph?.schemaBlockId)

			// If no block was found, then it must have been removed.
			if (-1 === blockIndex) {
				blockGraphs.splice(blockGraphIndex, 1)
				return
			}

			// If a block was found, let's update it.
			blockGraphs[blockGraphIndex] = blocks[blockIndex].attributes
		})

		// Now, we also need to loop over the new blocks to see if there are any new ones that need to be added.
		blocks.forEach((block) => {
			const blockGraphIndex = blockGraphs.findIndex(blockGraph => blockGraph?.schemaBlockId === block?.attributes?.schemaBlockId)
			if (-1 === blockGraphIndex && block?.attributes) {
				blockGraphs.push(block.attributes)
			}
		})

		state.currentPost.schema_type_options.blockGraphs = blockGraphs
	}, 200)
}