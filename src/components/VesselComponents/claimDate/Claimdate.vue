<template>
  <div>
    <v-card class="mb-12" color="#f0f0f0cc" height="auto">
      <template>
        <v-container fluid>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
              <template>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dateClaim.incident_date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateClaim.incident_date"
                      label="incident date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateClaim.incident_date"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(dateClaim.incident_date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </template>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="dateClaim.claim_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateClaim.claim_date"
                    label="Claim date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateClaim.claim_date"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(dateClaim.claim_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              
              <v-file-input outlined label="Incident report"></v-file-input>
            </v-col>

          </v-row>
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
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu1: false,
      dateClaim: {
        incident_date: "",
        claim_date: "",
      },
    };
  },

  mounted() {
    document.title = "Claim";

    this.initialize();
  },
  computed: {
    formTitle() {},
    ...mapGetters([
      "getbrands",
      "getnatureOfDamages",
      "getdepartements",
      "geteditedOrSavedClaimVessel",
    ]),
  },
  watch: {
    dateClaim: {
      deep: true,
      handler(newValue, oldvalue) {
        this.set_date_vessel_claim_SetterAction(newValue).then(() => {});
      },
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      if (this.geteditedOrSavedClaimVessel.id > 0) {
        this.dateClaim.incident_date =
          this.geteditedOrSavedClaimVessel.incident_date;
        this.dateClaim.claim_date =
          this.geteditedOrSavedClaimVessel.claim_date;
      }
    },
    ...mapActions(["set_date_vessel_claim_SetterAction"]),
  },
};
</script>
