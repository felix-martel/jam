<template>
  <div class="sidebar-container">
    <div class="sidebar-location-title">+++</div>
    <div class="sidebar-top">
      <div class="drop-zone" data-target="lib">
        <router-link to="/library">Library</router-link>
      </div>
      <div class="drop-zone" data-target="fav">
        <router-link to="/favs">Favs</router-link>
      </div>
    </div>

    <div class="sidebar-main">
      <template v-for="playlist in playlists">
        <div class="drop-zone" :data-target="playlist.id">
          <router-link :to="{ name: 'playlist', params: {id: playlist.id} }">{{playlist.name}}</router-link>
        </div>
      </template>
    </div>

    <div class="sidebar-bottom">
      <div class="drop-zone" data-target="new-playlist">
        <router-link to="/playlist/new">Create playlist</router-link>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  components: {},
  methods: {},
  data: function () {
    return {}
  },
  computed: {
    playlists: function () {
      return this.$store.state.Library.playlists
    }
  }
}
</script>

<style>
.sidebar-container {
  background-color: gray;
  height: 100%;
  width: 100%;
}
.sidebar-location-title {
  margin: 0;
  font-family: sans-serif;
}
</style>
