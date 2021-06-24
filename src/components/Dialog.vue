<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>Note: deleted users</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item-group  color="primary">
            <v-list-item v-for="(item, i) in deleted" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.first_name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click.stop="show = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    deleted: Array,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>