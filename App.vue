<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-NVUE
			plus.screen.lockOrientation('portrait-primary');
			// #endif
		},
		onShow: function() {
			// document.title = "打铁123-打铁从这里开始！";
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
