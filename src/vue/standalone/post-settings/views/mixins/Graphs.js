import Article from '../AIOSEO_VERSION/partials-schema/graphs/Article'
import Book from '../AIOSEO_VERSION/partials-schema/graphs/Book'
import Course from '../AIOSEO_VERSION/partials-schema/graphs/Course'
import Dataset from '../AIOSEO_VERSION/partials-schema/graphs/Dataset'
import Event from '../AIOSEO_VERSION/partials-schema/graphs/Event'
import FAQPage from '../AIOSEO_VERSION/partials-schema/graphs/FAQPage'
import FactCheck from '../AIOSEO_VERSION/partials-schema/graphs/FactCheck'
import HowTo from '../AIOSEO_VERSION/partials-schema/graphs/HowTo'
import JobPosting from '../AIOSEO_VERSION/partials-schema/graphs/JobPosting'
import Movie from '../AIOSEO_VERSION/partials-schema/graphs/Movie'
import Music from '../AIOSEO_VERSION/partials-schema/graphs/Music'
import Person from '../AIOSEO_VERSION/partials-schema/graphs/Person'
import Product from '../AIOSEO_VERSION/partials-schema/graphs/Product'
import Recipe from '../AIOSEO_VERSION/partials-schema/graphs/Recipe'
import Service from '../AIOSEO_VERSION/partials-schema/graphs/Service'
import SoftwareApplication from '../AIOSEO_VERSION/partials-schema/graphs/SoftwareApplication'
import Video from '../AIOSEO_VERSION/partials-schema/graphs/Video'
import WebPage from '../AIOSEO_VERSION/partials-schema/graphs/WebPage'

import SvgArticle from '@/vue/components/common/svg/schema/Article'
import SvgBook from '@/vue/components/common/svg/schema/Book'
import SvgCircleQuestionMark from '@/vue/components/common/svg/circle/QuestionMark'
import SvgCustomSchema from '@/vue/components/common/svg/schema/CustomSchema'
import SvgCopy from '@/vue/components/common/svg/Copy'
import SvgCourse from '@/vue/components/common/svg/schema/Course'
import SvgDataset from '@/vue/components/common/svg/schema/Dataset'
import SvgEvent from '@/vue/components/common/svg/schema/Event'
import SvgFaqPage from '@/vue/components/common/svg/schema/FaqPage'
import SvgFactCheck from '@/vue/components/common/svg/schema/FactCheck'
import SvgFile from '@/vue/components/common/svg/File'
import SvgFileEdit from '@/vue/components/common/svg/schema/FileEdit'
import SvgGoogleSmall from '@/vue/components/common/svg/logo/GoogleSmall'
import SvgHowTo from '@/vue/components/common/svg/schema/HowTo'
import SvgJobPosting from '@/vue/components/common/svg/schema/JobPosting'
import SvgMovie from '@/vue/components/common/svg/schema/Movie'
import SvgMusic from '@/vue/components/common/svg/schema/Music'
import SvgPencil from '@/vue/components/common/svg/Pencil'
import SvgPerson from '@/vue/components/common/svg/schema/Person'
import SvgProduct from '@/vue/components/common/svg/schema/Product'
import SvgRecipe from '@/vue/components/common/svg/schema/Recipe'
import SvgService from '@/vue/components/common/svg/schema/Service'
import SvgSoftwareApplication from '@/vue/components/common/svg/schema/SoftwareApplication'
import SvgTerminal from '@/vue/components/common/svg/schema/Terminal'
import SvgTrash from '@/vue/components/common/svg/schema/Trash'
import SvgVideo from '@/vue/components/common/svg/schema/Video'
import SvgWebPage from '@/vue/components/common/svg/schema/WebPage'

