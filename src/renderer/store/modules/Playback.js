const state = {
  isPlaying: false,
  playbackPosition: 0
}

const getters = {
  isPaused: state => {
    return !state.isPlaying
  }
}

const mutations = {
  togglePlayPause (state) {
    state.isPlaying = !state.isPlaying
  },

  play (state) {
    state.isPlaying = true
  },

  pause (state) {
    state.isPlaying = false
  },

  goToMoment (state, d) {
    state.playbackPosition = d
  },

  goToBeginning (state) {
    state.playbackPosition = 0
  },

  restart (state) {
    state.playbackPosition = 0
    state.isPlaying = true
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
