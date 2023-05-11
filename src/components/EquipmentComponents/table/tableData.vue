<template>
  <div style="padding: 5px; padding-top: 3%; margin: 10px">
    <v-data-table
      :headers="headers"
      :items="claims"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr class="">
          <td class="cursor">
            {{ item.id }}
          </td>
          <td
            class="cursor"
            v-if="
              item.type_of_equipment.name != '' &&
              item.type_of_equipment.name != null
            "
          >
            {{ item.type_of_equipment.name }}
          </td>
          <td class="cursor" v-else>
            <v-chip color="#528dc9" class="white--text cursor">
              Not defined
            </v-chip>
          </td>
          <td class="cursor">
            <v-chip
              color="#f54 "
              v-if="item.nature_of_damage.id == 0"
              class="white--text cursor"
            >
              Not Damaged
            </v-chip>
            <v-chip color="#76ba99" v-else class="white--text cursor">
              Damaged
            </v-chip>
          </td>
          <td
            class="cursor"
            v-if="item.damage_caused_by != '' && item.damage_caused_by != null"
          >
            {{ item.damage_caused_by }}
          </td>
          <td class="cursor" v-else>
            <v-chip color="#528dc9" class="white--text cursor">
              Not defined
            </v-chip>
          </td>

          <td class="cursor">
            <v-chip
              color="#f54 "
              v-if="item.date_of_declaration == null"
              class="white--text cursor"
            >
              Undeclared
            </v-chip>
            <v-chip color="#76ba99" v-else class="white--text cursor">
              Declared
            </v-chip>
          </td>
          <td class="cursor" v-if="item.estimationAmount != '0 ()'">
            {{ item.estimationAmount }}
          </td>
          <td class="cursor" v-else>
            <v-chip
              color="#528dc9"
              v-if="item.date_of_declaration == null"
              class="white--text cursor"
            >
              Not yet
            </v-chip>
          </td>
          <td>
            <v-btn
              color="primary"
              @click="editItem(item)"
              class="m-2 mr-2 btnAction white--text"
            >
              <v-icon medium class="mr-2"> mdi-pencil </v-icon>
            </v-btn>
            <v-btn
              color="#f45"
              @click="deleteItem(item)"
              class="m-2 btnAction white--text"
            >
              <v-icon medium> mdi-delete </v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Equipments</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color=" darken-1" @click="closeDelete">Cancel</v-btn>
                <v-btn color="error darken-1" @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogAdd"
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{}">
              <v-btn
                color="teal"
                class="mr-2 btn white--text"
                @click="addclaimRoute()"
              >
                <v-icon left> mdi-plus </v-icon>
                Add
              </v-btn>
            </template>
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Addclaim from "../../../views/Equipment/Addclaim.vue";
export default {
  components: { Addclaim },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    loading: false,
    dialogAdd: false,
    isAdd: false,
    headers: [
      { text: "ID", align: "start", value: "id", sortable: true },
      { text: "Type", align: "start", value: "type", sortable: true },
      { text: "Status", align: "start", value: "id", sortable: true },

      { text: "Damage caused by", value: "damage_caused_by", sortable: true },
      {
        text: "Declared",
        value: "date_of_declaration",
        sortable: true,
      },
      {
        text: "Estimated Amout (Permanent)",
        value: "estimationAmount",
        sortable: true,
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    claims: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      status: "",
      incident_date: "",
      claim_date: "",
      ClaimOrIncident: "",
      categorie_of_equipment: "",
      concerned_internal_department: "",
      equipement_registration: "",
      cause_damage: "",
      Liability_letter_number: "",
      amount: null,
      currency: "",
      comment_third_party: "",
      reinvoiced: "",
      currency_Insurance: "",
      Invoice_number: null,
      date_of_reimbursement: "",
      reimbursed_amount: null,
      date_of_declaration: null,
      date_of_feedback: null,
      comment_Insurance: null,
      Indemnification_of_insurer: "",
      Indemnification_date: "",
      currency_indemnisation: "",
      deductible_charge_TAT: 5000,
      damage_caused_by: "",
      TAT_name_persons: "",
      outsourcer_company_name: null,
      thirdparty_company_name: null,
      thirdparty_Activity_comments: null,
      categorie_of_equipment: "",
      incident_report: null,
      incident_reportFile: null,
      liability_letter: null,
      liability_letterFile: null,
      insurance_declaration: null,
      insurance_declarationFile: null,
      type_of_equipment: {
        id: 0,
        name: "",
      },
      brand: {
        id: 0,
        name: "",
      },
      nature_of_damage: {
        id: 0,
        name: "",
      },
      department: [],
      estimate: [],
    },
    defaultItem: {
      id: "",
      name: "",
    },
    confirmAddSave: false,
    colorShowClaim: "primary",
    isClaim: false,
  }),
  mounted() {
    document.title = "Claim";
    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New " : "Edit ";
    },
    ...mapGetters(["getEquipmentclaims", "geteditedOrSavedclaim"]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: 0,
          status: "",
          incident_date: "",
          claim_date: "",
          ClaimOrIncident: "",
          categorie_of_equipment: "",
          concerned_internal_department: "",
          equipement_registration: "",
          cause_damage: "",
          Liability_letter_number: "",
          amount: null,
          currency: "",
          comment_third_party: "",
          reinvoiced: "",
          currency_Insurance: "",
          Invoice_number: null,
          date_of_reimbursement: "",
          reimbursed_amount: null,
          date_of_declaration: null,
          date_of_feedback: null,
          comment_Insurance: null,
          Indemnification_of_insurer: "",
          Indemnification_date: "",
          currency_indemnisation: "",
          deductible_charge_TAT: 5000,
          damage_caused_by: "",
          TAT_name_persons: "",
          outsourcer_company_name: null,
          thirdparty_company_name: null,
          thirdparty_Activity_comments: null,
          categorie_of_equipment: "",
          incident_report: null,
          incident_reportFile: null,
          liability_letter: null,
          liability_letterFile: null,
          insurance_declaration: null,
          insurance_declarationFile: null,
          type_of_equipment: {
            id: 0,
            name: "",
          },
          brand: {
            id: 0,
            name: "",
          },
          nature_of_damage: {
            id: 0,
            name: "",
          },
          department: [],
          estimate: [],
        };
      }
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    //this.initialize();
  },
  methods: {
    initialize() {
      this.claims = [];
      this.loading = true;
      this.setEquipmentsAction(this.geteditedOrSavedclaim.id).then(() => {
        this.claims = [...this.getEquipmentclaims];
        this.loading = false;
      });
      this.colorShowClaim = "black";
      this.isClaim = false;
    },
    showAllClaims() {
      this.claims = [];
      this.colorShowClaim = "orange darken-2";
      this.isClaim = true;
      this.loading = true;
      this.setEquipmentsAction().then(() => {
        this.claims = [...this.getEquipmentclaims];
        this.loading = false;
      });
    },
    ...mapActions([
      "setEquipmentsAction",
      "addDepartementAction",
      "deleteEquipmentClaimAction",
      "setAll_Attr_EQUIPMENT_CLAiMAction",
      "emptyAll_Attr_EQUIPMENT_CLAiMAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    editItem(item) {
      this.setModuleShowToTrueAction();
      this.editedIndex = this.claims.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);

      this.setAll_Attr_EQUIPMENT_CLAiMAction(item)
        .then(() => {
          this.$router.push({ name: "Addclaim" });
          //this.dialogAdd=true;
        })
        .catch((e) => {});

      // this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.setModuleShowToTrueAction();
      this.deleteEquipmentClaimAction(this.editedItem)
        .then(() => {
          this.claims = [...this.getEquipmentclaims];
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
    closeDialoge() {
      this.emptyAll_Attr_EQUIPMENT_CLAiMAction().then(() => {});
      this.dialogAdd = false;
    },
    addclaimRoute() {
      this.emptyAll_Attr_EQUIPMENT_CLAiMAction().then(() => {
        this.$router.push({ name: "Addclaim" });
      });
    },
    save() {
      if (this.editedIndex == -1) {
        this.addDepartementAction(this.editedItem).then(() => {
          this.departements = [...this.getdepartements];
        });
        setTimeout(() => {}, 2000);
        this.closeAddSaveDialog();
      } else {
        this.editDepartementAction(this.editedItem).then(() => {
          this.departements = [...this.getdepartements];
        });
        setTimeout(() => {}, 2000);
        this.closeAddSaveDialog();
      }
      this.close();
    },
  },
};
</script>
