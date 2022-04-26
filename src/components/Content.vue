<template>
  <div>
    <RoomLists
      v-if="this.choosed.length > 0"
      :my="this.my"
      :page="this.page"
      :search="this.search"
      :choosed="this.choosed"
    />
    <NotFound v-else :notFoundMsg="this.notFoundMsg" />
  </div>
</template>

<script>
import RoomLists from "./RoomLists.vue";
import NotFound from "./NotFound.vue";
import axios from "axios";
import { API_URL } from "./utils";

export default {
  name: "main-content",
  components: {
    RoomLists,
    NotFound,
  },
  data() {
    return {
      roomHistory: [],
    };
  },
  props: {
    notFoundMsg: String,
    my: Object,
    page: Array,
    search: String,
  },
  created() {
    if (this.my.id) {
      axios
        .post(API_URL + "get-roomhistory", { userId: this.my.id })
        .then((res) => {
          this.roomHistory = res.data;
        });
    }
  },
  computed: {
    choosed() {
      switch (this.page[0]) {
        case 0:
          return [];
        case 1:
          return [];
        case 2:
          switch (this.page[1]) {
            case 0:
              return this.roomHistory;
            case 1:
              return this.roomHistory.filter(
                (x) => x.creator == this.my.id.toString()
              );
          }
      }
      return [];
    },
  },
};
</script>
