import api from "../../api";

class ProdutoData {
  index() {
    return api.get("produtos");
  }
  store(data) {
    return api.post(`produtos`, data);
  }
  show(id) {
    return api.get(`produtos/${id}`);
  }
  update(id, data) {
    return api.post(`produtos/${id}`, data);
  }
  destroy(id) {
    return api.delete(`produtos/${id}`);
  }
}

export default new ProdutoData();
