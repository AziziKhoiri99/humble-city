<template>
  <div class="mask">
    <form class="modal" @submit="createRoom">
      <div class="modal-title">
        Create a new space
        <button type="button" @click="$emit('close-modal')">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="modal-input">
        <input
          v-model="name"
          type="text"
          class="text-input"
          placeholder="Space Name"
          required
        />
      </div>
      <div class="modal-foot" style="text-align: center">
        <button type="submit" class="button create">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import { API_URL } from "./utils";

export default {
  name: "modal-component",
  data() {
    return {
      name: "",
    };
  },
  props: {
    my: Object,
  },
  methods: {
    createRoom(e) {
      e.preventDefault();
      //post room name and create random id with uuidV4
      const payload = {
        name: this.name,
        id: uuidV4().replace(/-/g, "_"),
        user: this.my.id,
      };
      axios.post(API_URL + "create-room", payload).then((res) => {
        if (res.data.failed) return alert(res.data.failed);
        this.$router.push(`/${payload.id}/${payload.name}`);
      });
    },
  },
};
</script>

<style scoped>
.mask {
  position: fixed;
  background-color: #00000080;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background-color: var(--sidebar-color);
  width: 400px;
  color: var(--text-color);
  padding: 30px;
  border-radius: 27px;
  display: block;
  top: auto;
  left: auto;
  height: auto;
}
.modal-title {
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 18px;
}
.modal-title button {
  float: right;
  background-color: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.7rem;
  padding: 0;
}
.modal-input {
  margin-bottom: 20px;
  color: var(--text-color);
}
.modal-input label {
  font-size: 0.75rem;
  padding-left: 10px;
}
.modal-foot button {
  height: 40px;
}
.create {
  background-color: var(--primary-color);
  color: var(--sidebar-color);
  width: calc(80% - 16px);
}
.create:hover {
  background-color: #53daff;
}
</style>
