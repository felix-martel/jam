let clone = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}
let cloneList = function (l) {
  if (!l.length) return []
  let res = []
  for (let el of l) {
    res.push(el)
  }
  return res
}


const state = {
  songs: [],
  hasReachedEnd: false,
  hasReachedStart: false,
  currentIndex: 0
}

const getters = {
  current: state => {
    if (state.songs.length === 0) return null
    return state.songs[state.currentIndex]
  },
  findSongById: (state, getters) => (id) => {
    return state.songs.find(s=>(s.id==id))
  },
  selectedList: state => {
    return state.songs.filter(el => {
      return el.isSelected
    })
  }
}

const mutations = {
  // Go to next song
  next (state) {
    console.log("Store : Queue.next()")
    if (state.currentIndex + 1 < state.songs.length) {
      state.currentIndex += 1
      state.hasReachedEnd = false
      state.hasReachedStart = false
    }
    else {
      state.currentIndex = 0
      state.hasReachedEnd = true
      state.hasReachedStart = false
    }
  },

  // Go to previous song
  previous (state) {
    console.log("Store : Queue.previous()")
    if (state.currentIndex > 0) {
      state.currentIndex -= 1
      state.hasReachedStart = false
      state.hasReachedEnd = false
    }
    else {
      state.currentIndex = 0
      state.hasReachedStart = true
      state.hasReachedEnd = false
    }
  },

  // Go to i-th song
  goTo (state, i) {
    console.log("Store : Queue.goTo("+ i + ")")
    if (i >= 0 && i < state.songs.length) {
      state.currentIndex = i
    }
  },

  // Clear queue
  clear (state) {
    console.log("Store : Queue.clear()")
    state.songs = []
    state.currentIndex = 0
    state.hasReachedEnd = false
    state.hasReachedStart = false
  },

  // Insert a song at a given index
  insert (state, payload) {
    const index = payload.position
    const song = payload.data

    state.songs.splice(index, 0, clone(song))
  },

  // Insert a list of songs at a given index
  insertAll(state, payload) {
    const index = payload.position
    const list = payload.data
    const result = cloneList(list)
    state.songs.splice(index, 0, ...result)
  },

  // Append a song or a list of songs to queue
  append (state, l) {
    let wasEmpty = (state.songs.length === 0)

    // If l is a list
    if (l.length) {
      l.forEach(el =>
        state.songs.push(clone(el)))
      }
      // If l is an element
      else {
        state.songs.push(clone(l))
      }

      if (wasEmpty) state.currentIndex = 0
    },

    // Apply f to every queue songs
    forAll(state, f) {
      state.songs.forEach(f)
    },

    // Shuffle queue
    shuffle(state) {
      let arr = state.songs
      for (let i = state.songs.length; i; i--) {
        let j = Math.floor(Math.random() * i)
        [state.songs[i - 1], state.songs[j]] = [state.songs[j], state.songs[i - 1]]
      }
    },

    // Select song in queue
    selectSongInQueue(state, id) {
      let song = state.songs.find(s=>(s.id==id))
      song.isSelected = true
    },

    // Unselect song in queue
    unselectSongInQueue(state, getters, id) {
      let song = state.songs.find(s=>(s.id==id))
      song.isSelected = false
    },

    // Remove song or list of song from queue
    remove(state, l) {
      // TODO : not updated
      // i is whether an index or an array of indices
      if (!l.length && (l>=0 && l<state.songs.length)) {
        state.songs.splice(l, 1)
      }
      else {
        for (let i=0; i<l.length; i++) {
          if (l[i]>=0 && l[i]<state.songs.length) {
            state.songs[l[i]].toBeDeleted = true
          }
        }
        let i = 0
        while (i < state.songs.length) {
          if (state.songs[i].toBeDeleted) {
            state.songs.splice(i, 1)
          }
          else {
            i++
          }
        }
      }
    },

    // Remove selected songs from queue
    removeSelected(state) {
      let i = 0
      while (i < state.songs.length) {
        if (state.songs[i].isSelected) {
          state.songs.splice(i, 1)
        }
        else {
          i++
        }
      }

    },

    // Unselect all songs
    clearSelectedList(state) {
      for (let song of state.songs) {
        song.isSelected = false
      }
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
