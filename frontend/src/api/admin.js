import instance from "./util"

const adminAPI = {
  getParticipantAll: () => {
    return instance.get('/api/admin/participants')
  },
  deleteParticipant: (data) => {
    return instance.delete('/api/participant/delete', {
      data: {
        ...data
      },
      
    })
  },
  updateParticipant: (data) => {
    return instance.put('/api/participant', data)
  }
}

export default adminAPI