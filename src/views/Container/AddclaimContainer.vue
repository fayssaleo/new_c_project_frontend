<template>
  <div style="padding: 5px; padding-top: 1%">
    <h3 class="text-uppercase">{{ createdOrEdited }} THE CONTAINER</h3>
    <template>
      <v-alert
        class="alert"
        :value="alert_error"
        transition="scale-transition"
        type="error"
      >
        Request Failed !<br />
        {{ alert_error_text }}
        <br />

        <v-btn @click="alert_error = false" elevation="2" color="primary">
          <v-icon large class="mx-2 ma-2 mt-2" color="white">
            mdi-alpha-x
          </v-icon></v-btn
        >
      </v-alert>
      <v-alert
        class="alert"
        :value="alert_success"
        transition="scale-transition"
        type="success"
      >
        success
        <v-btn @click="alert_success = false" elevation="2" color="primary">
          <v-icon large class="mx-2 ma-2 mt-2" color="white">
            mdi-alpha-x
          </v-icon></v-btn
        >
      </v-alert>
      <v-icon large class="mx-2 ma-2" color="blue darken-2" @click="back()">
        mdi-arrow-left
      </v-icon>

      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step editable :complete="e1 > 1" step="1">
            Container
          </v-stepper-step>

          <v-divider></v-divider>
          <v-stepper-step
            :editable="
              this.geteditedOrSavedClaimContainer.damage_caused_by ==
                'Thirdparty' ||
              this.geteditedOrSavedClaimContainer.damage_caused_by ==
                'Outsourcer'
            "
            :complete="e1 > 2"
            :class="{
              'd-none': !(
                this.geteditedOrSavedClaimContainer.damage_caused_by ==
                  'Thirdparty' ||
                this.geteditedOrSavedClaimContainer.damage_caused_by ==
                  'Outsourcer'
              ),
            }"
            step="2"
          >
            {{ this.geteditedOrSavedClaimContainer.damage_caused_by }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable :complete="e1 > 3" step="3">
            Estimates
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable :complete="e1 > 4" step="4">
            Reinvoiced
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="5">
            INSURANCE DECLARATION & FOLLOW UP
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <Container />
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" color="#f0f0f0cc" height="auto">
              <template>
                <Thirdparty ref="ThirdpartyComponent" />
              </template>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card class="mb-12" color="#f0f0f0cc" height="auto">
              <template>
                <v-container fluid>
                  <Estimate />
                </v-container>
              </template>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="4">
            <reinvoiced />
          </v-stepper-content>
          <v-stepper-content step="5">
            <v-card class="mb-12 pa-4" color="#f0f0f0cc" height="auto">
              <InsuranceFollowup ref="InsuranceFollowupComponent" />
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
        <div class="d-flex">
          <v-btn v-if="e1 == 1" class="mx-4" text> backward </v-btn>
          <v-btn v-else color="gray" class="mx-4" @click="stepper_backward(e1)">
            backward
          </v-btn>
          <v-btn v-if="e1 == 4" text> forward </v-btn>
          <v-btn v-else color="primary" @click="stepper_forward(e1)">
            forward
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn color="ma-2 teal white--text" @click="editedOrSavedClaim()">
            save
          </v-btn>
          <v-btn color="ma-2 red white--text"> cancel </v-btn>
        </div>
      </v-stepper>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Estimate from "../../components/ContainerComponents/Estimate/Estimate.vue";
import Container from "../../components/ContainerComponents/ContainerStep/Container.vue";
import Claimdate from "../../components/ContainerComponents/claimDate/Claimdate.vue";
import Thirdparty from "../../components/ContainerComponents/Thirdparty/Thirdparty.vue";
import InsuranceFollowup from "../../components/ContainerComponents/InsuranceFollowup/InsuranceFollowup.vue";
import reinvoiced from "../../components/ContainerComponents/reinvoiced/reinvoiced.vue";

export default {
  components: {
    Estimate,
    Container,
    Claimdate,
    Thirdparty,
    InsuranceFollowup,
    reinvoiced,
  },
  data: () => ({
    e1: 1,
    isNewDepartment: false,
    isEditable: false,
    switch1: false,
    ClaimOrIncidentValue: "Claim",
    departmentID: "",
    modal: false,
    createdOrEdited: "Create",
    alert_error: false,
    alert_error_text: "",
    alert_success: false,
  }),
  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    formTitle() {},
    ...mapGetters([
      "getTypeOfEquipments",
      "getbrands",
      "getnatureOfDamages",
      "getdepartements",
      "geteditedOrSavedClaimContainer",
      "geteditedOrSavedclaim",
    ]),
  },
  watch: {
    ClaimOrIncidentValue: {
      handler(newValue, oldvalue) {
        /* this.set_ClaimOrIncident_claim_SetterAction(
          newValue
        ).then(() => {});   */
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimContainer.id === 0) {
        this.createdOrEdited = "Create";
      } else {
        this.createdOrEdited = "Edit";
      }

      this.set_Claim_id_containerclaim_SetterAction(
        this.geteditedOrSavedclaim.id
      )
        .then(() => {
          // this.setModuleShowToFalseAction();
        })
        .catch(() => {
          // this.setModuleShowToFalseAction();
        });
      // this.ClaimOrIncident();
    },
    ...mapActions([
      "set_ClaimOrIncident_claim_SetterAction",
      "editedOrSavedContainerClaimAction",
      "set_Claim_id_containerclaim_SetterAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),

    ClaimOrIncident() {
      if (this.switch1 == false) {
        this.ClaimOrIncidentValue = "Claim";
      } else {
        this.ClaimOrIncidentValue = "Incident";
      }
      this.set_ClaimOrIncident_claim_SetterAction(
        this.ClaimOrIncidentValue
      ).then(() => {});
    },
    editedOrSavedClaim() {
      this.setModuleShowToTrueAction();
      this.editedOrSavedContainerClaimAction(
        this.geteditedOrSavedClaimContainer
      )
        .then(() => {
          this.setModuleShowToFalseAction();
          this.alert_success = true;
          // this.$refs.ThirdpartyComponent.resetFiles();
          // this.$refs.InsuranceFollowupComponent.resetInputFile();
        })
        .catch((error) => {
          this.alert_error = true;
          var messageObject = JSON.parse(
            error.message.replace(" on unknown line", "")
          );
          this.alert_error_text =
            this.isUndefined(messageObject?.shipping_line_id) +
            " / " +
            this.isUndefined(messageObject?.categorie_of_container) +
            " /  " +
            this.isUndefined(messageObject?.nature_of_damage_id) +
            " / " +
            this.isUndefined(messageObject?.cause_damage) +
            " / " +
            this.isUndefined(messageObject?.damage_caused_by);
          this.setModuleShowToFalseAction();
        });
    },
    isUndefined(item) {
      if (item == undefined) {
        return "";
      } else return item;
    },
    stepper_backward() {
      if (
        this.geteditedOrSavedClaimContainer.damage_caused_by == "Thirdparty" ||
        this.geteditedOrSavedClaimContainer.damage_caused_by == "Outsourcer"
      ) {
        if (this.e1 == 2) {
          this.e1 = parseInt(this.e1 + "") - 1;
        } else {
          this.e1 = parseInt(this.e1 + "") - 1;
        }
      } else {
        if (this.e1 == 3) {
          this.e1 = parseInt(this.e1 + "") - 2;
        } else {
          this.e1 = parseInt(this.e1 + "") - 1;
        }
      }
    },
    stepper_forward() {
      if (
        this.geteditedOrSavedClaimContainer.damage_caused_by == "Thirdparty" ||
        this.geteditedOrSavedClaimContainer.damage_caused_by == "Outsourcer"
      ) {
        if (this.e1 == 2) {
          this.e1 = parseInt(this.e1 + "") + 1;
        } else {
          this.e1 = parseInt(this.e1 + "") + 1;
        }
      } else {
        if (this.e1 == 1) {
          this.e1 = parseInt(this.e1 + "") + 2;
        } else {
          this.e1 = parseInt(this.e1 + "") + 1;
        }
      }
    },
    cancel() {
      this.$router.push({ name: "Container" });
    },
    back() {
      this.$router.push({ name: "CreateClaimOrIncident" });
    },
  },
};
</script>
