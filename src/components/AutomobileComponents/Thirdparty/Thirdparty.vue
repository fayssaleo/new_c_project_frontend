<template>
  <div>
    <v-card class="mb-12" color="#f0f0f0cc" min-height="290px">
      <template>
        <v-container fluid>
          <v-row align="center">
            <v-col class="d-flex" cols="10">
              <v-file-input
                outlined
                label="Liability letter"
                v-model="thirdparty.liability_letter_files"
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
        </v-container>
      </template>
    </v-card>
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
          <v-toolbar-title>Liability letter files :</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>
        <v-container class="mx-14 mt-4">
          <v-row class="d-flex mb-4">
            <FilesComponent
              v-for="item in liability_letter_files_DATA"
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
import { formatToSimpleFormatDD_MM_YYYY } from "@/helpers/helpers";
import { mapActions, mapGetters } from "vuex";
import FilesComponent from "./FilesComponent.vue";

export default {
  components: {
    FilesComponent,
  },
  props: ["", ""],

  data() {
    return {
      date_of_reimbursementDate: new Date(),
      dialog:false,
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
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu2: false,
      thirdparty: {
        liability_letter_files: [],
        filesDelete: [],
      },
      liability_letter_files_DATA: [],
    };
  },

  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    formTitle() {},

    ...mapGetters([
      "geteditedOrSavedClaimAutomobile",
      "getTypeOfEquipments",
      "getbrands",
      "getnatureOfDamages",
      "getdepartements",
      "geteditedOrSavedClaimAutomobile",
      "getLiability_letter_files_Data_Automobile",
    ]),
  },
  watch: {
    thirdparty: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_thirdparty_automobile_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimAutomobile.id > 0) {
        var model = {
          automobile_id: this.geteditedOrSavedClaimAutomobile.id,
          type: "liability",
        };
        
        this.setliability_letter_files_Data_automobileAction(model).then(() => {
          this.liability_letter_files_DATA = [
            ...this.getLiability_letter_files_Data_Automobile,
          ];
        });
      }
    },
    resetFiles(){
      this.dialog = true;

        var model = {
          automobile_id: this.geteditedOrSavedClaimAutomobile.id,
          type: "liability",
        };

        this.setliability_letter_files_Data_automobileAction(model).then(() => {
          this.liability_letter_files_DATA = [
            ...this.getLiability_letter_files_Data_Automobile,
          ];
        });
        this.thirdparty.liability_letter_files=[];
      
    },
    ...mapActions([
      "set_thirdparty_automobile_claim_SetterAction",
      "set_liability_letter_to_null_SetterAction",
      "setliability_letter_files_Data_automobileAction",
    ]),
    deleteFile(item){
      this.liability_letter_files_DATA = this.liability_letter_files_DATA.filter((c) => c.id != item.id);
      this.thirdparty.filesDelete.push(item);
      
    },
    clickOnChange() {
      this.set_liability_letter_to_null_SetterAction();
    },
    date_of_reimbursementDateChange(input) {
      this.thirdparty.date_of_reimbursement =
        formatToSimpleFormatDD_MM_YYYY(input);
    },
  },
};
</script>
