<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-NVUE
			plus.screen.lockOrientation('portrait-primary');
			// #endif
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
