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

export default {
  name: "main-content",
  components: {
    RoomLists,
    NotFound,
  },
  props: {
    notFoundMsg: String,
    my: Object,
    page: Array,
    search: String,
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
              return this.my.roomHistory;
            case 1:
              return this.my.roomHistory.filter(
                (x) => x.creator == this.my.id.toString()
              );
          }
      }
      return [];
    },
  },
};
</script>

<style scoped></style>
