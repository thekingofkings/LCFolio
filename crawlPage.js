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
				promise: false
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
					if (collection_log == null || clog_latest.indexOf("promised to pay" > -1) || collection_log.indexOf("promised to pay") > -1)  {
						note.promise = true; 
					}
					notes.push(note);
				}

				if (cnt == rows.length) {
					alert(JSON.stringify(notes));
					sendRes(notes);
				}
			});


		});

		return true;
	}
}





