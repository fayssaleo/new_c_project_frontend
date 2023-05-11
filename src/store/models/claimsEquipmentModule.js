import { toLaravelDatetime, NullTest } from "@/helpers/helpers";
import CustomizedAxios from "../../plugins/axios";

const claimsEquipmentModule = {
  state: {
    claims: [],
    editedOrSavedClaimEquipment: {
      id: 0,
      claim_id: 0,
      department_id: 0,
      concerned_internal_department: "",
      department: 0,
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
      outsourcer_persons: "",
      thirdparty_company_name: null,
      thirdparty_Activity_comments: null,
      thirdparty_persons: "",
      incident_report: null,
      incident_reportFile: null,
      liability_letter_files: [],
      insurance_declaration_files: [],
      filesDelete: [],
      insurance_declaration: null,
      insurance_declarationFile: null,
      ClaimOrIncident: "",
      damage_description: "",
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
    insurance_declaration_files_Data: [],
  },
  mutations: {
    SET_EQUIPMENTS(state, claims) {
      for (let index = 0; index < claims.length; index++) {
        if (claims[index].brand == null) {
          claims[index].brand = { id: 0, name: "" };
        }
        if (claims[index].nature_of_damage == null) {
          claims[index].nature_of_damage = { id: 0, name: "" };
        }
        if (claims[index].type_of_equipment == null) {
          claims[index].type_of_equipment = { id: 0, name: "" };
        }
        if (claims[index].companie == null) {
          claims[index].companie = { id: 0, name: "" };
        }
        if (claims[index].matricule == null) {
          claims[index].matricule = {
            id: 0,
            matricule: "",
            id_equipment: "",
            equipment: "",
          };
        }
      }
      state.claims = claims;
    },
    ADD_EQUIPMENT(state, claim) {
      state.claims.push(claim);
      state.editedOrSavedClaimEquipment.id = claim.id;
      state.editedOrSavedClaimEquipment.liability_letter =
        claim.liability_letter;
      state.editedOrSavedClaimEquipment.insurance_declaration =
        claim.insurance_declaration;
    },
    DELETE_EQUIPMENT(state, claim) {
      state.claims = state.claims.filter((c) => c.id != claim.id);
    },
    EDIT_EQUIPMENT(state, claims) {
      state.claims = state.claims.map((c) => {
        if (c.id == claims.id) return claims;
        return c;
      });
      state.editedOrSavedClaimEquipment.id = claims.id;
      state.editedOrSavedClaimEquipment.liability_letter =
        claims.liability_letter;
      state.editedOrSavedClaimEquipment.insurance_declaration =
        claims.insurance_declaration;
    },
    setClaim_id_EQUIPMENT_CLAiM(state, claim_id) {
      state.editedOrSavedClaimEquipment.claim_id = claim_id;
    },
    setEQUIPMENT_CLAiM(state, equipment) {
      state.editedOrSavedClaimEquipment.major = equipment.major;
      state.editedOrSavedClaimEquipment.type_of_equipment.id =
        equipment.type_of_equipment.id;
      state.editedOrSavedClaimEquipment.type_of_equipment.name =
        equipment.type_of_equipment.name;

      state.editedOrSavedClaimEquipment.department_id = NullTest(
        equipment.department_id
      );
      state.editedOrSavedClaimEquipment.brand.id = equipment.brand.id;
      state.editedOrSavedClaimEquipment.brand.name = equipment.brand.name;

      state.editedOrSavedClaimEquipment.companie.id = equipment.companie.id;
      state.editedOrSavedClaimEquipment.companie.name = equipment.companie.name;

      state.editedOrSavedClaimEquipment.matricule.id = equipment.matricule.id;

      state.editedOrSavedClaimEquipment.matricule.id_equipment =
        equipment.matricule.id_equipment;

      state.editedOrSavedClaimEquipment.matricule.matricule =
        equipment.matricule.matricule;

      state.editedOrSavedClaimEquipment.matricule.equipment =
        equipment.matricule.equipment;

      state.editedOrSavedClaimEquipment.equipement_registration =
        equipment.equipement_registration;

      state.editedOrSavedClaimEquipment.nature_of_damage.id =
        equipment.nature_of_damage.id;
      state.editedOrSavedClaimEquipment.nature_of_damage.name =
        equipment.nature_of_damage.name;
      state.editedOrSavedClaimEquipment.cause_damage = equipment.cause_damage;
      state.editedOrSavedClaimEquipment.damage_description =
        equipment.damage_description;
      // state.editedOrSavedClaimEquipment.department.id = equipment.department.id;
      state.editedOrSavedClaimEquipment.damage_caused_by =
        equipment.damage_caused_by;

      state.editedOrSavedClaimEquipment.thirdparty_company_name =
        equipment.thirdparty_company_name;
      state.editedOrSavedClaimEquipment.thirdparty_Activity_comments =
        equipment.thirdparty_Activity_comments;
      state.editedOrSavedClaimEquipment.outsourcer_company_name =
        equipment.outsourcer_company_name;
      state.editedOrSavedClaimEquipment.TAT_name_persons =
        equipment.TAT_name_persons.join("|");
      state.editedOrSavedClaimEquipment.outsourcer_persons =
        equipment.outsourcer_persons.join("|");
      state.editedOrSavedClaimEquipment.thirdparty_persons =
        equipment.thirdparty_persons.join("|");
      state.editedOrSavedClaimEquipment.concerned_internal_department =
        equipment.department.join("|");
    },
    setDATE_EQUIPMENT_CLAiM(state, dateClaim) {
      state.editedOrSavedClaimEquipment.incident_reportFile =
        dateClaim.incident_reportFile;
      state.editedOrSavedClaimEquipment.incident_report =
        dateClaim.incident_report;
    },
    setTHIRDPARTY_EQUIPMENT_CLAiM(state, thirdpartyClaim) {
      state.editedOrSavedClaimEquipment.liability_letter_files =
        thirdpartyClaim.liability_letter_files;
      state.editedOrSavedClaimEquipment.filesDelete =
        thirdpartyClaim.filesDelete;
    },
    setREINVOICED_EQUIPMENT_CLAiM(state, thirdpartyClaim) {
      state.editedOrSavedClaimEquipment.amount = thirdpartyClaim.amount;
      state.editedOrSavedClaimEquipment.currency = thirdpartyClaim.currency;
      state.editedOrSavedClaimEquipment.comment_third_party =
        thirdpartyClaim.comment_third_party;
      state.editedOrSavedClaimEquipment.reinvoiced = thirdpartyClaim.reinvoiced;
      state.editedOrSavedClaimEquipment.date_of_reimbursement =
        thirdpartyClaim.date_of_reimbursement;
      state.editedOrSavedClaimEquipment.Invoice_number =
        thirdpartyClaim.Invoice_number;
      state.editedOrSavedClaimEquipment.reimbursed_amount =
        thirdpartyClaim.reimbursed_amount;
    },
    setINSURANCE_FOLLOWUP_EQUIPMENT_CLAiM(state, insurance_followup) {
      state.editedOrSavedClaimEquipment.date_of_declaration =
        insurance_followup.date_of_declaration;
      state.editedOrSavedClaimEquipment.date_of_feedback =
        insurance_followup.date_of_feedback;
      state.editedOrSavedClaimEquipment.comment_Insurance =
        insurance_followup.comment_Insurance;
      state.editedOrSavedClaimEquipment.Indemnification_of_insurer =
        insurance_followup.Indemnification_of_insurer;
      state.editedOrSavedClaimEquipment.Indemnification_date =
        insurance_followup.Indemnification_date;
      state.editedOrSavedClaimEquipment.currency_indemnisation =
        insurance_followup.currency_indemnisation;
      state.editedOrSavedClaimEquipment.deductible_charge_TAT =
        insurance_followup.deductible_charge_TAT;
      state.editedOrSavedClaimEquipment.Complementary_indemnification =
        insurance_followup.Complementary_indemnification;

      state.editedOrSavedClaimEquipment.insurance_declaration_files =
        insurance_followup.insurance_declaration_files;

      state.editedOrSavedClaimEquipment.filesDelete =
        insurance_followup.filesDelete;
    },
    setAll_Attr_EQUIPMENT_CLAiM(state, EquipmentClaim) {
      state.editedOrSavedClaimEquipment.major = EquipmentClaim.major;
      state.editedOrSavedClaimEquipment.id = EquipmentClaim.id;
      state.editedOrSavedClaimEquipment.claim_id = EquipmentClaim.claim_id;
      state.editedOrSavedClaimEquipment.department_id = NullTest(
        EquipmentClaim.department_id
      );

      state.editedOrSavedClaimEquipment.matricule.id =
        EquipmentClaim.matricule.id;
      state.editedOrSavedClaimEquipment.matricule.id_equipment =
        EquipmentClaim.matricule.id_equipment;
      state.editedOrSavedClaimEquipment.matricule.matricule =
        EquipmentClaim.matricule.matricule;
      state.editedOrSavedClaimEquipment.matricule.equipment =
        EquipmentClaim.matricule.equipment;

      state.editedOrSavedClaimEquipment.Deductible_charge_TAT =
        EquipmentClaim.Deductible_charge_TAT;

      state.editedOrSavedClaimEquipment.cause_damage =
        EquipmentClaim.cause_damage;
      state.editedOrSavedClaimEquipment.damage_description =
        EquipmentClaim.damage_description;
      state.editedOrSavedClaimEquipment.equipement_registration =
        EquipmentClaim.equipement_registration;
      state.editedOrSavedClaimEquipment.Liability_letter_number =
        EquipmentClaim.Liability_letter_number;

      state.editedOrSavedClaimEquipment.damage_caused_by =
        EquipmentClaim.damage_caused_by;
      state.editedOrSavedClaimEquipment.currency_Insurance =
        EquipmentClaim.currency_Insurance;
      state.editedOrSavedClaimEquipment.Complementary_indemnification =
        EquipmentClaim.Complementary_indemnification;

      state.editedOrSavedClaimEquipment.Indemnification_date =
        EquipmentClaim.Indemnification_date;
      // object
      state.editedOrSavedClaimEquipment.type_of_equipment.id =
        EquipmentClaim.type_of_equipment.id;
      state.editedOrSavedClaimEquipment.brand.id = EquipmentClaim.brand.id;
      state.editedOrSavedClaimEquipment.nature_of_damage.id =
        EquipmentClaim.nature_of_damage.id;
      state.editedOrSavedClaimEquipment.companie.id =
        EquipmentClaim.companie.id;
      state.editedOrSavedClaimEquipment.type_of_equipment.name =
        EquipmentClaim.type_of_equipment.name;
      state.editedOrSavedClaimEquipment.brand.name = EquipmentClaim.brand.name;
      state.editedOrSavedClaimEquipment.nature_of_damage.name =
        EquipmentClaim.nature_of_damage.name;
      state.editedOrSavedClaimEquipment.companie.name =
        EquipmentClaim.companie.name;
      //state.editedOrSavedClaimEquipment.nature_of_damage.id=EquipmentClaim.nature_of_damage.id;
      //third_party
      state.editedOrSavedClaimEquipment.comment_third_party =
        EquipmentClaim.comment_third_party;
      state.editedOrSavedClaimEquipment.thirdparty_company_name =
        EquipmentClaim.thirdparty_company_name;
      state.editedOrSavedClaimEquipment.thirdparty_Activity_comments =
        EquipmentClaim.thirdparty_Activity_comments;
      state.editedOrSavedClaimEquipment.amount = EquipmentClaim.amount;
      state.editedOrSavedClaimEquipment.currency = EquipmentClaim.currency;
      state.editedOrSavedClaimEquipment.reinvoiced = EquipmentClaim.reinvoiced;
      state.editedOrSavedClaimEquipment.Invoice_number =
        EquipmentClaim.Invoice_number;
      state.editedOrSavedClaimEquipment.reimbursed_amount =
        EquipmentClaim.reimbursed_amount;
      // estimation
      state.editedOrSavedClaimEquipment.estimate = EquipmentClaim.estimate;
      // date

      state.editedOrSavedClaimEquipment.date_of_declaration =
        EquipmentClaim.date_of_declaration;
      state.editedOrSavedClaimEquipment.date_of_feedback =
        EquipmentClaim.date_of_feedback;
      state.editedOrSavedClaimEquipment.thirdparty_Activity_comments =
        EquipmentClaim.thirdparty_Activity_comments;

      state.editedOrSavedClaimEquipment.incident_report =
        EquipmentClaim.incident_report;
      state.editedOrSavedClaimEquipment.incident_reportFile = null;

      state.editedOrSavedClaimEquipment.liability_letter_files =
        EquipmentClaim.liability_letter_files;
      state.editedOrSavedClaimEquipment.insurance_declaration_files =
        EquipmentClaim.insurance_declaration_files;

      state.editedOrSavedClaimEquipment.insurance_declaration =
        EquipmentClaim.insurance_declaration;
      state.editedOrSavedClaimEquipment.insurance_declarationFile = null;
      state.editedOrSavedClaimEquipment.TAT_name_persons =
        EquipmentClaim.TAT_name_persons;
      state.editedOrSavedClaimEquipment.outsourcer_persons =
        EquipmentClaim.outsourcer_persons;
      state.editedOrSavedClaimEquipment.thirdparty_persons =
        EquipmentClaim.thirdparty_persons;
      state.editedOrSavedClaimEquipment.concerned_internal_department =
        EquipmentClaim.concerned_internal_department;
    },
    emptyAll_Attr_EQUIPMENT_CLAiM(state) {
      state.editedOrSavedClaimEquipment.id = 0;
      state.editedOrSavedClaimEquipment.claim_id = 0;
      state.editedOrSavedClaimEquipment.department_id = 0;
      state.editedOrSavedClaimEquipment.major = false;
      state.editedOrSavedClaimEquipment.cause_damage = "";
      state.editedOrSavedClaimEquipment.damage_description = "";
      state.editedOrSavedClaimEquipment.damage_caused_by = "";
      state.editedOrSavedClaimEquipment.equipement_registration = "";
      state.editedOrSavedClaimEquipment.Liability_letter_number = "";
      state.editedOrSavedClaimEquipment.currency_Insurance = "";
      state.editedOrSavedClaimEquipment.deductible_charge_TAT = 5000;
      state.editedOrSavedClaimEquipment.Complementary_indemnification = "";
      state.editedOrSavedClaimEquipment.Indemnification_of_insurer = "";
      state.editedOrSavedClaimEquipment.currency_indemnisation = "";
      state.editedOrSavedClaimEquipment.comment_Insurance = "";
      // object
      state.editedOrSavedClaimEquipment.type_of_equipment.id = 0;
      state.editedOrSavedClaimEquipment.brand.id = 0;
      state.editedOrSavedClaimEquipment.nature_of_damage.id = 0;
      state.editedOrSavedClaimEquipment.companie.id = 0;
      state.editedOrSavedClaimEquipment.type_of_equipment.name = "";
      state.editedOrSavedClaimEquipment.brand.name = "";
      state.editedOrSavedClaimEquipment.nature_of_damage.name = "";
      state.editedOrSavedClaimEquipment.companie.name = "";
      state.editedOrSavedClaimEquipment.department = [];
      state.editedOrSavedClaimEquipment.incident_report = null;
      state.editedOrSavedClaimEquipment.incident_reportFile = null;
      state.editedOrSavedClaimEquipment.liability_letter_files = [];
      state.editedOrSavedClaimEquipment.insurance_declaration_files = [];

      state.editedOrSavedClaimEquipment.insurance_declaration = null;
      state.editedOrSavedClaimEquipment.insurance_declarationFile = null;
      state.editedOrSavedClaimEquipment.matricule.id = 0;
      state.editedOrSavedClaimEquipment.matricule.id_equipment = "";
      state.editedOrSavedClaimEquipment.matricule.matricule = "";
      state.editedOrSavedClaimEquipment.matricule.equipment = "";

      //third_party
      state.editedOrSavedClaimEquipment.comment_third_party = "";
      state.editedOrSavedClaimEquipment.thirdparty_company_name = "";
      state.editedOrSavedClaimEquipment.thirdparty_Activity_comments = "";
      state.editedOrSavedClaimEquipment.amount = "";
      state.editedOrSavedClaimEquipment.currency = "";
      state.editedOrSavedClaimEquipment.reinvoiced = "";
      state.editedOrSavedClaimEquipment.Invoice_number = "";
      state.editedOrSavedClaimEquipment.reimbursed_amount = "";
      // estimation
      state.editedOrSavedClaimEquipment.estimate = "";

      // date
      state.editedOrSavedClaimEquipment.date_of_declaration = "";
      state.editedOrSavedClaimEquipment.date_of_feedback = "";
      state.editedOrSavedClaimEquipment.thirdparty_Activity_comments = "";
      state.editedOrSavedClaimEquipment.Indemnification_date = "";
      state.editedOrSavedClaimEquipment.date_of_reimbursement = "";
    },
    setLiabilityLetterToNull(state) {
      state.editedOrSavedClaimEquipment.liability_letter = "";
    },
    setInsuranceDeclarationToNull(state) {
      state.editedOrSavedClaimEquipment.insurance_declaration = "";
    },
    set_liability_letter_files_Data(state, liability_letter_files_Data) {
      state.liability_letter_files_Data = liability_letter_files_Data;
    },
    set_insurance_declaration_files_Data(
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
        CustomizedAxios.get("claim/")
          .then((response) => {
            commit("SET_EQUIPMENTS", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setEquipmentsAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/" + id)
          .then((response) => {
            commit("SET_EQUIPMENTS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setliability_letter_files_DataAction({ commit }, liability_letter_files) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post(
          "LiabilityInsuranceFiles/equipment",
          liability_letter_files
        )
          .then((response) => {
            commit("set_liability_letter_files_Data", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setEquipmentsAllIncidentAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("equipments/allIncident")
          .then((response) => {
            commit("SET_EQUIPMENTS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editedOrSavedEquipmentClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        var claimFormData = new FormData();

        claimFormData.append("major", claim.major);
        claimFormData.append("id", claim.id);
        claimFormData.append("claim_id", claim.claim_id);
        claimFormData.append("department_id", NullTest(claim.department_id));

        claimFormData.append(
          "concerned_internal_department",
          NullTest(claim.concerned_internal_department)
        );
        claimFormData.append(
          "equipement_registration",
          NullTest(claim.equipement_registration)
        );
        claimFormData.append("cause_damage", NullTest(claim.cause_damage));
        claimFormData.append(
          "damage_description",
          NullTest(claim.damage_description)
        );
        claimFormData.append(
          "Liability_letter_number",
          NullTest(claim.Liability_letter_number)
        );
        claimFormData.append("amount", NullTest(claim.amount));
        claimFormData.append("currency", NullTest(claim.currency));
        claimFormData.append(
          "comment_third_party",
          NullTest(claim.comment_third_party)
        );
        claimFormData.append("reinvoiced", NullTest(claim.reinvoiced));
        claimFormData.append(
          "currency_Insurance",
          NullTest(claim.currency_Insurance)
        );
        claimFormData.append("Invoice_number", NullTest(claim.Invoice_number));
        claimFormData.append(
          "date_of_reimbursement",
          toLaravelDatetime(claim.date_of_reimbursement)
        );
        claimFormData.append(
          "reimbursed_amount",
          NullTest(claim.reimbursed_amount)
        );
        claimFormData.append(
          "date_of_declaration",
          toLaravelDatetime(claim.date_of_declaration)
        );
        claimFormData.append(
          "date_of_feedback",
          toLaravelDatetime(claim.date_of_feedback)
        );
        claimFormData.append(
          "comment_Insurance",
          NullTest(claim.comment_Insurance)
        );
        claimFormData.append(
          "Indemnification_of_insurer",
          NullTest(claim.Indemnification_of_insurer)
        );
        claimFormData.append(
          "Indemnification_date",
          toLaravelDatetime(claim.Indemnification_date)
        );
        claimFormData.append(
          "currency_indemnisation",
          NullTest(claim.currency_indemnisation)
        );
        claimFormData.append(
          "deductible_charge_TAT",
          NullTest(claim.deductible_charge_TAT)
        );
        claimFormData.append(
          "damage_caused_by",
          NullTest(claim.damage_caused_by)
        );
        claimFormData.append(
          "TAT_name_persons",
          NullTest(claim.TAT_name_persons)
        );
        claimFormData.append(
          "outsourcer_persons",
          NullTest(claim.outsourcer_persons)
        );
        claimFormData.append(
          "thirdparty_persons",
          NullTest(claim.thirdparty_persons)
        );
        claimFormData.append(
          "outsourcer_company_name",
          NullTest(claim.outsourcer_company_name)
        );
        claimFormData.append(
          "thirdparty_company_name",
          NullTest(claim.thirdparty_company_name)
        );
        claimFormData.append(
          "thirdparty_Activity_comments",
          NullTest(claim.thirdparty_Activity_comments)
        );

        claimFormData.append(
          "incident_report",
          NullTest(claim.incident_report)
        );
        claimFormData.append(
          "incident_reportFile",
          NullTest(claim.incident_reportFile)
        );

        if (claim.liability_letter_files?.length > 0) {
          var i = 0;
          claim.liability_letter_files.map((item) => {
            claimFormData.append(`liability_letter_files[${i}]`, item);
            i++;
          });
        }
        if (claim.insurance_declaration_files?.length > 0) {
          var i = 0;
          claim.insurance_declaration_files.map((item) => {
            claimFormData.append(`insurance_declaration_files[${i}]`, item);
            i++;
          });
        }
        if (claim.filesDelete?.length > 0) {
          var i = 0;

          claim.filesDelete.map((item) => {
            claimFormData.append(`filesDelete[${i}][id]`, item.id);
            i++;
          });
        }
        claimFormData.append(
          "insurance_declaration",
          NullTest(claim.insurance_declaration)
        );
        claimFormData.append(
          "insurance_declarationFile",
          NullTest(claim.insurance_declarationFile)
        );
        claimFormData.append(
          "type_of_equipment[id]",
          claim.type_of_equipment.id
        );
        claimFormData.append(
          "type_of_equipment[name]",
          NullTest(claim.type_of_equipment.name)
        );
        claimFormData.append("brand[id]", claim.brand.id);
        claimFormData.append("brand[name]", NullTest(claim.brand.name));

        claimFormData.append("companie[id]", claim.companie.id);
        claimFormData.append("companie[name]", NullTest(claim.companie.name));

        claimFormData.append("matricule[id]", claim.matricule.id);
        claimFormData.append("matricule[equipment]", claim.matricule.equipment);
        claimFormData.append(
          "matricule[matricule]",
          NullTest(claim.matricule.matricule)
        );
        claimFormData.append(
          "matricule[id_equipment]",
          NullTest(claim.matricule.id_equipment)
        );
        claimFormData.append("nature_of_damage[id]", claim.nature_of_damage.id);
        claimFormData.append(
          "nature_of_damage[name]",
          NullTest(claim.nature_of_damage.name)
        );
        CustomizedAxios.post(
          "equipments/createOrUpdateEquipment",
          claimFormData
        )
          .then((response) => {
            if (claim.id == 0) {
              commit("ADD_EQUIPMENT", response.data.payload);
            } else {
              commit("EDIT_EQUIPMENT", response.data.payload);
            }

            resolve(response.data.message);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    addEquipmentAction({ commit }, equipment) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("equipments/create", {
          name: equipment.name,
        })
          .then((response) => {
            commit("ADD_EQUIPMENT", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteEquipmentClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("equipments/delete", claim)
          .then((response) => {
            commit("DELETE_EQUIPMENT", claim);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("claim/update", claim)
          .then((response) => {
            commit("EDIT_EQUIPMENT", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setClaim_id_EQUIPMENT_claim_SetterAction({ commit }, equipment) {
      commit("setClaim_id_EQUIPMENT_CLAiM", equipment);
    },
    set_equipment_claim_SetterAction({ commit }, equipment) {
      commit("setEQUIPMENT_CLAiM", equipment);
    },
    set_date_claim_SetterAction({ commit }, dateClaim) {
      commit("setDATE_EQUIPMENT_CLAiM", dateClaim);
    },
    set_thirdparty_claim_SetterAction({ commit }, thirdparty) {
      commit("setTHIRDPARTY_EQUIPMENT_CLAiM", thirdparty);
    },
    set_reinvoiced_claim_SetterAction({ commit }, thirdparty) {
      commit("setREINVOICED_EQUIPMENT_CLAiM", thirdparty);
    },
    set_insurance_followup_claim_SetterAction({ commit }, insurance_followup) {
      commit("setINSURANCE_FOLLOWUP_EQUIPMENT_CLAiM", insurance_followup);
    },
    setAll_Attr_EQUIPMENT_CLAiMAction({ commit }, EquipmentClaim) {
      commit("setAll_Attr_EQUIPMENT_CLAiM", EquipmentClaim);
    },
    emptyAll_Attr_EQUIPMENT_CLAiMAction({ commit }) {
      commit("emptyAll_Attr_EQUIPMENT_CLAiM");
    },
    set_attr_ClaimOrIncident_EQUIPMENTAction({ commit }, ClaimOrIncident) {
      commit("set_attr_ClaimOrIncident_EQUIPMENT", ClaimOrIncident);
    },
  },
  getters: {
    getEquipmentclaims: (state) => {
      return state.claims;
    },
    geteditedOrSavedClaimEquipment: (state) => {
      return state.editedOrSavedClaimEquipment;
    },
    getLiability_letter_files_Data_Equipment: (state) => {
      return state.liability_letter_files_Data;
    },
  },
};
export default claimsEquipmentModule;
