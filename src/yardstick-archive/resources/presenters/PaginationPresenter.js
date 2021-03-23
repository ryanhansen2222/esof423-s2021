const { BasePresenter } = require('edge.js');
const url = require('url');

class PaginationPresenter extends BasePresenter {

  isFirst(pagination) {
    return pagination.page == 1
  }

  isCurrent(pagination, page) {
    return pagination.page == page
  }

  isLast(pagination) {
    return pagination.page == pagination.lastPage
  }

  append(current_url, key, value) {
    const current = url.parse(current_url)
    const params = new url.URLSearchParams(current.search)

    params.set(key, value)

    return params.toString()
  }


/**
   * Generates a dynamic range of pages.
   *
   * @param  {Object} pagination
   * @param  {Number} delta
   * @return {Array}
   */
  pageDottedRange(pagination, delta = 2) {
    if (pagination.length === 0 || pagination.length === 1) {
      return [];
    }

    var current = parseInt(pagination.page, 10);
    var last = pagination.lastPage;
    var left = current - delta;
    var right = current + delta + 1;
    var range = [];
    var pages = [];
    var l;

    for (var i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
            range.push(i);
        }
    }

    range.forEach(function (i) {
      if (l) {
          if (i - l > 1) {
              pages.push('...');
          }
      }
      pages.push(i);
      l = i;
    });

    return pages;
    }

}

module.exports = PaginationPresenter
