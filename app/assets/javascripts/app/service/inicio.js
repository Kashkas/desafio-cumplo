app.service('inicioService', function (service) {
    return {
        callApiUF: function (filter) {

            var url = "/desafio/uf"
            return service.rest({
                method: 'post',
                url: url,
                data: filter
            });
        },
        callApiDolar: function (filter) {

            var url = "/desafio/dolar"
            return service.rest({
                method: 'post',
                url: url,
                data: filter
            });
        }
    };
});