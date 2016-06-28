angular.module('app')
    .filter('articleSearch', function () {
        return function (input, search) {
            var out = [];

            if (input && input.length) {

                for (var i = 0; i < input.length; i++) {
                    var article = new Article(input[i]);

                    if (article.match(search))
                        out.push(input[i]);
                }
            }

            return out;
        };
    });