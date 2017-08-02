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

const PLAYLISTS = [
  {name: 'Années 80', id: '1'},
  {name: 'Chill mix', id: '1'},
  {name: 'rock & roll', id: '1'},
  {name: 'Mixtapes 017', id: '1'},
  {name: 'Full Polnareff', id: '1'},
  {name: '100% Balavoine', id: '1'},
  {name: 'Tropical Summer Party', id: '1'}
]

const state = {
  songs: SONGS,
  playlists: PLAYLISTS
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
