<template>
  <div class="page">
    <button class="button back-button"><router-link to="/">Back to library</router-link></button>
    <div class="drop-zone"
      @dragover="onDragOver"
      @ondrop.prevent="onDrop"
    >
    <span>Number of imported files : {{ importedSongs.length }}</span>
    <button type="button" name="button" @click="openFile">Import file</button>
    <div class="imported-list">
      <li v-for="song in importedSongs">
        {{song.title}} - {{song.artist}}
      </li>
    </div>

    </div>

  </div>
</template>

<script>
import {remote} from 'electron'
import nodeID3 from 'node-id3'
import path from 'path'

// import fs from 'fs'

const dialog = remote.dialog

export default {
  components: {
  },

  methods: {
    onDragOver: function (e) {
      e.dataTransfer.dropEffect = 'copy'
    },
    onDrop: function (e) {
      console.log('Received file')
      e.preventDefault()
      e.stopImmediatePropagation()
      e.stopPropagation()
      this.importedFiles = e.dataTransfer.files
      for (let f of e.dataTransfer.files) {
        console.log(f)
      }
      return false
    },
    openFile: function () {
      dialog.showOpenDialog({
        filters: [
          {name: 'Music files', extensions: ['mp3', 'ogg', 'aac', 'flac']}
        ]}, (filenames) => {
        if (filenames === undefined) return

        for (let file of filenames) {
          this.importFile(file)
        }
      })
    },
    importFile: function (file) {
      let song = this.getMetadata(file)
      this.addToImportedSongs(song)

      if (this.importSettings.copyFile) this.copyInLibrary(song)

      this.addToDatabase(song)
    },
    getMetadata: function (file) {
      let tags = nodeID3.read(file)
      console.log(tags)

      return {
        title: tags.title,
        artist: tags.artist,
        album: tags.album,
        date: tags.date,
        fileType: tags.fileType,
        trackNumber: tags.trackNumber,
        size: tags.size,
        albumArt: tags.image,

        isSelected: false,
        isFav: false,
        isCurrentlyPlaying: false,

        url: file
      }
    },
    copyInLibrary: function (song) {
      // Compute new location
      const libDir = this.$store.state.Settings.library.libDir
      const artist = song.artist ? song.artist : ''
      const album = song.artist && song.album ? song.album : ''
      const filename = path.basename(song.url)
      const to = path.join(libDir, artist, album, filename)
      // Copy file from its current location to the Jam library
      this.copyFile(song.url, to)
      // Update song path
      song.url = to

      // TODO : if song already in database, should save the changes
    },

    addToDatabase: function (song) {
      this.$db.insert(song, (err, doc) => {
        if (err) console.error(err)
        console.log('Inserted', song.title, 'with ID', doc._id)
      })
    },

    addToImportedSongs: function (song) {
      this.importedSongs.push(song)
    },

    copyFile: function (from, to) {
    }
  },

  data: function () {
    return {
      importedFiles: [],
      importedSongs: []
    }
  },

  computed: {
    importSettings: function () {
      return this.$store.state.Settings.library.importOptions
    }
  }

}
</script>

<style>
  body {
    background-color: lightgray;
  }

  .back-button {
    position: fixed;
    top:0;
    left: 0;
    z-index: 10;
  }
  .page, .drop-zone {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .drop-zone {
    margin-top: 30px;
  }
</style>
