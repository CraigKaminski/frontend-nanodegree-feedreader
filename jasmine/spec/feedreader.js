/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This test suite covers the RSS feeds definition,
    * the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This tests makes sure that the allFeeds variable have
         * been defined and that they are not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test examines each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL
         * is not empty.
         */
        it('have non-empty URLs defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null);
            });
        });


        /* This test examines each feed in the allFeeds object
         * and ensures it has a name defined and that the name
         * is not empty.
         */
        it('have non-empty names defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
            });
        });
    });


    /* This test suite is concerned with the functionality
     * of the menu.
     */
    describe('The menu', function() {
        /* This test ensures the menu element is hidden by default. */
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });


        /* This test ensures the menu changes visibility when the
         * menu icon is clicked. It verifies the visibility changes
         * when clicked and then changes again when clicked a second
         * time.
         */
        it('changes visibility when clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });


    /* This test suite is focused on the entries present when
     * the page is first loaded.
     */
    describe('Initial Entries', function() {
        /* This test ensures there is at least a single entry present after
         * the asynchronous call to load the feeds returns. The beforeEach
         * function is used to notify us when the asynchronous call completes
         * so we know when to run the actual test.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });


        it('are greater than zero', function(done) {
            expect($('.feed > .entry-link').length).toBeGreaterThan(0);
            done();
        });
    });


    /* This test suite is concerned with the entries present after
     * a new feed is selected.
     */
    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded that the list of
         * entries actually changes. Two variables are created to hold the
         * list of entries present before and after a new feed is selected.
         * The beforeEach function is used because loading a feed is an
         * asynchronous call.
         */
        var originalFeeds,
            newFeeds;


        beforeEach(function(done) {
            /* First loadFeed is called and a callback is provided. The
             * callback first saves the list of entries loaded and then
             * calls loadFeed again for a different feed. This second
             * callback saves the entries loaded from the second feed
             * and then calls done to let us know the asynchronous calls
             * are done.
            */
            loadFeed(0, function() {
                originalFeeds = $('.feed').html();
                loadFeed(1, function() {
                    newFeeds = $('.feed').html();
                    done();
                });
            });
        });


        /* We then ensure a different list of entries are present
         * between the two calls to loadFeed.
        */
        it('causes content to change', function(done) {
            expect(originalFeeds).not.toEqual(newFeeds);
            done();
        });


        afterAll(function() {
            loadFeed(0);
        });
    });
}());
