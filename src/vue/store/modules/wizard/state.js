export default {
	currentStage : 'welcome',
	// The 'welcome' and 'success' stages are purposefully missing from this list because it is not one of the "steps".
	stages       : [
		'import',
		'category',
		'additional-information',
		'features',
		'search-appearance',
		'smart-recommendations',
		'license-key'
	],
	importers : [],
	category  : {
		category        : 'blog',
		categoryOther   : null,
		siteTitle       : '',
		metaDescription : ''
	},
	additionalInformation : {
		siteRepresents    : 'organization',
		person            : null,
		organizationName  : null,
		organizationLogo  : null,
		personName        : null,
		personLogo        : null,
		phone             : null,
		contactType       : null,
		contactTypeManual : null,
		socialShareImage  : null,
		social            : {
			profiles : {
				sameUsername : {
					enable   : true,
					username : null,
					included : [
						'facebookPageUrl', 'twitterUrl', 'pinterestUrl', 'instagramUrl', 'youtubeUrl', 'linkedinUrl'
					]
				},
				urls : {
					facebookPageUrl : null,
					twitterUrl      : null,
					instagramUrl    : null,
					pinterestUrl    : null,
					youtubeUrl      : null,
					linkedinUrl     : null,
					tumblrUrl       : null,
					yelpPageUrl     : null,
					soundCloudUrl   : null,
					wikipediaUrl    : null,
					myspaceUrl      : null,
					googlePlacesUrl : null
				}
			}
		}
	},
	features         : [],
	searchAppearance : {
		underConstruction : false,
		postTypes         : {
			postTypes : {
				all      : true,
				included : [
					'post',
					'page',
					'attachment',
					'product'
				]
			}
		},
		multipleAuthors         : true,
		redirectAttachmentPages : true
	},
	smartRecommendations : {
		accountInfo   : null,
		usageTracking : false
	},
	licenseKey : null
}