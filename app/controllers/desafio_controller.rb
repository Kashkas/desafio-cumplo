class DesafioController < ApplicationController
  skip_before_action :verify_authenticity_token
  def inicio
  end
  def uf
    @fechaDesde = params[:fechaDesde].split("T")[0].split("-")
    @fechaHasta = params[:fechaHasta]
    @apiKey = "39c59dae80b33eeb502e9bc02836441c039eacd2"
    @url = "https://api.sbif.cl/api-sbifv3/recursos_api/uf/posteriores/"+@fechaDesde[0]+"/"+@fechaDesde[1]+"/dias/"+@fechaDesde[2]+"?apikey="+ @apiKey +"&formato=json"
    print(@url)
    @respuesta = RestClient.get(@url)
    render :json => @respuesta
  end
  def dolar
    @fechaDesde = params[:fechaDesde].split("T")[0].split("-")
    @fechaHasta = params[:fechaHasta]
    @apiKey = "39c59dae80b33eeb502e9bc02836441c039eacd2"
    @url = "https://api.sbif.cl/api-sbifv3/recursos_api/dolar/posteriores/"+@fechaDesde[0]+"/"+@fechaDesde[1]+"/dias/"+@fechaDesde[2]+"?apikey="+ @apiKey +"&formato=json"
    @respuesta = RestClient.get(@url)
    render :json => @respuesta
  end
end
