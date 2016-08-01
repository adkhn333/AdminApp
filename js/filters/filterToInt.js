adminApp
.filter('toNum', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});