// Adapted from code by Matt Walters https://www.mattwalters.net/posts/2018-03-28-hugo-and-lunr/

(function ($) {
    'use strict';
  
    $(document).ready(function () {
      const $searchInput = $('.custom-search input');
      const $searchContainer = $('.custom-search__container');
      const $searchResults = $('.custom-search-results');

      // Only initialize search if search elements exist
      if ($searchInput.length === 0) {
        return;
      }

      // Handle focus states for styling
      $searchInput.on('focus', function() {
        $searchContainer.addClass('has-focus');
      });

      $searchInput.on('blur', function() {
        if (!$(this).val()) {
          $searchContainer.removeClass('has-focus');
        }
      });

      $searchInput.on('input', function() {
        if ($(this).val()) {
          $searchContainer.addClass('has-focus');
        } else {
          $searchContainer.removeClass('has-focus');
        }
      });
  
      //
      // Register handler
      //

      $searchInput.on('change', (event) => {
        render($(event.target));

        // Hide keyboard on mobile browser
        // $searchInput.blur();
      });

      // Prevent reloading page by enter key on sidebar search.
      $searchInput.closest('form').on('submit', () => {
        return false;
      });

      //
      // Lunr
      //

      let idx = null; // Lunr index
      const resultDetails = new Map(); // Will hold the data for the search results (titles and summaries)

      // Set up for an Ajax call to request the JSON data file that is created by Hugo's build process
      $.ajax($searchInput.data('offline-search-index-json-src')).then((data) => {
        idx = lunr(function () {
          this.ref('ref');

          // If you added more searchable fields to the search index, list them here.
          // Here you can specify searchable fields to the search index - e.g. individual toxonomies for you project
          // With "boost" you can add weighting for specific (default weighting without boost: 1)
          this.field('title', { boost: 5 });
          this.field('categories', { boost: 3 });
          this.field('tags', { boost: 3 });
          // this.field('projects', { boost: 3 }); // example for an individual toxonomy called projects
          this.field('description', { boost: 2 });
          this.field('body');

          data.forEach((doc) => {
            this.add(doc);

            resultDetails.set(doc.ref, {
              title: doc.title,
              excerpt: doc.excerpt,
            });
          });
        });

        $searchInput.trigger('change');
      });

      const render = ($targetSearchInput) => {
        //
        // Dispose existing popover
        //

        bootstrap.Popover.getInstance($targetSearchInput[0])?.dispose();

        //
        // Search
        //
        const searchQuery = $targetSearchInput.val();
        if (idx === null || searchQuery === "") {
          return;
        }

        const results = idx
          .query((q) => {
            const tokens = lunr.tokenizer(searchQuery.toLowerCase());
            tokens.forEach((token) => {
              const queryString = token.toString();
              q.term(queryString, {
                boost: 100,
              });
              q.term(queryString, {
                wildcard:
                  lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
                boost: 10,
              });
              q.term(queryString, {
                editDistance: 2,
              });
            });
          })
          .slice(0, $targetSearchInput.data('offline-search-max-results'));

        //
        // Make result html
        //

        const $html = $('<div>');

        $html.append(
          $('<div>')
            .css({
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1em',
            })
            .append(
              $('<span>').text('Search results').css({ fontWeight: 'bold' })
            )
            .append(
              $('<span>').addClass('custom-search-results__close-button')
            )
        );

        const $searchResultBody = $('<div>').css({
          maxHeight: `calc(100vh - ${
            $targetSearchInput.offset().top - $(window).scrollTop() + 180
          }px)`,
          overflowY: 'auto',
        });
        $html.append($searchResultBody);

        if (results.length === 0) {
          $searchResultBody.append(
            $('<p>').text(`No results found for query "${searchQuery}"`)
          );
        } else {
          results.forEach((r) => {
            const doc = resultDetails.get(r.ref);
            const href =
              $searchInput.data('offline-search-base-href') +
              r.ref.replace(/^\//, '');

            const $entry = $('<div>').addClass('search-result-entry');

            $entry.append(
              $('<small>').addClass('d-block text-muted').text(r.ref)
            );

            $entry.append(
              $('<a>')
                .addClass('d-block')
                .attr('href', href)
                .text(doc.title)
            );

            $entry.append($('<p>').text(doc.excerpt));

            $searchResultBody.append($entry);
          });
        }

        $targetSearchInput.one('shown.bs.popover', () => {
          $('.custom-search-results__close-button').on('click', () => {
            $targetSearchInput.val('');
            $targetSearchInput.trigger('change');
            $searchContainer.removeClass('has-focus');
          });
        });

        const popover = new bootstrap.Popover($targetSearchInput, {
          content: $html[0],
          html: true,
          customClass: 'custom-search-results',
          placement: 'bottom',
        });
        popover.show();
      };

      //Bring focus to search bar
      $(document).on('keydown', function (event) {
        if (event.key === '/' && !(document.activeElement instanceof HTMLInputElement)) {
          event.preventDefault();
          $searchInput.focus();
        }
      });

      $(document).on('click', function (event) {
        if (!$(event.target).closest('.custom-search').length) {
          // Clicked outside the search panel
          $searchInput.val('');
          $searchInput.trigger('change');
          $searchContainer.removeClass('has-focus');
        }
      });

      //close the search panel when the ESC key is pressed
      $(document).on('keydown', function (event) {
        if (event.key === 'Escape') {
          $searchInput.val('');
          $searchInput.trigger('change');
          $searchContainer.removeClass('has-focus');
          $searchInput.blur();
        }
      });

    });
  })(jQuery);