export default {
	// We have to mirror the PHP options here or else the state won't be reactive.
	// Although we only have to set null here as the PHP options will do the rest.
	options : {
		main : {
			method : null
		},
		server : {
			autoWriteHtaccess : null
		},
		logs : {
			log404 : {
				enabled : null,
				length  : null
			},
			redirects : {
				enabled : null,
				length  : null
			},
			external   : null,
			httpHeader : null,
			ipAddress  : {
				enabled : null,
				level   : null
			}
		},
		monitor : {
			postTypes : {
				all      : null,
				included : null
			},
			trash : null
		},
		cache : {
			httpHeader : {
				enabled : null,
				length  : null
			},
			objectCache : null
		},
		redirectDefaults : {
			ignoreCase   : null,
			ignoreSlash  : null,
			redirectType : null,
			queryParam   : null
		},
		fullSite : {
			relocate : {
				enabled   : null,
				newDomain : null
			},
			aliases   : [],
			canonical : {
				enabled         : null,
				httpToHttps     : null,
				preferredDomain : null
			},
			httpHeaders : []
		},
		advanced404s : {
			redirectToHome              : false,
			redirectToParent            : false,
			redirectToParentWoocommerce : false
		}
	},
	rows            : [],
	logs            : [],
	logs404         : [],
	filters         : [],
	selectedFilters : {},
	sort            : {
		logs    : 'last_accessed',
		logs404 : 'last_accessed'
	},
	sortDir : {
		logs    : 'desc',
		logs404 : 'desc'
	},
	totals : {
		main : {
			total : 0,
			pages : 0,
			page  : 1
		},
		total404 : {
			total : 0,
			pages : 0,
			page  : 1
		},
		logs : {
			total : 0,
			pages : 0,
			page  : 1
		}
	},
	tableFields : {
		main : {
			searchTerm    : '',
			paginatedPage : 1
		},
		logs : {
			searchTerm    : '',
			paginatedPage : 1
		},
		logs404 : {
			searchTerm    : '',
			paginatedPage : 1
		}
	},
	server : {
		redirectTest : {
			testing : false,
			failed  : false
		}
	}
}