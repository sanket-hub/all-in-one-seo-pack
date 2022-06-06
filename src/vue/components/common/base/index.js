import { autoLoadComponents } from '@/vue/utils/components'

import Button from './Button'
import Input from './Input'
import Select from './Select'
import Toggle from './Toggle'

const components = {
	Button,
	Input,
	Select,
	Toggle
}

autoLoadComponents(components, 'Base')