<template>
  <div style="padding: 5px">
    <v-data-table
      :headers="headers"
      :items="estimates"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Estimate</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" dark @click="addEstimateDialoge()">
              Add Estimate
            </v-btn>
          </template>

          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeDialoge">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn v-if="isAdd == true" dark text @click="addeItem()">
                    Save
                  </v-btn>
                  <v-btn
                    v-if="isAdd == false"
                    text
                    dark
                    @click="updateEstimate()"
                  >
                    Update
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <template>
                <v-container fluid>
                  <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="4">
                      <v-card class="d-flex pa-4" outlined>
                        <h5 class="green--text text--lighten-2">Temporary</h5>
                        <v-switch
                          color="deep-orange lighten-1"
                          v-model="switch1"
                          @change="TemporaryOrPermanent()"
                        ></v-switch>
                        <h5 class="deep-orange--text text--lighten-1">
                          Permanent
                        </h5>
                      </v-card>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="4">
                      <v-card
                        class="mx-auto"
                        max-width="240"
                        max-height="130"
                        min-height="130"
                        outlined
                      >
                        <v-list-item three-line class="d-flex">
                          <v-list-item-content>
                            <div
                              class="text-overline mb-4 teal--text lighten-1--text"
                            >
                              Estimate amount
                            </div>
                            <v-list-item-title
                              class="text-h5 mb-1 teal--text darken-4--text"
                            >
                              {{ totalAmount }}
                              {{ editedItem.currency_estimate }}
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="35" color="white">
                            <v-icon color="teal lighten-1" large>
                              mdi-cash-multiple
                            </v-icon></v-list-item-avatar
                          >
                        </v-list-item>
                      </v-card>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="4">
                      <v-select
                        :items="currency_list"
                        item-text="name"
                        item-value="code"
                        label="Currency :"
                        v-model="editedItem.currency_estimate"
                        dense
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                  <div class="pa-4 ma-2 grey lighten-3">
                    <v-data-table
                      :headers="headersOtherValuations"
                      :items="otherValuations"
                      :search="search"
                      :loading="loading"
                      loading-text="Loading... Please wait"
                      sort-by="item.id"
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Valuations :</v-toolbar-title>

                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                          ></v-text-field>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-dialog
                          v-model="dialogAdd"
                          transition="dialog-bottom-transition"
                          min-width="500"
                          min-height="300"
                        >
                          <template>
                            <v-card class="">
                              <v-toolbar color="primary" dark
                                >Others valuation</v-toolbar
                              >

                              <v-row class="pa-2">
                                <v-col cols="12"> </v-col>

                                <v-col class="d-flex" cols="12" sm="12">
                                  <v-text-field
                                    class="mx-2"
                                    label="Name valuation"
                                    v-model="otherValuationModel.name"
                                    outlined
                                  ></v-text-field>
                                  <v-select
                                    :items="currency_list"
                                    item-text="name"
                                    item-value="code"
                                    label="Currency :"
                                    v-model="otherValuationModel.currency"
                                    dense
                                    outlined
                                  ></v-select>
                                  <v-text-field
                                    v-model="otherValuationModel.value"
                                    class="mx-2"
                                    label="value"
                                    outlined
                                  ></v-text-field>
                                  <h1>x</h1>
                                  <v-text-field
                                    v-model="otherValuationModel.taux_change"
                                    class="mx-2"
                                    label="Taux de change"
                                    outlined
                                  ></v-text-field>
                                  <h1>=</h1>
                                  <div class="value_valuationChange">
                                    {{ value_valuationChange }}
                                  </div>

                                  <v-btn
                                    color="primary"
                                    class="mr-2 mt-2 white--text"
                                    @click="addotherValuation()"
                                  >
                                    <v-icon left> mdi-plus </v-icon>
                                    Add
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    class="mr-2 mt-2 white--text"
                                    @click="updateotherValuation()"
                                  >
                                    <v-icon left> mdi-pencil </v-icon>
                                    update
                                  </v-btn>
                                </v-col>
                              </v-row>
                              <v-card-actions class="justify-end">
                                <v-btn
                                  color="red"
                                  class="white--text"
                                  @click="dialogAdd = false"
                                  >Close</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </template>
                        </v-dialog>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editOtherValuation(item)"
                        >
                          mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteOtherValuation(item)">
                          mdi-delete
                        </v-icon>
                      </template>
                      <template v-slot:no-data>
                        <v-btn
                          color="primary"
                          @click="resetTableOtherValuations()"
                        >
                          Reset
                        </v-btn>
                      </template>
                    </v-data-table>
                  </div>

                  <v-row class="pa-4 ma-2">
                    <v-col cols="12"><h2>Valuation :</h2> </v-col>

                    <v-col class="d-flex" cols="12" sm="12">
                      <v-select
                        :items="listNameValuations"
                        item-text="name"
                        item-value="name"
                        label="Name valuation :"
                        v-model="NameValuation"
                        dense
                        outlined
                        class="mx-2"
                        @change="changeNameValuation()"
                      ></v-select>
                      <v-text-field
                        v-if="NameValuation == 'Others'"
                        class="mx-2"
                        label="Name valuation"
                        v-model="otherValuationModel.name"
                        outlined
                      ></v-text-field>
                      <v-select
                        :items="currency_list"
                        item-text="name"
                        item-value="code"
                        label="Currency :"
                        v-model="otherValuationModel.currency"
                        dense
                        outlined
                      ></v-select>
                      <v-text-field
                        v-model="otherValuationModel.value"
                        class="mx-2"
                        label="value"
                        outlined
                      ></v-text-field>
                      <h2>X</h2>
                      <v-text-field
                        v-model="otherValuationModel.taux_change"
                        class="mx-2"
                        label="Taux de change"
                        outlined
                      ></v-text-field>
                      <h1>=</h1>
                      <div class="value_valuationChange">
                        {{ value_valuationChange }}
                      </div>

                      <v-btn
                        color="primary"
                        class="mr-2 mt-2 white--text"
                        @click="addotherValuation()"
                      >
                        <v-icon left> mdi-plus </v-icon>
                        Add
                      </v-btn>
                      <v-btn
                        color="primary"
                        class="mr-2 mt-2 white--text"
                        @click="updateotherValuation()"
                      >
                        <v-icon left> mdi-pencil </v-icon>
                        update
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row class="pa-4 ma-2 grey lighten-3">
                    <v-row class="d-flex mb-4">
                      <FilesComponent
                        v-for="item in editedItem.estimate_file"
                        :key="item.id"
                        :deleteFile="deleteFile"
                        :fileItem="item"
                      />
                    </v-row>
                    <v-col class="d-flex" cols="12" sm="8">
                      <v-file-input
                        outlined
                        v-model="editedItem.file"
                        label="File input"
                        class="mt-2"
                        multiple
                      ></v-file-input>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="4"> </v-col>
                  </v-row>
                </v-container>
              </template>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="confirmAddSave" max-width="500px">
            <v-card>
              <v-card-title class="text-h5" v-if="editedIndex == -1"
                >Are you sure you want to add this item?</v-card-title
              >
              <v-card-title class="text-h5" v-else
                >Are you sure you want to update this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddSaveDialog"
                  >No</v-btn
                >
                <v-btn color="blue darken-1" text @click="save">Yes</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize()"> Reset </v-btn>
      </template>
    </v-data-table>
    <LoadingPage v-if="LoadingPage == true" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Inputs from "./Inputs.vue";
