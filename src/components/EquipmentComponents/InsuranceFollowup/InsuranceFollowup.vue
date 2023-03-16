<template>
  <div>
    <h4>Insurance declaration :</h4>
    <v-row align="center">
      <v-col class="" cols="12" sm="4">
        <vc-date-picker
          v-model="declarationDate"
          mode="date"
          @input="declarationDateChange"
        >
          <template v-slot="{ inputEvents }">
            <v-text-field
              label="Declaration Date"
              outlined
              :value="insurance_followup.date_of_declaration"
              v-on="inputEvents"
              class="declarationDateInputField"
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>

      <v-col class="" cols="12" sm="4">
        <vc-date-picker
          v-model="feedbackDate"
          mode="date"
          @input="feedbackDateChange"
        >
          <template v-slot="{ inputEvents }">
            <v-text-field
              label="Date of feedback"
              outlined
              :value="insurance_followup.date_of_feedback"
              v-on="inputEvents"
              class="feedbackDateInputField"
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>
      <v-col class="d-flex" cols="12" sm="4">
        <v-text-field
          v-model="insurance_followup.comment_Insurance"
          label="Comment :"
          outlined
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="10">
        <v-file-input
          outlined
          label="Insurance declaration"
          v-model="insurance_followup.insurance_declaration_files"
          multiple
        ></v-file-input>
      </v-col>
      <v-col cols="2">
        <v-btn
          class="mb-10"
          fab
          dark
          large
          color="primary"
          @click="resetFiles()"
        >
          <v-icon dark> mdi-file-multiple </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="ma-2"></v-divider>
    <h4>Indemnisation :</h4>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="insurance_followup.Indemnification_of_insurer"
          label="Indemnification of the insurer :"
          outlined
        ></v-text-field>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="currency_list"
          item-text="name"
          item-value="code"
          label="Currency :"
          v-model="insurance_followup.currency_indemnisation"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col class="" cols="12" sm="4">
        <vc-date-picker
          v-model="Indemnification_date"
          mode="date"
          @input="Indemnification_dateChange"
        >
          <template v-slot="{ inputEvents }">
            <v-text-field
              label="Indemnification Date"
              outlined
              :value="insurance_followup.Indemnification_date"
              v-on="inputEvents"
              class="Indemnification_dateInputField"
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field
          v-model="insurance_followup.deductible_charge_TAT"
          label="Deductible in charge of TAT :"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Insurance declaration files :</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container class="mx-14 mt-4">
          <v-row class="d-flex mb-4">
            <FilesComponent
              v-for="item in insurance_declaration_files_DATA"
              :key="item.id"
              :deleteFile="deleteFile"
              :fileItem="item"
            />
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatToSimpleFormatDD_MM_YYYY } from "../../../helpers/helpers.js";
import FilesComponent from "./FilesComponent.vue";

export default {
  components: {
    FilesComponent,
  },

  data() {
    return {
      declarationDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      feedbackDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      Indemnification_date: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menu2: false,
      menu3: false,
      menu4: false,
      dialog: false,
      insurance_followup: {
        date_of_declaration: null,
        date_of_feedback: "",
        comment_Insurance: "",
        Indemnification_of_insurer: null,
        Indemnification_date: null,
        currency_indemnisation: null,
        deductible_charge_TAT: null,
        Complementary_indemnification: null,
        insurance_declaration_files: [],
        filesDelete: [],
      },
      insurance_declaration_files_DATA: [],

      currency_list: [
        { name: "Moroccan Dirham", code: "MAD", symbol: "MAD", id: 1 },
        { name: "British Pound Sterling", code: "GBP", symbol: "£", id: 2 },
        { name: "Canadian Dollar", code: "CAD", symbol: "$", id: 3 },
        { name: "Chinese Yuan", code: "CNY", symbol: "¥", id: 4 },
        { name: "Euro", code: "EUR", symbol: "€", id: 5 },
        { name: "Hong Kong Dollar", code: "HKD", symbol: "$", id: 6 },
        { name: "Japanese Yen", code: "JPY", symbol: "¥", id: 7 },
        { name: "New Zealand Dollar", code: "NZD", symbol: "$", id: 8 },
        { name: "Swiss Franc", code: "CHF", symbol: "CHf", id: 9 },
        { name: "US Dollar", code: "USD", symbol: "$", id: 10 },
        { name: "Australian Dollar", code: "AUD", symbol: "$", id: 11 },
      ],
    };
  },

  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    formTitle() {},
    ...mapGetters([
      "geteditedOrSavedClaimEquipment",
      "getLiability_letter_files_Data_Equipment",
    ]),
    showDownload() {
      return this.geteditedOrSavedClaimEquipment.insurance_declaration !=
        null && this.geteditedOrSavedClaimEquipment.insurance_declaration != ""
        ? true
        : false;
    },
  },
  watch: {
    insurance_followup: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_insurance_followup_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimEquipment.id > 0) {
        this.insurance_followup.date_of_declaration =
          this.geteditedOrSavedClaimEquipment.date_of_declaration;
        this.insurance_followup.date_of_feedback =
          this.geteditedOrSavedClaimEquipment.date_of_feedback;

        this.insurance_followup.comment_Insurance =
          this.geteditedOrSavedClaimEquipment.comment_Insurance;

        this.insurance_followup.Indemnification_of_insurer =
          this.geteditedOrSavedClaimEquipment.Indemnification_of_insurer;

        this.insurance_followup.currency_indemnisation =
          this.geteditedOrSavedClaimEquipment.currency_indemnisation;

        this.insurance_followup.deductible_charge_TAT =
          this.geteditedOrSavedClaimEquipment.deductible_charge_TAT;

        this.insurance_followup.Complementary_indemnification =
          this.geteditedOrSavedClaimEquipment.Complementary_indemnification;

        this.insurance_followup.Indemnification_date =
          this.geteditedOrSavedClaimEquipment.Indemnification_date;
      }
    },
    resetFiles() {
      this.dialog = true;
      var model = {
        equipment_id: this.geteditedOrSavedClaimEquipment.id,
        type: "insurance",
      };

      this.setliability_letter_files_DataAction(model).then(() => {
        this.insurance_declaration_files_DATA = [
          ...this.getLiability_letter_files_Data_Equipment,
        ];
      });
      //this.insurance_followup.liability_letter_files = [];
    },
    resetInputFile() {
     
     this.insurance_followup.insurance_declaration_files = [];
   },
    deleteFile(item){
      this.insurance_declaration_files_DATA = this.insurance_declaration_files_DATA.filter((c) => c.id != item.id);
      this.insurance_followup.filesDelete.push(item);
      
    },
    declarationDateChange(input) {
      this.insurance_followup.date_of_declaration =
        formatToSimpleFormatDD_MM_YYYY(input);
    },
    feedbackDateChange(input) {
      this.insurance_followup.date_of_feedback =
        formatToSimpleFormatDD_MM_YYYY(input);
    },
    Indemnification_dateChange(input) {
      this.insurance_followup.Indemnification_date =
        formatToSimpleFormatDD_MM_YYYY(input);
    },
    ...mapActions([
      "set_insurance_followup_claim_SetterAction",
      "set_insurance_declaration_to_null_SetterAction",
      "setliability_letter_files_DataAction",
    ]),
    clickOnChange() {
      this.set_insurance_declaration_to_null_SetterAction();
    },
  },
};
</script>
