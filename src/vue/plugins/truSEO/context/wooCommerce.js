import store from '@/vue/store'

export const watchWooCommerce = () => {
	if (store.getters.isUnlicensed) {
		return
	}
	let productSku   = '',
		productPrice = '',
		productBrand = ''

	window.addEventListener('change', (event) => {
		if ('INPUT' !== event.target.tagName) {
			return
		}

		const sku = document.getElementById('_sku')
		if (sku) {
			productSku = sku.value
		}
		store.commit('live-tags/updateWooCommerceSku', productSku)

		const salePrice = document.getElementById('_sale_price')
		const price     = document.getElementById('_regular_price')

		if (salePrice) {
			productPrice = salePrice.value
		}
		if (!productPrice && price) {
			productPrice = price.value
		}

		const parsedProductPrice = window.aioseo.data.wooCommerce.currencySymbol + parseFloat(productPrice || 0).toFixed(2)
		store.commit('live-tags/updateWooCommercePrice', parsedProductPrice)

		let brands = document.querySelectorAll('#post input[name="tax_input[product_brand][]"]:checked')
		if (!brands.length) {
			brands = document.querySelectorAll('#post input[name="tax_input[pwb-brand][]"]:checked')
		}
		if (brands.length) {
			if (productBrand !== brands[0].parentNode.innerText) {
				productBrand = brands[0].parentNode.innerText
				store.commit('live-tags/updateWooCommerceBrand', brands[0].parentNode.innerText)
			}
		} else {
			if ('' !== productBrand) {
				productBrand = ''
				store.commit('live-tags/updateWooCommerceBrand', '')
			}
		}
	})
}