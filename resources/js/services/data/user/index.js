import api from "../../api";

class UserData {
  index() {
    return api.get("user");
  }

  update(id, data) {
    return api.put(`user/${id}`, data);
  }
}

export default new UserData();
