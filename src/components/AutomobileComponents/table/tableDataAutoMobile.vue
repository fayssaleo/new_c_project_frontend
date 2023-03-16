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
          <v-toolbar-title>Automobile</v-toolbar-title>

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
                Add
              </v-btn>
            </template>
          </v-dialog>
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
export default {
  components: {},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    loading: false,

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
    ...mapGetters([
      "getAutomobileclaims",
      "getequipments",
      "geteditedOrSavedclaim",
    ]),
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
      this.setAutomobilesAction(this.geteditedOrSavedclaim.id).then(() => {
        this.claims = [...this.getAutomobileclaims];
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
      this.setAutomobilesAllClaimAction().then(() => {
        this.claims = [...this.getAutomobileclaims];
        this.loading = false;
      });
    },
    ...mapActions([
      "setAutomobilesAction",
      "setAutomobilesAction",
      "setAutomobilesAllClaimAction",
      "addDepartementAction",
      "deleteAutomobileClaimAction",
      "setAll_Attr_AUTOMOBILE_CLAiMAction",
      "emptyAll_Attr_AUTOMOBILE_CLAiMAction",
    ]),

    editItem(item) {
      this.editedIndex = this.claims.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.setAll_Attr_AUTOMOBILE_CLAiMAction(item).then(() => {
        this.$router.push({ name: "AddclaimAuto" });
      });

      // this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteAutomobileClaimAction(this.editedItem).then(() => {
        this.claims = [...this.getAutomobileclaims];
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
      this.emptyAll_Attr_AUTOMOBILE_CLAiMAction().then(() => {});
      this.$router.push({ name: "AddclaimAuto" });
    },
    save() {
      if (this.editedIndex == -1) {
        this.addDepartementAction(this.editedItem).then(() => {
          this.departements = [...this.getdepartements];
        });
        //  this.LoadingPage = true;

        setTimeout(() => {
          //this.LoadingPage = false;
        }, 2000);
        this.closeAddSaveDialog();
      } else {
        this.editDepartementAction(this.editedItem).then(() => {
          this.departements = [...this.getdepartements];
        });
        //this.LoadingPage = true;

        setTimeout(() => {
          //this.LoadingPage = false;
        }, 2000);
        this.closeAddSaveDialog();
      }

      this.close();
    },
  },
};
</script>
