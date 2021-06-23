<template>
	<div class="aioseo-google-search-preview">
		<div class="domain">
			<slot name="domain">
				{{ $aioseo.urls.domain }}
			</slot>
		</div>

		<div
			class="site-title"
			v-html="truncate(parseTags(title), 100)"
		/>

		<div
			class="meta-description"
			v-html="truncate(parseTags(description))"
		/>
	</div>
</template>

<script>
import { Tags } from '@/vue/mixins'
export default {
	mixins : [ Tags ],
	props  : {
		title : {
			type     : String,
			required : true
		},
		description : {
			type     : String,
			required : true
		},
		separator : {
			type     : String,
			required : true
		}
	}
}
</script>

<style lang="scss">
.aioseo-google-search-preview {
	padding: 32px 30px;
	border: 1px solid $border;

	.domain {
		font-size: 14px;
		line-height: 1.3;
		color: #3C4043;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.site-title {
		font-size: 20px;
		line-height: 1.3;
		color: #1A0DAB;
		margin: 3px 0;
	}

	.meta-description {
		max-width: 600px;
		font-size: 14px;
		line-height: 1.4;
		color: #52565A;
	}
}
.edit-post-sidebar {
	.domain {
		font-size: 13px;
	}
	.site-title {
		font-size: 16px;
	}
	.meta-description {
		font-size: 12px;
	}
}
.aioseo-modal-content {
	.domain,
	.meta-description {
		font-size: 14px;
	}
	.site-title {
		font-size: 20px;
	}
}
</style>