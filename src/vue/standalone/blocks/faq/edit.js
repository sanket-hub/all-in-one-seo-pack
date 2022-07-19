import { generateUniqueSchemaBlockId } from '@/vue/standalone/blocks/utils'
import { render } from './AIOSEO_VERSION/sidebar.js'

const { useSelect }    = window.wp.data
const blockEditorStore = window.wp.blockEditor.store
const { serialize }    = window.wp.blocks

/**
 * Strips comments and unsafe attributes from HTML.
 *
 * @param   {string} htmlString The HTML to sanitize.
 * @returns {string}            The cleaned HTML.
 */
const cleanSchemaText = (htmlString) => {
	const { body } = document.implementation.createHTMLDocument('')
	body.innerHTML = htmlString

	function clean (html) {
		const nodes = html.childNodes
		for (const node of nodes) {
			// Remove HTML comments.
			if (node.nodeName?.toLowerCase().includes('comment')) {
				node.parentNode.removeChild(node)
			}

			// Remove unsafe and useless attributes.
			if (node.attributes) {
				for (const { name, value } of node.attributes) {
					const val = value.replace(/\s+/g, '').toLowerCase()

					if (
						![ 'src', 'href' ].includes(name) ||
						name.startsWith('on') ||
						val.includes('javascript:') ||
						val.includes('data:')
					) {
						node.removeAttribute(name)
					}
				}
			}
			clean(node)
		}
	}

	clean(body)

	return body.innerHTML.trim().replace(/\s+/g, ' ')
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param   {Array}     props The props.
 * @returns {WPElement}       Element to render.
 */
export default function edit (props) {
	const {
		attributes,
		className,
		clientId,
		setAttributes
	} = props

	const {
		schemaBlockId
	} = attributes

	const setSchemaBlockAttributes = (blockAttributes) => {
		window.requestAnimationFrame(() => {
			setAttributes(blockAttributes)
		})
		window.aioseoBus.$emit('schemaBlockUpdated')
	}

	if (!schemaBlockId) {
		// Set a unique ID so that we can use this to track updates and deletes.
		setSchemaBlockAttributes({ schemaBlockId: generateUniqueSchemaBlockId() })
	}

	const answer = useSelect(
		select => {
			const {
				getBlock,
				getBlocks
			} = select(blockEditorStore)

			const getInnerBlocksContent = (block) => {
				const answerBlocks     = getBlocks(block.clientId) || []
				const answerBlocksHtml = serialize(answerBlocks)

				// Sanitize HTML and strip comments from the answer blocks.
				return cleanSchemaText(answerBlocksHtml)
			}

			const faqBlock = getBlock(clientId)
			return getInnerBlocksContent(faqBlock)
		},
		[ clientId ]
	)

	setSchemaBlockAttributes({ answer })

	return render(className, attributes, setSchemaBlockAttributes)
}