<template>
  <div class="d-inline-flex">
    <v-text-field
      disabled
      :label="inputModel.name"
      v-model="inputModel.value"
      outlined
      type="number"
    ></v-text-field>
    <v-btn @click="removeInputEstimate(inputModel)" class="ml-2 error"
      >delete</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "ClaimFrontendInputs",
  props: ["input_item", "refreshInputEstimate", "addToListTextFields"],
  data() {
    return {
      inputModel: {
        id: null,
        name: "",
        value: "",
      },
    };
  },

  mounted() {
    this.inputModel.id = this.input_item.id;
    this.inputModel.name = this.input_item.name;
    this.inputModel.value = this.input_item.value;

    //this.addToListTextFields(this.input_item);
  },

  methods: {
    initialize() {},
    removeInputEstimate(item) {
      this.refreshInputEstimate(item.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
