import api from "../../api";

class ImagemData {
  destroy(id) {
    return api.delete(`imagens/${id}`);
  }
}

export default new ImagemData();
