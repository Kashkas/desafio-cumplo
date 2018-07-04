app.controller('inicioController', function ($scope, inicioService) {
    $scope.busqueda ={
        fechaDesde: null,
        fechaHasta: null
    };
    $scope.data = {
        uf: {},
        dolar: {}
    };
    $scope.graficoUF=false;
    $scope.graficoDolar=false;

    $scope.initGraphUF = function (){
        $scope.labelsUF = $scope.data.uf.valores.map(function (obj){
            return obj.Fecha;
        });
        $scope.dataGraphUF = [];
        $scope.dataGraphUF.push(
            $scope.data.uf.valores.map(function (obj){
                return parseFloat(obj.Valor.replace(".","").replace(",","."));
            })
        );

        $scope.seriesUF = ['Valor UF'];
        $scope.onClickUF = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverrideUF = [{ yAxisID: 'y-axis-1' }];
        $scope.optionsUF = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            }
        };
        $scope.graficoUF = true;
    };

    $scope.initGraphDolar = function() {
        $scope.labelsDolar = $scope.data.dolar.valores.map(function (obj){
            return obj.Fecha;
        });
        $scope.dataGraphDolar = [];

        $scope.dataGraphDolar.push(
            $scope.data.dolar.valores.map(function (obj){
                return parseFloat(obj.Valor.replace(".","").replace(",","."));
            })
        );
        $scope.seriesDolar = ['Valor Dolares'];
        $scope.onClickDolar = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverrideDolar = [{ yAxisID: 'y-axis-2' }];
        $scope.optionsDolar = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            }
        };
        $scope.graficoDolar = true;
    }
    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('DD/MM/YYYY') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    };
    $scope.callApi = function(){
        if($scope.busqueda.fechaHasta == null || $scope.busqueda.fechaHasta == ""){
            alert("Ingrese fecha desde");
            return;
        }
        if($scope.busqueda.fechaDesde == null || $scope.busqueda.fechaDesde == ""){
            alert("Ingrese fecha hasta");
            return;
        }
        if($scope.busqueda.fechaDesde > $scope.busqueda.fechaHasta){
            alert("Fecha desde debe ser menor a fecha hasta");
            return;
        }
        var request = {};
        request.fechaDesde = new Date($scope.busqueda.fechaDesde.setDate($scope.busqueda.fechaDesde.getDate()-1));
        request.fechaHasta = $scope.busqueda.fechaHasta;
        inicioService.callApiUF(request).then(function (response){
            $scope.data.uf.valores = response.data.UFs.filter(function(item) {
                var d2 = Date.parse(item.Fecha);
                if(d2 <= $scope.busqueda.fechaHasta)
                    return true;
                else
                    return false;
            });
            console.log($scope.data.uf.valores.length);
            $scope.data.uf.promedio = ($scope.data.uf.valores.map(function(obj) {return parseFloat(obj.Valor.replace(".","").replace(",","."))})
                .reduce(function(a, b) { return a + b }) / $scope.data.uf.valores.length).toFixed(2).toLocaleString();
            $scope.data.uf.maximo = $scope.data.uf.valores.reduce(function (valorAnterior, valorActual){
                if(parseFloat(valorAnterior.Valor.replace(".","").replace(",",".")) > parseFloat(valorActual.Valor.replace(".","").replace(",","."))){
                    return valorAnterior;
                } else {
                    return valorActual;
                }
            }).Valor;
            $scope.data.uf.minimo = $scope.data.uf.valores.reduce(function (valorAnterior, valorActual){
                if(parseFloat(valorAnterior.Valor.replace(".","").replace(",",".")) < parseFloat(valorActual.Valor.replace(".","").replace(",","."))){
                    return valorAnterior;
                } else {
                    return valorActual;
                }
            }).Valor;
            $scope.initGraphUF();

            inicioService.callApiDolar(request).then(function (response){

                $scope.data.dolar.valores = response.data.Dolares.filter(function(item) {
                    var d2 = Date.parse(item.Fecha);
                    if(d2 <= $scope.busqueda.fechaHasta)
                        return true;
                    else
                        return false;
                });
                $scope.data.dolar.promedio = ($scope.data.dolar.valores.map(function(obj) {return parseFloat(obj.Valor.replace(".","").replace(",","."))})
                    .reduce(function(a, b) { return a + b }) / $scope.data.dolar.valores.length).toFixed(2).toLocaleString();
                $scope.data.dolar.maximo = $scope.data.dolar.valores.reduce(function (valorAnterior, valorActual){

                    if(parseFloat(valorAnterior.Valor.replace(".","").replace(",",".")) > parseFloat(valorActual.Valor.replace(".","").replace(",","."))){
                        return valorAnterior;
                    } else {
                        return valorActual;
                    }
                }).Valor;
                $scope.data.dolar.minimo = $scope.data.dolar.valores.reduce(function (valorAnterior, valorActual){
                    if(parseFloat(valorAnterior.Valor.replace(".","").replace(",",".")) < parseFloat(valorActual.Valor.replace(".","").replace(",","."))){
                        return valorAnterior;
                    } else {
                        return valorActual;
                    }
                }).Valor;
                $scope.initGraphDolar();
            });
        });

    };
});