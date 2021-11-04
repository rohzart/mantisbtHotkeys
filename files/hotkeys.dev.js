"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function addHotKeys(shortcuts) {
  var inputTypes = ['text', 'textarea', 'select-one', 'select-multiple', 'password', 'file'];
  var keyStack = [];
  document.addEventListener('keydown', function (e) {
    // mark the key as pressed iff the the active element is not an input type which accepts text
    keyStack[e.key] = !inputTypes.includes(document.activeElement.type);
  });
  document.addEventListener('keyup', function (e) {
    shortcuts.forEach(function (shortcut) {
      var combo = shortcut.combo.split('+');

      if (combo.every(function (key) {
        return keyStack[key];
      })) {
        shortcut.action();
      }
    });
    keyStack = {};
  });
}

var issue_summary_elements = window.location.href.includes('view_all_bug_page') ? document.querySelectorAll('#buglist .column-summary a') : [];

function focus_on_issue(next) {
  var el_count = issue_summary_elements.length;
  if (el_count <= 0) return;
  var next_index = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = issue_summary_elements.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          element = _step$value[1];

      if (element === document.activeElement) {
        next_index = next ? index + 1 : index - 1;

        if (next && el_count === next_index) {
          next_index = 0;
        }

        if (!next && next_index === 0) {
          next_index = el_count;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  issue_summary_elements[next_index].focus();
}

var shortcuts = [{
  combo: 'm+v',
  action: function action() {
    window.location.href = '/my_view_page.php';
  }
}, {
  combo: 'v+i',
  action: function action() {
    window.location.href = "/view_all_bug_page.php";
  }
}, {
  combo: 'r+i',
  action: function action() {
    window.location.href = "/bug_report_page.php";
  }
}, {
  combo: 'c+l',
  action: function action() {
    window.location.href = "/changelog_page.php";
  }
}, {
  combo: 'r+m',
  action: function action() {
    window.location.href = "/roadmap_page.php";
  }
}, {
  combo: 's+u+m',
  action: function action() {
    window.location.href = "/summary_page.php";
  }
}, {
  combo: 'm+a+n',
  action: function action() {
    window.location.href = "/manage_overview_page.php";
  }
}, {
  combo: 't+i',
  action: function action() {
    window.location.href = "/billing_page.php";
  }
}, {
  combo: 'r+e',
  action: function action() {
    window.location.href = "/plugin.php?page=Source/index";
  }
}, {
  combo: 'Alt+s',
  action: function action() {
    var form = document.getElementById('report_bug_form');
    form.submit();
  }
}, {
  combo: 'Alt+\\',
  action: function action() {
    document.getElementById('filter-bar-search-txt').focus();
  }
}, {
  combo: 'Alt+\\+x',
  action: function action() {
    document.getElementById('filter-bar-query-id').focus();
  }
}, {
  combo: 'Alt+p',
  action: function action() {
    document.querySelector('#dropdown_projects_menu a').focus();
  }
}, {
  combo: 'Alt+ArrowDown',
  action: function action() {
    focus_on_issue(true);
  }
}, {
  combo: 'Alt+ArrowUp',
  action: function action() {
    focus_on_issue(false);
  }
}];
addHotKeys(shortcuts);