function addHotKeys(shortcuts) {
    const inputTypes = ['text', 'textarea', 'select-one', 'select-multiple', 'password', 'file'];
    let keyStack = [];
    document.addEventListener('keydown', function (e) {
        // mark the key as pressed iff the the active element is not an input type which accepts text
        keyStack[e.key] = !inputTypes.includes(document.activeElement.type);
    });
    document.addEventListener('keyup', function (e) {
        shortcuts.forEach(shortcut => {
            var combo = shortcut.combo.split('+');
            if (combo.every(key => keyStack[key])) {
                shortcut.action();
            }
        });
        keyStack = {};
    });
}

const shortcuts = [
    {
        combo: 'm+v',
        action: function () {
            window.location.href = '/my_view_page.php';
        }
    },
    {
        combo: 'v+i',
        action: function () {
            window.location.href = "/view_all_bug_page.php";
        }
    },
    {
        combo: 'r+i',
        action: function () {
            window.location.href = "/bug_report_page.php";
        }
    },
    {
        combo: 'c+l',
        action: function () {
            window.location.href = "/changelog_page.php";
        }
    },
    {
        combo: 'r+m',
        action: function () {
            window.location.href = "/roadmap_page.php";
        }
    },
    {
        combo: 's+u+m',
        action: function () {
            window.location.href = "/summary_page.php";
        }
    },
    {
        combo: 'm+a+n',
        action: function () {
            window.location.href = "/manage_overview_page.php";
        }
    },
    {
        combo: 't+i',
        action: function () {
            window.location.href = "/billing_page.php";
        }
    },
    {
        combo: 'r+e',
        action: function () {
            window.location.href = "/plugin.php?page=Source/index";
        }
    },
    {
        combo: 'Alt+s',
        action: function () {
            var form = document.getElementById('report_bug_form');
            form.submit();
        }
    },
    {
        combo: 'Alt+\\',
        action: function () {
            document.getElementById('filter-bar-search-txt').focus();
        }
    },
    {
        combo: 'Alt+\\+x',
        action: function () {
            document.getElementById('filter-bar-query-id').focus();
        }
    },
    {
        combo: 'Alt+p',
        action: function () {
            document.querySelector('#dropdown_projects_menu a').focus();
        }
    }
];

addHotKeys(shortcuts);