export default {
	components : {
		Article,
		Book,
		Course,
		Dataset,
		Event,
		FAQPage,
		FactCheck,
		HowTo,
		JobPosting,
		Movie,
		Music,
		Person,
		Product,
		Recipe,
		Service,
		SoftwareApplication,
		Video,
		WebPage,
		SvgArticle,
		SvgBook,
		SvgCircleQuestionMark,
		SvgCustomSchema,
		SvgCopy,
		SvgCourse,
		SvgDataset,
		SvgEvent,
		SvgFaqPage,
		SvgFactCheck,
		SvgFile,
		SvgFileEdit,
		SvgGoogleSmall,
		SvgHowTo,
		SvgJobPosting,
		SvgMovie,
		SvgMusic,
		SvgPencil,
		SvgPerson,
		SvgProduct,
		SvgRecipe,
		SvgService,
		SvgSoftwareApplication,
		SvgTerminal,
		SvgTrash,
		SvgVideo,
		SvgWebPage
	},
	data () {
		return {
			graphs : [
				{
					slug      : 'article',
					graphName : 'Article',
					label     : this.$t.__('Article', this.$td)
				},
				{
					slug      : 'book',
					graphName : 'Book',
					label     : this.$t.__('Book', this.$td)
				},
				{
					slug      : 'course',
					graphName : 'Course',
					label     : this.$t.__('Course', this.$td)
				},
				{
					slug      : 'dataset',
					graphName : 'Dataset',
					label     : this.$t.__('Dataset', this.$td)
				},
				{
					slug      : 'event',
					graphName : 'Event',
					label     : this.$t.__('Event', this.$td)
				},
				{
					slug      : 'faq-page',
					graphName : 'FAQPage',
					label     : this.$t.__('FAQ', this.$td)
				},
				{
					slug      : 'fact-check',
					graphName : 'FactCheck',
					label     : this.$t.__('Fact Check', this.$td)
				},
				{
					slug      : 'how-to',
					graphName : 'HowTo',
					label     : this.$t.__('How To', this.$td)
				},
				{
					slug      : 'job-posting',
					graphName : 'JobPosting',
					label     : this.$t.__('Job Posting', this.$td)
				},
				{
					slug      : 'movie',
					graphName : 'Movie',
					label     : this.$t.__('Movie', this.$td)
				},
				{
					slug      : 'music',
					graphName : 'Music',
					label     : this.$t.__('Music', this.$td)
				},
				{
					slug      : 'person',
					graphName : 'Person',
					label     : this.$t.__('Person', this.$td)
				},
				{
					slug      : 'product',
					graphName : 'Product',
					label     : this.$t.__('Product', this.$td)
				},
				{
					slug      : 'recipe',
					graphName : 'Recipe',
					label     : this.$t.__('Recipe', this.$td)
				},
				{
					slug      : 'service',
					graphName : 'Service',
					label     : this.$t.__('Service', this.$td)
				},
				{
					slug      : 'software-application',
					graphName : 'SoftwareApplication',
					label     : this.$t.__('Software', this.$td)
				},
				{
					slug      : 'video',
					graphName : 'Video',
					label     : this.$t.__('Video', this.$td)
				},
				{
					slug      : 'web-page',
					graphName : 'WebPage',
					label     : this.$t.__('Web Page', this.$td)
				}
			],
			childGraphs : {
				Article : [
					{
						childGraphName : 'BlogPosting',
						label          : this.$t.__('Blog Post', this.$td)
					},
					{
						childGraphName : 'NewsArticle',
						label          : this.$t.__('News Article', this.$td)
					}
				],
				Music : [
					{
						childGraphName : 'MusicAlbum',
						label          : this.$t.__('Music Album', this.$td)
					},
					{
						childGraphName : 'MusicGroup',
						label          : this.$t.__('Music Group', this.$td)
					}
				],
				WebPage : [
					{
						childGraphName : 'WebPage',
						label          : this.$t.__('Web Page', this.$td)
					},
					{
						childGraphName : 'AboutPage',
						label          : this.$t.__('About Page', this.$td)
					},
					{
						childGraphName : 'CheckoutPage',
						label          : this.$t.__('Checkout Page', this.$td)
					},
					{
						childGraphName : 'CollectionPage',
						label          : this.$t.__('Collection Page', this.$td)
					},
					{
						childGraphName : 'ContactPage',
						label          : this.$t.__('Contact Page', this.$td)
					},
					{
						childGraphName : 'ItemPage',
						label          : this.$t.__('Item Page', this.$td)
					},
					{
						childGraphName : 'MedicalPage',
						label          : this.$t.__('Medical Page', this.$td)
					},
					{
						childGraphName : 'ProfilePage',
						label          : this.$t.__('Profile Page', this.$td)
					},
					{
						childGraphName : 'RealEstateListing',
						label          : this.$t.__('Real Estate Listing', this.$td)
					},
					{
						childGraphName : 'SearchResultsPage',
						label          : this.$t.__('Search Results Page', this.$td)
					}
				]
			}
		}
	},
	methods : {
		getParentGraphName (graphName) {
			// First, check if the graph is a child.
			let parentGraph = ''
			Object.entries(this.childGraphs).forEach((graphs) => {
				const parentGraphName = graphs[0]
				graphs[1].forEach((graphObject) => {
					if (parentGraph) {
						return
					}

					// If it is a child, grab the parent's label and also grab the child's label.
					if (graphName === graphObject.childGraphName) {
						parentGraph = parentGraphName
					}
				})
			})

			return parentGraph || graphName
		}
	}
}