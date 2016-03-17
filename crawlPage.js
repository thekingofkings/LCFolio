chrome.runtime.onMessage.addListener(collectNotes);



function collectNotes(request, sender, sendRes){
	if (request.action == "crawl") {
		var rows = $(".yui-dt-data").find("tr");
		var cnt = 0;
		notes = [];
		rows.each( function(idx, ele) {
			var link = $(ele).find(".yui-dt0-col-loan_status > div > a").attr("href");
			// visit loan page for more information
			var note = {
				id: $(ele).find(".yui-dt0-col-loanGUID > div > span").text(),
				price : $(ele).find(".yui-dt0-col-asking_price > div").text(),
				markup: $(ele).find(".yui-dt0-col-markup_discount > div").text(),
				ytm: $(ele).find(".yui-dt0-col-ytm > div").text(),
				purpose: null,
				loan_amount: null,
				promise: "nolog" 
			};

			$.get(link, function( loan_page ) {
				cnt += 1;
				var purpose = $(loan_page).find(".data-summary > h3").text().match(/Purpose: (.*) (?=\(Loan id: \d+\))/)[1];
				note.purpose = purpose;
				var loan_amt = $(loan_page).find("#object-details > div:nth-child(1) tbody > tr:nth-child(3) > td").text();
				var loan_amt_num = parseInt( loan_amt.replace(/[$,]+/g, "") );
				note.loan_amount = loan_amt_num;
				if (loan_amt_num <= 26000) {
					var collection_log = $(loan_page).find("#lcLoanPerf2 tbody").html();
					var clog_latest = $(loan_page).find("#lcLoanPerf2 tbody > tr").html();
					var loan_status = $(loan_page).find("#object-details > div:nth-child(1) tbody > tr:nth-child(6) > td").text();
					if (collection_log == null ) {
						notes.push(note);
					} else if (loan_status.indexOf("On Payment Plan") > -1) {
						note.promise = "plan";
						notes.push(note);
					} else if (clog_latest.indexOf("promised to pay") > -1) {
						note.promise = "latest promise";
						notes.push(note);
					} else if (collection_log.indexOf("promised to pay") > -1)  {
						note.promise = "old promise"; 
						notes.push(note);
					}
				}

				if (cnt == rows.length) {
					//alert(JSON.stringify(notes));
					sendRes(notes);
				}
			});


		});

		return true;
	}
}





