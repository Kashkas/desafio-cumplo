//=require_self
//=require_treeapp

function isHttpSuccess(code) {
    return code >= 200 && code <= 208;
};

var app = angular.module("app",['ui.router','chart.js']);

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