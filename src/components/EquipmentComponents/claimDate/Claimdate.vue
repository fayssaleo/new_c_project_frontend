<template>
  <div>
    <v-card class="mb-12" color="#f0f0f0cc" height="300px">
      <template>
        <v-container fluid>
          <v-row align="center">
            <v-col class="" cols="12" sm="6">
              <template>
                <vc-date-picker
                  v-model="incidentDate"
                  mode="date"
                  @input="incidentDateChange"
                >
                  <template v-slot="{ inputEvents }">
                    <v-text-field
                      label="Incident Date"
                      outlined
                      :value="dateClaim.incident_date"
                      v-on="inputEvents"
                    >
                    </v-text-field>
                  </template>
                </vc-date-picker>
              </template>
            </v-col>
            <v-col class="" cols="12" sm="6">
              <template>
                <vc-date-picker
                  v-model="claimDate"
                  mode="date"
                  @input="claimDateChange"
                >
                  <template v-slot="{ inputEvents }">
                    <v-text-field
                      label="Incident Date"
                      outlined
                      :value="dateClaim.claim_date"
                      v-on="inputEvents"
                      class="claimDateInputField"
                    >
                    </v-text-field>
                  </template>
                </vc-date-picker>
              </template>
            </v-col>
            <v-col class="" cols="12" sm="6">
              <v-file-input
                v-if="!showDownload"
                outlined
                label="Incident report"
                v-model="dateClaim.incident_reportFile"
              ></v-file-input>
              <a
                class="download mr-4"
                color="white"
                v-if="showDownload"
                :href="
                  'http://127.0.0.1:8000/storage/cdn/equipments/incident_report/' +
                  dateClaim.incident_report
                "
                download="proposed_file_name"
                >DOWNLOAD THE INCIDENT REPORT
                <v-icon class="mr-2"> mdi-download </v-icon></a
              >
              <span
                class="change"
                color="white"
                v-if="showDownload"
                @click="clickOnChange"
                >CHANGE THE INCIDENT REPORT
                <v-icon class="mr-2"> mdi-rotate-3d-variant </v-icon></span
              >
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  formatToSimpleFormatDD_MM_YYYY,
  FormatDateStringToISOSimpleEnglishDate,
} from "../../../helpers/helpers.js";

export default {
  components: {},
  data(vm) {
    return {
      showDownload: false,
      incidentDate: new Date(),
      claimDate: new Date(),
      menu: false,
      menu1: false,
      dateClaim: {
        incident_date: null,
        claim_date: null,
        incident_report: "",
        incident_reportFile: "",
      },
    };
  },
  mounted() {
    document.title = "Claim";
    this.initialize();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    formTitle() {},
    ...mapGetters([
      "geteditedOrSavedClaimEquipment",
      "getTypeOfEquipments",
      "getbrands",
      "getnatureOfDamages",
      "getdepartements",
      "geteditedOrSavedClaimEquipment",
    ]),
  },
  watch: {
    dateClaim: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_date_claim_SetterAction(newValue);
      },
    },
    date: {
      handler(newValue, oldvalue) {
        this.dateFormatted = this.formatDate(this.date);
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    ...mapActions(["set_date_claim_SetterAction"]),
    initialize() {
      if (this.geteditedOrSavedClaimEquipment.id > 0) {
        this.dateClaim.incident_date =
          this.geteditedOrSavedClaimEquipment.incident_date;
        this.dateClaim.claim_date =
          this.geteditedOrSavedClaimEquipment.claim_date;
        this.dateClaim.incident_report =
          this.geteditedOrSavedClaimEquipment.incident_report;
        this.dateClaim.incident_reportFile =
          this.geteditedOrSavedClaimEquipment.incident_reportFile;
        if (
          this.dateClaim.incident_date != "" &&
          this.dateClaim.incident_date != null
        )
          this.incidentDate = new Date(this.dateClaim.incident_date);
        if (
          this.dateClaim.claim_date != "" &&
          this.dateClaim.claim_date != null
        )
          this.claimDate = new Date(this.dateClaim.claim_date);

        this.showDownload =
          this.geteditedOrSavedClaimEquipment.incident_report != null &&
          this.geteditedOrSavedClaimEquipment.incident_report != ""
            ? true
            : false;
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    incidentDateChange(input) {
      this.dateClaim.incident_date = formatToSimpleFormatDD_MM_YYYY(input);
    },
    claimDateChange(input) {
      this.dateClaim.claim_date = formatToSimpleFormatDD_MM_YYYY(input);
    },
    clickOnChange() {
      this.showDownload = false;
    },
  },
};
</script>
