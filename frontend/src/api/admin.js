import instance from "./util"

const adminAPI = {
  getParticitantAll: () => {
    return instance.get('/api/admin/participants')
  },
}

export default adminAPI