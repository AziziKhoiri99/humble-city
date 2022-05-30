<template>
  <div class="not-found">
    <img src="../assets/image/notfound.png" />
    <span v-html="notFoundMsg"></span>
  </div>
</template>

<script>
export default {
  props: {
    notFoundMsg: String,
  },
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  -webkit-box-flex: 1;
  flex-grow: 1;
  min-height: calc(100vh - 5rem);
}
.not-found img {
  width: 55px;
}
.not-found span {
  padding-top: 30px;
  color: var(--text-color);
}
</style>
