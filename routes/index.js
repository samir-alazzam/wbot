const express = require('express');
const router = express.Router();
const invetoryBot = require('../api/inventoryBot');

/* Sample api POST request */
router.post('/additem', function(req, res, next) {

    invetoryBot.writeToSheets(req.body, (result) => {
        console.log("#######" + result);

        if (result) {
            res.status(200).json({"message": "Added to Google Sheets"});
        } else {
            res.status(500).json({"message": "Error adding to Google Sheets"});
        }
    });
});

module.exports = router;
