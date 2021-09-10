const Clipboard = require('clipboard/dist/clipboard.min.js')

const VueClipboardConfig = {
	autoSetContainer : false,
	appendToBody     : true // This fixes IE, see #50
}

const VueClipboard = {
	install : function (Vue) {
		Vue.prototype.$clipboardConfig = VueClipboardConfig
		Vue.prototype.$copyText = function (text, container) {
			return new Promise(function (resolve, reject) {
				const fakeElement = document.createElement('button')
				const clipboard = new Clipboard(fakeElement, {
					text      : function () { return text },
					action    : function () { return 'copy' },
					container : 'object' === typeof container ? container : document.body
				})
				clipboard.on('success', function (e) {
					clipboard.destroy()
					resolve(e)
				})
				clipboard.on('error', function (e) {
					clipboard.destroy()
					reject(e)
				})
				if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement)
				fakeElement.click()
				if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement)
			})
		}

		Vue.directive('clipboard', {
			bind : function (el, binding) {
				if ('success' === binding.arg) {
					el._vClipboard_success = binding.value
				} else if ('error' === binding.arg) {
					el._vClipboard_error = binding.value
				} else {
					const clipboard = new Clipboard(el, {
						text      : function () { return binding.value },
						action    : function () { return 'cut' === binding.arg ? 'cut' : 'copy' },
						container : VueClipboardConfig.autoSetContainer ? el : undefined
					})
					clipboard.on('success', function (e) {
						const callback = el._vClipboard_success
						callback && callback(e)
					})
					clipboard.on('error', function (e) {
						const callback = el._vClipboard_error
						callback && callback(e)
					})
					el._vClipboard = clipboard
				}
			},
			update : function (el, binding) {
				if ('success' === binding.arg) {
					el._vClipboard_success = binding.value
				} else if ('error' === binding.arg) {
					el._vClipboard_error = binding.value
				} else {
					el._vClipboard.text = function () { return binding.value }
					el._vClipboard.action = function () { return 'cut' === binding.arg ? 'cut' : 'copy' }
				}
			},
			unbind : function (el, binding) {
				if ('success' === binding.arg) {
					delete el._vClipboard_success
				} else if ('error' === binding.arg) {
					delete el._vClipboard_error
				} else {
					el._vClipboard.destroy()
					delete el._vClipboard
				}
			}
		})
	},
	config : VueClipboardConfig
}

module.exports = VueClipboard