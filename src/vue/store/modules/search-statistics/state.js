export default {
	isConnected         : false,
	hasInitialized      : false,
	latestAvailableDate : null,
	unverifiedSite      : false,
	range               : {
		start        : null,
		end          : null,
		compareStart : null,
		compareEnd   : null
	},
	rolling : null,
	loading : {
		seoStatistics           : false,
		keywords                : false,
		contentRankings         : false,
		postDetailSeoStatistics : false,
		postDetailKeywords      : false
	},
	data : {
		seoStatistics : {
			statistics : {
				clicks      : 0,
				impressions : 0,
				ctr         : 0,
				position    : 0,
				keywords    : 0,
				difference  : {
					clicks      : 0,
					impressions : 0,
					ctr         : 0,
					position    : 0
				}
			},
			intervals : [],
			pages     : {
				topPages : {
					rows : []
				},
				topWinning : {
					rows : []
				},
				topLosing : {
					rows : []
				},
				paginated : {
					rows   : [],
					totals : {
						page  : 0,
						pages : 0,
						total : 0
					}
				}
			}
		},
		keywords : {
			distribution          : [],
			distributionIntervals : [],
			topWinning            : [],
			topLosing             : [],
			topKeywords           : [],
			paginated             : {
				rows   : [],
				totals : {
					page  : 0,
					pages : 0,
					total : 0
				}
			}
		},
		contentRankings : {
			paginated : {
				rows   : [],
				totals : {
					page  : 0,
					pages : 0,
					total : 0
				}
			}
		},
		postDetail : {
			postId        : 0,
			seoStatistics : {
				intervals  : [],
				statistics : {
					clicks      : 0,
					impressions : 0,
					ctr         : 0,
					position    : 0,
					keywords    : 0,
					difference  : {
						clicks      : 0,
						impressions : 0,
						ctr         : 0,
						position    : 0
					}
				}
			},
			keywords : {
				paginated : {
					rows   : [],
					totals : {
						page  : 0,
						pages : 0,
						total : 0
					}
				}
			}
		}
	}
}