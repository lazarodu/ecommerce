import api from "../../api";

class CarrinhoData {
  index() {
    return api.get("carrinho");
  }
  store(data) {
    return api.post(`carrinho`, data);
  }
  show(id) {
    return api.get(`carrinho/${id}`);
  }
  update(id, data) {
    return api.put(`carrinho/${id}`, data);
  }
  destroy(id) {
    return api.delete(`carrinho/${id}`);
  }
}

export default new CarrinhoData();