import FilesComponent from "./FilesComponent.vue";
import LoadingPage from "@/components/LoadingPage.vue";
export default {
  components: {
    Inputs,
    LoadingPage,
    FilesComponent,
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    switch1: false,
    NameValuation: "",
    listNameValuations: [
      "Equipment purchase costs",
      "Installation and facilities costs",
      "Transportation costs",
      "Expertise",
      "Others",
    ],
    headers: [
      { text: "id", align: "start", value: "estimate.id", sortable: true },
      {
        text: "Temporary or Permanent",
        value: "estimate.temporary_or_permanent",
        sortable: true,
      },
      { text: "Estimate amount", value: "estimate_amount", sortable: true },
      { text: "Currency", value: "estimate.currency_estimate", sortable: true },

      { text: "Actions", value: "actions", sortable: false },
    ],
    headersOtherValuations: [
      { text: "id", align: "start", value: "id", sortable: true },
      { text: "Name", value: "name", sortable: true },
      { text: "Currency", value: "currency", sortable: true },
      { text: "value", value: "value", sortable: true },
      { text: "taux_change", value: "taux_change", sortable: true },
      { text: "value_valuation", value: "value_valuation", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    estimates: [],
    otherValuations: [],
    editedIndex: -1,
    estimateDelete: null,
    dialogAdd: null,
    estimateUpdate: {
      estimate: {
        id: null,
        temporary_or_permanent: "",
        currency_estimate: "",
        fileName: "",

        vessel_id: null,
        otherValuations: [],
        estimate_file: [],
      },
      estimate_amount: 0,
    },
    editedItem: {
      id: null,
      temporary_or_permanent: "Temporary",
      currency_estimate: "",
      fileName: "",

      vessel_id: null,
      otherValuations: [],
      estimate_file: [],
      file: "create",
      filesDelete: [],
    },
    defaultItem: {
      id: 0,

      vessel_id: null,
      currency_estimate: "",
      temporary_or_permanent: "Temporary",
      fileName: null,
      file: "create",
    },
    isAdd: true,
    AmountList: [],
    totalAmount: 0,
    confirmAddSave: false,
    activePicker: null,
    date: null,
    menu: false,
    search: "",
    loading: false,
    textFields: [],
    textFieldModel: {
      id: null,
      name: "",
      value: null,
    },
    otherValuationModel: {
      id: 0,
      name: "",
      currency: "",
      value: 0,
      taux_change: 0,
      value_valuation: 0,
      estimate_id: 0,
    },
    file: [],
    incrument: 8999,
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
    URL: "http://127.0.0.1:8000/storage/cdn/fileEstimates",
    deleteInputs: [],
  }),
  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Department" : "Edit Department";
    },
    value_valuationChange() {
      this.otherValuationModel.value_valuation =
        this.otherValuationModel.value * this.otherValuationModel.taux_change;
      return this.otherValuationModel.value_valuation;
    },
    totalAmountChange() {
      this.totalAmount = 0;

      this.AmountList.map((x) => {
        this.totalAmount = x + this.totalAmount;
      });
      return this.totalAmount;
    },
    ...mapGetters([
      "getestimates",
      "geteditedOrSavedClaimVessel",
      "getotherValuations",
      "getestimateFiles",
    ]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: 0,

          vessel_id: null,
          currency_estimate: "",
          fileName: null,
          file: "create",
        };
      }
      val || this.close();
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },

    isAdd: {
      handler(newValue, oldvalue) {
        if (newValue) {
          this.estimateUpdate.estimate.otherValuations = [];
        }
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      this.setModuleShowToTrueAction();
      this.setestimatesVesselAction(this.geteditedOrSavedClaimVessel.id)
        .then(() => {
          this.estimates = [...this.getestimates];
          this.setModuleShowToFalseAction();
        })
        .catch(() => {
          this.setModuleShowToFalseAction();
        });
      let numOr0 = (n) => (isNaN(n) ? 0 : n);

      this.editedItem.id = 0;
      this.setOtherValuationsByidEstimateAction(this.editedItem.id)
        .then(() => {
          this.otherValuations = [...this.getotherValuations];
        })
        .catch((err) => {
          this.setModuleShowToFalseAction();
          console.error("error", err);
        });
    },
    ...mapActions([
      "setestimatesVesselAction",
      "editestimateVesselAction",
      "deleteestimateAction",
      "addestimateVesselAction",
      "addFileAction",
      "deleteFileAction",
      "setCustomedFieldByEstimateAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
      "setFilesByidEstimateAction",
      "setOtherValuationsByidEstimateAction",
      "AddOtherValuationsByidEstimateAction",
      "DeleteOtherValuationsByidEstimateAction",
      "DeleteOtherValuationsBynameAction",
      "EditeOtherValuationsBynameAction",
      "EditeOtherValuationsByidAction",
    ]),

    addToListTextFields(data) {
      this.textFields.push(data);
      console.info("this.textFields", this.textFields);
    },
    TemporaryOrPermanent() {
      if (this.switch1 == false) {
        this.editedItem.temporary_or_permanent = "Temporary";
      } else {
        this.editedItem.temporary_or_permanent = "Permanent";
      }
    },
    addEstimate() {
      this.editedItem.vessel_id = this.geteditedOrSavedClaimVessel.id;
      this.TemporaryOrPermanent();
      this.editedItem.otherValuations = this.otherValuations;
      console.log("estimate file test", this.editedItem);
      this.setModuleShowToTrueAction();
      this.addestimateVesselAction(this.editedItem)
        .then((resolve) => {
          this.editedItem.id = resolve.estimate.id;
          this.estimateUpdate = resolve;
          this.otherValuations = [];
          this.editedItem.otherValuations = [];

          this.estimates = [...this.getestimates];

          this.editedItem.vessel_id = null;
          this.editedItem.currency_estimate = "";
          this.editedItem.id = 0;
          this.editedItem.file = "";
          this.setModuleShowToFalseAction();
        })
        .catch((err) => {
          console.error("error addestimateVesselAction", err);
          this.setModuleShowToFalseAction();
        });
      this.close();
    },
    updateEstimate() {
      this.editedItem.vessel_id = this.geteditedOrSavedClaimVessel.id;
      this.editedItem.otherValuations =
        this.estimateUpdate.estimate.otherValuations;

      this.TemporaryOrPermanent();
      console.info("this.editedItem", this.editedItem);
      var modelUpdate = {
        estimate: {
          id: this.editedItem.id,
          temporary_or_permanent: this.editedItem.temporary_or_permanent,

          vessel_id: this.editedItem.vessel_id,
          currency_estimate: this.editedItem.currency_estimate,
          fileName: this.editedItem.fileName,
          otherValuations: this.otherValuations,
          file: this.editedItem.file,
          filesDelete: this.editedItem.filesDelete,
          estimate_file: this.editedItem.estimate_file,
        },
        estimate_amount: this.totalAmount,
        deleteInputs: this.deleteInputs,
      };
      console.log("modelUpdate", modelUpdate);
      this.setModuleShowToTrueAction();
      this.editestimateVesselAction(modelUpdate)
        .then((resolve) => {
          setTimeout(() => {
            this.estimates = [...this.getestimates];
          }, 1000);

          this.editedItem.vessel_id = null;
          this.editedItem.currency_estimate = "";
          this.editedItem.id = 0;
          this.editedItem.otherValuations = [];
          this.estimateUpdate.estimate.otherValuations = [];
          this.editedItem.file = "";

          this.estimates = this.estimates.map((c) => {
            if (c.estimate.id == resolve.estimate.id) return resolve;
            return c;
          });
          //this.estimates = [...this.getestimates];
          this.setModuleShowToFalseAction();
        })
        .catch((err) => {
          console.log("err", err);
          this.setModuleShowToFalseAction();
        });
      this.dialog = false;

      this.isAdd = true;
    },
    editItem(item) {
      this.AmountList = [];
      this.deleteInputs = [];

      this.totalAmount = 0;
      this.editedIndex = this.estimates.indexOf(item) + 1;
      // this.editedItem = Object.assign({}, item);
      if (item.estimate.temporary_or_permanent == "Temporary") {
        this.switch1 = false;
      } else {
        this.switch1 = true;
      }

      console.log("item update customed_field", item);
      this.estimateUpdate = item;

      //

      this.editedItem.vessel_id = item.estimate.vessel_id;
      this.editedItem.currency_estimate = item.estimate.currency_estimate;
      this.editedItem.temporary_or_permanent =
        item.estimate.temporary_or_permanent;
      this.editedItem.id = item.estimate.id;
      this.editedItem.fileName = item.estimate.fileName;
      this.setModuleShowToTrueAction();
      this.setFilesByidEstimateAction(item.estimate.id)
        .then((resolve) => {
          this.editedItem.estimate_file = this.getestimateFiles;
        })
        .catch(() => {
          this.setModuleShowToFalseAction();
        });

      this.setOtherValuationsByidEstimateAction(this.editedItem.id)
        .then(() => {
          this.otherValuations = [...this.getotherValuations];
          this.AmountList = [];
          this.otherValuations.map((item) => {
            this.AmountList.push(parseFloat(item.value_valuation));
            this.totalAmount = 0;

            this.AmountList.map((x) => {
              this.totalAmount = x + this.totalAmount;
            });
          });
        })
        .catch((err) => {
          this.setModuleShowToFalseAction();
          console.error("error", err);
        });
      this.setModuleShowToFalseAction();

      this.dialog = true;
      this.isAdd = false;
    },
    resetTableOtherValuations() {
      this.setOtherValuationsByidEstimateAction(this.editedItem.id)
        .then(() => {
          this.otherValuations = [...this.getotherValuations];
        })
        .catch((err) => {
          this.setModuleShowToFalseAction();
          console.error("error", err);
        });
    },
    deleteItem(item) {
      this.estimateDelete = item;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    addeItem(item) {
      this.isAdd = true;
      //this.dialog = true;
      this.addEstimate();
    },
    deleteItemConfirm() {
      console.log("estimateDelete", this.estimateDelete);
      this.setModuleShowToTrueAction();
      this.deleteestimateAction(this.estimateDelete)
        .then(() => {
          this.estimates = [...this.getestimates];
          this.setModuleShowToFalseAction();
        })
        .catch(() => {
          this.setModuleShowToFalseAction();
        });
      // this.LoadingPage = true;

      setTimeout(() => {
        // this.LoadingPage = false;
      }, 2000);
      this.closeDelete();
    },
    close() {
      this.editedIndex = -1;
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    closeAddSaveDialog() {
      this.confirmAddSave = false;
    },
    openSave() {
      this.confirmAddSave = true;
    },
    addclaimRoute() {
      this.$router.push({ name: "Addclaim" });
    },
    save() {
      if (this.isAdd == true) {
        //this.addeItem();
        this.isAdd = false;
        console.log("add", "");
        setTimeout(() => {
          //this.LoadingPage = false;
        }, 2000);
        //this.closeAddSaveDialog();
      } else {
        // this.updateEstimate();

        console.log("update", "");
        //this.LoadingPage = true;

        setTimeout(() => {
          //this.LoadingPage = false;
        }, 2000);
        // this.closeAddSaveDialog();
      }

      this.close();
    },

    addotherValuation() {
      var model = {
        id: 0,
        name: this.otherValuationModel.name,
        currency: this.otherValuationModel.currency,
        value: this.otherValuationModel.value,
        taux_change: this.otherValuationModel.taux_change,
        value_valuation: this.otherValuationModel.value_valuation,
        estimate_id: 0,
      };
      //let numOr0 = (n) => (isNaN(n) ? 0 : n);

      this.AddOtherValuationsByidEstimateAction(model)
        .then((resolve) => {
          this.otherValuations = [...this.getotherValuations];
          this.AmountList.push(parseFloat(model.value_valuation));
          this.totalAmount = 0;

          this.AmountList.map((x) => {
            this.totalAmount = x + this.totalAmount;
          });
        })
        .catch((err) => {
          console.error("error", err);
          this.setModuleShowToFalseAction();
        });

      this.otherValuationModel.id = 0;
      this.otherValuationModel.name = "";
      this.otherValuationModel.currency = "";
      this.otherValuationModel.value = 0;
      this.otherValuationModel.taux_change = 0;
      this.otherValuationModel.value_valuation = 0;
    },

    closeDialoge() {
      this.isAdd = true;
      this.dialog = false;
    },
    deleteFile(item) {
      try {
        this.editedItem.estimate_file = this.editedItem.estimate_file.filter(
          (c) => {
            if (c.id == item.id) {
              this.editedItem.filesDelete.push(item);
            }
            return c.id != item.id;
          }
        );
      } catch (error) {
        console.error("error", error);
      }
    },
    editOtherValuation(item) {
      this.otherValuationModel.id = item.id;
      this.otherValuationModel.name = item.name;
      this.otherValuationModel.currency = item.currency;
      this.otherValuationModel.value = item.value;
      this.otherValuationModel.taux_change = item.taux_change;
      this.otherValuationModel.value_valuation = item.value_valuation;
      // this.dialogAdd = true;
    },
    addEstimateDialoge() {
      this.dialog = true;
      this.AmountList = [];
      this.deleteInputs = [];
      this.totalAmount = 0;

      this.editedItem.id = 0;
      this.setOtherValuationsByidEstimateAction(this.editedItem.id)
        .then(() => {
          this.otherValuations = [...this.getotherValuations];
        })
        .catch((err) => {
          this.setModuleShowToFalseAction();
          console.error("error", err);
        });
    },
    deleteOtherValuation(item) {
      this.setModuleShowToTrueAction();

      if (item.id > 0) {
        this.deleteInputs.push(item);
      }
      this.DeleteOtherValuationsBynameAction(item)
        .then((resolve) => {
          this.otherValuations = [...this.getotherValuations];
          this.AmountList = [];
          this.otherValuations.map((item) => {
            this.AmountList.push(parseFloat(item.value_valuation));
            this.totalAmount = 0;

            this.AmountList.map((x) => {
              this.totalAmount = x + this.totalAmount;
            });
          });
        })
        .catch(() => {
          console.error("error", err);

          this.setModuleShowToFalseAction();
        });
      this.setModuleShowToFalseAction();
    },
    updateotherValuation() {
      var model = {
        id: this.otherValuationModel.id,
        name: this.otherValuationModel.name,
        currency: this.otherValuationModel.currency,
        value: this.otherValuationModel.value,
        taux_change: this.otherValuationModel.taux_change,
        value_valuation: this.otherValuationModel.value_valuation,
        estimate_id: 0,
      };
      if (this.otherValuationModel.id == 0) {
        this.EditeOtherValuationsBynameAction(model)
          .then((resolve) => {
            this.otherValuations = [...this.getotherValuations];
            this.AmountList = [];
            this.otherValuations.map((item) => {
              this.AmountList.push(parseFloat(item.value_valuation));
              this.totalAmount = 0;

              this.AmountList.map((x) => {
                this.totalAmount = x + this.totalAmount;
              });
            });
          })
          .catch(() => {
            this.setModuleShowToFalseAction();
          });
      } else {
        this.EditeOtherValuationsByidAction(model)
          .then((resolve) => {
            this.otherValuations = [...this.getotherValuations];
            this.AmountList = [];
            this.otherValuations.map((item) => {
              this.AmountList.push(parseFloat(item.value_valuation));
              this.totalAmount = 0;

              this.AmountList.map((x) => {
                this.totalAmount = x + this.totalAmount;
              });
            });
          })
          .catch(() => {
            this.setModuleShowToFalseAction();
          });
      }

      this.otherValuationModel.id = 0;
      this.otherValuationModel.name = "";
      this.NameValuation = "";
      this.otherValuationModel.currency = "";
      this.otherValuationModel.value = 0;
      this.otherValuationModel.taux_change = 0;
      this.otherValuationModel.value_valuation = 0;
    },
    changeNameValuation() {
      if (this.NameValuation != "Others") {
        this.otherValuationModel.name = this.NameValuation;
      } else {
        this.otherValuationModel.name = "";
      }
    },
  },
};
</script>
