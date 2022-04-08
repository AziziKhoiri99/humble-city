<template>
  <div style="height: 100%">
    <Sidebar
      @clicked="(value) => (this.selected = value)"
      @create-room="this.modal = true"
      @loggingOut="this.$emit('loggingOut')"
      :my="this.my"
    />
    <main>
      <Navbar :buttons="this.page[this.selected].buttons" />
      <Content :my="this.my" :page="this.page[this.selected]" />
    </main>
    <Modal @close-modal="this.modal = false" v-if="this.modal" />
  </div>
</template>

<script>
import Content from "../components/Content.vue";
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Modal from "../components/Modal.vue";

export default {
  name: "App",
  components: {
    Content,
    Navbar,
    Modal,
    Sidebar,
  },
  data() {
    return {
      modal: false,
      selected: 2,
      page: [
        {
          buttons: ["Experience", "Community Spaces", "Events"],
          page: 0,
          notFoundMsg:
            'Our explore page is currently under maintenance, but you can create a space instead by clicking on the "Create" button in the top right corner!',
        },
        {
          buttons: ["My Events", "Saved Events"],
          page: 1,
          notFoundMsg:
            "You haven't created any events. Create your first event!",
        },
        {
          buttons: ["Last Visited", "Created Space"],
          page: 2,
          notFoundMsg:
            "You haven't visited any spaces. Create a Space to get started!",
        },
      ],
    };
  },
  props: {
    my: Object,
  },
  mounted() {
    console.log(this.my);
  },
};
</script>

<style scoped>
main {
  margin-left: 5rem;
}
</style>
