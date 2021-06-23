import Quill from 'quill'

const Clipboard = Quill.import('modules/clipboard')
const Delta     = Quill.import('delta')

function CustomClipboard () {
	return Reflect.construct(Clipboard, arguments, CustomClipboard)
}

CustomClipboard.prototype.onPaste = function (e) {
	const self      = this
	const options   = this.options
	const range     = this.quill.getSelection()
	const scrollTop = this.quill.scrollingContainer.scrollTop
	let delta       = new Delta().retain(range.index)

	if (e.defaultPrevented || !this.quill.isEnabled()) return

	this.container.focus()
	this.quill.selection.update(Quill.sources.SILENT)
	setTimeout(function () {
		delta = delta.concat(self.convert()).delete(range.length)

		if (false === options.newLines) {
			delta.ops.map(function (op) {
				if ('string' === typeof op.insert) {
					op.insert = op.insert.replace(/(\r\n|\n|\r)/gm, ' ')
				}
				return op
			})
		}

		self.quill.updateContents(delta, Quill.sources.USER)
		// range.length contributes to delta.length()
		self.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT)
		self.quill.scrollingContainer.scrollTop = scrollTop
		self.quill.focus()
	}, 1)
}

Reflect.setPrototypeOf(CustomClipboard.prototype, Clipboard.prototype)
Reflect.setPrototypeOf(CustomClipboard, Clipboard)

Quill.register('modules/clipboard', CustomClipboard, true)