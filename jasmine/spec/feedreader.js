$(function() {
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed has a defined and not empty URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has a defined and not empty name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
         });
    });

    describe('The menu', function() {
        /* When the body is assigned the 'menu-hidden' class then
         * the .slide-menu element is translated out of the window
         * by a css 'transform: translate3d' so it is NOT visible.
         * Executing the following method checks if menu is currently
         * visible or not
         */
        function menuIsVisible() {
            return !$('body').hasClass('menu-hidden');
        }
        /* Test that ensures the menu element is
         * hidden by default
         */
         it('is hidden when page is loaded', function() {
            expect(menuIsVisible()).toBeFalsy();
         });
        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked
         */
         it('his visibility is triggered when the menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect(menuIsVisible()).toBeTruthy();
            /* Clicking again should trigger the menu visibility once more
             */
            $('.menu-icon-link').click();
            expect(menuIsVisible()).toBeFalsy();
         });
    });

    describe('Initial Entries', function() {
        /* This method returns the number of <a> links inside the .feed <div>
         */
        function entryElements() {
            return $('.feed > a').length;
        }
        /* Once loadFeed() has been executed the done(), passed to loadFeed()
         * as the second argument, is called from loadFeed() itself
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('when loadFeed function is completed, there is at least one .entry element inside the .feed <div>', function() {
            expect(entryElements()).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function() {
        /* Variables to compare contents before and after the
         * new feed loading (I'm also checking that the header
         * title is actually changing)
         */
        var currentFeedContent,
            currentHeaderTitle,
            newFeedContent,
            newHeaderTitle;
        /* The feedback function passed to the loadFeed function
         * gets the page content after the first feed loading. After
         * that, it calls loadFeed() once again passing it a new feed
         * id and a new callback function that will get the new page
         * content and call done()
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                currentFeedContent = $('.feed').html();
                currentHeaderTitle = $('.header-title').html();
                loadFeed(1, function() {
                    newFeedContent = $('.feed').html();
                    newHeaderTitle = $('.header-title').html();
                    done();
                });
            });
        });
        /* After the test I need to reload the initial content
         */
        afterEach(function() {
            loadFeed(0);
        });

        it('when a new feed is loaded the content changes', function() {
            expect(currentFeedContent).not.toBe(newFeedContent);
            expect(currentHeaderTitle).not.toBe(newHeaderTitle);
        });
    });
}());