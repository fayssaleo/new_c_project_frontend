<template>
  <div style="padding: 5px; padding-top: 5%">
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
            {{ getClaimSerialNumber(item) }}
          </td>
          <td
            class="cursor"
            :style="[
              item.status
                ? item.status == 'On progress'
                  ? { color: '#FF5722' }
                  : { color: '#4CAF50' }
                : { color: 'black' },
            ]"
          >
            {{ item.status ? item.status : "On progress" }}
          </td>
          <td class="cursor">{{ item.ClaimOrIncident }}</td>
          <td class="cursor">{{ item.incident_date }}</td>
          <td class="cursor">{{ item.claim_date }}</td>
          <td>
            <v-btn
              color="primary"
              @click="editItem(item)"
              class="m-2 mr-2 btnAction white--text"
            >
              <v-icon medium class="mr-2"> mdi-pencil </v-icon>
            </v-btn>
            <v-btn
              color="red"
              @click="deleteItem(item)"
              class="m-2 mr-2 btnAction white--text"
            >
              <v-icon medium> mdi-delete </v-icon>
            </v-btn>
            <v-btn
              v-if="item.status == 'On progress'"
              color="green"
              @click="closedDialogeF(item)"
              class="m-2 mr-2 btnAction white--text"
            >
              <v-icon medium> mdi-lock-check </v-icon>
            </v-btn>
            <v-btn
              v-if="item.status == 'Closed' || item.status == null"
              color="deep-orange accent-3"
              @click="treatedDialogeF(item)"
              class="m-2 btnAction white--text"
            >
              <v-icon medium> mdi-lock-clock </v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Claims</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{}">
              <v-btn
                color="teal"
                class="mr-2 btn white--text"
                @click="addclaimRoute()"
              >
                <v-icon left> mdi-plus </v-icon>
                Claim / Incident
              </v-btn>
              <v-btn
                :color="colorShowClaim"
                @click="isClaim == false ? showAllClaims() : initialize()"
                class="mr-2 btn white--text"
              >
                <v-icon left> mdi-eye-outline </v-icon>
                Show Claims
              </v-btn>
            </template>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="520px">
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
          <v-dialog v-model="closedDialog" max-width="520px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to closed this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color=" darken-1" @click="closedDialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="primary darken-1" @click="closedF()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="treatedDialog" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to turn this item to 'On progress'
                ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color=" darken-1" @click="treatedDialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="green darken-1" @click="treatedF()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-icon small @click="closedDialoge(item)"> mdi-lock-clock </v-icon>
        <v-icon small @click="treatedDialoge(item)"> mdi-lock-check </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize()"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    closedDialog: false,
    treatedDialog: false,
    search: "",
    loading: false,

    headers: [
      { text: "Claim Serial", align: "start", value: "id", sortable: true },
      { text: "Status", align: "start", value: "status", sortable: true },
      { text: "ClaimOrIncident", value: "ClaimOrIncident", sortable: true },
      { text: "Incident date", value: "incident_date", sortable: true },
      { text: "Claim date", value: "claim_date", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    claims: [],
    closed: {
      id: 0,
    },
    treated: {
      id: 0,
    },
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
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
    ...mapGetters(["getEquipmentclaims", "getclaims"]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: "",
          name: "",
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
      this.setindexIncidentsAction().then(() => {
        this.claims = [...this.getclaims];
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
      this.setindexClaimsAction().then(() => {
        this.claims = [...this.getclaims];
        this.loading = false;
      });
    },
    ...mapActions([
      "setEquipmentsAction",
      "setindexIncidentsAction",
      "setindexClaimsAction",
      "addDepartementAction",
      "deleteClaimAction",
      "set_attr_CLAiMAction",
      "empty_attr_CLAiMAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
      "closedClaimAction",
      "treatedClaimAction",
    ]),

    editItem(item) {
      // this.setModuleShowToTrueAction();
      this.editedIndex = this.claims.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      console.log("this.set_attr_CLAiMAction(item)", item);
      this.set_attr_CLAiMAction(item)
        .then(() => {
          console.log("item", item);
          this.$router.push({ name: "CreateClaimOrIncident" });
        })
        .catch((e) => {});
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.setModuleShowToTrueAction();
      this.deleteClaimAction(this.editedItem)
        .then(() => {
          this.claims = [...this.getclaims];
          this.setModuleShowToTrueAction();
        })
        .catch(() => {});

      setTimeout(() => {
        this.setModuleShowToFalseAction();
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
    closedDialogeF(item) {
      this.closed.id = item.id;
      console.log("closedDialogeF");
      this.closedDialog = true;
    },
    treatedDialogeF(item) {
      this.treated.id = item.id;

      console.log("treatedDialogeF");

      this.treatedDialog = true;
    },
    closedF() {
      this.closedClaimAction(this.closed).then(() => {
        this.claims = [...this.getclaims];
      });

      this.closedDialog = false;
    },
    treatedF() {
      this.treatedClaimAction(this.treated).then(() => {
        this.claims = [...this.getclaims];
      });

      this.treatedDialog = false;
    },

    addclaimRoute() {
      this.empty_attr_CLAiMAction().then(() => {});
      this.$router.push({ name: "CreateClaimOrIncident" });
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
    getClaimSerialNumber(item) {
      console.log("claim", item);
      if (this.isClaim) {
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
  },
};
</script>
