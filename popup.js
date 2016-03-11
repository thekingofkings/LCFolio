window.onload = function() {

	var details = {tabId: 1};
	chrome.pageAction.getPopup( details, function(res) {
		console.log("get html of popup");
		console.log(res);
		console.log(details);
	});



}
