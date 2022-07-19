import metadata from './block.json'
import edit from './edit'
import save from './save'
import icon from './icon'

const {
	name,
	title,
	description,
	keywords,
	category,
	supports,
	attributes
} = metadata

export { metadata, name }

export const settings = {
	title,
	description,
	keywords,
	category,
	attributes,
	icon,
	supports,
	edit,
	save
}