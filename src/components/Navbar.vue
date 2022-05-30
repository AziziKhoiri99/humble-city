<template>
  <div class="navbar">
    <button
      v-for="(button, index) in buttons"
      :key="index"
      v-bind:style="
        selected === index &&
        'color: white; background-color: var(--primary-color)'
      "
      @click="clicked(index)"
      class="button"
    >
      {{ button }}
    </button>
    <div class="search" style="margin-left: 16px">
      <svg
        width="20"
        viewBox="0 0 24 24"
        fill="none"
        style="margin-right: 8px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.167 17.833a6.667 6.667 0 100-13.333 6.667 6.667 0 000 13.333zM19.5 19.5l-3.625-3.625"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <input
        :value="search"
        @input="handleChange"
        placeholder="Search"
        type="text"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar-component",
  data() {
    return {
      search: "",
      selected: 0,
    };
  },
  methods: {
    handleChange(e) {
      this.search = e.target.value;
      this.$emit("search", e.target.value);
    },
    clicked(index) {
      this.selected = index;
      this.$emit("clicked", this.selected);
    },
  },
  props: {
    buttons: Array,
  },
};
</script>
<style>
.navbar {
  height: 5rem;
  background-color: var(--sidebar-color);
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem 54px 1.25rem 0;
}
.search {
  width: 240px;
  border: var(--border);
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  transition: border 200ms ease 0s;
  box-sizing: border-box;
  height: 40px;
  padding: 0px 8px 0px 16px;
}
.search input {
  border: none;
  box-shadow: none;
  background: transparent;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-weight: 500;
  font-size: inherit;
  font-family: inherit;
  width: 100%;
  height: 100%;
}
.search input:focus-visible {
  outline: none;
}
.button {
  background-color: transparent;
  border: none;
  margin: 0px 4px;
  border-radius: 16px;
  padding: 0px 12px;
  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  transition: 400ms;
  height: 40px;
}
.button:hover {
  color: white;
  background-color: var(--primary-color);
}
</style>
