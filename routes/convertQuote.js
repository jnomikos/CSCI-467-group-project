/*
"The third interface (also in-house) allows to convert a quote into a purchase order
once the customer has indicated to go ahead with the order (the go ahead is
given outside of the scope of this system, e.g. via phone or snail mail). At this
time an additional final discount can be entered. The final amount is computed.
The purchase order is then sent to an external processing system (details
provided later) which answers with a processing date and sales commission rate
for the sales associate. The commission is computed and recorded for the quote
and in the sales associates accumulated commission. An email is sent to the
customer with all the purchase details, including the processing date."
*/

// Path: routes\convertQuote.js
// Compare this snippet from routes\convertQuote.js:

 router.get("/convertQuote", (req, res) => {
        console.log("Convert Quote");
            db.all(`SELECT * FROM quote`, (err, rows) => {
                if (err) {
                    console.log(err);
                }
                res.render("convertQuote", {rows: rows});
            }
        );
    });
