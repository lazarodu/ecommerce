import api from "../../api";

class CompraData {
  index() {
    return api.get("compra");
  }

  show(id) {
    return api.get(`compra/${id}`);
  }

  store(data) {
    return api.post(`compra`, data);
  }

  update(id, data) {
    return api.put(`compra/${id}`, data);
  }

  delete(id) {
    return api.delete(`compra/${id}`);
  }
}

export default new CompraData();
