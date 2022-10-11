export default {
	options : {
		main : {
			affiliatePrefix : '',
			wordsToIgnore   : '',
			skipSentences   : 3,
			postTypes       : {
				all      : true,
				included : null
			},
			postStatuses : {
				all      : true,
				included : null
			},
			excludePosts : []
		}
	},
	internalOptions : {
		internal : {
			minimumLinkScanDate       : null,
			minimumSuggestionScanDate : null,
			dismissedAlerts           : {
				suggestions : false
			}
		}
	},
	overview : {
		totals : {
			crawledPosts   : 0,
			externalLinks  : 0,
			internalLinks  : 0,
			affiliateLinks : 0,
			orphanedPosts  : 0
		},
		linkingOpportunities : [],
		mostLinkedDomains    : []
	},
	domainsReport : {
		rows   : [],
		totals : {
			page  : 1,
			pages : 1,
			total : 1
		},
		innerPagination : {}
	},
	linksReport : {
		rows   : [],
		totals : {
			page  : 1,
			pages : 1,
			total : 1
		},
		prioritizedPosts : [],
		counts           : [
			{
				inboundInternal     : 0,
				outboundInternal    : 0,
				affiliate           : 0,
				external            : 0,
				suggestionsInbound  : 0,
				suggestionsOutbound : 0
			}
		]
	},
	postReport : {
		inboundInternal     : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
		outboundInternal    : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
		affiliate           : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
		external            : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
		suggestionsInbound  : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
		suggestionsOutbound : { rows: [], totals: { page: 1, pages: 1, total: 0 } }
	},
	suggestionsScan : {
		percent             : 0,
		showProcessingPopup : false
	}
}