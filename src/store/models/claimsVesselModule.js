import { toLaravelDatetime, NullTest } from "@/helpers/helpers";
import CustomizedAxios from "../../plugins/axios";

const claimsVesselModule = {
  state: {
    vessels: [],
    editedOrSavedClaimVessel: {
      id: 0,
      claim_id: "",
      categorie_of_vessel: "",
      concerned_internal_department: "",
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
      categorie_of_vessel: "",
      incident_report: null,
      incident_reportFile: null,
      liability_letter_files: [],
      insurance_declaration_files: [],
      filesDelete: [],
      insurance_declaration: null,
      insurance_declarationFile: null,
      major: false,
      vessel_number: "",
      shipping_line: {
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
      department: [],
      estimate: [],
    },
    liability_letter_files_Data: [],
  },
  mutations: {
    SET_VESSEL(state, vessels) {
      for (let index = 0; index < vessels.length; index++) {
        if (vessels[index].nature_of_damage == null) {
          vessels[index].nature_of_damage = { id: 0, name: "" };
        }
        if (vessels[index].shipping_line == null) {
          vessels[index].shipping_line = { id: 0, name: "" };
        }
        if (vessels[index].companie == null) {
          vessels[index].companie = { id: 0, name: "" };
        }
      }
      state.vessels = vessels;
    },
    ADD_VESSEL(state, claim) {
      state.vessels.push(claim);
      // state.editedOrSavedClaimVessel.id = claim.id;

      state.editedOrSavedClaimVessel.liability_letter = claim.liability_letter;
      state.editedOrSavedClaimVessel.insurance_declaration =
        claim.insurance_declaration;
    },
    DELETE_VESSEL(state, claim) {
      state.vessels = state.vessels.filter((c) => c.id != claim.id);
    },
    EDIT_VESSEL(state, vessel) {
      state.vessels = state.vessels.map((c) => {
        if (c.id == vessel.id) return vessel;
        return c;
      });
      state.editedOrSavedClaimVessel.liability_letter = vessel.liability_letter;
      state.editedOrSavedClaimVessel.insurance_declaration =
        vessel.insurance_declaration;
    },
    setclaim_id_VESSEL_CLAiM(state, claim_id) {
      state.editedOrSavedClaimVessel.claim_id = claim_id;
    },
    setVESSEL_CLAiM(state, vessel) {
      state.editedOrSavedClaimVessel.major = vessel.major;
      state.editedOrSavedClaimVessel.shipping_line.id = vessel.shipping_line.id;
      state.editedOrSavedClaimVessel.shipping_line.name =
        vessel.shipping_line.name;

      state.editedOrSavedClaimVessel.companie.id = vessel.companie.id;
      state.editedOrSavedClaimVessel.companie.name = vessel.companie.name;

      state.editedOrSavedClaimVessel.vessel_number = vessel.vessel_number;

      state.editedOrSavedClaimVessel.nature_of_damage.id =
        vessel.nature_of_damage.id;
      state.editedOrSavedClaimVessel.nature_of_damage.name =
        vessel.nature_of_damage.name;
      state.editedOrSavedClaimVessel.cause_damage = vessel.cause_damage;
      state.editedOrSavedClaimVessel.damage_description =
        vessel.damage_description;
      // state.editedOrSavedClaimVessel.department.id = vessel.department.id;
      state.editedOrSavedClaimVessel.damage_caused_by = vessel.damage_caused_by;

      state.editedOrSavedClaimVessel.thirdparty_company_name =
        vessel.thirdparty_company_name;
      state.editedOrSavedClaimVessel.thirdparty_Activity_comments =
        vessel.thirdparty_Activity_comments;
      state.editedOrSavedClaimVessel.outsourcer_company_name =
        vessel.outsourcer_company_name;
      state.editedOrSavedClaimVessel.TAT_name_persons =
        vessel.TAT_name_persons.join("|");
      state.editedOrSavedClaimVessel.outsourcer_persons =
        vessel.outsourcer_persons.join("|");
      state.editedOrSavedClaimVessel.thirdparty_persons =
        vessel.thirdparty_persons.join("|");
      state.editedOrSavedClaimVessel.concerned_internal_department =
        vessel.department.join("|");
    },
    setDATE_VESSEL_CLAiM(state, dateClaim) {
      state.editedOrSavedClaimVessel.incident_reportFile =
        dateClaim.incident_reportFile;
      state.editedOrSavedClaimVessel.incident_report =
        dateClaim.incident_report;
    },
    setTHIRDPARTY_VESSEL_CLAiM(state, thirdpartyClaim) {
      state.editedOrSavedClaimVessel.liability_letter_files =
        thirdpartyClaim.liability_letter_files;
      state.editedOrSavedClaimVessel.filesDelete = thirdpartyClaim.filesDelete;
    },
    setREINVOICED_VESSEL_CLAiM(state, thirdpartyClaim) {
      state.editedOrSavedClaimVessel.amount = thirdpartyClaim.amount;
      state.editedOrSavedClaimVessel.currency = thirdpartyClaim.currency;
      state.editedOrSavedClaimVessel.comment_third_party =
        thirdpartyClaim.comment_third_party;
      state.editedOrSavedClaimVessel.reinvoiced = thirdpartyClaim.reinvoiced;
      state.editedOrSavedClaimVessel.date_of_reimbursement =
        thirdpartyClaim.date_of_reimbursement;
      state.editedOrSavedClaimVessel.Invoice_number =
        thirdpartyClaim.Invoice_number;
      state.editedOrSavedClaimVessel.reimbursed_amount =
        thirdpartyClaim.reimbursed_amount;
    },
    setINSURANCE_FOLLOWUP_VESSEL_CLAiM(state, insurance_followup) {
      state.editedOrSavedClaimVessel.date_of_declaration =
        insurance_followup.date_of_declaration;
      state.editedOrSavedClaimVessel.date_of_feedback =
        insurance_followup.date_of_feedback;
      state.editedOrSavedClaimVessel.comment_Insurance =
        insurance_followup.comment_Insurance;
      state.editedOrSavedClaimVessel.Indemnification_of_insurer =
        insurance_followup.Indemnification_of_insurer;
      state.editedOrSavedClaimVessel.Indemnification_date =
        insurance_followup.Indemnification_date;
      state.editedOrSavedClaimVessel.currency_indemnisation =
        insurance_followup.currency_indemnisation;
      state.editedOrSavedClaimVessel.deductible_charge_TAT =
        insurance_followup.deductible_charge_TAT;
      state.editedOrSavedClaimVessel.Complementary_indemnification =
        insurance_followup.Complementary_indemnification;

      state.editedOrSavedClaimVessel.insurance_declarationFile =
        insurance_followup.insurance_declarationFile;
      state.editedOrSavedClaimVessel.insurance_declaration_files =
        insurance_followup.insurance_declaration_files;
    },
    setAll_Attr_VESSEL_CLAiM(state, VesselClaim) {
      state.editedOrSavedClaimVessel.major = VesselClaim.major;
      state.editedOrSavedClaimVessel.id = VesselClaim.id;
      state.editedOrSavedClaimVessel.claim_id = VesselClaim.claim_id;
      state.editedOrSavedClaimVessel.categorie_of_vessel =
        VesselClaim.categorie_of_vessel;
      state.editedOrSavedClaimVessel.Deductible_charge_TAT =
        VesselClaim.Deductible_charge_TAT;
      state.editedOrSavedClaimVessel.categorie_of_vessel =
        VesselClaim.categorie_of_vessel;
      state.editedOrSavedClaimVessel.cause_damage = VesselClaim.cause_damage;
      state.editedOrSavedClaimVessel.vessel_number = VesselClaim.vessel_number;
      state.editedOrSavedClaimVessel.damage_description =
        VesselClaim.damage_description;
      state.editedOrSavedClaimVessel.equipement_registration =
        VesselClaim.equipement_registration;
      state.editedOrSavedClaimVessel.Liability_letter_number =
        VesselClaim.Liability_letter_number;
      state.editedOrSavedClaimVessel.categorie_of_vessel =
        VesselClaim.categorie_of_vessel;
      state.editedOrSavedClaimVessel.damage_caused_by =
        VesselClaim.damage_caused_by;
      state.editedOrSavedClaimVessel.currency_Insurance =
        VesselClaim.currency_Insurance;
      state.editedOrSavedClaimVessel.Complementary_indemnification =
        VesselClaim.Complementary_indemnification;

      state.editedOrSavedClaimVessel.Indemnification_date =
        VesselClaim.Indemnification_date;
      // object
      state.editedOrSavedClaimVessel.companie.id = VesselClaim.companie.id;
      state.editedOrSavedClaimVessel.shipping_line.id =
        VesselClaim.shipping_line.id;
      state.editedOrSavedClaimVessel.nature_of_damage.id =
        VesselClaim.nature_of_damage.id;
      state.editedOrSavedClaimVessel.shipping_line.name =
        VesselClaim.shipping_line.name;
      state.editedOrSavedClaimVessel.nature_of_damage.name =
        VesselClaim.nature_of_damage.name;
      state.editedOrSavedClaimVessel.companie.name = VesselClaim.companie.name;
      //state.editedOrSavedClaimVessel.nature_of_damage.id=VesselClaim.nature_of_damage.id;
      //third_party
      state.editedOrSavedClaimVessel.comment_third_party =
        VesselClaim.comment_third_party;
      state.editedOrSavedClaimVessel.thirdparty_company_name =
        VesselClaim.thirdparty_company_name;
      state.editedOrSavedClaimVessel.thirdparty_Activity_comments =
        VesselClaim.thirdparty_Activity_comments;
      state.editedOrSavedClaimVessel.amount = VesselClaim.amount;
      state.editedOrSavedClaimVessel.currency = VesselClaim.currency;
      state.editedOrSavedClaimVessel.reinvoiced = VesselClaim.reinvoiced;
      state.editedOrSavedClaimVessel.Invoice_number =
        VesselClaim.Invoice_number;
      state.editedOrSavedClaimVessel.reimbursed_amount =
        VesselClaim.reimbursed_amount;
      // estimation
      state.editedOrSavedClaimVessel.estimate = VesselClaim.estimate;
      // date

      state.editedOrSavedClaimVessel.date_of_declaration =
        VesselClaim.date_of_declaration;
      state.editedOrSavedClaimVessel.date_of_feedback =
        VesselClaim.date_of_feedback;
      state.editedOrSavedClaimVessel.thirdparty_Activity_comments =
        VesselClaim.thirdparty_Activity_comments;

      state.editedOrSavedClaimVessel.incident_report =
        VesselClaim.incident_report;
      state.editedOrSavedClaimVessel.incident_reportFile = null;

      state.editedOrSavedClaimVessel.liability_letter_files =
        VesselClaim.liability_letter_files;

      state.editedOrSavedClaimVessel.insurance_declaration_files =
        VesselClaim.insurance_declaration_files;

      state.editedOrSavedClaimVessel.TAT_name_persons =
        VesselClaim.TAT_name_persons;
      state.editedOrSavedClaimVessel.outsourcer_persons =
        VesselClaim.outsourcer_persons;
      state.editedOrSavedClaimVessel.thirdparty_persons =
        VesselClaim.thirdparty_persons;
      state.editedOrSavedClaimVessel.concerned_internal_department =
        VesselClaim.concerned_internal_department;
    },
    emptyAll_Attr_VESSEL_CLAiM(state) {
      state.editedOrSavedClaimVessel.major = false;
      state.editedOrSavedClaimVessel.id = 0;
      state.editedOrSavedClaimVessel.claim_id = 0;
      state.editedOrSavedClaimVessel.categorie_of_vessel = "";
      state.editedOrSavedClaimVessel.Deductible_charge_TAT = "";
      state.editedOrSavedClaimVessel.categorie_of_vessel = "";
      state.editedOrSavedClaimVessel.cause_damage = "";
      state.editedOrSavedClaimVessel.vessel_number = "";
      state.editedOrSavedClaimVessel.damage_description = "";
      state.editedOrSavedClaimVessel.damage_caused_by = "";
      state.editedOrSavedClaimVessel.equipement_registration = "";
      state.editedOrSavedClaimVessel.Liability_letter_number = "";
      state.editedOrSavedClaimVessel.categorie_of_vessel = "";
      state.editedOrSavedClaimVessel.currency_Insurance = "";
      state.editedOrSavedClaimVessel.deductible_charge_TAT = 5000;
      state.editedOrSavedClaimVessel.Complementary_indemnification = "";
      state.editedOrSavedClaimVessel.Indemnification_of_insurer = "";
      state.editedOrSavedClaimVessel.currency_indemnisation = "";
      // object
      state.editedOrSavedClaimVessel.shipping_line.id = 0;
      state.editedOrSavedClaimVessel.nature_of_damage.id = 0;
      state.editedOrSavedClaimVessel.companie.id = 0;

      state.editedOrSavedClaimVessel.shipping_line.name = "";
      state.editedOrSavedClaimVessel.nature_of_damage.name = "";
      state.editedOrSavedClaimVessel.companie.name = "";

      state.editedOrSavedClaimVessel.department = [];
      state.editedOrSavedClaimVessel.liability_letter_files = [];
      state.editedOrSavedClaimVessel.insurance_declaration_files = [];
      state.editedOrSavedClaimVessel.liability_letter_files_Data = [];
      state.editedOrSavedClaimVessel.liability_letter = null;
      state.editedOrSavedClaimVessel.liability_letterFile = null;
      state.editedOrSavedClaimVessel.insurance_declaration = null;
      state.editedOrSavedClaimVessel.insurance_declarationFile = null;

      //third_party
      state.editedOrSavedClaimVessel.comment_third_party = "";
      state.editedOrSavedClaimVessel.thirdparty_company_name = "";
      state.editedOrSavedClaimVessel.thirdparty_Activity_comments = "";
      state.editedOrSavedClaimVessel.amount = "";
      state.editedOrSavedClaimVessel.currency = "";
      state.editedOrSavedClaimVessel.reinvoiced = "";
      state.editedOrSavedClaimVessel.Invoice_number = "";
      state.editedOrSavedClaimVessel.reimbursed_amount = "";
      // estimation
      state.editedOrSavedClaimVessel.estimate = "";

      // date
      state.editedOrSavedClaimVessel.date_of_declaration = "";
      state.editedOrSavedClaimVessel.date_of_feedback = "";
      state.editedOrSavedClaimVessel.thirdparty_Activity_comments = "";
      state.editedOrSavedClaimVessel.Indemnification_date = "";
    },
    setLiabilityLetterToNull(state) {
      state.editedOrSavedClaimVessel.liability_letter = "";
    },
    setInsuranceDeclarationToNull(state) {
      state.editedOrSavedClaimVessel.insurance_declaration = "";
    },
    set_liability_letter_files_Data_vessel(state, liability_letter_files_Data) {
      state.liability_letter_files_Data = liability_letter_files_Data;
    },
    set_insurance_declaration_files_Data_vessel(
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
            commit("SET_CLAiMS", response.data.payload);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setVesselsAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("vessels/" + id)
          .then((response) => {
            commit("SET_VESSEL", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setliability_letter_files_Data_vesselAction(
      { commit },
      liability_letter_files
    ) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post(
          "LiabilityInsuranceFiles/vessel",
          liability_letter_files
        )
          .then((response) => {
            commit(
              "set_liability_letter_files_Data_vessel",
              response.data.payload
            );
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editedOrSavedVesselClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        var claimFormData = new FormData();

        claimFormData.append("major", claim.major);
        claimFormData.append("id", claim.id);
        claimFormData.append("claim_id", NullTest(claim.claim_id));

        claimFormData.append(
          "categorie_of_vessel",
          NullTest(claim.categorie_of_vessel)
        );
        claimFormData.append(
          "concerned_internal_department",
          NullTest(claim.concerned_internal_department)
        );
        claimFormData.append(
          "equipement_registration",
          NullTest(claim.equipement_registration)
        );
        claimFormData.append("cause_damage", NullTest(claim.cause_damage));
        claimFormData.append("vessel_number", NullTest(claim.vessel_number));
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
        claimFormData.append("categorie_of_vessel", claim.categorie_of_vessel);
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
        claimFormData.append("shipping_line[id]", claim.shipping_line.id);
        claimFormData.append(
          "shipping_line[name]",
          NullTest(claim.shipping_line.name)
        );

        claimFormData.append("companie[id]", claim.companie.id);
        claimFormData.append("companie[name]", NullTest(claim.companie.name));

        claimFormData.append("nature_of_damage[id]", claim.nature_of_damage.id);
        claimFormData.append(
          "nature_of_damage[name]",
          NullTest(claim.nature_of_damage.name)
        );
        CustomizedAxios.post("vessels/createOrUpdateVessel", claimFormData)
          .then((response) => {
            if (claim.id == 0) {
              commit("ADD_VESSEL", response.data.payload);
            } else {
              commit("EDIT_VESSEL", response.data.payload);
            }

            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    addVesselAction({ commit }, vessel) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("vessels/create", {
          name: vessel.name,
        })
          .then((response) => {
            commit("ADD_CLAiM", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteVesselClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("vessels/delete", claim)
          .then((response) => {
            commit("DELETE_VESSEL", claim);
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
            commit("EDIT_CLAiM", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    set_claim_id_vessel_claim_SetterAction({ commit }, claim_id) {
      commit("setclaim_id_VESSEL_CLAiM", claim_id);
    },
    set_vessel_claim_SetterAction({ commit }, vessel) {
      commit("setVESSEL_CLAiM", vessel);
    },
    set_date_vessel_claim_SetterAction({ commit }, dateClaim) {
      commit("setDATE_VESSEL_CLAiM", dateClaim);
    },
    set_thirdparty_vessel_claim_SetterAction({ commit }, thirdparty) {
      commit("setTHIRDPARTY_VESSEL_CLAiM", thirdparty);
    },
    set_reinvoiced_vessel_claim_SetterAction({ commit }, thirdparty) {
      commit("setREINVOICED_VESSEL_CLAiM", thirdparty);
    },
    set_insurance_followup_vessel_claim_SetterAction(
      { commit },
      insurance_followup
    ) {
      commit("setINSURANCE_FOLLOWUP_VESSEL_CLAiM", insurance_followup);
    },
    setAll_Attr_VESSEL_CLAiMAction({ commit }, VesselClaim) {
      commit("setAll_Attr_VESSEL_CLAiM", VesselClaim);
    },
    emptyAll_Attr_VESSEL_CLAiMAction({ commit }) {
      commit("emptyAll_Attr_VESSEL_CLAiM");
    },
  },
  getters: {
    getVesselclaims: (state) => {
      return state.vessels;
    },
    geteditedOrSavedClaimVessel: (state) => {
      return state.editedOrSavedClaimVessel;
    },
    getLiability_letter_files_Data_Vessel: (state) => {
      return state.liability_letter_files_Data;
    },
  },
};
export default claimsVesselModule;
