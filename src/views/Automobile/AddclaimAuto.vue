<template>
  <div style="padding: 5px; padding-top: 1%">
    <h3 class="text-uppercase">CREATING THE AUTOMOBILE</h3>
    <template>
      <v-alert
        class="alert"
        :value="alert_error"
        transition="scale-transition"
        type="error"
      >
        Request Failed ! <br />
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
            Automobile
          </v-stepper-step>

          <v-divider></v-divider>
          <v-stepper-step
            :editable="
              this.geteditedOrSavedClaimAutomobile.damage_caused_by ==
                'Thirdparty' ||
              this.geteditedOrSavedClaimAutomobile.damage_caused_by ==
                'Outsourcer'
            "
            :complete="e1 > 2"
            :class="{
              'd-none': !(
                this.geteditedOrSavedClaimAutomobile.damage_caused_by ==
                  'Thirdparty' ||
                this.geteditedOrSavedClaimAutomobile.damage_caused_by ==
                  'Outsourcer'
              ),
            }"
            step="2"
          >
            {{ this.geteditedOrSavedClaimAutomobile.damage_caused_by }}
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
            <Automobile />
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" color="#f0f0f0cc" height="auto">
              <template>
                <Thirdparty ref="ThirdpartyComponentAutomobile" />
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
          <v-btn v-if="e1 == 5" text> forward </v-btn>
          <v-btn v-else color="primary" @click="stepper_forward(e1)">
            forward
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn color="ma-2 teal white--text" @click="editedOrSavedClaim()">
            save
          </v-btn>
          <v-btn color="ma-2 red white--text" @click="cancel()"> cancel </v-btn>
        </div>
      </v-stepper>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Estimate from "../../components/AutomobileComponents/Estimate/Estimate.vue";
import Automobile from "../../components/AutomobileComponents/AutomobileStep/Automobile.vue";
import Claimdate from "../../components/AutomobileComponents/claimDate/Claimdate.vue";
import Thirdparty from "../../components/AutomobileComponents/Thirdparty/Thirdparty.vue";
import InsuranceFollowup from "../../components/AutomobileComponents/InsuranceFollowup/InsuranceFollowup.vue";
import reinvoiced from "../../components/AutomobileComponents/reinvoiced/reinvoiced.vue";

export default {
  components: {
    Estimate,
    Automobile,
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
    alert_success: false,
    alert_error_text: "",
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
      "geteditedOrSavedClaimAutomobile",
      "geteditedOrSavedclaim",
    ]),
  },
  watch: {
    ClaimOrIncidentValue: {
      handler(newValue, oldvalue) {
        this.set_ClaimOrIncident_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimAutomobile.id === 0) {
        this.createdOrEdited = "Create";
      } else {
        this.createdOrEdited = "Edit";
      }
      this.set_Claim_id_automobileclaim_SetterAction(
        this.geteditedOrSavedclaim.id
      )
        .then(() => {
          // this.setModuleShowToFalseAction();
        })
        .catch(() => {
          // this.setModuleShowToFalseAction();
        });
      //this.ClaimOrIncident();
    },
    ...mapActions([
      "set_ClaimOrIncident_claim_SetterAction",
      "editedOrSavedAutomobileClaimAction",
      "set_Claim_id_automobileclaim_SetterAction",
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
      this.editedOrSavedAutomobileClaimAction(
        this.geteditedOrSavedClaimAutomobile
      )
        .then(() => {
          this.setModuleShowToFalseAction();
          this.alert_success = true;

          //this.$refs.ThirdpartyComponentAutomobile.resetFiles();
          //this.$refs.InsuranceFollowupComponent.resetInputFile();
        })
        .catch((error) => {
          this.alert_error = true;
          var messageObject = JSON.parse(
            error.message.replace(" on unknown line", "")
          );
          this.alert_error_text =
            this.isUndefined(messageObject?.type_of_equipment_id) +
            " / " +
            this.isUndefined(messageObject?.brand_id) +
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
        this.geteditedOrSavedClaimAutomobile.damage_caused_by == "Thirdparty" ||
        this.geteditedOrSavedClaimAutomobile.damage_caused_by == "Outsourcer"
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
        this.geteditedOrSavedClaimAutomobile.damage_caused_by == "Thirdparty" ||
        this.geteditedOrSavedClaimAutomobile.damage_caused_by == "Outsourcer"
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
      this.$router.push({ name: "Automobile" });
    },
    back() {
      this.$router.push({ name: "CreateClaimOrIncident" });
    },
  },
};
</script>
<style scoped>
.alert {
  position: fixed;
  top: 0;
  right: 0;

  z-index: 10000000000000;
  text-align: center;

  margin-top: 5%;
}
</style>
