var turnOnShim = require('../shim');
var turnOnDebug = require('../debug');
var waitAndClick = require('../helpers').waitAndClick;
var checkForText = require('../helpers').checkForText;
var checkForSelector = require('../helpers').checkForSelector;
var setup = require('../setup.js').setup;
var needsSetup = require('../setup.js').needsSetup;


casper.test.begin('Apps Mall search returns listings', 8, function (test) {

    if (needsSetup()) {
        setup(casper);
    }

    casper.then(function () {
        checkForText('Featured', this);
    });

    casper.then(function () {
        checkForSelector("input[placeholder='Search']", this, "searchBox");
    });

    // Search for text and clear
    casper.then(function () {
        var selector = "input[placeholder='Search']";
        this.sendKeys(selector, 'a');
        this.click("form[role='search']");
    });

    casper.then(function() {
        checkForText('Search Results', this);
    });

    casper.then(function() {
        checkForSelector('.SearchListingTile', this);
    });

    casper.then(function () {
        waitAndClick(".clearButton", this);
    });

    casper.then(function() {
        checkForText('Featured', this);
    });


    // Search by category and clear
    casper.then(function () {
        waitAndClick("li[data-reactid*='Communication']", this, "communicationCategoryButton");
    });

    casper.then(function() {
        checkForText('Search Results', this);
    });

    casper.then(function() {
        checkForSelector('.SearchListingTile', this);
    });

    casper.then(function () {
        waitAndClick("li[data-reactid*='Communication']", this, "communicationCategoryButton2");
    });

    casper.then(function() {
        checkForText('Featured', this);
    });

    // Search by listing type
    // TODO
    casper.then(function () {
        waitAndClick("#react-select-box-1", this, "Listing Type Drop Down");
    });

    casper.then(function () {
        waitAndClick("#react-select-box-1-0", this, "Web Application");
    });

    // Search by organization
    // TODO
    casper.then(function () {
        waitAndClick(".react-select-box-label", this, "Organization");
    });

    casper.run(function () {
        test.done();
    });
});
