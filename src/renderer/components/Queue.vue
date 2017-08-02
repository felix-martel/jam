k = i;<template>
  <div class="queue-container"
  @dragover.prevent="onGlobalDragOver($event)"
  @drop.prevent="onGlobalDrop($event)">
    <h1 class="queue-title">///</h1>
    <div class="buttons-bar">
      <button class="button reverse shuffle" @click="shuffle()">Shuffle</button>
      <button class="button reverse remove" @click="removeSelectedSongs()">Remove</button>
      <button class="button reverse save" @click="save()">Save</button>
      <button class="button reverse clear" @click="clear()">Clear</button>
      <!--<button class="button reverse add-to" @click="addToPlaylist()">Add to ></button>
      <button class="button reverse inject" @click="injectPlaylist()">Inject ></button>
      <button class="button reverse replace" @click="replacePlaylist()">Replace ></button>-->
    </div>
    <div class="list-song-container">
      <div class="song-separator drop-zone" data-position="0"
      @dragover.prevent="onInsertDragOver($event)"
      @drop.prevent.stop="onInsertDrop(0, $event)"></div>

      <template v-for="(song, index) in songs">
        <song
          class="reverse shrink"
          :key="index"
          :song="song"
          draggable="true"
          v-on:dragstart.native="dragstartHandler(song.id, $event)"

          @click.native="dispatchSongClick(song.id, index, $event)"
          @toggle-selected="toggleSelected(song.id)"
          @removed="removeElement(song.id)"
          @play-pause="playPause(song.id)">
        </song>
        <div class="song-separator drop-zone" :data-position="index+1"
        @dragover.prevent="onInsertDragOver($event)"
        @drop.prevent="onInsertDrop(index+1, $event)"></div>
      </template>
    </div>
  </div>
</template>

<script>
import Song from './Song'
import {mapGetters} from 'vuex'

export default {
  components: {Song},
  methods: {
    // Click handling
    dispatchSongClick: function (id, pos, e) {
      if (e.metaKey || e.ctrlKey) {
        this.onSongControlClick(id, pos)
      } else if (e.shiftKey) {
        this.onSongShiftClick(id, pos)
      } else {
        this.onSongClick(id, pos)
      }
    },
    onSongControlClick: function (id, pos) {
      this.addToSelected(id)
      this.lastClick = pos
    },
    onSongShiftClick: function (id, pos) {
      if (this.lastClick) {
        // Prevent out of bound exception if library size changed
        this.lastClick = Math.min(this.lastClick, this.songs.length)
        this.lastClick = Math.max(this.lastClick, 0)
      } else {
        this.lastClick = 0
      }
      this.selectBetween(this.lastClick, pos)
      this.lastClick = pos
    },
    onSongClick: function (id, pos) {
      if (this.isSelected(id) && this.selectedList.length === 1) {
        this.removeFromSelected(id)
      } else {
        this.clearSelectedList()
        this.lastClick = pos
        this.addToSelected(id)
      }
    },
    selectBetween: function (i, j) {
      if (i > j) [i, j] = [j, i]
      for (let k = i; k <= j; k++) {
        this.addToSelected(this.songs[k].id)
      }
    },
    // Drag
    dragstartHandler: function (id, e) {
      if (!this.isSelected(id)) {
        this.clearSelectedList()
        this.addToSelected(id)
      }
      e.dataTransfer.setData('text/JSON', JSON.stringify(this.getSongsFromSelectedList()))
      e.dataTransfer.setData('origin', 'QUEUE')
    },
    getSongsFromSelectedList: function () {
      return this.selectedList
    },
    // Drop
    onInsertDragOver: function (e) {
      e.target.classList.add('drag-over')
    },
    onInsertDrop: function (i, e) {
      e.stopPropagation()
      var origin = e.dataTransfer.getData('origin')
      var data = JSON.parse(e.dataTransfer.getData('text/JSON'))
      if (origin === 'QUEUE') {
        // Remove selected
        this.removeSelectedSongs()
        this.$store.commit('insertAll', {position: i, data: data})
        this.clearSelectedList()
      } else {
        this.$store.commit('insertAll', {position: i, data: data})
        this.clearSelectedList()
      }
    },
    onGlobalDragOver: function (e) {
      e.dataTransfer.dropEffect = 'copy'
    },
    onGlobalDrop: function (e) {
      var data = JSON.parse(e.dataTransfer.getData('text/JSON'))
      var origin = e.dataTransfer.getData('origin')
      if (origin === 'QUEUE') this.removeSelectedSongs()
      this.$store.commit('append', data)
      this.clearSelectedList()
    },
    // Selection handling
    toggleSelected: function (id) {
      if (this.isSelected(id)) {
        this.removeFromSelected(id)
      } else {
        this.addToSelected(id)
      }
    },
    addToSelected: function (id) {
      console.log(id)
      this.$store.commit('selectSongInQueue', id)
    },
    removeFromSelected: function (id) {
      this.$store.commit('unselectSongInQueue', id)
    },
    clearSelectedList: function () {
      this.$store.commit('clearSelectedList')
    },
    isSelected: function (id) {
      return this.findSongById(id).isSelected
    },
    // Queue util
    removeElement: function (id) {
      this.$store.commit('remove', id)
    },
    playPause: function (id) {
      this.$store.commit('goTo', id)
    },
    shuffle: function () {
      this.$store.commit('shuffle')
    },
    clear: function () {
      this.$store.commit('clear')
    },
    removeSelectedSongs: function () {
      this.$store.commit('removeSelected')
      this.clearSelectedList()
    },
    // Playlist handling (TODO)
    replacePlaylist: function (id = 0) {
    },
    injectPlaylist: function (id = 0) {
    },
    addToPlaylist: function (id = 0) {
    },
    goTo: function (i) {
      this.$store.commit('goTo', i)
    }
  },
  data: function () {
    return {
    }
  },
  computed: {
    songs: function () {
      return this.$store.state.Queue.songs
    },
    ...mapGetters({
      selectedList: 'selectedList',
      findSongById: 'findSongById'
    })
  }
}
</script>

<style>
.queue-container {
  background-color: #293133;
  color: white;
  height: 100%;
  width: 100%;
}
.queue-title {
  margin: 0;
  font-family: sans-serif;
  color: white;
}
.buttons-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}
.song-separator {
  height: 10px;
  transition: height 0.3s ease;
}
.song-separator.drag-over {
  height: 30px;
  transition: height 0.3s ease;
}
</style>
