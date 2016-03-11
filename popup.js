chrome.tabs.getCurrent( function(tab) {
	var u = tab.url;

	chrome.console.log(u);
});
