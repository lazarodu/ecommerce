import api from "../../api";

class CategoriaDeletedData {
  index() {
    return api.get("categorias/deleted");
  }
  store(data) {
    return api.post(`categorias/deleted`, data);
  }
  show(id) {
    return api.get(`categorias/deleted/${id}`);
  }
  update(id, data) {
    return api.put(`categorias/deleted/${id}`, data);
  }
  destroy(id) {
    return api.delete(`categorias/deleted/${id}`);
  }
}

export default new CategoriaDeletedData();
