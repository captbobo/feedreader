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
    /* This suite is all about the RSS feeds definitions,
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs', function(){
           allFeeds.forEach(function(e){
             expect(e['url']).not.toBe('');
             expect(e['url']).not.toBe(undefined);

           })
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function(){
           allFeeds.forEach(function(e){
             // First one doesn't work while others does
             // expect(e['name']).toEqual(jasmine.anything());
             expect(e['name']).not.toBe('');
             expect(e['name']).not.toBe(null);
             expect(e['name']).not.toBe(undefined);
           })
         })

    });

    describe('The menu', function(){

        /* Tests that ensures the menu element is hidden by default.
         */
         it('is hidden', function(){
           let body = $('body'),
           menuPos = $('.slide-menu').position();

           expect(body.hasClass('menu-hidden')).toBe(true);
           expect(menuPos.left).toBeLessThan(-191);
          })

         /* Tests menu visibility changes when the menu icon is clicked.
          * Checks if the first click triggers click event and hiding
          * and the second click triggers it back
          *
          * This part below was largely from pablo-az's answer on stackoverflow:
          * https://stackoverflow.com/a/50375478/9144800
          *
          * and
          *
          * https://www.htmlgoodies.com/beyond/javascript/js-ref/testing-dom-events-using-jquery-and-jasmine-2.0.html
          *
          */

          it('toggles shown/hidden when clicked', function(){
            let spyEvent = spyOnEvent('.menu-icon-link', 'click');

            // first click
            $('.menu-icon-link').click();
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyEvent).toHaveBeenTriggered();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // second click
            $('.menu-icon-link').click();
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyEvent).toHaveBeenTriggered();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          })

    describe('Initial Entries', function(){
      let id = 0, cb;
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(){
           let loadFeed = spyOn(window, 'loadFeed').and.callThrough();
           // window.loadFeed(id, cb);
           // done();
         })

         it('loadFeed called & at least 1 entry in feed', function(done){
            expect(loadFeed).toHaveBeenCalled();
            expect($('.feed').contents('entry')).not.toBe(0);
            done();
         })

    })

    describe('New Feed Selection', function(){
      let container = $('.feed');
      let containerEmpty = spyOnEvent()

      beforeEach(function(done){
        spyOn(container, 'empty').and.callThrough();
        container.empty();
        spyOn(container, 'append').and.callThrough();
        container.append();
        done();
      })

      afterEach(function(){
        container.empty.calls.reset();
      })
      // Tests if the empty() is called on feed container
      it('feed emptied and new feed called',function(done){
        expect(container.empty).toHaveBeenCalled();
        expect(container.append).toHaveBeenCalled();
        done();
      })
    })
  })

}());
