import api from "../../api";

class CategoriaData {
  index() {
    return api.get("categorias");
  }
  store(data) {
    return api.post(`categorias`, data);
  }
  show(id) {
    return api.get(`categorias/${id}`);
  }
  update(id, data) {
    return api.put(`categorias/${id}`, data);
  }
  destroy(id) {
    return api.delete(`categorias/${id}`);
  }
}

export default new CategoriaData();
