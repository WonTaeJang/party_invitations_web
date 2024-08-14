import instance from "./util"

const particitantAPI = {
  createParticitant: (data) => {
    return instance.post('/api/participant', data)
  },
  test: () => {
    return instance.get('/api/data')
  },
  getParticipants: () => {
    return instance.get('/api/participants')
  },
}

export default particitantAPI