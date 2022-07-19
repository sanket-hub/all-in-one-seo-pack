import { html } from '@/vue/standalone/blocks/utils'

const { RichText, InnerBlocks } = window.wp.blockEditor

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @returns {WPElement} Element to render.
 */
export default function save ({ attributes, className }) {
	const { question, hidden, tagName } = attributes

	return html`
		<div data-schema-only="${hidden}" className=${className}>
			<${RichText.Content}
				tagName=${tagName}
				className="aioseo-faq-block-question"
				value=${question}
			/>
			<div className="aioseo-faq-block-answer">
				<${InnerBlocks.Content} />
			</div>
		</div>
	`
}