const soundList = (function () {
  let l = []
  for (let i = 0; i < 10; i++) {
    // l.push('http://s1download-universal-soundbank.com/mp3/sounds/11336.mp3')
    l.push('http://s1download-universal-soundbank.com/mp3/sounds/2010' + i + '.mp3')
  }
  return l
})()

const getRandomSound = function () {
  const n = soundList.length
  return soundList[Math.floor(n * Math.random())]
}

const SONGS = (function (n) {
  let l = []
  for (let i = 0; i < n; i++) {
    l.push({
      id: i,
      title: 'Song #' + i,
      album: 'Album ' + Math.floor(Math.random() * 100),
      artist: 'The ' + Math.floor(Math.random() * 100) + ' Rockers',
      duration: 120,
      url: getRandomSound(),
      isSelected: false
    })
  }
  return l
})(100)

const state = {
  songs: SONGS
}

const getters = {

}

const mutations = {
  selectSongInLibrary: function (state, id) {
    state.songs[id].isSelected = true
  },
  unselectSongInLibrary: function (state, id) {
    state.songs[id].isSelected = false
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
