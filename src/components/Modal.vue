<template>
  <div class="mask">
    <form class="modal" @submit="this.createRoom()">
      <div class="modal-title">
        Create a new space
        <button type="button" @click="this.$emit('close-modal')">x</button>
      </div>
      <div class="modal-input">
        <label>Space Name</label><br />
        <input
          v-model="name"
          type="text"
          placeholder="yourspacename"
          required
        />
      </div>
      <div class="modal-foot">
        <button
          type="button"
          @click="this.$emit('close-modal')"
          class="button close"
        >
          Close
        </button>
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
  methods: {
    createRoom() {
      //post room name and create random id with uuidV4
      const payload = {
        name: this.name,
        id: uuidV4().replace(/-/g, "_"),
      };

      axios
        .post(API_URL + "create-room", payload)
        .then((res) => {
          if (res.data.failed) return alert(res.data.failed);

          //warn user if room name empty
          alert(res.data.message);
        })
        .then(() => {
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
  background-color: var(--bg-primary);
  width: 400px;
  color: var(--text-primary);
  padding: 30px;
  border-radius: 27px;
}
.modal-title {
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
}
.modal-title button {
  float: right;
}
.modal-input {
  margin-bottom: 20px;
}
.modal-input input {
  border: var(--border);
  height: 40px;
  border-radius: 16px;
  width: 100%;
  font-size: inherit;
  color: var(--text-primary);
  background-color: transparent;
  padding: 0 15px;
}
.modal-input input:focus-visible {
  outline: none;
}
.modal-input label {
  font-size: 0.75rem;
  padding-left: 10px;
}
.modal-foot button {
  height: 40px;
}
.close-text {
  background-color: #146153;
  width: 20%;
}
.create {
  background-color: #2f9dbb;
  width: calc(80% - 16px);
}
.create:hover {
  background-color: #53daff;
}
</style>
