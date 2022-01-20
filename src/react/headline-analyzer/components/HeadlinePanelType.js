const { __, sprintf } = window.wp.i18n
const { Fragment } = window.wp.element
const { PanelBody, PanelRow } = window.wp.components

const HeadlinePanelType = (props) => {
	const headlineTypes = props.data.result.headlineTypes.join(', ')
	const panelTitle = __('Headline Type', process.env.VUE_APP_TEXTDOMAIN)
	const typePanelTitle = (
		<span className="aioseo-headline-analyzer-panel-types-title">
			{panelTitle}
			<span>{headlineTypes}</span>
		</span>
	)
	const typeLinkText = sprintf(
		__(
			'Headlines that are lists and how-to get more engagement on average than other types of headlines. %1s%2sLearn More%3s →',
			process.env.VUE_APP_TEXTDOMAIN
		),
		'<br /><br />',
		'<a href="https://optinmonster.com/why-these-21-headlines-went-viral-and-how-you-can-copy-their-success/" target="_blank" className="aioseo-headline-analyzer-link"><span>',
		'</span></a>'
	)

	return (
		<Fragment>
			<PanelBody
				title={typePanelTitle}
				className="aioseo-headline-analyzer-panel-types"
			>
				<PanelRow>
					<div className="aioseo-headline-analyzer-panel-first-block">
						<h4>{headlineTypes}</h4>
						<p dangerouslySetInnerHTML={{ __html: typeLinkText }}></p>
					</div>
				</PanelRow>
			</PanelBody>
		</Fragment>
	)
}

export default HeadlinePanelType