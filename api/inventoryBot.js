//
const GoogleSpreadsheet = require('google-spreadsheet');
const SHEET_ID = "1kI5iTETtoYzGsdQf_OJOfCgTqmGE6AQ9PZbPx8MYTks";
const secret = require('../secret/index.json');


module.exports = {
    writeToSheets: function (data, callback) {
        const google_creds = validateCreds(secret.google_creds) ? secret.google_creds : false;
        const doc = new GoogleSpreadsheet(SHEET_ID);

        if (google_creds) {
            doc.useServiceAccountAuth(google_creds, (err) => {
                console.log("#######" + err);

                if (err) {
                    callback(false);
                } else {
                    doc.addRow(1, {
                        item_id: data.item_id,
                        item_name: data.item_name,
                        quantity: data.quantity,
                        holder: data.holder
                    }, function (err) {
                        if (err) {
                            callback(false);
                        } else {
                            callback(true);
                        }
                    });
                }
            });
        } else {
            callback(false);
        }
    }

};

function validateCreds(creds) {
    if (creds === null) {
        console.log("Could not validate creds file");
        return false
    } else {
        return true
    }
}