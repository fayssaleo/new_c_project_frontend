<template>
  <div>
    <v-card class="mb-12" height="auto">
      <template>
        <v-container fluid>
          <v-row align="center">
            <v-col cols="12" class="ma-0 pa-0">
              <v-row class="ma-0 pa-0">
                <v-col cols="6" class="ma-0 pa-0"></v-col>
                <v-col cols="6"
                  ><div
                    style="
                      float: right;
                      border: 2px solid black;
                      height: 45px;
                      padding-top: 8px;
                      padding: 8px 10px 0px 10px;
                    "
                    :class="{
                      borderOn: EquipmentModel.major,
                      borderOff: !EquipmentModel.major,
                    }"
                  >
                    <v-switch
                      class="ma-0 pa-0"
                      label="Major Element"
                      :value="EquipmentModel.major"
                      readonly
                      @click="openMajor()"
                    ></v-switch></div
                ></v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              class="m-0 p-0"
              style="margin: 0 !important; padding: 0 !important"
              ><p
                class="font-weight-black m-0 p-0"
                style="margin: 0 !important; padding: 0 !important"
              >
                Equipment :
              </p></v-col
            >
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              v-if="EquipmentModel.type_of_equipment.id != 0"
            >
              <v-select
                :items="typeOfEquipments"
                item-text="name"
                item-value="id"
                label="Type of the equipment :"
                dense
                outlined
                v-model="EquipmentModel.type_of_equipment.id"
                @change="fullfieingTheMatriculesList"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex other"
              cols="6"
              sm="2"
              v-if="EquipmentModel.type_of_equipment.id == 0"
            >
              <v-select
                :items="typeOfEquipments"
                item-text="name"
                item-value="id"
                label="Type of the equipment :"
                dense
                outlined
                v-model="EquipmentModel.type_of_equipment.id"
                filled
                color="primary"
                @change="fullfieingTheMatriculesList"
              ></v-select>
            </v-col>
            <v-col
              v-if="EquipmentModel.type_of_equipment.id == 0"
              class="d-flex"
              cols="6"
              sm="4"
            >
              <v-text-field
                label="Type of the equipment name :"
                outlined
                v-model="EquipmentModel.type_of_equipment.name"
                class="mr-2"
              ></v-text-field>
            </v-col>
            <!---------------------------------------------------------------------------------------------------------------->
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              v-if="EquipmentModel.brand.id != 0"
            >
              <v-select
                :items="brands"
                item-text="name"
                item-value="id"
                v-model="EquipmentModel.brand.id"
                label="Brand of the equipment :"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="6"
              sm="2"
              v-if="EquipmentModel.brand.id == 0"
            >
              <v-select
                :items="brands"
                item-text="name"
                item-value="id"
                v-model="EquipmentModel.brand.id"
                label="Brand of the equipment :"
                dense
                outlined
                filled
                color="primary"
              ></v-select>
            </v-col>
            <v-col
              v-if="EquipmentModel.brand.id == 0"
              class="d-flex"
              cols="6"
              sm="4"
            >
              <v-text-field
                label="Brand name :"
                outlined
                v-model="EquipmentModel.brand.name"
                class="mr-2"
              ></v-text-field>
            </v-col>
            <!---------------------------------------------------------------------------------------------------------------->
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              v-if="EquipmentModel.matricule.id != 0"
            >
              <v-select
                :items="equipmentMatricules"
                item-text="id_equipment"
                item-value="id"
                v-model="EquipmentModel.matricule.id"
                label="Id Equipement "
                dense
                outlined
                @change="changeequipmentMatriculesSELECT()"
                :disabled="EquipmentModel.type_of_equipment.id == 0"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="6"
              sm="2"
              v-if="EquipmentModel.matricule.id == 0"
            >
              <v-select
                :items="equipmentMatricules"
                item-text="id_equipment"
                item-value="id"
                v-model="EquipmentModel.matricule.id"
                label="Id Equipement "
                dense
                outlined
                filled
                color="primary"
                @change="changeequipmentMatriculesSELECT()"
                :disabled="EquipmentModel.type_of_equipment.id == 0"
              ></v-select>
            </v-col>

            <v-col
              v-if="EquipmentModel.matricule.id == 0"
              class="d-flex"
              cols="6"
              sm="4"
            >
              <v-text-field
                label="New id Equipement  :"
                outlined
                v-model="EquipmentModel.matricule.id_equipment"
                :disabled="EquipmentModel.type_of_equipment.id == 0"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                label="Matricule :"
                outlined
                v-model="EquipmentModel.matricule.matricule"
                :disabled="EquipmentModel.type_of_equipment.id == 0"
              ></v-text-field>
            </v-col>
            <!---------------------------------------------------------------------------------------------------------------->
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="departments"
                item-text="name"
                item-value="id"
                v-model="EquipmentModel.department_id"
                label="Department (Owner) :"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <!---------------------------------------------------------------------------------------------------------------->
            <v-col
              cols="12"
              class="m-0 p-0"
              style="margin: 0 !important; padding: 0 !important"
              ><p
                class="font-weight-black m-0 p-0"
                style="margin: 0 !important; padding: 0 !important"
              >
                Damage :
              </p></v-col
            >
            <v-col class="d-flex" cols="12" sm="12">
              <v-row>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="12"
                  v-if="EquipmentModel.nature_of_damage.id != 0"
                >
                  <v-select
                    :items="natureOfDamages"
                    item-text="name"
                    item-value="id"
                    v-model="EquipmentModel.nature_of_damage.id"
                    label="Nature of damages :"
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                  v-if="EquipmentModel.nature_of_damage.id == 0"
                >
                  <v-select
                    :items="natureOfDamages"
                    item-text="name"
                    item-value="id"
                    v-model="EquipmentModel.nature_of_damage.id"
                    label="Nature of damages :"
                    dense
                    outlined
                    filled
                    color="primary"
                  ></v-select>
                </v-col>
                <v-col
                  v-if="EquipmentModel.nature_of_damage.id == 0"
                  class="d-flex"
                  cols="12"
                  sm="8"
                >
                  <v-text-field
                    label="Nature of damage name :"
                    outlined
                    v-model="EquipmentModel.nature_of_damage.name"
                    class="mr-2"
                  ></v-text-field>
                </v-col>

                <v-col class="d-flex" cols="12" sm="12">
                  <v-textarea
                    clearable
                    outlined
                    clear-icon="mdi-close-circle"
                    label="Damage description"
                    v-model="EquipmentModel.damage_description"
                    value=""
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <!---------------------------------------------------------------------------------------------------------------->
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col
              cols="12"
              class="m-0 p-0"
              style="margin: 0 !important; padding: 0 !important"
              ><p
                class="font-weight-black m-0 p-0"
                style="margin: 0 !important; padding: 0 !important"
              >
                Cause :
              </p></v-col
            >
            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                label=" Cause of damage:"
                outlined
                v-model="EquipmentModel.cause_damage"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                multiple
                :items="departments"
                item-text="name"
                item-value="id"
                v-model="EquipmentModel.department"
                label="Concerned internal department :"
                dense
                outlined
                @change="changedepartmentSELECT()"
              ></v-select>
              <v-text-field
                class="mx-2"
                label="Concerned internal department :"
                outlined
                v-if="isNewDepartment"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="Damage_caused_by"
                label="Damage caused by :"
                v-model="EquipmentModel.damage_caused_by"
                dense
                outlined
                @change="change_Damage_caused_by_SELECT()"
              ></v-select>
            </v-col>
            <v-col class="d-flex gray lighten-4 pa-6" cols="12" sm="12">
              <v-row
                v-if="this.EquipmentModel.damage_caused_by == 'TangerAlliance'"
              >
                <h5>Tanger Alliance :</h5>
                <v-col class="d-flex align-baseline" cols="12" sm="12">
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="8"
                          ><v-text-field
                            label="name of the TAT person :"
                            outlined
                            v-model="personName"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="1"
                          ><v-icon
                            large
                            class="mx-8"
                            color=" black darken-2"
                            @click="addpersonsTAT(personName)"
                            :disabled="personName == null || personName == ''"
                          >
                            mdi-account-plus-outline
                          </v-icon></v-col
                        >
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row>
                        <v-col
                          cols="6"
                          style="border: 1px solid black"
                          v-for="person in EquipmentModel.TAT_name_persons"
                          :key="person"
                          ><span
                            >{{ person }}
                            <v-icon
                              style="float: right"
                              large
                              class="mx-8 deleteButtonerson"
                              color=" red darken-2"
                              @click="deletePerson(person)"
                            >
                              mdi-account-minus-outline
                            </v-icon></span
                          ></v-col
                        >
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row
                v-else-if="this.EquipmentModel.damage_caused_by == 'Outsourcer'"
              >
                <h5>Outsourcer :</h5>
                <v-col class="d-flex" cols="12" sm="12">
                  <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                    v-if="EquipmentModel.companie.id != 0"
                  >
                    <v-select
                      :items="companies"
                      item-text="name"
                      item-value="id"
                      v-model="EquipmentModel.companie.id"
                      label="Companies :"
                      dense
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col
                    class="d-flex"
                    cols="6"
                    sm="2"
                    v-if="EquipmentModel.companie.id == 0"
                  >
                    <v-select
                      :items="companies"
                      item-text="name"
                      item-value="id"
                      v-model="EquipmentModel.companie.id"
                      label="Companies  :"
                      dense
                      outlined
                      filled
                      color="primary"
                    ></v-select>
                  </v-col>
                  <v-col
                    v-if="EquipmentModel.companie.id == 0"
                    class="d-flex"
                    cols="6"
                    sm="4"
                  >
                    <v-text-field
                      label="Companies name :"
                      outlined
                      v-model="EquipmentModel.companie.name"
                      class="mr-2"
                    ></v-text-field>
                  </v-col>
                </v-col>
                <v-col class="d-flex align-baseline" cols="12" sm="12">
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="8">
                          <v-text-field
                            label="name of the outsourcer person :"
                            outlined
                            v-model="personName_outsourcer_persons"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="1"
                          ><v-icon
                            large
                            class="mx-8"
                            color=" black darken-2"
                            @click="addpersons_outsourcer_persons(personName)"
                            :disabled="
                              personName_outsourcer_persons == null ||
                              personName_outsourcer_persons == ''
                            "
                          >
                            mdi-account-plus-outline
                          </v-icon></v-col
                        >
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row>
                        <v-col
                          cols="6"
                          style="border: 1px solid black"
                          v-for="person in EquipmentModel.outsourcer_persons"
                          :key="person"
                          ><span
                            >{{ person }}
                            <v-icon
                              style="float: right"
                              large
                              class="mx-8 deleteButtonerson"
                              color=" red darken-2"
                              @click="deletePerson_outsourcer_persons(person)"
                            >
                              mdi-account-minus-outline
                            </v-icon></span
                          ></v-col
                        >
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row
                v-else-if="this.EquipmentModel.damage_caused_by == 'Thirdparty'"
              >
                <h5>Third party</h5>
                <v-col class="d-flex" cols="12" sm="5">
                  <v-text-field
                    class="mx-2"
                    label="Company name :"
                    outlined
                    v-model="EquipmentModel.thirdparty_companies_name"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="5">
                  <v-textarea
                    clearable
                    rows="3"
                    outlined
                    clear-icon="mdi-close-circle"
                    label="Company activities :"
                    value=""
                    v-model="EquipmentModel.thirdparty_Activity_comments"
                  ></v-textarea>
                </v-col>
                <v-col class="d-flex align-baseline" cols="12" sm="12">
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="8"
                          ><v-text-field
                            label="name of the thirdparty persons :"
                            outlined
                            v-model="personName_thirdparty_persons"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="1"
                          ><v-icon
                            large
                            class="mx-8"
                            color=" black darken-2"
                            @click="addpersons_thirdparty_persons(personName)"
                            :disabled="
                              personName_thirdparty_persons == null ||
                              personName_thirdparty_persons == ''
                            "
                          >
                            mdi-account-plus-outline
                          </v-icon></v-col
                        >
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row>
                        <v-col
                          cols="6"
                          style="border: 1px solid black"
                          v-for="person in EquipmentModel.thirdparty_persons"
                          :key="person"
                          ><span
                            >{{ person }}
                            <v-icon
                              style="float: right"
                              large
                              class="mx-8 deleteButtonerson"
                              color=" red darken-2"
                              @click="deletePerson_thirdparty_persons(person)"
                            >
                              mdi-account-minus-outline
                            </v-icon></span
                          ></v-col
                        >
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-dialog v-model="majorDialog" max-width="500px">
            <v-card>
              <v-card-title v-if="EquipmentModel.major" class="text-h5"
                >Are you sure you want to make this item not the
                major?</v-card-title
              >
              <v-card-title v-else class="text-h5"
                >Are you sure you want to make this item the
                major?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color=" darken-1" @click="closeMajor">No</v-btn>
                <v-btn color="primary darken-1" @click="MakeItMajor">Yes</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </template>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      Damage_caused_by: ["TangerAlliance", "Outsourcer", "Thirdparty"],
      typeOfEquipments: [],
      natureOfDamages: [],
      departments: [],
      brands: [],
      companies: [],
      personsList: [],
      personsListDONE: [],
      equipmentMatricules: [],
      personName: "",
      personName_outsourcer_persons: "",
      personName_thirdparty_persons: "",
      majorDialog: false,
      EquipmentModel: {
        isNewEquipmentMatricule: false,
        nature_of_damage_comment: "",
        department_id: "",
        cause_damage: "",
        damage_description: "",
        damage_caused_by: "",
        major: false,
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
        companie: {
          id: 0,
          name: "",
        },
        matricule: {
          id: 0,
          matricule: "",
          id_equipment: "",
          equipment: "",
        },
        department: [],
        thirdparty_companies_name: "",
        thirdparty_Activity_comments: "",
        outsourcer_companies_name: "",
        TAT_name_persons: [],
        outsourcer_persons: [],
        thirdparty_persons: [],
      },
      Damage_caused_by_value: "",
      isDamage_caused_by_value: false,
      isNewDepartment: false,
      isNewEquipmentMatricule: false,
      isOtherNatureOfDamage: false,
    };
  },
  mounted() {
    document.title = "Claim";
    this.setTypeOfEquipmentsByEquipmentAction().then(() => {
      let typeOfEquipmentList = [...this.getTypeOfEquipments];

      var model = {
        id: 0,
        name: "Others",
        categorie: "Equipment",
        created_at: "17/01/2023 10:18",
        updated_at: "17/01/2023 10:18",
      };
      typeOfEquipmentList.push(model);
      this.typeOfEquipments = [...typeOfEquipmentList];
    });
    this.setbrandsEquipmentsAction().then(() => {
      this.brands = [...this.getbrands];
      var model = {
        id: 0,
        name: "Others",
      };
      this.brands.push(model);
    });
    this.setcompaniesEquipmentsAction().then(() => {
      this.companies = [...this.getcompanies];
      var model = {
        id: 0,
        name: "Others",
      };
      this.companies.push(model);
    });
    this.setnatureOfDamagesByEquipmentsAction().then(() => {
      this.natureOfDamages = [...this.getnatureOfDamages];
      var model = {
        id: 0,
        name: "Others",
      };
      this.natureOfDamages.push(model);
    });
    this.setDepartementsAction().then(() => {
      this.departments = [...this.getdepartements];
    });
    setTimeout(() => {
      this.initialize();
    }, 2000);
  },
  computed: {
    formTitle() {},
    ...mapGetters([
      "geteditedOrSavedClaimEquipment",
      "getTypeOfEquipments",
      "getbrands",
      "getnatureOfDamages",
      "getdepartements",
      "geteditedOrSavedClaimEquipment",
      "getequipmentMatricules",
      "getequipmentMatricule",
      "getcompanies",
    ]),
  },
  watch: {
    EquipmentModel: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_equipment_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimEquipment.id > 0) {
        this.EquipmentModel.major = this.geteditedOrSavedClaimEquipment.major;
        this.EquipmentModel.brand.id =
          this.geteditedOrSavedClaimEquipment.brand.id;
        this.EquipmentModel.nature_of_damage.id =
          this.geteditedOrSavedClaimEquipment.nature_of_damage.id;
        this.EquipmentModel.cause_damage =
          this.geteditedOrSavedClaimEquipment.cause_damage;
        this.EquipmentModel.damage_description =
          this.geteditedOrSavedClaimEquipment.damage_description;

        this.EquipmentModel.type_of_equipment.id =
          this.geteditedOrSavedClaimEquipment.type_of_equipment.id;
        //new
        this.EquipmentModel.matricule.id =
          this.geteditedOrSavedClaimEquipment.matricule.id;
        this.EquipmentModel.matricule.id_equipment =
          this.geteditedOrSavedClaimEquipment.matricule.id_equipment;
        this.EquipmentModel.matricule.matricule =
          this.geteditedOrSavedClaimEquipment.matricule.matricule;

        this.EquipmentModel.companie.id =
          this.geteditedOrSavedClaimEquipment.companie.id;
        this.EquipmentModel.companie.name =
          this.geteditedOrSavedClaimEquipment.companie.name;
        //
        this.EquipmentModel.damage_caused_by =
          this.geteditedOrSavedClaimEquipment.damage_caused_by;
        this.EquipmentModel.department_id =
          this.geteditedOrSavedClaimEquipment.department_id;

        this.EquipmentModel.thirdparty_companies_name =
          this.geteditedOrSavedClaimEquipment.thirdparty_companies_name;
        this.EquipmentModel.thirdparty_Activity_comments =
          this.geteditedOrSavedClaimEquipment.thirdparty_Activity_comments;
        this.EquipmentModel.outsourcer_companies_name =
          this.geteditedOrSavedClaimEquipment.outsourcer_companies_name;
        if (
          this.geteditedOrSavedClaimEquipment.TAT_name_persons != "" &&
          this.geteditedOrSavedClaimEquipment.TAT_name_persons != null
        )
          this.EquipmentModel.TAT_name_persons =
            this.geteditedOrSavedClaimEquipment.TAT_name_persons.split("|");
        if (
          this.geteditedOrSavedClaimEquipment.outsourcer_persons != "" &&
          this.geteditedOrSavedClaimEquipment.outsourcer_persons != null
        )
          this.EquipmentModel.outsourcer_persons =
            this.geteditedOrSavedClaimEquipment.outsourcer_persons.split("|");
        if (
          this.geteditedOrSavedClaimEquipment.thirdparty_persons != "" &&
          this.geteditedOrSavedClaimEquipment.thirdparty_persons != null
        )
          this.EquipmentModel.thirdparty_persons =
            this.geteditedOrSavedClaimEquipment.thirdparty_persons.split("|");
        if (
          this.geteditedOrSavedClaimEquipment.concerned_internal_department !=
            "" &&
          this.geteditedOrSavedClaimEquipment.concerned_internal_department !=
            null
        )
          this.EquipmentModel.department =
            this.geteditedOrSavedClaimEquipment.concerned_internal_department
              .split("|")
              .map((e) => {
                return parseInt(e);
              });
        this.setModuleShowToFalseAction();
        if (this.EquipmentModel.type_of_equipment.id != 0) {
          this.setModuleShowToTrueAction();
          let TypeEquipmentName = this.getTypeOfEquipments.filter((e) => {
            return e.id == this.EquipmentModel.type_of_equipment.id;
          })[0];
          this.setequipmentMatriculesAction(TypeEquipmentName.name)
            .then(() => {
              this.equipmentMatricules = [...this.getequipmentMatricules];
              var model = {
                id: 0,
                id_equipment: "Others",
              };
              this.equipmentMatricules.push(model);
              this.isNewEquipmentMatricule = false;
              this.EquipmentModel.isNewEquipmentMatricule = false;

              this.EquipmentModel.matricule.id =
                this.geteditedOrSavedClaimEquipment.matricule.id;

              this.EquipmentModel.matricule.id_equipment =
                this.geteditedOrSavedClaimEquipment.id_equipment + "";

              this.EquipmentModel.matricule.matricule =
                this.geteditedOrSavedClaimEquipment.matricule.matricule + "";

              this.EquipmentModel.matricule.equipment =
                this.geteditedOrSavedClaimEquipment.equipment + "";
              this.setModuleShowToFalseAction();
            })
            .catch(() => {
              this.setModuleShowToFalseAction();
            });
        } else {
          var model = {
            id: 0,
            id_equipment: "Others",
          };
          this.equipmentMatricules.push(model);
        }
      } else {
        var model = {
          id: 0,
          id_equipment: "Others",
        };
        this.equipmentMatricules.push(model);
      }
    },
    ...mapActions([
      "setTypeOfEquipmentsByEquipmentAction",
      "setbrandsEquipmentsAction",
      "setcompaniesEquipmentsAction",
      "setnatureOfDamagesByEquipmentsAction",
      "setDepartementsAction",
      "set_equipment_claim_SetterAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
      "setequipmentMatriculesAction",
      "setequipmentMatriculeById_eqAction",
      "makeItMajorEquipmentClaimAction",
      "makeNotMajorEquipmentClaimAction",
    ]),
    MakeItMajor() {
      if (!this.EquipmentModel.major) {
        this.EquipmentModel.major = true;
        this.closeMajor();
      } else {
        this.EquipmentModel.major = false;
        this.closeMajor();
      }
    },
    openMajor() {
      this.majorDialog = true;
    },
    closeMajor() {
      this.majorDialog = false;
    },
    changedepartmentSELECT() {
      this.isNewDepartment = false;
      this.EquipmentModel.department.map((c) => {
        if (c == 0) this.isNewDepartment = true;
      });
    },
    changeequipmentMatriculesSELECT() {
      if (this.EquipmentModel.matricule.id == 0) {
        this.EquipmentModel.matricule.matricule = "";
        this.EquipmentModel.matricule.id_equipment = "";
        this.EquipmentModel.isNewEquipmentMatricule = true;

        this.isNewEquipmentMatricule = true;
      } else {
        let ThisEquipmentMatricule = this.equipmentMatricules.filter((e) => {
          return e.id == this.EquipmentModel.matricule.id;
        })[0];

        this.EquipmentModel.matricule.matricule =
          ThisEquipmentMatricule.matricule;
        this.EquipmentModel.matricule.equipment =
          ThisEquipmentMatricule.equipment;
        this.EquipmentModel.matricule.id_equipment =
          ThisEquipmentMatricule.id_equipment;
        this.isNewEquipmentMatricule = false;
        this.EquipmentModel.isNewEquipmentMatricule = false;
        /*this.setequipmentMatriculeById_eqAction(
          this.EquipmentModel.matricule.id
        ).then(() => {
          this.EquipmentModel.matricule.matricule =
            this.getequipmentMatricule.matricule;
          this.EquipmentModel.matricule.equipment =
            this.getequipmentMatricule.equipment;
          this.EquipmentModel.matricule.id_equipment =
            this.getequipmentMatricule.id_equipment;
          this.isNewEquipmentMatricule = false;
          this.EquipmentModel.isNewEquipmentMatricule = false;
        });*/
      }
    },
    change_Damage_caused_by_SELECT() {
      this.isDamage_caused_by_value = true;
      if (this.EquipmentModel.damage_caused_by == "Thirdparty") {
        this.isEditable = true;
      } else {
        this.isEditable = false;
      }
      //this.EquipmentModel.damage_caused_by = this.Damage_caused_by_value;
    },
    addpersonsTAT() {
      this.EquipmentModel.TAT_name_persons.push(this.personName);
      this.personName = "";
    },
    addpersons_outsourcer_persons() {
      this.EquipmentModel.outsourcer_persons.push(
        this.personName_outsourcer_persons
      );
      this.personName_outsourcer_persons = "";
    },
    addpersons_thirdparty_persons() {
      this.EquipmentModel.thirdparty_persons.push(
        this.personName_thirdparty_persons
      );
      this.personName_thirdparty_persons = "";
    },
    deletePerson(index) {
      this.EquipmentModel.TAT_name_persons =
        this.EquipmentModel.TAT_name_persons.filter((e) => e != index);
    },
    deletePerson_outsourcer_persons(index) {
      this.EquipmentModel.outsourcer_persons =
        this.EquipmentModel.outsourcer_persons.filter((e) => e != index);
    },
    deletePerson_thirdparty_persons(index) {
      this.EquipmentModel.thirdparty_persons =
        this.EquipmentModel.thirdparty_persons.filter((e) => e != index);
    },
    changedepartmentSELECT() {
      //this.this.EquipmentModel.concerned_internal_department=
    },
    fullfieingTheMatriculesList() {
      this.setModuleShowToTrueAction();
      this.EquipmentModel.matricule.id = 0;
      this.EquipmentModel.matricule.id_equipment = "";
      this.EquipmentModel.matricule.matricule = "";
      this.EquipmentModel.matricule.equipment = "";
      if (
        this.EquipmentModel.type_of_equipment.id != 0 &&
        this.EquipmentModel.type_of_equipment.id != "" &&
        this.EquipmentModel.type_of_equipment.id != null
      ) {
        let TypeEquipmentName = this.getTypeOfEquipments.filter((e) => {
          return e.id == this.EquipmentModel.type_of_equipment.id;
        })[0];
        this.setequipmentMatriculesAction(TypeEquipmentName.name)
          .then(() => {
            this.equipmentMatricules = [...this.getequipmentMatricules];
            var model = {
              id: 0,
              id_equipment: "Others",
            };
            this.equipmentMatricules.push(model);
            this.isNewEquipmentMatricule = false;
            this.EquipmentModel.isNewEquipmentMatricule = false;
            this.EquipmentModel.matricule.equipment = TypeEquipmentName.name;
            this.setModuleShowToFalseAction();
          })
          .catch(() => {
            this.setModuleShowToFalseAction();
          });
      }
      this.setModuleShowToFalseAction();
    },
  },
};
</script>
<style lang="scss">
.borderOn {
  border-color: #1976d2 !important;
}
.borderOff {
  border-color: #80dda1 !important;
}
</style>
