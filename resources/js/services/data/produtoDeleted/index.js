import api from "../../api";

class ProdutoDeletedData {
  index() {
    return api.get("produtos/deleted");
  }
  store(data) {
    return api.post(`produtos/deleted`, data);
  }
  show(id) {
    return api.get(`produtos/deleted/${id}`);
  }
  update(id, data) {
    return api.put(`produtos/deleted/${id}`, data);
  }
  destroy(id) {
    return api.delete(`produtos/deleted/${id}`);
  }
}

export default new ProdutoDeletedData();
