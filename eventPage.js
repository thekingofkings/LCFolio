
function check(tab_id, data, tab)
{
	if (tab.url.indexOf("www.lendingclub.com/foliofn/tradingInventory.action") > -1) 
	{
		chrome.pageAction.show(tab_id);
	}
}
chrome.tabs.onUpdated.addListener( check );



function check_onActivated( activeInfo )
{
	var tid = activeInfo.tabId;
	chrome.tabs.get( tid, function(tab) {
		if (tab.url.indexOf("www.lendingclub.com/foliofn/tradingInventory.action") > -1) 
		{
			chrome.pageAction.show(tid);
		}
	});
}
chrome.tabs.onActivated.addListener( check_onActivated );


/*
chrome.pageAction.onClicked.addListener( function(tab) {
	console.log(tab.url);
	console.log(tab.id);
});
*/
