import instance from "./util"

const particitantAPI = {
  createPaticitant: (data) => {
    return instance.post('/api/participant', data)
  },
  test: () => {
    return instance.get('/api/data')
  }
}

export default particitantAPI