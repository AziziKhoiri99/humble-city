<template>
  <div style="height: 100%">
    <Sidebar
      @clicked="(value) => (selected[0] = value)"
      @create-room="modal = true"
      @loggingOut="$emit('loggingOut')"
      :my="my"
    />
    <main>
      <Navbar
        :buttons="page[selected[0]].buttons"
        @search="(value) => (search = value)"
        @clicked="(value) => (selected[1] = value)"
      />
      <Content
        :notFoundMsg="page[selected[0]].notFoundMsg"
        :my="my"
        :page="selected"
        :search="search"
      />
    </main>
    <Modal :my="my" @close-modal="modal = false" v-if="modal" />
  </div>
</template>

<script>
import Content from "../components/Content.vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import Modal from "../components/Modal.vue";

export default {
  name: "homePage",
  components: {
    Content,
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
