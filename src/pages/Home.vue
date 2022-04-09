<template>
  <div style="height: 100%">
    <Sidebar
      @clicked="(value) => (this.selected[0] = value)"
      @create-room="this.modal = true"
      @loggingOut="this.$emit('loggingOut')"
      :my="this.my"
    />
    <main>
      <Navbar
        :buttons="this.page[this.selected[0]].buttons"
        @search="(value) => (this.search = value)"
        @clicked="(value) => (this.selected[1] = value)"
      />
      <NotFound
        :notFoundMsg="this.page[this.selected[0]].notFoundMsg"
        v-if="this.my.roomHistory.length < 1"
      />
      <Content
        v-if="this.my.roomHistory.length >= 1"
        :my="this.my"
        :page="this.selected"
        :search="this.search"
      />
    </main>
    <Modal @close-modal="this.modal = false" v-if="this.modal" />
  </div>
</template>

<script>
import Content from "../components/Content.vue";
import NotFound from "../components/NotFound.vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import Modal from "../components/Modal.vue";

export default {
  name: "App",
  components: {
    Content,
    NotFound,
    Sidebar,
    Navbar,
    Modal,
  },
  data() {
    return {
      modal: false,
      selected: [2, 0],
      search: "",
      page: [
        {
          buttons: ["Experience", "Community Spaces", "Events"],
          notFoundMsg:
            'Our explore page is currently under maintenance, but you can create a space  <br /> by clicking on the "Create" button in the top right corner!',
        },
        {
          buttons: ["My Events", "Saved Events"],
          notFoundMsg:
            "You haven't created any events. Create your first event!",
        },
        {
          buttons: ["Last Visited", "Created Space"],
          notFoundMsg:
            "You haven't visited any spaces. Create a Space to get started!",
        },
      ],
    };
  },
  props: {
    my: Object,
  },
};
</script>

<style scoped>
main {
  margin-left: 5rem;
}
</style>
