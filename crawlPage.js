chrome.runtime.onMessage.addListener(function(request, sender, sendRes){
	if (request.action == "crawl") {
		var rows = $(".yui-dt-data").find("tr");
		notes = [];
		rows.each( function(idx, ele) {
			var note = {
				id: $(ele).find(".yui-dt0-col-loanGUID > div > span").text(),
				price : $(ele).find(".yui-dt0-col-asking_price > div").text(),
				markup: $(ele).find(".yui-dt0-col-markup_discount > div").text(),
				ytm: $(ele).find(".yui-dt0-col-ytm > div").text()
			};
			notes.push(note);
		});

		alert(JSON.stringify(notes));
		sendRes(notes);
	}
});
