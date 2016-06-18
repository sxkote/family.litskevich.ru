angular.module('app')
    .filter('personSearch', function () {
        return function (input, search) {
            var out = [];

            if (input && input.length) {
                for (var i = 0; i < input.length; i++) {
                    var person = new Person(input[i]);
                    if (!search || person.searchText.toLowerCase().indexOf(search.toLowerCase()) >= 0)
                        out.push(input[i]);
                }
            }

            return out;
        };
    });