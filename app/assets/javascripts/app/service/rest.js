app.service("service", function ($http, $q, $state, $rootScope) {
    return {
        rest: function (header) {
            var deferred = $q.defer();
            $http(header).then(function (result) {
                if (isHttpSuccess(result.status)) {
                    deferred.resolve(result);
                } else {
                    $state.go('error');
                    $rootScope.error_code = result.status;
                    deferred.reject(false);
                }
            }).catch(function (error) {
                console.log(error);
                $state.go('error');
                $rootScope.error_code = (error.status ? error.status : "");
                deferred.reject(false);
            });
            return deferred.promise;
        }
    };
});