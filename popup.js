window.onload = function() {

	chrome.tabs.query( {active: true}, function(tabs) {
		tab = tabs[0];
		$("#task").text("Crawl notes in Tab " + tab.id);
		chrome.tabs.sendMessage( tab.id, {action: "crawl"}, 
				function(response) {
					if (chrome.runtime.lastError) {
						alert("There is a runtim error in Chrome: " + chrome.runtime.lastError.message);
					} else {
						alert(JSON.stringify(response));
						$(response).each( function(idx, ele) {
							$("#notes").append('<tr><td>' + ele.id + "</td><td>" + ele.price + 
								"</td><td>" + ele.markup + "</td><td>" + ele.ytm + "</td><td>" + 
								ele.purpose + "</td><td>" + ele.loan_amount + "</td><td>" + 
								ele.promise + "</td></tr>");
						});
					}
				});
	});

}
