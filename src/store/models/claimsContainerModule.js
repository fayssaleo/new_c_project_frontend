import CustomizedAxios from "../../plugins/axios";
import { toLaravelDatetime, NullTest } from "@/helpers/helpers";

const claimsContainerModule = {
  state: {
    containers: [],
    editedOrSavedClaimContainer: {
      id: 0,
      claim_id: 0,
      containerID: "",
      nombre_of_containers: 0,
      categorie_of_container: "",
      containerType: "",
      marchandise: "",
      marchandise_nature: "",
      marchandise_type: "",
      concerned_internal_department: "",
      equipement_registration: "",
      cause_damage: "",
      damage_description: "",
      Liability_letter_number: "",
      amount: null,
      currency: "",
      nature_of_damage_comment: "",
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
      deductible_charge_TAT: 0,
      damage_caused_by: "",
      TAT_name_persons: "",
      outsourcer_company_name: null,
      outsourcer_persons: "",
      thirdparty_company_name: null,
      thirdparty_Activity_comments: null,
      thirdparty_persons: "",
      nature_of_damage_id: null,
      categorie_of_container: "",
      Concerned_internal_department: "",
      Deductible_charge_TAT: null,
      liability_letter_files: [],
      insurance_declaration_files: [],
      filesDelete: [],
      insurance_declaration: null,
      insurance_declarationFile: null,
      major: false,
      nature_of_damage: {
        id: 0,
        name: "",
      },
      shipping_line: {
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
    /* SET_CLAiMS(state, containers) {
      state.containers = containers;
    }, */
    SET_CONTAINER(state, containers) {
      for (let index = 0; index < containers.length; index++) {
        if (containers[index].shipping_line == null) {
          containers[index].shipping_line = { id: 0, name: "" };
        }
        if (containers[index].nature_of_damage == null) {
          containers[index].nature_of_damage = { id: 0, name: "" };
        }
        if (containers[index].companie == null) {
          containers[index].companie = { id: 0, name: "" };
        }
      }
      state.containers = containers;
    },
    ADD_CONTAINER(state, claim) {
      state.containers.push(claim);
      state.editedOrSavedClaimContainer.id = claim.id;
      state.editedOrSavedClaimContainer.liability_letter =
        claim.liability_letter;
      state.editedOrSavedClaimContainer.insurance_declaration =
        claim.insurance_declaration;
    },
    DELETE_CONTAINER(state, claim) {
      state.containers = state.containers.filter((c) => c.id != claim.id);
    },
    EDIT_CONTAINER(state, containers) {
      state.containers = state.containers.map((c) => {
        if (c.id == containers.id) return containers;
        return c;
      });
      state.editedOrSavedClaimContainer.id = containers.id;
      state.editedOrSavedClaimContainer.liability_letter =
        containers.liability_letter;
      state.editedOrSavedClaimContainer.insurance_declaration =
        containers.insurance_declaration;
    },
    setclaim_id_CONTAINER_CLAiM(state, claim_id) {
      state.editedOrSavedClaimContainer.claim_id = claim_id;
    },
    setCONTAINER_CLAiM(state, container) {
      state.editedOrSavedClaimContainer.major = container.major;
      state.editedOrSavedClaimContainer.categorie_of_container =
        container.categorie_of_container;

      state.editedOrSavedClaimContainer.containerID = container.containerID;
      state.editedOrSavedClaimContainer.nombre_of_containers =
        container.nombre_of_containers;
      state.editedOrSavedClaimContainer.containerType = container.containerType;

      state.editedOrSavedClaimContainer.marchandise = container.marchandise;
      state.editedOrSavedClaimContainer.marchandise_nature =
        container.marchandise_nature;
      state.editedOrSavedClaimContainer.marchandise_type =
        container.marchandise_type;

      state.editedOrSavedClaimContainer.cause_damage = container.cause_damage;
      state.editedOrSavedClaimContainer.damage_description =
        container.damage_description;
      state.editedOrSavedClaimContainer.nature_of_damage_comment =
        container.nature_of_damage_comment;
      state.editedOrSavedClaimContainer.companie.id = container.companie.id;
      state.editedOrSavedClaimContainer.companie.name = container.companie.name;

      state.editedOrSavedClaimContainer.nature_of_damage.id =
        container.nature_of_damage.id;
      state.editedOrSavedClaimContainer.shipping_line.id =
        container.shipping_line.id;
      state.editedOrSavedClaimContainer.nature_of_damage.name =
        container.nature_of_damage.name;
      state.editedOrSavedClaimContainer.shipping_line.name =
        container.shipping_line.name;
      state.editedOrSavedClaimContainer.damage_caused_by =
        container.damage_caused_by;

      // new
      state.editedOrSavedClaimContainer.thirdparty_company_name =
        container.thirdparty_company_name;
      state.editedOrSavedClaimContainer.thirdparty_Activity_comments =
        container.thirdparty_Activity_comments;
      state.editedOrSavedClaimContainer.outsourcer_company_name =
        container.outsourcer_company_name;
      state.editedOrSavedClaimContainer.TAT_name_persons =
        container.TAT_name_persons.join("|");
      state.editedOrSavedClaimContainer.concerned_internal_department =
        container.department.join("|");
      state.editedOrSavedClaimContainer.outsourcer_persons =
        container.outsourcer_persons.join("|");
      state.editedOrSavedClaimContainer.thirdparty_persons =
        container.thirdparty_persons.join("|");
    },
    setDATE_CONTAINER_CLAiM(state, dateClaim) {
      state.editedOrSavedClaimContainer.incident_reportFile =
        dateClaim.incident_reportFile;
      state.editedOrSavedClaimContainer.incident_report =
        dateClaim.incident_report;
    },

    setTHIRDPARTY_CONTAINER_CLAiM(state, thirdpartyClaim) {
      state.editedOrSavedClaimContainer.liability_letter_files =
        thirdpartyClaim.liability_letter_files;
      state.editedOrSavedClaimContainer.filesDelete =
        thirdpartyClaim.filesDelete;
    },

    setREINVOICED_CONTAINER_CLAiM(state, thirdpartyClaim) {
      state.editedOrSavedClaimContainer.amount = thirdpartyClaim.amount;
      state.editedOrSavedClaimContainer.currency = thirdpartyClaim.currency;
      state.editedOrSavedClaimContainer.comment_third_party =
        thirdpartyClaim.comment_third_party;
      state.editedOrSavedClaimContainer.reinvoiced = thirdpartyClaim.reinvoiced;
      state.editedOrSavedClaimContainer.date_of_reimbursement =
        thirdpartyClaim.date_of_reimbursement;
      state.editedOrSavedClaimContainer.Invoice_number =
        thirdpartyClaim.Invoice_number;
      state.editedOrSavedClaimContainer.reimbursed_amount =
        thirdpartyClaim.reimbursed_amount;
      //
    },
    setINSURANCE_FOLLOWUP_CONTAINER_CLAiM(state, insurance_followup) {
      state.editedOrSavedClaimContainer.date_of_declaration =
        insurance_followup.date_of_declaration;
      state.editedOrSavedClaimContainer.date_of_feedback =
        insurance_followup.date_of_feedback;
      state.editedOrSavedClaimContainer.comment_Insurance =
        insurance_followup.comment_Insurance;
      state.editedOrSavedClaimContainer.Indemnification_of_insurer =
        insurance_followup.Indemnification_of_insurer;
      state.editedOrSavedClaimContainer.currency_indemnisation =
        insurance_followup.currency_indemnisation;
      state.editedOrSavedClaimContainer.deductible_charge_TAT =
        insurance_followup.deductible_charge_TAT;
      state.editedOrSavedClaimContainer.Complementary_indemnification =
        insurance_followup.Complementary_indemnification;
      //
      state.editedOrSavedClaimContainer.Indemnification_date =
        insurance_followup.Indemnification_date;

      state.editedOrSavedClaimContainer.insurance_declarationFile =
        insurance_followup.insurance_declarationFile;

      state.editedOrSavedClaimContainer.insurance_declaration_files =
        insurance_followup.insurance_declaration_files;
    },

    setAll_Attr_CONTAINER_CLAiM(state, ContainerClaim) {
      state.editedOrSavedClaimContainer.id = ContainerClaim.id;
      state.editedOrSavedClaimContainer.claim_id = ContainerClaim.claim_id;

      state.editedOrSavedClaimContainer.marchandise =
        ContainerClaim.marchandise;
      state.editedOrSavedClaimContainer.marchandise_nature =
        ContainerClaim.marchandise_nature;
      state.editedOrSavedClaimContainer.marchandise_type =
        ContainerClaim.marchandise_type;

      state.editedOrSavedClaimContainer.containerID =
        ContainerClaim.containerID;
      state.editedOrSavedClaimContainer.nombre_of_containers =
        ContainerClaim.nombre_of_containers;
      state.editedOrSavedClaimContainer.containerType =
        ContainerClaim.containerType;

      state.editedOrSavedClaimContainer.nature_of_damage_comment =
        ContainerClaim.nature_of_damage_comment;

      state.editedOrSavedClaimContainer.categorie_of_container =
        ContainerClaim.categorie_of_container;
      state.editedOrSavedClaimContainer.Deductible_charge_TAT =
        ContainerClaim.Deductible_charge_TAT;
      state.editedOrSavedClaimContainer.categorie_of_container =
        ContainerClaim.categorie_of_container;
      state.editedOrSavedClaimContainer.cause_damage =
        ContainerClaim.cause_damage;
      state.editedOrSavedClaimContainer.damage_description =
        ContainerClaim.damage_description;
      state.editedOrSavedClaimContainer.equipement_registration =
        ContainerClaim.equipement_registration;
      state.editedOrSavedClaimContainer.Liability_letter_number =
        ContainerClaim.Liability_letter_number;
      state.editedOrSavedClaimContainer.categorie_of_container =
        ContainerClaim.categorie_of_container;
      state.editedOrSavedClaimContainer.damage_caused_by =
        ContainerClaim.damage_caused_by;
      state.editedOrSavedClaimContainer.currency_Insurance =
        ContainerClaim.currency_Insurance;
      state.editedOrSavedClaimContainer.Complementary_indemnification =
        ContainerClaim.Complementary_indemnification;

      state.editedOrSavedClaimContainer.Indemnification_date =
        ContainerClaim.Indemnification_date;
      // object
      state.editedOrSavedClaimContainer.nature_of_damage.id =
        ContainerClaim.nature_of_damage.id;
      state.editedOrSavedClaimContainer.nature_of_damage.name =
        ContainerClaim.nature_of_damage.name;
      state.editedOrSavedClaimContainer.companie.id =
        ContainerClaim.companie.id;
      state.editedOrSavedClaimContainer.shipping_line.id =
        ContainerClaim.shipping_line.id;
      state.editedOrSavedClaimContainer.shipping_line.name =
        ContainerClaim.shipping_line.name;
      state.editedOrSavedClaimContainer.companie.name =
        ContainerClaim.companie.name;
      //third_party
      state.editedOrSavedClaimContainer.comment_third_party =
        ContainerClaim.comment_third_party;
      state.editedOrSavedClaimContainer.thirdparty_company_name =
        ContainerClaim.thirdparty_company_name;
      state.editedOrSavedClaimContainer.thirdparty_Activity_comments =
        ContainerClaim.thirdparty_Activity_comments;
      state.editedOrSavedClaimContainer.amount = ContainerClaim.amount;
      state.editedOrSavedClaimContainer.currency = ContainerClaim.currency;
      state.editedOrSavedClaimContainer.reinvoiced = ContainerClaim.reinvoiced;
      state.editedOrSavedClaimContainer.Invoice_number =
        ContainerClaim.Invoice_number;
      state.editedOrSavedClaimContainer.reimbursed_amount =
        ContainerClaim.reimbursed_amount;
      // estimation
      state.editedOrSavedClaimContainer.estimate = ContainerClaim.estimate;
      // date

      state.editedOrSavedClaimContainer.date_of_declaration =
        ContainerClaim.date_of_declaration;
      state.editedOrSavedClaimContainer.date_of_feedback =
        ContainerClaim.date_of_feedback;
      state.editedOrSavedClaimContainer.thirdparty_Activity_comments =
        ContainerClaim.thirdparty_Activity_comments;

      //
      state.editedOrSavedClaimContainer.liability_letter_files =
        ContainerClaim.liability_letter_files;

      state.editedOrSavedClaimContainer.insurance_declaration_files =
        ContainerClaim.insurance_declaration_files;

      state.editedOrSavedClaimContainer.TAT_name_persons =
        ContainerClaim.TAT_name_persons;
      state.editedOrSavedClaimContainer.outsourcer_persons =
        ContainerClaim.outsourcer_persons;
      state.editedOrSavedClaimContainer.thirdparty_persons =
        ContainerClaim.thirdparty_persons;
      state.editedOrSavedClaimContainer.concerned_internal_department =
        ContainerClaim.concerned_internal_department;
    },
    emptyAll_Attr_CONTAINER_CLAiM(state) {
      state.editedOrSavedClaimContainer.id = 0;
      state.editedOrSavedClaimContainer.claim_id = 0;
      state.editedOrSavedClaimContainer.containerID = 0;
      state.editedOrSavedClaimContainer.nombre_of_containers = 0;
      state.editedOrSavedClaimContainer.containerType = "";
      state.editedOrSavedClaimContainer.major = false;

      state.editedOrSavedClaimContainer.marchandise = "";
      state.editedOrSavedClaimContainer.marchandise_nature = "";
      state.editedOrSavedClaimContainer.marchandise_type = "";

      state.editedOrSavedClaimContainer.categorie_of_container = "";
      state.editedOrSavedClaimContainer.nature_of_damage_comment = "";

      state.editedOrSavedClaimContainer.Deductible_charge_TAT = "";
      state.editedOrSavedClaimContainer.categorie_of_container = "";
      state.editedOrSavedClaimContainer.cause_damage = "";
      state.editedOrSavedClaimContainer.damage_description = "";
      state.editedOrSavedClaimContainer.damage_caused_by = "";
      state.editedOrSavedClaimContainer.equipement_registration = "";
      state.editedOrSavedClaimContainer.Liability_letter_number = "";
      state.editedOrSavedClaimContainer.categorie_of_container = "";
      state.editedOrSavedClaimContainer.currency_Insurance = "";
      state.editedOrSavedClaimContainer.deductible_charge_TAT = 5000;
      state.editedOrSavedClaimContainer.Complementary_indemnification = "";
      // object
      state.editedOrSavedClaimContainer.companie.id = 0;

      state.editedOrSavedClaimContainer.nature_of_damage.id = 0;
      state.editedOrSavedClaimContainer.nature_of_damage.name = "";
      state.editedOrSavedClaimContainer.shipping_line.id = 0;
      state.editedOrSavedClaimContainer.shipping_line.name = "";
      state.editedOrSavedClaimContainer.companie.name = "";

      state.editedOrSavedClaimContainer.department = [];
      state.editedOrSavedClaimContainer.liability_letter_files = [];
      state.editedOrSavedClaimContainer.insurance_declaration_files = [];
      state.editedOrSavedClaimContainer.liability_letter_files_Data = [];
      state.editedOrSavedClaimContainer.insurance_declaration = null;
      state.editedOrSavedClaimContainer.insurance_declarationFile = null;

      //third_party
      state.editedOrSavedClaimContainer.comment_third_party = "";
      state.editedOrSavedClaimContainer.thirdparty_company_name = "";
      state.editedOrSavedClaimContainer.thirdparty_Activity_comments = "";
      state.editedOrSavedClaimContainer.amount = "";
      state.editedOrSavedClaimContainer.currency = "";
      state.editedOrSavedClaimContainer.reinvoiced = "";
      state.editedOrSavedClaimContainer.Invoice_number = "";
      state.editedOrSavedClaimContainer.reimbursed_amount = "";
      // estimation
      state.editedOrSavedClaimContainer.estimate = "";

      // date

      state.editedOrSavedClaimContainer.date_of_declaration = "";
      state.editedOrSavedClaimContainer.date_of_feedback = "";
      state.editedOrSavedClaimContainer.thirdparty_Activity_comments = "";
      state.editedOrSavedClaimContainer.Indemnification_date = "";
    },
    setLiabilityLetterToNull(state) {
      state.editedOrSavedClaimContainer.liability_letter = "";
    },
    setInsuranceDeclarationToNull(state) {
      state.editedOrSavedClaimContainer.insurance_declaration = "";
    },
    set_liability_letter_files_Data_container(
      state,
      liability_letter_files_Data
    ) {
      state.liability_letter_files_Data = liability_letter_files_Data;
    },
    set_insurance_declaration_files_Data_container(
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
    setContainersAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("containers/" + id)
          .then((response) => {
            commit("SET_CONTAINER", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setContainersAllIncidentAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("containers/allIncident")
          .then((response) => {
            commit("SET_CLAiMS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setliability_letter_files_Data_containerAction(
      { commit },
      liability_letter_files
    ) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post(
          "LiabilityInsuranceFiles/container",
          liability_letter_files
        )
          .then((response) => {
            commit(
              "set_liability_letter_files_Data_container",
              response.data.payload
            );
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editedOrSavedContainerClaimAction({ commit }, claim, state) {
      return new Promise((resolve, reject) => {
        var claimFormData = new FormData();

        claimFormData.append("major", claim.major);
        claimFormData.append("id", claim.id);
        claimFormData.append("claim_id", NullTest(claim.claim_id));

        //
        claimFormData.append("containerID", NullTest(claim.containerID));
        claimFormData.append(
          "nombre_of_containers",
          NullTest(claim.nombre_of_containers)
        );
        claimFormData.append("containerType", NullTest(claim.containerType));

        claimFormData.append("marchandise", NullTest(claim.marchandise));
        claimFormData.append(
          "marchandise_nature",
          NullTest(claim.marchandise_nature)
        );
        claimFormData.append(
          "marchandise_type",
          NullTest(claim.marchandise_type)
        );
        //
        claimFormData.append(
          "categorie_of_container",
          NullTest(claim.categorie_of_equipment)
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
          "categorie_of_container",
          claim.categorie_of_container
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

        CustomizedAxios.post(
          "containers/createOrUpdateContainer",
          claimFormData
        )
          .then((response) => {
            if (claim.id == 0) {
              commit("ADD_CONTAINER", response.data.payload);
              //state.editedOrSavedClaimContainer.id = response.data.payload.id;
            } else {
              commit("EDIT_CONTAINER", response.data.payload);
            }

            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    addContainerAction({ commit }, container) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("containers/create", {
          name: container.name,
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

    deleteContainerClaimAction({ commit }, claim) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("containers/delete", claim)
          .then((response) => {
            commit("DELETE_CONTAINER", claim);
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
    set_ClaimOrIncident_claim_SetterAction({ commit }, container) {
      commit("setClaimOrIncident_CONTAINER_CLAiM", container);
    },
    set_Claim_id_containerclaim_SetterAction({ commit }, claim_id) {
      commit("setclaim_id_CONTAINER_CLAiM", claim_id);
    },
    set_container_claim_SetterAction({ commit }, container) {
      commit("setCONTAINER_CLAiM", container);
    },
    set_date_container_claim_SetterAction({ commit }, dateClaim) {
      commit("setDATE_CONTAINER_CLAiM", dateClaim);
    },
    set_thirdparty_container_claim_SetterAction({ commit }, thirdparty) {
      commit("setTHIRDPARTY_CONTAINER_CLAiM", thirdparty);
    },
    set_reinvoiced_container_claim_SetterAction({ commit }, thirdparty) {
      commit("setREINVOICED_CONTAINER_CLAiM", thirdparty);
    },
    set_insurance_followup_container_claim_SetterAction(
      { commit },
      insurance_followup
    ) {
      commit("setINSURANCE_FOLLOWUP_CONTAINER_CLAiM", insurance_followup);
    },
    setAll_Attr_CONTAINER_CLAiMAction({ commit }, ContainerClaim) {
      commit("setAll_Attr_CONTAINER_CLAiM", ContainerClaim);
    },
    emptyAll_Attr_CONTAINER_CLAiMAction({ commit }) {
      commit("emptyAll_Attr_CONTAINER_CLAiM");
    },
  },
  getters: {
    getContainerclaims: (state) => {
      return state.containers;
    },
    geteditedOrSavedClaimContainer: (state) => {
      return state.editedOrSavedClaimContainer;
    },
    getLiability_letter_files_Data_Container: (state) => {
      return state.liability_letter_files_Data;
    },
  },
};
export default claimsContainerModule;
