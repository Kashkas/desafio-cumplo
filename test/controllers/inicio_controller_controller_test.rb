require 'test_helper'

class InicioControllerControllerTest < ActionDispatch::IntegrationTest
  test "should get desafio" do
    get inicio_controller_inicio_url
    assert_response :success
  end

end
