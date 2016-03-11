chrome.runtime.onMessage.addListener(function(request, sender, sendRes){
	if (request.action == "crawl")
		alert("Start crawl this page");
});
