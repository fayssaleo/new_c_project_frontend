import { toLaravelDatetime, NullTest } from "@/helpers/helpers";
import CustomizedAxios from "../../plugins/axios";

const claimsAutomobileModule = {
  state: {
    automobiles: [],
    editedOrSavedClaimAutomobile: {
      id: 0,
      claim_id: 0,
      department_id: 0,
      categorie_of_equipment: "",
      concerned_internal_department: "",
      department: 0,
      equipement_registration: "",
      cause_damage: "",
      damage_description: "",
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
      outsourcer_persons: "",
      thirdparty_company_name: null,
      thirdparty_Activity_comments: null,
      thirdparty_persons: "",
      categorie_of_equipment: "",
      liability_letter_files: [],
      insurance_declaration_files: [],
      filesDelete: [],
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
      estimate: [],
    },
    liability_letter_files_Data: [],
  },
  mutations: {
    MAKE_MAJOR_AUTOMOBILE(state, automobile) {
      for (let index = 0; index < state.automobiles.length; index++) {
        if (automobile.id != state.automobiles[index].id)
          state.automobiles[index].major = false;
        else {
          state.automobiles[index].major = true;
          state.editedOrSavedClaimAutomobile.major = true;
        }
      }
    },
    MAKE_NOT_MAJOR_AUTOMOBILE(state, automobile) {
      for (let index = 0; index < state.automobiles.length; index++) {
        if (automobile.id == state.automobiles[index].id) {
          state.automobiles[index].major = false;
          state.editedOrSavedClaimAutomobile.major = false;
        }
      }
    },
    SET_AUTMOBILES(state, automobiles) {
      for (let index = 0; index < automobiles.length; index++) {
        if (automobiles[index].brand == null) {
          automobiles[index].brand = { id: 0, name: "" };
        }
        if (automobiles[index].nature_of_damage == null) {
          automobiles[index].nature_of_damage = { id: 0, name: "" };
        }
        if (automobiles[index].type_of_equipment == null) {
          automobiles[index].type_of_equipment = { id: 0, name: "" };
        }
        if (automobiles[index].companie == null) {
          automobiles[index].companie = { id: 0, name: "" };
        }
        if (automobiles[index].matricule == null) {
          automobiles[index].matricule = {
            id: 0,
            matricule: "",
            id_equipment: "",
            equipment: "",
          };
        }
      }
      state.automobiles = automobiles;
    },
    ADD_AUTOMOBILE(state, automobile) {
      state.automobiles.push(automobile);
      state.editedOrSavedClaimAutomobile.id = automobile.id;
      state.editedOrSavedClaimAutomobile.liability_letter =
        automobile.liability_letter;
      state.editedOrSavedClaimAutomobile.insurance_declaration =
        automobile.insurance_declaration;
    },
    DELETE_AUTOMOBILE(state, automobile) {
      state.automobiles = state.automobiles.filter(
        (c) => c.id != automobile.id
      );
    },
    EDIT_AUTOMOBILE(state, automobiles) {
      state.automobiles = state.automobiles.map((c) => {
        if (c.id == automobiles.id) return automobiles;
        return c;
      });
      state.editedOrSavedClaimAutomobile.id = automobiles.id;
      state.editedOrSavedClaimAutomobile.liability_letter =
        automobiles.liability_letter;
      state.editedOrSavedClaimAutomobile.insurance_declaration =
        automobiles.insurance_declaration;
    },
    setclaim_id_AUTOMOBILE_CLAiM(state, claim_id) {
      state.editedOrSavedClaimAutomobile.claim_id = claim_id;
    },
    setAUTOMOBILE_CLAiM(state, equipment) {
      state.editedOrSavedClaimAutomobile.major = equipment.major;
      state.editedOrSavedClaimAutomobile.type_of_equipment.id =
        equipment.type_of_equipment.id;
      state.editedOrSavedClaimAutomobile.type_of_equipment.name =
        equipment.type_of_equipment.name;
      state.editedOrSavedClaimAutomobile.major = equipment.major;

      state.editedOrSavedClaimAutomobile.brand.id = equipment.brand.id;
      state.editedOrSavedClaimAutomobile.brand.name = equipment.brand.name;
      state.editedOrSavedClaimAutomobile.department_id = NullTest(
        equipment.department_id
      );

      state.editedOrSavedClaimAutomobile.matricule.id = equipment.matricule.id;

      state.editedOrSavedClaimAutomobile.matricule.id_equipment =
        equipment.matricule.id_equipment;

      state.editedOrSavedClaimAutomobile.matricule.matricule =
        equipment.matricule.matricule;

      state.editedOrSavedClaimAutomobile.matricule.equipment =
        equipment.matricule.equipment;

      state.editedOrSavedClaimAutomobile.companie.id = equipment.companie.id;
      state.editedOrSavedClaimAutomobile.companie.name =
        equipment.companie.name;
      state.editedOrSavedClaimAutomobile.categorie_of_equipment =
        equipment.categorie_of_equipment;
      state.editedOrSavedClaimAutomobile.equipement_registration =
        equipment.equipement_registration;

      state.editedOrSavedClaimAutomobile.nature_of_damage.id =
        equipment.nature_of_damage.id;
      state.editedOrSavedClaimAutomobile.nature_of_damage.name =
        equipment.nature_of_damage.name;
      state.editedOrSavedClaimAutomobile.cause_damage = equipment.cause_damage;
      state.editedOrSavedClaimAutomobile.damage_description =
        equipment.damage_description;
      // state.editedOrSavedClaimAutomobile.department.id = equipment.department.id;
      state.editedOrSavedClaimAutomobile.damage_caused_by =
        equipment.damage_caused_by;

      state.editedOrSavedClaimAutomobile.thirdparty_company_name =
        equipment.thirdparty_company_name;
      state.editedOrSavedClaimAutomobile.thirdparty_Activity_comments =
        equipment.thirdparty_Activity_comments;
      state.editedOrSavedClaimAutomobile.outsourcer_company_name =
        equipment.outsourcer_company_name;
      state.editedOrSavedClaimAutomobile.TAT_name_persons =
        equipment.TAT_name_persons.join("|");
      state.editedOrSavedClaimAutomobile.outsourcer_persons =
        equipment.outsourcer_persons.join("|");
      state.editedOrSavedClaimAutomobile.thirdparty_persons =
        equipment.thirdparty_persons.join("|");
      state.editedOrSavedClaimAutomobile.concerned_internal_department =
        equipment.department.join("|");
    },
    setDATE_AUTOMOBILE_CLAiM(state, dateClaim) {
      state.editedOrSavedClaimAutomobile.incident_reportFile =
        dateClaim.incident_reportFile;
      state.editedOrSavedClaimAutomobile.incident_report =
        dateClaim.incident_report;
    },
    setTHIRDPARTY_AUTOMOBILE_CLAiM(state, thirdpartyClaim) {
      state.editedOrSavedClaimAutomobile.liability_letter_files =
        thirdpartyClaim.liability_letter_files;
      state.editedOrSavedClaimAutomobile.filesDelete =
        thirdpartyClaim.filesDelete;
    },
    setREINVOICED_AUTOMOBILE_CLAiM(state, thirdpartyClaim) {
      state.editedOrSavedClaimAutomobile.amount = thirdpartyClaim.amount;
      state.editedOrSavedClaimAutomobile.currency = thirdpartyClaim.currency;
      state.editedOrSavedClaimAutomobile.comment_third_party =
        thirdpartyClaim.comment_third_party;
      state.editedOrSavedClaimAutomobile.reinvoiced =
        thirdpartyClaim.reinvoiced;
      state.editedOrSavedClaimAutomobile.date_of_reimbursement =
        thirdpartyClaim.date_of_reimbursement;
      state.editedOrSavedClaimAutomobile.Invoice_number =
        thirdpartyClaim.Invoice_number;
      state.editedOrSavedClaimAutomobile.reimbursed_amount =
        thirdpartyClaim.reimbursed_amount;
    },
    setINSURANCE_FOLLOWUP_AUTOMOBILE_CLAiM(state, insurance_followup) {
      state.editedOrSavedClaimAutomobile.date_of_declaration =
        insurance_followup.date_of_declaration;
      state.editedOrSavedClaimAutomobile.date_of_feedback =
        insurance_followup.date_of_feedback;
      state.editedOrSavedClaimAutomobile.comment_Insurance =
        insurance_followup.comment_Insurance;
      state.editedOrSavedClaimAutomobile.Indemnification_of_insurer =
        insurance_followup.Indemnification_of_insurer;
      state.editedOrSavedClaimAutomobile.Indemnification_date =
        insurance_followup.Indemnification_date;
      state.editedOrSavedClaimAutomobile.currency_indemnisation =
        insurance_followup.currency_indemnisation;
      state.editedOrSavedClaimAutomobile.deductible_charge_TAT =
        insurance_followup.deductible_charge_TAT;
      state.editedOrSavedClaimAutomobile.Complementary_indemnification =
        insurance_followup.Complementary_indemnification;

      state.editedOrSavedClaimAutomobile.insurance_declaration_files =
        insurance_followup.insurance_declaration_files;

      state.editedOrSavedClaimAutomobile.insurance_declarationFile =
        insurance_followup.insurance_declarationFile;
    },
    setAll_Attr_AUTOMOBILE_CLAiM(state, AutomobileClaim) {
      state.editedOrSavedClaimAutomobile.major = AutomobileClaim.major;
      state.editedOrSavedClaimAutomobile.id = AutomobileClaim.id;
      state.editedOrSavedClaimAutomobile.claim_id = AutomobileClaim.claim_id;
      state.editedOrSavedClaimAutomobile.department_id = NullTest(
        AutomobileClaim.department_id
      );
      state.editedOrSavedClaimAutomobile.matricule.id =
        AutomobileClaim.matricule.id;
      state.editedOrSavedClaimAutomobile.matricule.id_equipment =
        AutomobileClaim.matricule.id_equipment;
      state.editedOrSavedClaimAutomobile.matricule.matricule =
        AutomobileClaim.matricule.matricule;
      state.editedOrSavedClaimAutomobile.matricule.equipment =
        AutomobileClaim.matricule.equipment;

      state.editedOrSavedClaimAutomobile.categorie_of_equipment =
        AutomobileClaim.categorie_of_equipment;
      state.editedOrSavedClaimAutomobile.Deductible_charge_TAT =
        AutomobileClaim.Deductible_charge_TAT;
      state.editedOrSavedClaimAutomobile.categorie_of_equipment =
        AutomobileClaim.categorie_of_equipment;
      state.editedOrSavedClaimAutomobile.cause_damage =
        AutomobileClaim.cause_damage;
      state.editedOrSavedClaimAutomobile.damage_description =
        AutomobileClaim.damage_description;
      state.editedOrSavedClaimAutomobile.equipement_registration =
        AutomobileClaim.equipement_registration;
      state.editedOrSavedClaimAutomobile.Liability_letter_number =
        AutomobileClaim.Liability_letter_number;
      state.editedOrSavedClaimAutomobile.categorie_of_equipment =
        AutomobileClaim.categorie_of_equipment;
      state.editedOrSavedClaimAutomobile.damage_caused_by =
        AutomobileClaim.damage_caused_by;
      state.editedOrSavedClaimAutomobile.currency_Insurance =
        AutomobileClaim.currency_Insurance;
      state.editedOrSavedClaimAutomobile.Complementary_indemnification =
        AutomobileClaim.Complementary_indemnification;

      state.editedOrSavedClaimAutomobile.Indemnification_date =
        AutomobileClaim.Indemnification_date;
      // object
      state.editedOrSavedClaimAutomobile.type_of_equipment.id =
        AutomobileClaim.type_of_equipment.id;
      state.editedOrSavedClaimAutomobile.brand.id = AutomobileClaim.brand.id;
      state.editedOrSavedClaimAutomobile.nature_of_damage.id =
        AutomobileClaim.nature_of_damage.id;
      state.editedOrSavedClaimAutomobile.companie.id =
        AutomobileClaim.companie.id;
      state.editedOrSavedClaimAutomobile.type_of_equipment.name =
        AutomobileClaim.type_of_equipment.name;
      state.editedOrSavedClaimAutomobile.brand.name =
        AutomobileClaim.brand.name;
      state.editedOrSavedClaimAutomobile.nature_of_damage.name =
        AutomobileClaim.nature_of_damage.name;
      state.editedOrSavedClaimAutomobile.companie.name =
        AutomobileClaim.companie.name;
      //state.editedOrSavedClaimAutomobile.nature_of_damage.id=AutomobileClaim.nature_of_damage.id;
      //third_party
      state.editedOrSavedClaimAutomobile.comment_third_party =
        AutomobileClaim.comment_third_party;
      state.editedOrSavedClaimAutomobile.thirdparty_company_name =
        AutomobileClaim.thirdparty_company_name;
      state.editedOrSavedClaimAutomobile.thirdparty_Activity_comments =
        AutomobileClaim.thirdparty_Activity_comments;
      state.editedOrSavedClaimAutomobile.amount = AutomobileClaim.amount;
      state.editedOrSavedClaimAutomobile.currency = AutomobileClaim.currency;
      state.editedOrSavedClaimAutomobile.reinvoiced =
        AutomobileClaim.reinvoiced;
      state.editedOrSavedClaimAutomobile.Invoice_number =
        AutomobileClaim.Invoice_number;
      state.editedOrSavedClaimAutomobile.reimbursed_amount =
        AutomobileClaim.reimbursed_amount;
      // estimation
      state.editedOrSavedClaimAutomobile.estimate = AutomobileClaim.estimate;
      // date

      state.editedOrSavedClaimAutomobile.date_of_declaration =
        AutomobileClaim.date_of_declaration;
      state.editedOrSavedClaimAutomobile.date_of_feedback =
        AutomobileClaim.date_of_feedback;
      state.editedOrSavedClaimAutomobile.thirdparty_Activity_comments =
        AutomobileClaim.thirdparty_Activity_comments;

      state.editedOrSavedClaimAutomobile.liability_letter_files =
        AutomobileClaim.liability_letter_files;
      state.editedOrSavedClaimAutomobile.insurance_declaration_files =
        AutomobileClaim.insurance_declaration_files;

      state.editedOrSavedClaimAutomobile.TAT_name_persons =
        AutomobileClaim.TAT_name_persons;
      state.editedOrSavedClaimAutomobile.outsourcer_persons =
        AutomobileClaim.outsourcer_persons;
      state.editedOrSavedClaimAutomobile.thirdparty_persons =
        AutomobileClaim.thirdparty_persons;
      state.editedOrSavedClaimAutomobile.concerned_internal_department =
        AutomobileClaim.concerned_internal_department;
    },
    emptyAll_Attr_AUTOMOBILE_CLAiM(state) {
      state.editedOrSavedClaimAutomobile.id = 0;
      state.editedOrSavedClaimAutomobile.claim_id = 0;
      state.editedOrSavedClaimAutomobile.department_id = 0;
      state.editedOrSavedClaimAutomobile.major = false;
      state.editedOrSavedClaimAutomobile.categorie_of_equipment = "";
      state.editedOrSavedClaimAutomobile.Deductible_charge_TAT = "";
      state.editedOrSavedClaimAutomobile.categorie_of_equipment = "";
      state.editedOrSavedClaimAutomobile.cause_damage = "";
      state.editedOrSavedClaimAutomobile.damage_description = "";
      state.editedOrSavedClaimAutomobile.damage_caused_by = "";
      state.editedOrSavedClaimAutomobile.equipement_registration = "";
      state.editedOrSavedClaimAutomobile.Liability_letter_number = "";
      state.editedOrSavedClaimAutomobile.categorie_of_equipment = "";
      state.editedOrSavedClaimAutomobile.currency_Insurance = "";
      state.editedOrSavedClaimAutomobile.deductible_charge_TAT = 5000;
      state.editedOrSavedClaimAutomobile.Complementary_indemnification = "";
      state.editedOrSavedClaimAutomobile.Indemnification_of_insurer = "";
      state.editedOrSavedClaimAutomobile.currency_indemnisation = "";
      // object
      state.editedOrSavedClaimAutomobile.type_of_equipment.id = 0;
      state.editedOrSavedClaimAutomobile.brand.id = 0;
      state.editedOrSavedClaimAutomobile.nature_of_damage.id = 0;
      state.editedOrSavedClaimAutomobile.companie.id = 0;
      state.editedOrSavedClaimAutomobile.type_of_equipment.name = "";
      state.editedOrSavedClaimAutomobile.brand.name = "";
      state.editedOrSavedClaimAutomobile.nature_of_damage.name = "";
      state.editedOrSavedClaimAutomobile.companie.name = "";
      state.editedOrSavedClaimAutomobile.department = [];
      state.editedOrSavedClaimAutomobile.liability_letter_files = [];
      state.editedOrSavedClaimAutomobile.liability_letter_files_Data = [];
      state.editedOrSavedClaimAutomobile.insurance_declaration_files = [];
      state.editedOrSavedClaimAutomobile.matricule.id = 0;
      state.editedOrSavedClaimAutomobile.matricule.id_equipment = "";
      state.editedOrSavedClaimAutomobile.matricule.matricule = "";
      state.editedOrSavedClaimAutomobile.matricule.equipment = "";

      //third_party
      state.editedOrSavedClaimAutomobile.comment_third_party = "";
      state.editedOrSavedClaimAutomobile.thirdparty_company_name = "";
      state.editedOrSavedClaimAutomobile.thirdparty_Activity_comments = "";
      state.editedOrSavedClaimAutomobile.amount = "";
      state.editedOrSavedClaimAutomobile.currency = "";
      state.editedOrSavedClaimAutomobile.reinvoiced = "";
      state.editedOrSavedClaimAutomobile.Invoice_number = "";
      state.editedOrSavedClaimAutomobile.reimbursed_amount = "";
      // estimation
      state.editedOrSavedClaimAutomobile.estimate = "";

      // date

      state.editedOrSavedClaimAutomobile.date_of_declaration = "";
      state.editedOrSavedClaimAutomobile.date_of_feedback = "";
      state.editedOrSavedClaimAutomobile.thirdparty_Activity_comments = "";
      state.editedOrSavedClaimAutomobile.Indemnification_date = "";
    },
    setLiabilityLetterToNull(state) {
      state.editedOrSavedClaimAutomobile.liability_letter = "";
    },
    setInsuranceDeclarationToNull(state) {
      state.editedOrSavedClaimAutomobile.insurance_declaration = "";
    },
    set_liability_letter_files_Data_automobile(
      state,
      liability_letter_files_Data
    ) {
      state.liability_letter_files_Data = liability_letter_files_Data;
    },
    set_insurance_declaration_files_Data_automobile(
      state,
      insurance_declaration_files_Data
    ) {
      state.insurance_declaration_files_Data = insurance_declaration_files_Data;
    },
  },
  actions: {
    set_liability_letter_to_null_SetterAction({ commit }) {
      commit("setLiabilityLetterToNull");
    },
    set_insurance_declaration_to_null_SetterAction({ commit }) {
      commit("setInsuranceDeclarationToNull");
    },
    setClaimsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("automobile/")
          .then((response) => {
            commit("SET_AUTMOBILES", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setAutomobilesAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("automobiles/" + id)
          .then((response) => {
            commit("SET_AUTMOBILES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setliability_letter_files_Data_automobileAction(
      { commit },
      liability_letter_files
    ) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post(
          "LiabilityInsuranceFiles/automobile",
          liability_letter_files
        )
          .then((response) => {
            commit(
              "set_liability_letter_files_Data_automobile",
              response.data.payload
            );
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editedOrSavedAutomobileClaimAction({ commit }, automobile) {
      return new Promise((resolve, reject) => {
        var claimFormData = new FormData();
        claimFormData.append("major", automobile.major);
        claimFormData.append("id", automobile.id);
        claimFormData.append("claim_id", NullTest(automobile.claim_id));
        claimFormData.append(
          "department_id",
          NullTest(automobile.department_id)
        );
        claimFormData.append(
          "categorie_of_equipment",
          NullTest(automobile.categorie_of_equipment)
        );
        claimFormData.append(
          "concerned_internal_department",
          NullTest(automobile.concerned_internal_department)
        );
        claimFormData.append(
          "equipement_registration",
          NullTest(automobile.equipement_registration)
        );
        claimFormData.append("cause_damage", NullTest(automobile.cause_damage));
        claimFormData.append(
          "damage_description",
          NullTest(automobile.damage_description)
        );
        claimFormData.append(
          "Liability_letter_number",
          NullTest(automobile.Liability_letter_number)
        );
        claimFormData.append("amount", NullTest(automobile.amount));
        claimFormData.append("currency", NullTest(automobile.currency));
        claimFormData.append(
          "comment_third_party",
          NullTest(automobile.comment_third_party)
        );
        claimFormData.append("reinvoiced", NullTest(automobile.reinvoiced));
        claimFormData.append(
          "currency_Insurance",
          NullTest(automobile.currency_Insurance)
        );
        claimFormData.append(
          "Invoice_number",
          NullTest(automobile.Invoice_number)
        );
        claimFormData.append(
          "date_of_reimbursement",
          toLaravelDatetime(automobile.date_of_reimbursement)
        );
        claimFormData.append(
          "reimbursed_amount",
          NullTest(automobile.reimbursed_amount)
        );
        claimFormData.append(
          "date_of_declaration",
          toLaravelDatetime(automobile.date_of_declaration)
        );
        claimFormData.append(
          "date_of_feedback",
          toLaravelDatetime(automobile.date_of_feedback)
        );
        claimFormData.append(
          "comment_Insurance",
          NullTest(automobile.comment_Insurance)
        );
        claimFormData.append(
          "Indemnification_of_insurer",
          NullTest(automobile.Indemnification_of_insurer)
        );
        claimFormData.append(
          "Indemnification_date",
          toLaravelDatetime(automobile.Indemnification_date)
        );
        claimFormData.append(
          "currency_indemnisation",
          NullTest(automobile.currency_indemnisation)
        );
        claimFormData.append(
          "deductible_charge_TAT",
          NullTest(automobile.deductible_charge_TAT)
        );
        claimFormData.append(
          "damage_caused_by",
          NullTest(automobile.damage_caused_by)
        );
        claimFormData.append(
          "TAT_name_persons",
          NullTest(automobile.TAT_name_persons)
        );
        claimFormData.append(
          "outsourcer_persons",
          NullTest(automobile.outsourcer_persons)
        );
        claimFormData.append(
          "thirdparty_persons",
          NullTest(automobile.thirdparty_persons)
        );
        claimFormData.append(
          "outsourcer_company_name",
          NullTest(automobile.outsourcer_company_name)
        );
        claimFormData.append(
          "thirdparty_company_name",
          NullTest(automobile.thirdparty_company_name)
        );
        claimFormData.append(
          "thirdparty_Activity_comments",
          NullTest(automobile.thirdparty_Activity_comments)
        );
        claimFormData.append(
          "categorie_of_equipment",
          automobile.categorie_of_equipment
        );
        claimFormData.append(
          "incident_report",
          NullTest(automobile.incident_report)
        );
        claimFormData.append(
          "incident_reportFile",
          NullTest(automobile.incident_reportFile)
        );
        if (automobile.liability_letter_files?.length > 0) {
          var i = 0;
          automobile.liability_letter_files.map((item) => {
            claimFormData.append(`liability_letter_files[${i}]`, item);
            i++;
          });
        }
        if (automobile.insurance_declaration_files?.length > 0) {
          var i = 0;
          automobile.insurance_declaration_files.map((item) => {
            claimFormData.append(`insurance_declaration_files[${i}]`, item);
            i++;
          });
        }
        if (automobile.filesDelete?.length > 0) {
          var i = 0;
          automobile.filesDelete.map((item) => {
            claimFormData.append(`filesDelete[${i}][id]`, item.id);
            i++;
          });
        }
        claimFormData.append(
          "insurance_declaration",
          NullTest(automobile.insurance_declaration)
        );
        claimFormData.append(
          "insurance_declarationFile",
          NullTest(automobile.insurance_declarationFile)
        );
        claimFormData.append(
          "type_of_equipment[id]",
          automobile.type_of_equipment.id
        );
        claimFormData.append(
          "type_of_equipment[name]",
          NullTest(automobile.type_of_equipment.name)
        );
        claimFormData.append("brand[id]", automobile.brand.id);
        claimFormData.append("brand[name]", NullTest(automobile.brand.name));
        claimFormData.append("companie[id]", automobile.companie.id);
        claimFormData.append(
          "companie[name]",
          NullTest(automobile.companie.name)
        );
        claimFormData.append(
          "nature_of_damage[id]",
          automobile.nature_of_damage.id
        );
        claimFormData.append("matricule[id]", automobile.matricule.id);
        claimFormData.append(
          "matricule[equipment]",
          automobile.matricule.equipment
        );
        claimFormData.append(
          "matricule[matricule]",
          NullTest(automobile.matricule.matricule)
        );
        claimFormData.append(
          "matricule[id_equipment]",
          NullTest(automobile.matricule.id_equipment)
        );
        claimFormData.append(
          "nature_of_damage[name]",
          NullTest(automobile.nature_of_damage.name)
        );
        CustomizedAxios.post(
          "automobiles/createOrUpdateAutomobile",
          claimFormData
        )
          .then((response) => {
            if (automobile.id == 0) {
              commit("ADD_AUTOMOBILE", response.data.payload);
            } else {
              commit("EDIT_AUTOMOBILE", response.data.payload);
            }

            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    addAutomobileAction({ commit }, equipment) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("automobiles/create", {
          name: equipment.name,
        })
          .then((response) => {
            commit("ADD_AUTOMOBILE", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteAutomobileClaimAction({ commit }, automobile) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("automobiles/delete", automobile)
          .then((response) => {
            commit("DELETE_AUTOMOBILE", automobile);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editClaimAction({ commit }, automobile) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("automobile/update", automobile)
          .then((response) => {
            commit("EDIT_AUTOMOBILE", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    set_Claim_id_automobileclaim_SetterAction({ commit }, claim_id) {
      commit("setclaim_id_AUTOMOBILE_CLAiM", claim_id);
    },
    set_automobile_claim_SetterAction({ commit }, equipment) {
      commit("setAUTOMOBILE_CLAiM", equipment);
    },
    set_date_automobile_claim_SetterAction({ commit }, dateClaim) {
      commit("setDATE_AUTOMOBILE_CLAiM", dateClaim);
    },
    set_thirdparty_automobile_claim_SetterAction({ commit }, thirdparty) {
      commit("setTHIRDPARTY_AUTOMOBILE_CLAiM", thirdparty);
    },
    set_reinvoiced_automobile_claim_SetterAction({ commit }, thirdparty) {
      commit("setREINVOICED_AUTOMOBILE_CLAiM", thirdparty);
    },
    set_insurance_followup_automobile_claim_SetterAction(
      { commit },
      insurance_followup
    ) {
      commit("setINSURANCE_FOLLOWUP_AUTOMOBILE_CLAiM", insurance_followup);
    },
    setAll_Attr_AUTOMOBILE_CLAiMAction({ commit }, AutomobileClaim) {
      commit("setAll_Attr_AUTOMOBILE_CLAiM", AutomobileClaim);
    },
    emptyAll_Attr_AUTOMOBILE_CLAiMAction({ commit }) {
      commit("emptyAll_Attr_AUTOMOBILE_CLAiM");
    },
  },
  getters: {
    getAutomobileclaims: (state) => {
      return state.automobiles;
    },
    geteditedOrSavedClaimAutomobile: (state) => {
      return state.editedOrSavedClaimAutomobile;
    },
    getLiability_letter_files_Data_Automobile: (state) => {
      return state.liability_letter_files_Data;
    },
  },
};
export default claimsAutomobileModule;
