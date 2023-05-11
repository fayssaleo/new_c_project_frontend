<template>
  <div style="padding: 5px; padding-top: 1%">
    <h3 v-if="geteditedOrSavedclaim.id == 0" class="text-uppercase ma-6">
      {{ createdOrEdited }} THE {{ geteditedOrSavedclaim.ClaimOrIncident }}
    </h3>
    <h3 v-else class="text-uppercase ma-6">
      {{ createdOrEdited }} THE {{ geteditedOrSavedclaim.ClaimOrIncident }} :
      {{ getClaimSerialNumber(geteditedOrSavedclaim) }}
    </h3>

    <template>
      <v-icon large class="mx-2 ma-2" color="blue darken-2" @click="back()">
        mdi-arrow-left
      </v-icon>

      <template>
        <div>
          <v-card>
            <v-toolbar
              color="primary lighten-2 tabsSliderMenu"
              dark
              flat
              style="height: 56px !important"
            >
              <template v-slot:extension>
                <v-tabs v-model="tab" align-with-title>
                  <v-tabs-slider color="white"></v-tabs-slider>
                  <v-tab key="0">
                    {{ geteditedOrSavedclaim.ClaimOrIncident }}
                  </v-tab>
                  <v-tab
                    key="1"
                    :disabled="geteditedOrSavedclaim.id >= 1 ? false : true"
                  >
                    {{ items[1] }}
                  </v-tab>
                  <v-tab
                    key="2"
                    :disabled="geteditedOrSavedclaim.id >= 1 ? false : true"
                  >
                    {{ items[2] }}
                  </v-tab>
                  <v-tab
                    key="3"
                    :disabled="geteditedOrSavedclaim.id >= 1 ? false : true"
                  >
                    {{ items[3] }}
                  </v-tab>
                  <v-tab
                    key="4"
                    :disabled="geteditedOrSavedclaim.id >= 1 ? false : true"
                  >
                    {{ items[4] }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
              <v-tab-item :key="items[0]">
                <v-card flat>
                  <date />
                </v-card>
              </v-tab-item>
              <v-tab-item :key="items[1]">
                <v-card flat>
                  <tableData />
                </v-card>
              </v-tab-item>
              <v-tab-item :key="items[2]">
                <v-card flat>
                  <tableDataAutoMobile />
                </v-card>
              </v-tab-item>
              <v-tab-item :key="items[3]">
                <v-card flat>
                  <tableDataVessel />
                </v-card>
              </v-tab-item>
              <v-tab-item :key="items[4]">
                <v-card flat>
                  <tableDataContainer />
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import tableData from "../../components/EquipmentComponents/table/tableData.vue";
import tableDataAutoMobile from "../../components/AutomobileComponents/table/tableDataAutoMobile.vue";
import tableDataVessel from "../../components/VesselComponents/table/tableDataVessel.vue";
import tableDataContainer from "../../components/ContainerComponents/table/tableDataContainer.vue";
import date from "../Claim/date.vue";
export default {
  name: "ClaimFrontend2CreateClaimOrIncident",
  components: {
    tableData,
    tableDataAutoMobile,
    tableDataVessel,
    tableDataContainer,
    date,
  },

  data() {
    return {
      users: [],
      search: "",
      loading: "false",
      ClaimOrIncidentValue: "Claim",
      switch1: false,
      tab: null,
      createdOrEdited: "CREATING",
      items: [
        "Claim or Incident",
        "Equipmemt",
        "Automobile",
        "Vessel",
        "Container",
      ],
      id_claim: 0,
    };
  },
  computed: {
    formTitle() {},
    ...mapGetters(["geteditedOrSavedclaim", ""]),
  },
  mounted() {
    document.title = "Claim";
    this.id_claim = this.geteditedOrSavedclaim.id;
    this.initialize();
  },
  watch: {
    ClaimOrIncidentValue: {
      handler(newValue, oldvalue) {
        // this.set_attr_ClaimOrIncident_CLAiMAction(newValue).then(() => {});
      },
    },
  },

  methods: {
    ...mapActions([
      "set_attr_ClaimOrIncident_CLAiMAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    getClaimSerialNumber(item) {
      if (this.ClaimOrIncidentValue == "Claim") {
        if (item.claim_date)
          return (
            item.id.toString().padStart(4, "0") +
            "/" +
            item.type +
            "/" +
            item.claim_date.split("/")[2]
          );
        else return item.id.toString().padStart(4, "0") + "/" + item.type + "/";
      } else {
        if (item.incident_date)
          return (
            item.id.toString().padStart(4, "0") +
            "/" +
            item.type +
            "/" +
            item.incident_date.split("/")[2]
          );
        else return item.id.toString().padStart(4, "0") + "/" + item.type + "/";
      }
    },
    initialize() {
      if (this.geteditedOrSavedclaim.id === 0) {
        this.createdOrEdited = "Create";
      } else {
        this.createdOrEdited = "Edit";
      }

      if (this.geteditedOrSavedclaim.ClaimOrIncident == "Incident") {
        this.switch1 = true;
      } else {
        this.switch1 = false;
      }
      this.ClaimOrIncident();
    },
    ClaimOrIncident() {
      if (this.switch1 == false) {
        this.ClaimOrIncidentValue = "Claim";
      } else {
        this.ClaimOrIncidentValue = "Incident";
      }
      this.set_attr_ClaimOrIncident_CLAiMAction(this.ClaimOrIncidentValue).then(
        () => {}
      );
    },
    back() {
      this.$router.push({ name: "Claim" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
