window.onload = function() {

	chrome.tabs.query( {active: true}, function(tabs) {
		tab = tabs[0];
		$("#turl").text(tab.url);
		$("#tid").text(tab.id);
		chrome.tabs.sendMessage( tab.id, {action: "crawl"}, null, 
				function(response) {
					$("#response").text(response);
				});
	});

}
