chrome.runtime.onMessage.addListener(collectNotes);



function collectNotes(request, sender, sendRes){
	if (request.action == "crawl") {
		var rows = $(".yui-dt-data").find("tr");
		notes = [];
		rows.each( function(idx, ele) {
			var link = $(ele).find(".yui-dt0-col-loan_status > div > a").attr("href");
			// visit loan page for more information

			$.get(link, function( loan_page ) {
				var purpose = $(loan_page).find(".data-summary > h3").text().match(/Purpose: (.*) (Loan/)[1];
				alert(purpose);

			});


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
}





