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
      hide-default-footer
      disable-pagination
      @current-items="getFiltered"
    >
      <template v-slot:item="{ item }">
        <tr class="">
          <td class="cursor">
            {{ item.claimSerial }}
          </td>
          <td v-if="item.category != ''" class="cursor">
            {{ item.category }}
          </td>
          <td v-else class="cursor">
            <v-chip color="#76ba99" class="white--text cursor">
              Not yet
            </v-chip>
          </td>
          <td v-if="item.getEquipmentIds != ''" class="cursor">
            <div v-for="id in item.getEquipmentIds" :key="id">{{ id }}</div>
          </td>
          <td v-else class="cursor">
            <v-chip color="#76ba99" class="white--text cursor">
              Not yet
            </v-chip>
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
          <td v-if="item.getDeclare != ''" class="cursor">
            {{ item.getDeclare }}
          </td>
          <td v-else class="cursor">
            <v-chip color="#76ba99" class="white--text cursor"> No </v-chip>
          </td>
          <td class="cursor">{{ item.totalEstimation }}</td>
          <td class="cursor">{{ item.getReinvoiced }}</td>
          <td>
            <v-row class="ma-0 pa-0">
              <v-col cols="12" class="ma-0 pa-0"
                ><v-btn
                  color="primary"
                  @click="editItem(item)"
                  class="m-2 mr-2 btnAction white--text"
                  style="
                    height: 26px;
                    min-width: 100%;
                    margin-top: 7px;
                    margin-bottom: 3px;
                  "
                >
                  <v-icon medium class="mr-2"> mdi-pencil </v-icon>
                </v-btn></v-col
              >
              <v-col cols="12" class="ma-0 pa-0"
                ><v-btn
                  color="red"
                  @click="deleteItem(item)"
                  class="m-2 mr-2 btnAction white--text"
                  style="height: 26px; min-width: 100%; margin-bottom: 3px"
                >
                  <v-icon medium> mdi-delete </v-icon>
                </v-btn></v-col
              >
              <v-col cols="12" class="ma-0 pa-0"
                ><v-btn
                  v-if="item.status == 'On progress'"
                  color="green"
                  @click="closedDialogeF(item)"
                  class="m-2 mr-2 btnAction white--text"
                  style="height: 26px; min-width: 100%; margin-bottom: 10px"
                >
                  <v-icon medium> mdi-lock-check </v-icon>
                </v-btn></v-col
              >
              <v-col cols="12" class="ma-0 pa-0">
                <v-btn
                  v-if="item.status == 'Closed' || item.status == null"
                  color="deep-orange accent-3"
                  @click="treatedDialogeF(item)"
                  class="m-2 btnAction white--text"
                  style="height: 26px; min-width: 100%; margin-bottom: 7px"
                >
                  <v-icon medium> mdi-lock-clock </v-icon>
                </v-btn></v-col
              >
              <v-col cols="12" class="ma-0 pa-0">
                <v-btn
                  color="blue-grey accent-3"
                  @click="showDownloadAction(item.id, item.claimSerial)"
                  class="m-2 btnAction white--text"
                  style="height: 26px; min-width: 100%; margin-bottom: 7px"
                >
                  <v-icon medium> mdi-download </v-icon>
                </v-btn></v-col
              >
            </v-row>
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
          <v-btn
            color="green"
            class="white--text DownloadBtn"
            @click="download()"
          >
            <v-icon left> mdi-download </v-icon>
            Download
          </v-btn>
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
              <v-menu
                v-model="monthMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="white"
                    class="black--text filterByMonthBtn"
                    @click="reinitialize()"
                  >
                    <v-icon left> mdi-plus </v-icon>
                    Search
                  </v-btn>
                  <v-text-field
                    v-model="txtMonth"
                    label="Month"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    width="80px"
                    class="filterByMonth"
                    outlined
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="month"
                  @input="onInput"
                  color="primary"
                  scrollable
                  type="month"
                  ref="picker"
                ></v-date-picker>
              </v-menu>
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
          <v-dialog v-model="showDownload" max-width="80%">
            <v-card>
              <v-card-title>
                Download {{ isClaim ? "Claim " : "Incident " + " " }}
                {{ download_claimSerial }}
                files :
                <v-btn
                  color="green"
                  class="white--text ml-auto"
                  @click="downloadOne()"
                >
                  <v-icon left> mdi-download </v-icon>
                  Download
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-spacer></v-spacer>
              <v-card-text>
                <template>
                  <v-expansion-panels class="mt-5">
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        class="teal white--text font-weight-bold"
                        toggle-icon-color="white"
                      >
                        {{ isClaim ? "CLAIM" : "INCIDENT" + " " }} REPORTS ({{
                          getCLAIMS_FILES[0]["inidentReports"].length
                        }})
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12">
                            <v-list class="my-list">
                              <v-list-item
                                v-for="incidentReport in getCLAIMS_FILES[0][
                                  'inidentReports'
                                ]"
                                :key="incidentReport"
                              >
                                <v-list-item-icon>
                                  <v-icon
                                    v-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'pdf'
                                    "
                                    color="red"
                                    >mdi-file-pdf-box</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'xlsx'
                                    "
                                    color="green"
                                    >mdi-file-excel-box</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'csv'
                                    "
                                    color="green"
                                    >mdi-file-excel-box</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'xls'
                                    "
                                    color="green"
                                    >mdi-file-excel-box</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'jpg'
                                    "
                                    color="orange"
                                    >mdi-file-jpg-box</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'png'
                                    "
                                    color="orange"
                                    >mdi-file-png-box</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'jpeg'
                                    "
                                    color="orange"
                                    >mdi-panorama-variant</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'svg'
                                    "
                                    color="orange"
                                    >mdi-svg</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'docx'
                                    "
                                    color="blue"
                                    >mdi-file-word-box</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'doc'
                                    "
                                    color="blue"
                                    >mdi-file-word-box</v-icon
                                  >
                                  <v-icon
                                    v-else-if="
                                      incidentReport.filename.split('.')[
                                        incidentReport.filename.split('.')
                                          .length - 1
                                      ] == 'dotx'
                                    "
                                    color="blue"
                                    >mdi-file-word-box</v-icon
                                  >
                                  <v-icon v-else color="gray"
                                    >mdi-file-document</v-icon
                                  >
                                </v-list-item-icon>
                                <v-list-item-content>
                                  <v-list-item-title>{{
                                    incidentReport.filename
                                      .split("_")
                                      .slice(1)
                                      .join("_")
                                  }}</v-list-item-title>
                                  <v-list-item-subtitle
                                    >created at :
                                    {{
                                      incidentReport.created_at
                                    }}</v-list-item-subtitle
                                  >
                                </v-list-item-content>
                                <v-list-item-action>
                                  <a
                                    :href="`${basicPathForDownload}/claim/incident_report/${incidentReport.filename}`"
                                    download
                                    target="_blank"
                                    style="text-decoration: none"
                                  >
                                    <v-btn
                                      color="green"
                                      class="white--text"
                                      small
                                    >
                                      Download
                                      <v-icon right> mdi-download </v-icon>
                                    </v-btn>
                                  </a>
                                </v-list-item-action>
                              </v-list-item>
                            </v-list>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        class="primary white--text font-weight-bold"
                        toggle-icon-color="white"
                      >
                        EQUIPMENTS ({{
                          equipmentsFiles(getCLAIMS_FILES[1]["equipments"])
                        }})
                      </v-expansion-panel-header>
                      <v-expansion-panel-content
                        v-if="getCLAIMS_FILES[1]['equipments'].length > 0"
                      >
                        <v-row>
                          <v-col cols="12">
                            <template>
                              <v-expansion-panels class="mt-5">
                                <v-expansion-panel
                                  v-for="(
                                    equipmentItem, index
                                  ) in getCLAIMS_FILES[1]['equipments']"
                                  :key="index"
                                >
                                  <v-expansion-panel-header
                                    class="font-weight-bold"
                                    :class="{
                                      'panelCustomizedColor2 equipment_expanion_icon black--text':
                                        isEven(index),
                                      'grey white--text': isOdd(index),
                                    }"
                                  >
                                    {{ Object.keys(equipmentItem)[0] }}
                                    ({{ equipmentFiles(equipmentItem) }})
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    <v-row>
                                      <v-col cols="12">
                                        <template>
                                          <v-expansion-panels
                                            class="mt-5"
                                            max-height="100px"
                                          >
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="green white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                LIABILITY LETTER ({{
                                                  equipmentItem[
                                                    Object.keys(
                                                      equipmentItem
                                                    )[0]
                                                  ]["liability"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  equipmentItem[
                                                    Object.keys(
                                                      equipmentItem
                                                    )[0]
                                                  ]['liability'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <v-list class="my-list">
                                                      <v-list-item
                                                        v-for="liabilityLetter in equipmentItem[
                                                          Object.keys(
                                                            equipmentItem
                                                          )[0]
                                                        ]['liability']"
                                                        :key="liabilityLetter"
                                                      >
                                                        <v-list-item-icon>
                                                          <v-icon
                                                            v-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'pdf'
                                                            "
                                                            color="red"
                                                            >mdi-file-pdf-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xlsx'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'csv'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xls'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpg'
                                                            "
                                                            color="orange"
                                                            >mdi-file-jpg-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'png'
                                                            "
                                                            color="orange"
                                                            >mdi-file-png-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpeg'
                                                            "
                                                            color="orange"
                                                            >mdi-panorama-variant</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'svg'
                                                            "
                                                            color="orange"
                                                            >mdi-svg</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'docx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'doc'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'dotx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else
                                                            color="gray"
                                                            >mdi-file-document</v-icon
                                                          >
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                          <v-list-item-title>{{
                                                            liabilityLetter.filename
                                                              .split("_")
                                                              .slice(1)
                                                              .join("_")
                                                          }}</v-list-item-title>
                                                          <v-list-item-subtitle
                                                            >created at :
                                                            {{
                                                              liabilityLetter.created_at
                                                            }}</v-list-item-subtitle
                                                          >
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                          <a
                                                            :href="`${basicPathForDownload}/equipments/liability_letter/${liabilityLetter.filename}`"
                                                            download
                                                            target="_blank"
                                                            style="
                                                              text-decoration: none;
                                                            "
                                                          >
                                                            <v-btn
                                                              color="green"
                                                              class="white--text"
                                                              small
                                                            >
                                                              Download
                                                              <v-icon right>
                                                                mdi-download
                                                              </v-icon>
                                                            </v-btn>
                                                          </a>
                                                        </v-list-item-action>
                                                      </v-list-item>
                                                    </v-list>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="light-green white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                INSURANCE DECLARATION ({{
                                                  equipmentItem[
                                                    Object.keys(
                                                      equipmentItem
                                                    )[0]
                                                  ]["insurance"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  equipmentItem[
                                                    Object.keys(
                                                      equipmentItem
                                                    )[0]
                                                  ]['insurance'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <v-list class="my-list">
                                                      <v-list-item
                                                        v-for="insuranceFile in equipmentItem[
                                                          Object.keys(
                                                            equipmentItem
                                                          )[0]
                                                        ]['insurance']"
                                                        :key="insuranceFile"
                                                      >
                                                        <v-list-item-icon>
                                                          <v-icon
                                                            v-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'pdf'
                                                            "
                                                            color="red"
                                                            >mdi-file-pdf-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xlsx'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'csv'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xls'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpg'
                                                            "
                                                            color="orange"
                                                            >mdi-file-jpg-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'png'
                                                            "
                                                            color="orange"
                                                            >mdi-file-png-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpeg'
                                                            "
                                                            color="orange"
                                                            >mdi-panorama-variant</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'svg'
                                                            "
                                                            color="orange"
                                                            >mdi-svg</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'docx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'doc'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'dotx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else
                                                            color="gray"
                                                            >mdi-file-document</v-icon
                                                          >
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                          <v-list-item-title>{{
                                                            insuranceFile.filename
                                                              .split("_")
                                                              .slice(1)
                                                              .join("_")
                                                          }}</v-list-item-title>
                                                          <v-list-item-subtitle
                                                            >created at :
                                                            {{
                                                              insuranceFile.created_at
                                                            }}</v-list-item-subtitle
                                                          >
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                          <a
                                                            :href="`${basicPathForDownload}/equipments/insurance_declaration/${insuranceFile.filename}`"
                                                            download
                                                            target="_blank"
                                                            style="
                                                              text-decoration: none;
                                                            "
                                                          >
                                                            <v-btn
                                                              color="green"
                                                              class="white--text"
                                                              small
                                                            >
                                                              Download
                                                              <v-icon right>
                                                                mdi-download
                                                              </v-icon>
                                                            </v-btn>
                                                          </a>
                                                        </v-list-item-action>
                                                      </v-list-item>
                                                    </v-list>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="teal white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                ESTIMATIONS ({{
                                                  equipmentItem[
                                                    Object.keys(
                                                      equipmentItem
                                                    )[0]
                                                  ]["estimation"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  equipmentItem[
                                                    Object.keys(
                                                      equipmentItem
                                                    )[0]
                                                  ]['estimation'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <template>
                                                      <v-expansion-panels
                                                        :max-height="500"
                                                        class="mt-5"
                                                      >
                                                        <v-expansion-panel
                                                          v-for="(
                                                            estimation, index
                                                          ) in equipmentItem[
                                                            Object.keys(
                                                              equipmentItem
                                                            )[0]
                                                          ]['estimation']"
                                                          :key="index"
                                                        >
                                                          <v-expansion-panel-header
                                                            class="font-weight-bold"
                                                            :class="{
                                                              'blue-grey  white--text':
                                                                isEven(index),
                                                              'panelCutomizedColor white--text':
                                                                isOdd(index),
                                                            }"
                                                          >
                                                            {{
                                                              Object.keys(
                                                                estimation
                                                              )[0]
                                                            }}
                                                            ({{
                                                              estimation[
                                                                Object.keys(
                                                                  estimation
                                                                )[0]
                                                              ].length
                                                            }})
                                                          </v-expansion-panel-header>
                                                          <v-expansion-panel-content
                                                            v-if="
                                                              estimation[
                                                                Object.keys(
                                                                  estimation
                                                                )[0]
                                                              ].length > 0
                                                            "
                                                          >
                                                            <v-row>
                                                              <v-col cols="12">
                                                                <v-list
                                                                  class="my-list"
                                                                >
                                                                  <v-list-item
                                                                    v-for="estimationFile in estimation[
                                                                      Object.keys(
                                                                        estimation
                                                                      )[0]
                                                                    ]"
                                                                    :key="
                                                                      estimationFile
                                                                    "
                                                                  >
                                                                    <v-list-item-icon>
                                                                      <v-icon
                                                                        v-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'pdf'
                                                                        "
                                                                        color="red"
                                                                        >mdi-file-pdf-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'xlsx'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'csv'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'xls'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'jpg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-file-jpg-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'png'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-file-png-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'jpeg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-panorama-variant</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'svg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-svg</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'docx'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'doc'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'dotx'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else
                                                                        color="gray"
                                                                        >mdi-file-document</v-icon
                                                                      >
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                      <v-list-item-title
                                                                        >{{
                                                                          estimationFile.filename
                                                                            .split(
                                                                              "_"
                                                                            )
                                                                            .slice(
                                                                              1
                                                                            )
                                                                            .join(
                                                                              "_"
                                                                            )
                                                                        }}</v-list-item-title
                                                                      >
                                                                      <v-list-item-subtitle
                                                                        >created
                                                                        at :
                                                                        {{
                                                                          estimationFile.created_at
                                                                        }}</v-list-item-subtitle
                                                                      >
                                                                    </v-list-item-content>
                                                                    <v-list-item-action>
                                                                      <a
                                                                        :href="`${basicPathForDownload}/fileEstimates/${estimationFile.filename}`"
                                                                        download
                                                                        target="_blank"
                                                                        style="
                                                                          text-decoration: none;
                                                                        "
                                                                      >
                                                                        <v-btn
                                                                          color="green"
                                                                          class="white--text"
                                                                          small
                                                                        >
                                                                          Download
                                                                          <v-icon
                                                                            right
                                                                          >
                                                                            mdi-download
                                                                          </v-icon>
                                                                        </v-btn>
                                                                      </a>
                                                                    </v-list-item-action>
                                                                  </v-list-item>
                                                                </v-list>
                                                              </v-col>
                                                            </v-row>
                                                          </v-expansion-panel-content>
                                                          <v-expansion-panel-content
                                                            v-else
                                                          >
                                                            <v-row>
                                                              <v-col
                                                                cols="4 ml-auto mr-auto"
                                                              >
                                                                <v-chip
                                                                  style="
                                                                    background-color: #9e9e9e;
                                                                    border-color: rgb(
                                                                      118,
                                                                      186,
                                                                      153
                                                                    );
                                                                    height: 30px;
                                                                    width: 100%;
                                                                    padding-left: 29%;
                                                                    font-size: medium;
                                                                    font-weight: 300;
                                                                    font-style: italic;
                                                                    margin-top: 11px;
                                                                    color: white;
                                                                  "
                                                                >
                                                                  Nothing to
                                                                  show yet...
                                                                </v-chip>
                                                              </v-col>
                                                            </v-row>
                                                          </v-expansion-panel-content>
                                                        </v-expansion-panel>
                                                        <!-- More panels go here... -->
                                                      </v-expansion-panels>
                                                    </template>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                          </v-expansion-panels>
                                        </template>
                                      </v-col>
                                    </v-row>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                            </template>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                      <v-expansion-panel-content v-else>
                        <v-row>
                          <v-col cols="4 ml-auto mr-auto">
                            <v-chip
                              style="
                                background-color: rgb(158, 158, 158);
                                height: 30px;
                                width: 285px;
                                /* padding-left: 29%; */
                                font-size: medium;
                                font-weight: 300;
                                font-style: italic;
                                margin-top: 11px;
                                color: white;
                                justify-content: center;
                              "
                            >
                              Nothing to show yet...
                            </v-chip>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        class="white--text font-weight-bold"
                        toggle-icon-color="white"
                        style="background-color: rgb(64 86 255 / 74%)"
                      >
                        AUTOMOBILES ({{
                          automobilesFiles(getCLAIMS_FILES[2]["automobiles"])
                        }})
                      </v-expansion-panel-header>
                      <v-expansion-panel-content
                        v-if="getCLAIMS_FILES[2]['automobiles'].length > 0"
                      >
                        <v-row>
                          <v-col cols="12">
                            <template>
                              <v-expansion-panels class="mt-5">
                                <v-expansion-panel
                                  v-for="(
                                    automobileItem, index
                                  ) in getCLAIMS_FILES[2]['automobiles']"
                                  :key="index"
                                >
                                  <v-expansion-panel-header
                                    class="font-weight-bold"
                                    :class="{
                                      'panelCustomizedColor2 equipment_expanion_icon black--text':
                                        isEven(index),
                                      'grey white--text': isOdd(index),
                                    }"
                                  >
                                    {{ Object.keys(automobileItem)[0] }}
                                    ({{ automobileFiles(automobileItem) }})
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    <v-row>
                                      <v-col cols="12">
                                        <template>
                                          <v-expansion-panels
                                            class="mt-5"
                                            max-height="100px"
                                          >
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="green white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                LIABILITY LETTER ({{
                                                  automobileItem[
                                                    Object.keys(
                                                      automobileItem
                                                    )[0]
                                                  ]["liability"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  automobileItem[
                                                    Object.keys(
                                                      automobileItem
                                                    )[0]
                                                  ]['liability'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <v-list class="my-list">
                                                      <v-list-item
                                                        v-for="liabilityLetter in automobileItem[
                                                          Object.keys(
                                                            automobileItem
                                                          )[0]
                                                        ]['liability']"
                                                        :key="liabilityLetter"
                                                      >
                                                        <v-list-item-icon>
                                                          <v-icon
                                                            v-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'pdf'
                                                            "
                                                            color="red"
                                                            >mdi-file-pdf-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xlsx'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'csv'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xls'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpg'
                                                            "
                                                            color="orange"
                                                            >mdi-file-jpg-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'png'
                                                            "
                                                            color="orange"
                                                            >mdi-file-png-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpeg'
                                                            "
                                                            color="orange"
                                                            >mdi-panorama-variant</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'svg'
                                                            "
                                                            color="orange"
                                                            >mdi-svg</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'docx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'doc'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'dotx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else
                                                            color="gray"
                                                            >mdi-file-document</v-icon
                                                          >
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                          <v-list-item-title>{{
                                                            liabilityLetter.filename
                                                              .split("_")
                                                              .slice(1)
                                                              .join("_")
                                                          }}</v-list-item-title>
                                                          <v-list-item-subtitle
                                                            >created at :
                                                            {{
                                                              liabilityLetter.created_at
                                                            }}</v-list-item-subtitle
                                                          >
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                          <a
                                                            :href="`${basicPathForDownload}/automobiles/liability_letter/${liabilityLetter.filename}`"
                                                            download
                                                            target="_blank"
                                                            style="
                                                              text-decoration: none;
                                                            "
                                                          >
                                                            <v-btn
                                                              color="green"
                                                              class="white--text"
                                                              small
                                                            >
                                                              Download
                                                              <v-icon right>
                                                                mdi-download
                                                              </v-icon>
                                                            </v-btn>
                                                          </a>
                                                        </v-list-item-action>
                                                      </v-list-item>
                                                    </v-list>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="light-green white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                INSURANCE DECLARATION ({{
                                                  automobileItem[
                                                    Object.keys(
                                                      automobileItem
                                                    )[0]
                                                  ]["insurance"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  automobileItem[
                                                    Object.keys(
                                                      automobileItem
                                                    )[0]
                                                  ]['insurance'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <v-list class="my-list">
                                                      <v-list-item
                                                        v-for="insuranceFile in automobileItem[
                                                          Object.keys(
                                                            automobileItem
                                                          )[0]
                                                        ]['insurance']"
                                                        :key="insuranceFile"
                                                      >
                                                        <v-list-item-icon>
                                                          <v-icon
                                                            v-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'pdf'
                                                            "
                                                            color="red"
                                                            >mdi-file-pdf-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xlsx'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'csv'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xls'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpg'
                                                            "
                                                            color="orange"
                                                            >mdi-file-jpg-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'png'
                                                            "
                                                            color="orange"
                                                            >mdi-file-png-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpeg'
                                                            "
                                                            color="orange"
                                                            >mdi-panorama-variant</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'svg'
                                                            "
                                                            color="orange"
                                                            >mdi-svg</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'docx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'doc'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'dotx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else
                                                            color="gray"
                                                            >mdi-file-document</v-icon
                                                          >
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                          <v-list-item-title>{{
                                                            insuranceFile.filename
                                                              .split("_")
                                                              .slice(1)
                                                              .join("_")
                                                          }}</v-list-item-title>
                                                          <v-list-item-subtitle
                                                            >created at :
                                                            {{
                                                              insuranceFile.created_at
                                                            }}</v-list-item-subtitle
                                                          >
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                          <a
                                                            :href="`${basicPathForDownload}/automobiles/insurance_declaration/${insuranceFile.filename}`"
                                                            download
                                                            target="_blank"
                                                            style="
                                                              text-decoration: none;
                                                            "
                                                          >
                                                            <v-btn
                                                              color="green"
                                                              class="white--text"
                                                              small
                                                            >
                                                              Download
                                                              <v-icon right>
                                                                mdi-download
                                                              </v-icon>
                                                            </v-btn>
                                                          </a>
                                                        </v-list-item-action>
                                                      </v-list-item>
                                                    </v-list>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="teal white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                ESTIMATIONS ({{
                                                  automobileItem[
                                                    Object.keys(
                                                      automobileItem
                                                    )[0]
                                                  ]["estimation"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  automobileItem[
                                                    Object.keys(
                                                      automobileItem
                                                    )[0]
                                                  ]['estimation'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <template>
                                                      <v-expansion-panels
                                                        :max-height="500"
                                                        class="mt-5"
                                                      >
                                                        <v-expansion-panel
                                                          v-for="(
                                                            estimation, index
                                                          ) in automobileItem[
                                                            Object.keys(
                                                              automobileItem
                                                            )[0]
                                                          ]['estimation']"
                                                          :key="index"
                                                        >
                                                          <v-expansion-panel-header
                                                            class="font-weight-bold"
                                                            :class="{
                                                              'blue-grey  white--text':
                                                                isEven(index),
                                                              'panelCutomizedColor white--text':
                                                                isOdd(index),
                                                            }"
                                                          >
                                                            {{
                                                              Object.keys(
                                                                estimation
                                                              )[0]
                                                            }}
                                                            ({{
                                                              estimation[
                                                                Object.keys(
                                                                  estimation
                                                                )[0]
                                                              ].length
                                                            }})
                                                          </v-expansion-panel-header>
                                                          <v-expansion-panel-content
                                                            v-if="
                                                              estimation[
                                                                Object.keys(
                                                                  estimation
                                                                )[0]
                                                              ].length > 0
                                                            "
                                                          >
                                                            <v-row>
                                                              <v-col cols="12">
                                                                <v-list
                                                                  class="my-list"
                                                                >
                                                                  <v-list-item
                                                                    v-for="estimationFile in estimation[
                                                                      Object.keys(
                                                                        estimation
                                                                      )[0]
                                                                    ]"
                                                                    :key="
                                                                      estimationFile
                                                                    "
                                                                  >
                                                                    <v-list-item-icon>
                                                                      <v-icon
                                                                        v-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'pdf'
                                                                        "
                                                                        color="red"
                                                                        >mdi-file-pdf-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'xlsx'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'csv'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'xls'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'jpg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-file-jpg-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'png'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-file-png-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'jpeg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-panorama-variant</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'svg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-svg</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'docx'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'doc'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'dotx'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else
                                                                        color="gray"
                                                                        >mdi-file-document</v-icon
                                                                      >
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                      <v-list-item-title
                                                                        >{{
                                                                          estimationFile.filename
                                                                            .split(
                                                                              "_"
                                                                            )
                                                                            .slice(
                                                                              1
                                                                            )
                                                                            .join(
                                                                              "_"
                                                                            )
                                                                        }}</v-list-item-title
                                                                      >
                                                                      <v-list-item-subtitle
                                                                        >created
                                                                        at :
                                                                        {{
                                                                          estimationFile.created_at
                                                                        }}</v-list-item-subtitle
                                                                      >
                                                                    </v-list-item-content>
                                                                    <v-list-item-action>
                                                                      <a
                                                                        :href="`${basicPathForDownload}/fileEstimates/${estimationFile.filename}`"
                                                                        download
                                                                        target="_blank"
                                                                        style="
                                                                          text-decoration: none;
                                                                        "
                                                                      >
                                                                        <v-btn
                                                                          color="green"
                                                                          class="white--text"
                                                                          small
                                                                        >
                                                                          Download
                                                                          <v-icon
                                                                            right
                                                                          >
                                                                            mdi-download
                                                                          </v-icon>
                                                                        </v-btn>
                                                                      </a>
                                                                    </v-list-item-action>
                                                                  </v-list-item>
                                                                </v-list>
                                                              </v-col>
                                                            </v-row>
                                                          </v-expansion-panel-content>
                                                          <v-expansion-panel-content
                                                            v-else
                                                          >
                                                            <v-row>
                                                              <v-col
                                                                cols="4 ml-auto mr-auto"
                                                              >
                                                                <v-chip
                                                                  style="
                                                                    background-color: #9e9e9e;
                                                                    border-color: rgb(
                                                                      118,
                                                                      186,
                                                                      153
                                                                    );
                                                                    height: 30px;
                                                                    width: 100%;
                                                                    padding-left: 29%;
                                                                    font-size: medium;
                                                                    font-weight: 300;
                                                                    font-style: italic;
                                                                    margin-top: 11px;
                                                                    color: white;
                                                                  "
                                                                >
                                                                  Nothing to
                                                                  show yet...
                                                                </v-chip>
                                                              </v-col>
                                                            </v-row>
                                                          </v-expansion-panel-content>
                                                        </v-expansion-panel>
                                                        <!-- More panels go here... -->
                                                      </v-expansion-panels>
                                                    </template>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                          </v-expansion-panels>
                                        </template>
                                      </v-col>
                                    </v-row>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                            </template>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                      <v-expansion-panel-content v-else>
                        <v-row>
                          <v-col cols="4 ml-auto mr-auto">
                            <v-chip
                              style="
                                background-color: rgb(158, 158, 158);
                                height: 30px;
                                width: 285px;
                                /* padding-left: 29%; */
                                font-size: medium;
                                font-weight: 300;
                                font-style: italic;
                                margin-top: 11px;
                                color: white;
                                justify-content: center;
                              "
                            >
                              Nothing to show yet...
                            </v-chip>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        class="white--text font-weight-bold"
                        toggle-icon-color="white"
                        style="background-color: #ffa500"
                      >
                        VESSELS ({{
                          vesselsFiles(getCLAIMS_FILES[3]["vessels"])
                        }})
                      </v-expansion-panel-header>
                      <v-expansion-panel-content
                        v-if="getCLAIMS_FILES[3]['vessels'].length > 0"
                      >
                        <v-row>
                          <v-col cols="12">
                            <template>
                              <v-expansion-panels class="mt-5">
                                <v-expansion-panel
                                  v-for="(
                                    vesselItem, index
                                  ) in getCLAIMS_FILES[3]['vessels']"
                                  :key="index"
                                >
                                  <v-expansion-panel-header
                                    class="font-weight-bold"
                                    :class="{
                                      'panelCustomizedColor2 equipment_expanion_icon black--text':
                                        isEven(index),
                                      'grey white--text': isOdd(index),
                                    }"
                                  >
                                    {{ Object.keys(vesselItem)[0] }}
                                    ({{ vesselFiles(vesselItem) }})
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    <v-row>
                                      <v-col cols="12">
                                        <template>
                                          <v-expansion-panels
                                            class="mt-5"
                                            max-height="100px"
                                          >
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="green white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                LIABILITY LETTER ({{
                                                  vesselItem[
                                                    Object.keys(vesselItem)[0]
                                                  ]["liability"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  vesselItem[
                                                    Object.keys(vesselItem)[0]
                                                  ]['liability'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <v-list class="my-list">
                                                      <v-list-item
                                                        v-for="liabilityLetter in vesselItem[
                                                          Object.keys(
                                                            vesselItem
                                                          )[0]
                                                        ]['liability']"
                                                        :key="liabilityLetter"
                                                      >
                                                        <v-list-item-icon>
                                                          <v-icon
                                                            v-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'pdf'
                                                            "
                                                            color="red"
                                                            >mdi-file-pdf-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xlsx'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'csv'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xls'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpg'
                                                            "
                                                            color="orange"
                                                            >mdi-file-jpg-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'png'
                                                            "
                                                            color="orange"
                                                            >mdi-file-png-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpeg'
                                                            "
                                                            color="orange"
                                                            >mdi-panorama-variant</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'svg'
                                                            "
                                                            color="orange"
                                                            >mdi-svg</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'docx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'doc'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'dotx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else
                                                            color="gray"
                                                            >mdi-file-document</v-icon
                                                          >
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                          <v-list-item-title>{{
                                                            liabilityLetter.filename
                                                              .split("_")
                                                              .slice(1)
                                                              .join("_")
                                                          }}</v-list-item-title>
                                                          <v-list-item-subtitle
                                                            >created at :
                                                            {{
                                                              liabilityLetter.created_at
                                                            }}</v-list-item-subtitle
                                                          >
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                          <a
                                                            :href="`${basicPathForDownload}/vessels/liability_letter/${liabilityLetter.filename}`"
                                                            download
                                                            target="_blank"
                                                            style="
                                                              text-decoration: none;
                                                            "
                                                          >
                                                            <v-btn
                                                              color="green"
                                                              class="white--text"
                                                              small
                                                            >
                                                              Download
                                                              <v-icon right>
                                                                mdi-download
                                                              </v-icon>
                                                            </v-btn>
                                                          </a>
                                                        </v-list-item-action>
                                                      </v-list-item>
                                                    </v-list>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="light-green white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                INSURANCE DECLARATION ({{
                                                  vesselItem[
                                                    Object.keys(vesselItem)[0]
                                                  ]["insurance"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  vesselItem[
                                                    Object.keys(vesselItem)[0]
                                                  ]['insurance'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <v-list class="my-list">
                                                      <v-list-item
                                                        v-for="insuranceFile in vesselItem[
                                                          Object.keys(
                                                            vesselItem
                                                          )[0]
                                                        ]['insurance']"
                                                        :key="insuranceFile"
                                                      >
                                                        <v-list-item-icon>
                                                          <v-icon
                                                            v-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'pdf'
                                                            "
                                                            color="red"
                                                            >mdi-file-pdf-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xlsx'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'csv'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xls'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpg'
                                                            "
                                                            color="orange"
                                                            >mdi-file-jpg-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'png'
                                                            "
                                                            color="orange"
                                                            >mdi-file-png-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpeg'
                                                            "
                                                            color="orange"
                                                            >mdi-panorama-variant</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'svg'
                                                            "
                                                            color="orange"
                                                            >mdi-svg</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'docx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'doc'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'dotx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else
                                                            color="gray"
                                                            >mdi-file-document</v-icon
                                                          >
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                          <v-list-item-title>{{
                                                            insuranceFile.filename
                                                              .split("_")
                                                              .slice(1)
                                                              .join("_")
                                                          }}</v-list-item-title>
                                                          <v-list-item-subtitle
                                                            >created at :
                                                            {{
                                                              insuranceFile.created_at
                                                            }}</v-list-item-subtitle
                                                          >
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                          <a
                                                            :href="`${basicPathForDownload}/vessels/insurance_declaration/${insuranceFile.filename}`"
                                                            download
                                                            target="_blank"
                                                            style="
                                                              text-decoration: none;
                                                            "
                                                          >
                                                            <v-btn
                                                              color="green"
                                                              class="white--text"
                                                              small
                                                            >
                                                              Download
                                                              <v-icon right>
                                                                mdi-download
                                                              </v-icon>
                                                            </v-btn>
                                                          </a>
                                                        </v-list-item-action>
                                                      </v-list-item>
                                                    </v-list>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="teal white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                ESTIMATIONS ({{
                                                  vesselItem[
                                                    Object.keys(vesselItem)[0]
                                                  ]["estimation"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  vesselItem[
                                                    Object.keys(vesselItem)[0]
                                                  ]['estimation'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <template>
                                                      <v-expansion-panels
                                                        :max-height="500"
                                                        class="mt-5"
                                                      >
                                                        <v-expansion-panel
                                                          v-for="(
                                                            estimation, index
                                                          ) in vesselItem[
                                                            Object.keys(
                                                              vesselItem
                                                            )[0]
                                                          ]['estimation']"
                                                          :key="index"
                                                        >
                                                          <v-expansion-panel-header
                                                            class="font-weight-bold"
                                                            :class="{
                                                              'blue-grey  white--text':
                                                                isEven(index),
                                                              'panelCutomizedColor white--text':
                                                                isOdd(index),
                                                            }"
                                                          >
                                                            {{
                                                              Object.keys(
                                                                estimation
                                                              )[0]
                                                            }}
                                                            ({{
                                                              estimation[
                                                                Object.keys(
                                                                  estimation
                                                                )[0]
                                                              ].length
                                                            }})
                                                          </v-expansion-panel-header>
                                                          <v-expansion-panel-content
                                                            v-if="
                                                              estimation[
                                                                Object.keys(
                                                                  estimation
                                                                )[0]
                                                              ].length > 0
                                                            "
                                                          >
                                                            <v-row>
                                                              <v-col cols="12">
                                                                <v-list
                                                                  class="my-list"
                                                                >
                                                                  <v-list-item
                                                                    v-for="estimationFile in estimation[
                                                                      Object.keys(
                                                                        estimation
                                                                      )[0]
                                                                    ]"
                                                                    :key="
                                                                      estimationFile
                                                                    "
                                                                  >
                                                                    <v-list-item-icon>
                                                                      <v-icon
                                                                        v-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'pdf'
                                                                        "
                                                                        color="red"
                                                                        >mdi-file-pdf-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'xlsx'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'csv'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'xls'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'jpg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-file-jpg-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'png'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-file-png-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'jpeg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-panorama-variant</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'svg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-svg</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'docx'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'doc'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'dotx'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else
                                                                        color="gray"
                                                                        >mdi-file-document</v-icon
                                                                      >
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                      <v-list-item-title
                                                                        >{{
                                                                          estimationFile.filename
                                                                            .split(
                                                                              "_"
                                                                            )
                                                                            .slice(
                                                                              1
                                                                            )
                                                                            .join(
                                                                              "_"
                                                                            )
                                                                        }}</v-list-item-title
                                                                      >
                                                                      <v-list-item-subtitle
                                                                        >created
                                                                        at :
                                                                        {{
                                                                          estimationFile.created_at
                                                                        }}</v-list-item-subtitle
                                                                      >
                                                                    </v-list-item-content>
                                                                    <v-list-item-action>
                                                                      <a
                                                                        :href="`${basicPathForDownload}/fileEstimates/${estimationFile.filename}`"
                                                                        download
                                                                        target="_blank"
                                                                        style="
                                                                          text-decoration: none;
                                                                        "
                                                                      >
                                                                        <v-btn
                                                                          color="green"
                                                                          class="white--text"
                                                                          small
                                                                        >
                                                                          Download
                                                                          <v-icon
                                                                            right
                                                                          >
                                                                            mdi-download
                                                                          </v-icon>
                                                                        </v-btn>
                                                                      </a>
                                                                    </v-list-item-action>
                                                                  </v-list-item>
                                                                </v-list>
                                                              </v-col>
                                                            </v-row>
                                                          </v-expansion-panel-content>
                                                          <v-expansion-panel-content
                                                            v-else
                                                          >
                                                            <v-row>
                                                              <v-col
                                                                cols="4 ml-auto mr-auto"
                                                              >
                                                                <v-chip
                                                                  style="
                                                                    background-color: #9e9e9e;
                                                                    border-color: rgb(
                                                                      118,
                                                                      186,
                                                                      153
                                                                    );
                                                                    height: 30px;
                                                                    width: 100%;
                                                                    padding-left: 29%;
                                                                    font-size: medium;
                                                                    font-weight: 300;
                                                                    font-style: italic;
                                                                    margin-top: 11px;
                                                                    color: white;
                                                                  "
                                                                >
                                                                  Nothing to
                                                                  show yet...
                                                                </v-chip>
                                                              </v-col>
                                                            </v-row>
                                                          </v-expansion-panel-content>
                                                        </v-expansion-panel>
                                                        <!-- More panels go here... -->
                                                      </v-expansion-panels>
                                                    </template>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                          </v-expansion-panels>
                                        </template>
                                      </v-col>
                                    </v-row>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                            </template>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                      <v-expansion-panel-content v-else>
                        <v-row>
                          <v-col cols="4 ml-auto mr-auto">
                            <v-chip
                              style="
                                background-color: rgb(158, 158, 158);
                                height: 30px;
                                width: 285px;
                                /* padding-left: 29%; */
                                font-size: medium;
                                font-weight: 300;
                                font-style: italic;
                                margin-top: 11px;
                                color: white;
                                justify-content: center;
                              "
                            >
                              Nothing to show yet...
                            </v-chip>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        class="white--text font-weight-bold"
                        toggle-icon-color="white"
                        style="background-color: #4caf50"
                      >
                        CONTAINERS ({{
                          containersFiles(getCLAIMS_FILES[4]["containers"])
                        }})
                      </v-expansion-panel-header>
                      <v-expansion-panel-content
                        v-if="getCLAIMS_FILES[4]['containers'].length > 0"
                      >
                        <v-row>
                          <v-col cols="12">
                            <template>
                              <v-expansion-panels class="mt-5">
                                <v-expansion-panel
                                  v-for="(
                                    containerItem, index
                                  ) in getCLAIMS_FILES[4]['containers']"
                                  :key="index"
                                >
                                  <v-expansion-panel-header
                                    class="font-weight-bold"
                                    :class="{
                                      'panelCustomizedColor2 equipment_expanion_icon black--text':
                                        isEven(index),
                                      'grey white--text': isOdd(index),
                                    }"
                                  >
                                    {{ Object.keys(containerItem)[0] }}
                                    ({{ containerFiles(containerItem) }})
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    <v-row>
                                      <v-col cols="12">
                                        <template>
                                          <v-expansion-panels
                                            class="mt-5"
                                            max-height="100px"
                                          >
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="green white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                LIABILITY LETTER ({{
                                                  containerItem[
                                                    Object.keys(
                                                      containerItem
                                                    )[0]
                                                  ]["liability"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  containerItem[
                                                    Object.keys(
                                                      containerItem
                                                    )[0]
                                                  ]['liability'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <v-list class="my-list">
                                                      <v-list-item
                                                        v-for="liabilityLetter in containerItem[
                                                          Object.keys(
                                                            containerItem
                                                          )[0]
                                                        ]['liability']"
                                                        :key="liabilityLetter"
                                                      >
                                                        <v-list-item-icon>
                                                          <v-icon
                                                            v-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'pdf'
                                                            "
                                                            color="red"
                                                            >mdi-file-pdf-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xlsx'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'csv'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xls'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpg'
                                                            "
                                                            color="orange"
                                                            >mdi-file-jpg-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'png'
                                                            "
                                                            color="orange"
                                                            >mdi-file-png-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpeg'
                                                            "
                                                            color="orange"
                                                            >mdi-panorama-variant</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'svg'
                                                            "
                                                            color="orange"
                                                            >mdi-svg</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'docx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'doc'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              liabilityLetter.filename.split(
                                                                '.'
                                                              )[
                                                                liabilityLetter.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'dotx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else
                                                            color="gray"
                                                            >mdi-file-document</v-icon
                                                          >
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                          <v-list-item-title>{{
                                                            liabilityLetter.filename
                                                              .split("_")
                                                              .slice(1)
                                                              .join("_")
                                                          }}</v-list-item-title>
                                                          <v-list-item-subtitle
                                                            >created at :
                                                            {{
                                                              liabilityLetter.created_at
                                                            }}</v-list-item-subtitle
                                                          >
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                          <a
                                                            :href="`${basicPathForDownload}/containers/liability_letter/${liabilityLetter.filename}`"
                                                            download
                                                            target="_blank"
                                                            style="
                                                              text-decoration: none;
                                                            "
                                                          >
                                                            <v-btn
                                                              color="green"
                                                              class="white--text"
                                                              small
                                                            >
                                                              Download
                                                              <v-icon right>
                                                                mdi-download
                                                              </v-icon>
                                                            </v-btn>
                                                          </a>
                                                        </v-list-item-action>
                                                      </v-list-item>
                                                    </v-list>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="light-green white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                INSURANCE DECLARATION ({{
                                                  containerItem[
                                                    Object.keys(
                                                      containerItem
                                                    )[0]
                                                  ]["insurance"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  containerItem[
                                                    Object.keys(
                                                      containerItem
                                                    )[0]
                                                  ]['insurance'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <v-list class="my-list">
                                                      <v-list-item
                                                        v-for="insuranceFile in containerItem[
                                                          Object.keys(
                                                            containerItem
                                                          )[0]
                                                        ]['insurance']"
                                                        :key="insuranceFile"
                                                      >
                                                        <v-list-item-icon>
                                                          <v-icon
                                                            v-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'pdf'
                                                            "
                                                            color="red"
                                                            >mdi-file-pdf-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xlsx'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'csv'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'xls'
                                                            "
                                                            color="green"
                                                            >mdi-file-excel-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpg'
                                                            "
                                                            color="orange"
                                                            >mdi-file-jpg-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'png'
                                                            "
                                                            color="orange"
                                                            >mdi-file-png-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'jpeg'
                                                            "
                                                            color="orange"
                                                            >mdi-panorama-variant</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'svg'
                                                            "
                                                            color="orange"
                                                            >mdi-svg</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'docx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'doc'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else-if="
                                                              insuranceFile.filename.split(
                                                                '.'
                                                              )[
                                                                insuranceFile.filename.split(
                                                                  '.'
                                                                ).length - 1
                                                              ] == 'dotx'
                                                            "
                                                            color="blue"
                                                            >mdi-file-word-box</v-icon
                                                          >
                                                          <v-icon
                                                            v-else
                                                            color="gray"
                                                            >mdi-file-document</v-icon
                                                          >
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                          <v-list-item-title>{{
                                                            insuranceFile.filename
                                                              .split("_")
                                                              .slice(1)
                                                              .join("_")
                                                          }}</v-list-item-title>
                                                          <v-list-item-subtitle
                                                            >created at :
                                                            {{
                                                              insuranceFile.created_at
                                                            }}</v-list-item-subtitle
                                                          >
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                          <a
                                                            :href="`${basicPathForDownload}/containers/insurance_declaration/${insuranceFile.filename}`"
                                                            download
                                                            target="_blank"
                                                            style="
                                                              text-decoration: none;
                                                            "
                                                          >
                                                            <v-btn
                                                              color="green"
                                                              class="white--text"
                                                              small
                                                            >
                                                              Download
                                                              <v-icon right>
                                                                mdi-download
                                                              </v-icon>
                                                            </v-btn>
                                                          </a>
                                                        </v-list-item-action>
                                                      </v-list-item>
                                                    </v-list>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                              <v-expansion-panel-header
                                                class="teal white--text font-weight-bold"
                                                toggle-icon-color="black"
                                              >
                                                ESTIMATIONS ({{
                                                  containerItem[
                                                    Object.keys(
                                                      containerItem
                                                    )[0]
                                                  ]["estimation"].length
                                                }})
                                              </v-expansion-panel-header>
                                              <v-expansion-panel-content
                                                v-if="
                                                  containerItem[
                                                    Object.keys(
                                                      containerItem
                                                    )[0]
                                                  ]['estimation'].length > 0
                                                "
                                              >
                                                <v-row>
                                                  <v-col cols="12">
                                                    <template>
                                                      <v-expansion-panels
                                                        :max-height="500"
                                                        class="mt-5"
                                                      >
                                                        <v-expansion-panel
                                                          v-for="(
                                                            estimation, index
                                                          ) in containerItem[
                                                            Object.keys(
                                                              containerItem
                                                            )[0]
                                                          ]['estimation']"
                                                          :key="index"
                                                        >
                                                          <v-expansion-panel-header
                                                            class="font-weight-bold"
                                                            :class="{
                                                              'blue-grey  white--text':
                                                                isEven(index),
                                                              'panelCutomizedColor white--text':
                                                                isOdd(index),
                                                            }"
                                                          >
                                                            {{
                                                              Object.keys(
                                                                estimation
                                                              )[0]
                                                            }}
                                                            ({{
                                                              estimation[
                                                                Object.keys(
                                                                  estimation
                                                                )[0]
                                                              ].length
                                                            }})
                                                          </v-expansion-panel-header>
                                                          <v-expansion-panel-content
                                                            v-if="
                                                              estimation[
                                                                Object.keys(
                                                                  estimation
                                                                )[0]
                                                              ].length > 0
                                                            "
                                                          >
                                                            <v-row>
                                                              <v-col cols="12">
                                                                <v-list
                                                                  class="my-list"
                                                                >
                                                                  <v-list-item
                                                                    v-for="estimationFile in estimation[
                                                                      Object.keys(
                                                                        estimation
                                                                      )[0]
                                                                    ]"
                                                                    :key="
                                                                      estimationFile
                                                                    "
                                                                  >
                                                                    <v-list-item-icon>
                                                                      <v-icon
                                                                        v-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'pdf'
                                                                        "
                                                                        color="red"
                                                                        >mdi-file-pdf-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'xlsx'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'csv'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'xls'
                                                                        "
                                                                        color="green"
                                                                        >mdi-file-excel-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'jpg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-file-jpg-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'png'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-file-png-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'jpeg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-panorama-variant</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'svg'
                                                                        "
                                                                        color="orange"
                                                                        >mdi-svg</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'docx'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'doc'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else-if="
                                                                          estimationFile.filename.split(
                                                                            '.'
                                                                          )[
                                                                            estimationFile.filename.split(
                                                                              '.'
                                                                            )
                                                                              .length -
                                                                              1
                                                                          ] ==
                                                                          'dotx'
                                                                        "
                                                                        color="blue"
                                                                        >mdi-file-word-box</v-icon
                                                                      >
                                                                      <v-icon
                                                                        v-else
                                                                        color="gray"
                                                                        >mdi-file-document</v-icon
                                                                      >
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                      <v-list-item-title
                                                                        >{{
                                                                          estimationFile.filename
                                                                            .split(
                                                                              "_"
                                                                            )
                                                                            .slice(
                                                                              1
                                                                            )
                                                                            .join(
                                                                              "_"
                                                                            )
                                                                        }}</v-list-item-title
                                                                      >
                                                                      <v-list-item-subtitle
                                                                        >created
                                                                        at :
                                                                        {{
                                                                          estimationFile.created_at
                                                                        }}</v-list-item-subtitle
                                                                      >
                                                                    </v-list-item-content>
                                                                    <v-list-item-action>
                                                                      <a
                                                                        :href="`${basicPathForDownload}/fileEstimates/${estimationFile.filename}`"
                                                                        download
                                                                        target="_blank"
                                                                        style="
                                                                          text-decoration: none;
                                                                        "
                                                                      >
                                                                        <v-btn
                                                                          color="green"
                                                                          class="white--text"
                                                                          small
                                                                        >
                                                                          Download
                                                                          <v-icon
                                                                            right
                                                                          >
                                                                            mdi-download
                                                                          </v-icon>
                                                                        </v-btn>
                                                                      </a>
                                                                    </v-list-item-action>
                                                                  </v-list-item>
                                                                </v-list>
                                                              </v-col>
                                                            </v-row>
                                                          </v-expansion-panel-content>
                                                          <v-expansion-panel-content
                                                            v-else
                                                          >
                                                            <v-row>
                                                              <v-col
                                                                cols="4 ml-auto mr-auto"
                                                              >
                                                                <v-chip
                                                                  style="
                                                                    background-color: #9e9e9e;
                                                                    border-color: rgb(
                                                                      118,
                                                                      186,
                                                                      153
                                                                    );
                                                                    height: 30px;
                                                                    width: 100%;
                                                                    padding-left: 29%;
                                                                    font-size: medium;
                                                                    font-weight: 300;
                                                                    font-style: italic;
                                                                    margin-top: 11px;
                                                                    color: white;
                                                                  "
                                                                >
                                                                  Nothing to
                                                                  show yet...
                                                                </v-chip>
                                                              </v-col>
                                                            </v-row>
                                                          </v-expansion-panel-content>
                                                        </v-expansion-panel>
                                                        <!-- More panels go here... -->
                                                      </v-expansion-panels>
                                                    </template>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                              <v-expansion-panel-content v-else>
                                                <v-row>
                                                  <v-col
                                                    cols="4 ml-auto mr-auto"
                                                  >
                                                    <v-chip
                                                      style="
                                                        background-color: #9e9e9e;
                                                        height: 30px;
                                                        width: 285px;
                                                        /* padding-left: 29%; */
                                                        font-size: medium;
                                                        font-weight: 300;
                                                        font-style: italic;
                                                        margin-top: 11px;
                                                        color: white;
                                                        justify-content: center;
                                                      "
                                                    >
                                                      Nothing to show yet...
                                                    </v-chip>
                                                  </v-col>
                                                </v-row>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>
                                          </v-expansion-panels>
                                        </template>
                                      </v-col>
                                    </v-row>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                            </template>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                      <v-expansion-panel-content v-else>
                        <v-row>
                          <v-col cols="4 ml-auto mr-auto">
                            <v-chip
                              style="
                                background-color: rgb(158, 158, 158);
                                height: 30px;
                                width: 285px;
                                /* padding-left: 29%; */
                                font-size: medium;
                                font-weight: 300;
                                font-style: italic;
                                margin-top: 11px;
                                color: white;
                                justify-content: center;
                              "
                            >
                              Nothing to show yet...
                            </v-chip>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </template>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color=" darken-1" @click="showDownload = false"
                  >CLOSE</v-btn
                >
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
        <v-btn
          color="primary"
          @click="isClaim == true ? showAllClaims() : initialize()"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
var XLSX = require("xlsx-color");
import { saveAs } from "file-saver";
export default {
  components: {},
  data: () => ({
    basicPathForDownload: "http://127.0.0.1:8000/storage/cdn/",
    afterFiltedArray: [],
    monthMenu: false,
    txtMonth: "",
    month: "",
    dialog: false,
    dialogDelete: false,
    closedDialog: false,
    treatedDialog: false,
    search: "",
    loading: false,
    showDownload: false,
    download_id: "",
    download_claimSerial: "",
    headers: [
      {
        text: "Claim Serial",
        align: "start",
        value: "claimSerial",
        sortable: true,
      },
      {
        text: "Major Element",
        align: "start",
        value: "category",
        sortable: true,
      },
      {
        text: "All Elements",
        align: "start",
        value: "getEquipmentIds",
        sortable: true,
      },
      { text: "Status", align: "start", value: "status", sortable: true },
      { text: "ClaimOrIncident", value: "ClaimOrIncident", sortable: true },
      { text: "Incident date", value: "incident_date", sortable: true },
      { text: "Declared", value: "getDeclare", sortable: true },
      { text: "Total Amount", value: "totalEstimation", sortable: true },
      { text: "Reinvoiced", value: "getReinvoiced", sortable: true },
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
    ...mapGetters([
      "getEquipmentclaims",
      "getclaims",
      "getCLAIMS_TO_DOWNLOAD",
      "getCLAIMS_FILES",
    ]),
  },
  watch: {
    monthMenu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    month(val) {
      this.monthMenu = false;
    },
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
      console.log("initiala");
      this.claims = [];
      this.loading = true;
      if (this.txtMonth != "" && this.txtMonth != null) {
        this.setindexIncidentsByMonthAction(this.month).then(() => {
          this.claims = [...this.getclaims];
          for (let index = 0; index < this.claims.length; index++) {
            this.claims[index].claimSerial = this.getClaimSerialNumber(
              this.claims[index]
            );
          }
          this.loading = false;
        });
      } else {
        this.setindexIncidentsAction().then(() => {
          this.claims = [...this.getclaims];
          for (let index = 0; index < this.claims.length; index++) {
            this.claims[index].claimSerial = this.getClaimSerialNumber(
              this.claims[index]
            );
          }
          this.loading = false;
        });
      }
      this.colorShowClaim = "black";
      this.isClaim = false;
    },
    showAllClaims() {
      console.log("showAllClaims");
      this.claims = [];
      this.colorShowClaim = "orange darken-2";
      this.isClaim = true;
      this.loading = true;
      if (this.txtMonth != "" && this.txtMonth != null) {
        this.setindexClaimsByMonthAction(this.month).then(() => {
          this.claims = [...this.getclaims];
          for (let index = 0; index < this.claims.length; index++) {
            this.claims[index].claimSerial = this.getClaimSerialNumber(
              this.claims[index]
            );
          }
          this.loading = false;
        });
      } else {
        this.setindexClaimsAction().then(() => {
          this.claims = [...this.getclaims];
          for (let index = 0; index < this.claims.length; index++) {
            this.claims[index].claimSerial = this.getClaimSerialNumber(
              this.claims[index]
            );
          }
          this.loading = false;
        });
      }
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
      "setindexIncidentsByMonthAction",
      "setindexClaimsByMonthAction",
      "setindexClaimsByIdsAction",
      "setClaimsFilesAction",
    ]),
    editItem(item) {
      // this.setModuleShowToTrueAction();
      this.editedIndex = this.claims.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.set_attr_CLAiMAction(item)
        .then(() => {
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
      this.closedDialog = true;
    },
    treatedDialogeF(item) {
      this.treated.id = item.id;

      this.treatedDialog = true;
    },
    closedF() {
      this.closedClaimAction(this.closed).then(() => {
        this.claims = [...this.getclaims];
        for (let index = 0; index < this.claims.length; index++) {
          this.claims[index].claimSerial = this.getClaimSerialNumber(
            this.claims[index]
          );
        }
      });

      this.closedDialog = false;
    },
    treatedF() {
      this.treatedClaimAction(this.treated).then(() => {
        this.claims = [...this.getclaims];
        for (let index = 0; index < this.claims.length; index++) {
          this.claims[index].claimSerial = this.getClaimSerialNumber(
            this.claims[index]
          );
        }
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
      if (item.incident_date)
        return (
          item.id.toString().padStart(4, "0") +
          "/" +
          item.type +
          "/" +
          item.incident_date.split("/")[2]
        );
      else return item.id.toString().padStart(4, "0") + "/" + item.type + "/";
    },
    onInput(dateStr) {
      const month = dateStr.split("-")[1];
      const year = dateStr.split("-")[0];
      this.txtMonth = `${month}, ${year}`;
    },
    reinitialize() {
      this.isClaim == true ? this.showAllClaims() : this.initialize();
    },
    s2ab(s) {
      var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      var view = new Uint8Array(buf); //create uint8array as viewer
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
      return buf;
    },
    downloadOne() {
      this.setModuleShowToTrueAction();
      this.setindexClaimsByIdsAction([this.download_id])
        .then((result) => {
          console.log(this.getCLAIMS_TO_DOWNLOAD);
          var workbook = XLSX.utils.book_new();
          workbook.Props = {
            Title: "SheetJS Tutorial",
            Subject: this.isClaim ? "Claims" : "Incident",
            Author: "Claims Managment",
            CreatedDate: new Date(),
          };
          const headers = [
            "CLAIMS SERIAL",
            "DATE",
            "MONTH",
            "COMPANY",
            "CATEGORY",
            "TYPE & BRAND",
            "EQUIPMENT REGISTRATION",
            "NATURE OF DAMAGE",
            "INSURANCE DECLARATION",
            "AMOUNT ESTIMATE/REPAIR",
            "INVOICED",
            "STATUS",
            "OUTSOURCER",
            "COMMENTS",
          ];
          const headers1 = [
            "CLAIMS SERIAL",
            "DATE",
            "MONTH",
            "COMPANY",
            "CATEGORY",
            "TYPE & BRAND",
            "EQUIPMENT REGISTRATION",
            "NATURE OF DAMAGE",
            "INSURANCE DECLARATION",
            "AMOUNT ESTIMATE/REPAIR",
            "INVOICED",
            "STATUS",
            "OUTSOURCER",
            "COMMENTS",
          ];
          const headers2 = [
            "CLAIMS SERIAL",
            "DATE",
            "MONTH",
            "SHIPPING LINE",
            "VESSEL",
            "NATURE OF DAMAGE",
            "INSURANCE DECLARATION",
            "COSTS OF REPAIR",
            "OTHER CHARGES",
            "PROCESSING",
            "COMMENTS",
          ];
          const headers3 = [
            "CLAIMS SERIAL",
            "DATE",
            "MONTH",
            "SHIPPING LINE",
            "CATEGORY",
            "CONTAINER ID",
            "NATURE OF DAMAGE",
            "COSTS OF REPAIR",
            "OTHER CHARGES",
            "INSURANCE DECLARATION",
            "PROCESSING",
            "COMMENTS",
          ];
          var workSheet = XLSX.utils.json_to_sheet([]);
          var workSheet1 = XLSX.utils.json_to_sheet([]);
          var workSheet2 = XLSX.utils.json_to_sheet([]);
          var workSheet3 = XLSX.utils.json_to_sheet([]);
          workSheet = XLSX.utils.sheet_add_aoa(workSheet, [headers], {
            origin: -1,
          });
          var wscols = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
            { wch: 40 },
            { wch: 35 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
          ];
          var wscols1 = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
            { wch: 35 },
            { wch: 35 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
          ];
          var wscols2 = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
          ];
          var wscols3 = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
          ];
          workSheet["!cols"] = wscols;
          workSheet1["!cols"] = wscols1;
          workSheet2["!cols"] = wscols2;
          workSheet3["!cols"] = wscols3;

          const data = [];
          const data1 = [];
          const data2 = [];
          const data3 = [];
          for (
            let index = 0;
            index < this.getCLAIMS_TO_DOWNLOAD.length;
            index++
          ) {
            const element = this.getCLAIMS_TO_DOWNLOAD[index];
            //---------------------------------------------------
            for (let index2 = 0; index2 < element.equipments.length; index2++) {
              const equipment = element.equipments[index2];
              var row = {
                "CLAIMS SERIAL": this.getClaimSerialNumber(element),
                DATE: element.incident_date,
                MONTH:
                  element.incident_date &&
                  element.incident_date != "" &&
                  element.incident_date != null
                    ? element.incident_date.split("/")[1] +
                      "-" +
                      this.getMonthAndDayBYnum(
                        element.incident_date.split("/")[0]
                      )
                    : "",
                COMPANY: equipment.companie.name,
                CATEGORY: equipment.type_of_equipment.name,
                "TYPE & BRAND":
                  equipment.type_of_equipment.name +
                  " & " +
                  equipment.brand.name,
                "EQUIPMENT REGISTRATION": equipment.matricule.matricule,
                "NATURE OF DAMAGE": equipment.nature_of_damage.name,
                "INSURANCE DECLARTION": equipment.insurance_declaration,
                "AMOUNT ESTIMATE/REPAIR": this.getEstimateAmount(
                  equipment.estimate
                ),
                INVOICED:
                  equipment.reinvoiced == null || equipment.reinvoiced == ""
                    ? "No"
                    : "Yes",
                STATUS: element.status,
                OUTSOURCER:
                  equipment.companie_id == null || equipment.companie_id == ""
                    ? "No"
                    : "Yes",
                COMMENTS: equipment.comment_Insurance,
              };
              data.push(row);
            }
            if (data.length == 0) {
              var row = {
                "CLAIMS SERIAL": "",
                DATE: "",
                MONTH: "",
                COMPANY: "",
                CATEGORY: "",
                "TYPE & BRAND": "",
                "EQUIPMENT REGISTRATION": "",
                "NATURE OF DAMAGE": "",
                "INSURANCE DECLARTION": "",
                "AMOUNT ESTIMATE/REPAIR": "",
                INVOICED: "",
                STATUS: "",
                OUTSOURCER: "",
                COMMENTS: "",
              };
              data.push(row);
            }
            XLSX.utils.sheet_add_json(workSheet, data, {});
            //---------------------------------------------------
            //---------------------------------------------------
            for (
              let index2 = 0;
              index2 < element.automobiles.length;
              index2++
            ) {
              const automobile = element.automobiles[index2];
              var row = {
                "CLAIMS SERIAL": this.getClaimSerialNumber(element),
                DATE: element.incident_date,
                MONTH:
                  element.incident_date &&
                  element.incident_date != "" &&
                  element.incident_date != null
                    ? element.incident_date.split("/")[1] +
                      "-" +
                      this.getMonthAndDayBYnum(
                        element.incident_date.split("/")[0]
                      )
                    : "",
                COMPANY: automobile.companie.name,
                CATEGORY: automobile.type_of_equipment.name,
                "TYPE & BRAND":
                  automobile.type_of_equipment.name +
                  " & " +
                  automobile.brand.name,
                "EQUIPMENT REGISTRATION": automobile.matricule.matricule,
                "NATURE OF DAMAGE": automobile.nature_of_damage.name,
                "INSURANCE DECLARTION": automobile.insurance_declaration,
                "AMOUNT ESTIMATE/REPAIR": this.getEstimateAmount(
                  automobile.estimate
                ),
                INVOICED:
                  automobile.reinvoiced == null || automobile.reinvoiced == ""
                    ? "No"
                    : "Yes",
                STATUS: element.status,
                OUTSOURCER:
                  automobile.companie_id == null || automobile.companie_id == ""
                    ? "No"
                    : "Yes",
                COMMENTS: automobile.comment_Insurance,
              };
              data1.push(row);
            }
            if (data1.length == 0) {
              var row = {
                "CLAIMS SERIAL": "",
                DATE: "",
                MONTH: "",
                COMPANY: "",
                CATEGORY: "",
                "TYPE & BRAND": "",
                "EQUIPMENT REGISTRATION": "",
                "NATURE OF DAMAGE": "",
                "INSURANCE DECLARTION": "",
                "AMOUNT ESTIMATE/REPAIR": "",
                INVOICED: "",
                STATUS: "",
                OUTSOURCER: "",
                COMMENTS: "",
              };
              data1.push(row);
            }
            XLSX.utils.sheet_add_json(workSheet1, data1, {});
            //---------------------------------------------------
            //---------------------------------------------------
            for (let index2 = 0; index2 < element.vessels.length; index2++) {
              const vessel = element.vessels[index2];
              var row = {
                "CLAIMS SERIAL": this.getClaimSerialNumber(element),
                DATE: element.incident_date,
                MONTH:
                  element.incident_date &&
                  element.incident_date != "" &&
                  element.incident_date != null
                    ? element.incident_date.split("/")[1] +
                      "-" +
                      this.getMonthAndDayBYnum(
                        element.incident_date.split("/")[0]
                      )
                    : "",
                "SHIPPING LINE": vessel.shipping_line.name,
                VESSEL: vessel.vessel_number,
                "NATURE OF DAMAGE": vessel.nature_of_damage.name,
                "INSURANCE DECLARTION": vessel.insurance_declaration,
                "COSTS OF REPAIR": this.getEstimateAmountOfCostRepair(
                  vessel.estimate
                ),
                "OTHER CHARGES": this.getEstimateAmountOfOtherCharges(
                  vessel.estimate
                ),
                PROCESSING: element.status,
                COMMENTS: vessel.comment_Insurance,
              };
              data2.push(row);
            }
            if (data2.length == 0) {
              var row = {
                "CLAIMS SERIAL": "",
                DATE: "",
                MONTH: "",
                "SHIPPING LINE": "",
                VESSEL: "",
                "NATURE OF DAMAGE": "",
                "INSURANCE DECLARTION": "",
                "COSTS OF REPAIR": "",
                "OTHER CHARGES": "",
                PROCESSING: "",
                COMMENTS: "",
              };
              data2.push(row);
            }
            XLSX.utils.sheet_add_json(workSheet2, data2, {});
            //---------------------------------------------------
            //---------------------------------------------------
            for (let index2 = 0; index2 < element.containers.length; index2++) {
              const container = element.containers[index2];
              var row = {
                "CLAIMS SERIAL": this.getClaimSerialNumber(element),
                DATE: element.incident_date,
                MONTH:
                  element.incident_date &&
                  element.incident_date != "" &&
                  element.incident_date != null
                    ? element.incident_date.split("/")[1] +
                      "-" +
                      this.getMonthAndDayBYnum(
                        element.incident_date.split("/")[0]
                      )
                    : "",
                "SHIPPING LINE": container.shipping_line.name,
                CATEGORY: container.categorie_of_container,
                "CONTAINER ID": container.containerID,
                "NATURE OF DAMAGE": container.nature_of_damage.name,

                "COSTS OF REPAIR": this.getEstimateAmountOfCostRepair(
                  container.estimate
                ),
                "OTHER CHARGES": this.getEstimateAmountOfOtherCharges(
                  container.estimate
                ),
                "INSURANCE DECLARTION": container.insurance_declaration,
                PROCESSING: element.status,
                COMMENTS: container.comment_Insurance,
              };
              data3.push(row);
            }
            if (data3.length == 0) {
              var row = {
                "CLAIMS SERIAL": "",
                DATE: "",
                MONTH: "",
                "SHIPPING LINE": "",
                CATEGORY: "",
                "CONTAINER ID": "",
                "NATURE OF DAMAGE": "",

                "COSTS OF REPAIR": "",
                "OTHER CHARGES": "",
                "INSURANCE DECLARTION": "",
                PROCESSING: "",
                COMMENTS: "",
              };
              data3.push(row);
            }
            XLSX.utils.sheet_add_json(workSheet3, data3, {});
            //---------------------------------------------------
          }
          const headerStyle = {
            fill: {
              fgColor: {
                rgb: "1F497D", // Orange color
              },
            },
            font: {
              color: {
                rgb: "FFFFFF", // White font color
              },
              bold: true,
            },
          };
          const headerStyle1 = {
            fill: {
              fgColor: {
                rgb: "rgb(64 86 255 / 74%)", // Orange color
              },
            },
            font: {
              color: {
                rgb: "FFFFFF", // White font color
              },
              bold: true,
            },
          };
          const headerStyle2 = {
            fill: {
              fgColor: {
                rgb: "FFA500", // Orange color
              },
            },
            font: {
              color: {
                rgb: "FFFFFF", // White font color
              },
              bold: true,
            },
          };
          const headerStyle3 = {
            fill: {
              fgColor: {
                rgb: "4CAF50", // Orange color
              },
            },
            font: {
              color: {
                rgb: "FFFFFF", // White font color
              },
              bold: true,
            },
          };
          if (data.length > 0) {
            Object.keys(headers).forEach(function (key) {
              workSheet[XLSX.utils.encode_cell({ c: key, r: 0 })].s =
                headerStyle;
            });
          }

          if (data1.length > 0) {
            Object.keys(headers1).forEach(function (key) {
              workSheet1[XLSX.utils.encode_cell({ c: key, r: 0 })].s =
                headerStyle1;
            });
          }

          if (data2.length > 0) {
            Object.keys(headers2).forEach(function (key) {
              workSheet2[XLSX.utils.encode_cell({ c: key, r: 0 })].s =
                headerStyle2;
            });
          }

          if (data3.length > 0) {
            Object.keys(headers3).forEach(function (key) {
              workSheet3[XLSX.utils.encode_cell({ c: key, r: 0 })].s =
                headerStyle3;
            });
          }

          XLSX.utils.book_append_sheet(workbook, workSheet, "EQUIPMENTS");
          XLSX.utils.book_append_sheet(workbook, workSheet1, "AUTOMOBILES");
          XLSX.utils.book_append_sheet(workbook, workSheet2, "VESSELS");
          XLSX.utils.book_append_sheet(workbook, workSheet3, "CONTAINERS");
          var wbout = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "binary",
          });

          console.log(wbout);
          saveAs(
            new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }),
            this.download_claimSerial + "_claims_data.xlsx"
          );
          this.setModuleShowToFalseAction();
        })
        .catch((e) => {
          this.setModuleShowToFalseAction();
        });
    },
    download() {
      this.setModuleShowToTrueAction();
      this.setindexClaimsByIdsAction(this.afterFiltedArray.map((e) => e.id))
        .then((result) => {
          console.log(this.getCLAIMS_TO_DOWNLOAD);
          var workbook = XLSX.utils.book_new();
          workbook.Props = {
            Title: "SheetJS Tutorial",
            Subject: this.isClaim ? "Claims" : "Incident",
            Author: "Claims Managment",
            CreatedDate: new Date(),
          };
          const headers = [
            "CLAIMS SERIAL",
            "DATE",
            "MONTH",
            "COMPANY",
            "CATEGORY",
            "TYPE & BRAND",
            "EQUIPMENT REGISTRATION",
            "NATURE OF DAMAGE",
            "INSURANCE DECLARATION",
            "AMOUNT ESTIMATE/REPAIR",
            "INVOICED",
            "STATUS",
            "OUTSOURCER",
            "COMMENTS",
          ];
          const headers1 = [
            "CLAIMS SERIAL",
            "DATE",
            "MONTH",
            "COMPANY",
            "CATEGORY",
            "TYPE & BRAND",
            "EQUIPMENT REGISTRATION",
            "NATURE OF DAMAGE",
            "INSURANCE DECLARATION",
            "AMOUNT ESTIMATE/REPAIR",
            "INVOICED",
            "STATUS",
            "OUTSOURCER",
            "COMMENTS",
          ];
          const headers2 = [
            "CLAIMS SERIAL",
            "DATE",
            "MONTH",
            "SHIPPING LINE",
            "VESSEL",
            "NATURE OF DAMAGE",
            "INSURANCE DECLARATION",
            "COSTS OF REPAIR",
            "OTHER CHARGES",
            "PROCESSING",
            "COMMENTS",
          ];
          const headers3 = [
            "CLAIMS SERIAL",
            "DATE",
            "MONTH",
            "SHIPPING LINE",
            "CATEGORY",
            "CONTAINER ID",
            "NATURE OF DAMAGE",
            "COSTS OF REPAIR",
            "OTHER CHARGES",
            "INSURANCE DECLARATION",
            "PROCESSING",
            "COMMENTS",
          ];
          var workSheet = XLSX.utils.json_to_sheet([]);
          var workSheet1 = XLSX.utils.json_to_sheet([]);
          var workSheet2 = XLSX.utils.json_to_sheet([]);
          var workSheet3 = XLSX.utils.json_to_sheet([]);
          workSheet = XLSX.utils.sheet_add_aoa(workSheet, [headers], {
            origin: -1,
          });
          var wscols = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
            { wch: 40 },
            { wch: 35 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
          ];
          var wscols1 = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
            { wch: 35 },
            { wch: 35 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
          ];
          var wscols2 = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
          ];
          var wscols3 = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 35 },
          ];
          workSheet["!cols"] = wscols;
          workSheet1["!cols"] = wscols1;
          workSheet2["!cols"] = wscols2;
          workSheet3["!cols"] = wscols3;

          const data = [];
          const data1 = [];
          const data2 = [];
          const data3 = [];
          for (
            let index = 0;
            index < this.getCLAIMS_TO_DOWNLOAD.length;
            index++
          ) {
            const element = this.getCLAIMS_TO_DOWNLOAD[index];
            //---------------------------------------------------
            for (let index2 = 0; index2 < element.equipments.length; index2++) {
              const equipment = element.equipments[index2];
              var row = {
                "CLAIMS SERIAL": this.getClaimSerialNumber(element),
                DATE: element.incident_date,
                MONTH:
                  element.incident_date &&
                  element.incident_date != "" &&
                  element.incident_date != null
                    ? element.incident_date.split("/")[1] +
                      "-" +
                      this.getMonthAndDayBYnum(
                        element.incident_date.split("/")[0]
                      )
                    : "",
                COMPANY: equipment.companie.name,
                CATEGORY: equipment.type_of_equipment.name,
                "TYPE & BRAND":
                  equipment.type_of_equipment.name +
                  " & " +
                  equipment.brand.name,
                "EQUIPMENT REGISTRATION": equipment.matricule.matricule,
                "NATURE OF DAMAGE": equipment.nature_of_damage.name,
                "INSURANCE DECLARTION": equipment.insurance_declaration,
                "AMOUNT ESTIMATE/REPAIR": this.getEstimateAmount(
                  equipment.estimate
                ),
                INVOICED:
                  equipment.reinvoiced == null || equipment.reinvoiced == ""
                    ? "No"
                    : "Yes",
                STATUS: element.status,
                OUTSOURCER:
                  equipment.companie_id == null || equipment.companie_id == ""
                    ? "No"
                    : "Yes",
                COMMENTS: equipment.comment_Insurance,
              };
              data.push(row);
            }
            if (data.length == 0) {
              var row = {
                "CLAIMS SERIAL": "",
                DATE: "",
                MONTH: "",
                COMPANY: "",
                CATEGORY: "",
                "TYPE & BRAND": "",
                "EQUIPMENT REGISTRATION": "",
                "NATURE OF DAMAGE": "",
                "INSURANCE DECLARTION": "",
                "AMOUNT ESTIMATE/REPAIR": "",
                INVOICED: "",
                STATUS: "",
                OUTSOURCER: "",
                COMMENTS: "",
              };
              data.push(row);
            }
            XLSX.utils.sheet_add_json(workSheet, data, {});
            //---------------------------------------------------
            //---------------------------------------------------
            for (
              let index2 = 0;
              index2 < element.automobiles.length;
              index2++
            ) {
              const automobile = element.automobiles[index2];
              var row = {
                "CLAIMS SERIAL": this.getClaimSerialNumber(element),
                DATE: element.incident_date,
                MONTH:
                  element.incident_date &&
                  element.incident_date != "" &&
                  element.incident_date != null
                    ? element.incident_date.split("/")[1] +
                      "-" +
                      this.getMonthAndDayBYnum(
                        element.incident_date.split("/")[0]
                      )
                    : "",
                COMPANY: automobile.companie.name,
                CATEGORY: automobile.type_of_equipment.name,
                "TYPE & BRAND":
                  automobile.type_of_equipment.name +
                  " & " +
                  automobile.brand.name,
                "EQUIPMENT REGISTRATION": automobile.matricule.matricule,
                "NATURE OF DAMAGE": automobile.nature_of_damage.name,
                "INSURANCE DECLARTION": automobile.insurance_declaration,
                "AMOUNT ESTIMATE/REPAIR": this.getEstimateAmount(
                  automobile.estimate
                ),
                INVOICED:
                  automobile.reinvoiced == null || automobile.reinvoiced == ""
                    ? "No"
                    : "Yes",
                STATUS: element.status,
                OUTSOURCER:
                  automobile.companie_id == null || automobile.companie_id == ""
                    ? "No"
                    : "Yes",
                COMMENTS: automobile.comment_Insurance,
              };
              data1.push(row);
            }
            if (data1.length == 0) {
              var row = {
                "CLAIMS SERIAL": "",
                DATE: "",
                MONTH: "",
                COMPANY: "",
                CATEGORY: "",
                "TYPE & BRAND": "",
                "EQUIPMENT REGISTRATION": "",
                "NATURE OF DAMAGE": "",
                "INSURANCE DECLARTION": "",
                "AMOUNT ESTIMATE/REPAIR": "",
                INVOICED: "",
                STATUS: "",
                OUTSOURCER: "",
                COMMENTS: "",
              };
              data1.push(row);
            }
            XLSX.utils.sheet_add_json(workSheet1, data1, {});
            //---------------------------------------------------
            //---------------------------------------------------
            for (let index2 = 0; index2 < element.vessels.length; index2++) {
              const vessel = element.vessels[index2];
              var row = {
                "CLAIMS SERIAL": this.getClaimSerialNumber(element),
                DATE: element.incident_date,
                MONTH:
                  element.incident_date &&
                  element.incident_date != "" &&
                  element.incident_date != null
                    ? element.incident_date.split("/")[1] +
                      "-" +
                      this.getMonthAndDayBYnum(
                        element.incident_date.split("/")[0]
                      )
                    : "",
                "SHIPPING LINE": vessel.shipping_line.name,
                VESSEL: vessel.vessel_number,
                "NATURE OF DAMAGE": vessel.nature_of_damage.name,
                "INSURANCE DECLARTION": vessel.insurance_declaration,
                "COSTS OF REPAIR": this.getEstimateAmountOfCostRepair(
                  vessel.estimate
                ),
                "OTHER CHARGES": this.getEstimateAmountOfOtherCharges(
                  vessel.estimate
                ),
                PROCESSING: element.status,
                COMMENTS: vessel.comment_Insurance,
              };
              data2.push(row);
            }
            if (data2.length == 0) {
              var row = {
                "CLAIMS SERIAL": "",
                DATE: "",
                MONTH: "",
                "SHIPPING LINE": "",
                VESSEL: "",
                "NATURE OF DAMAGE": "",
                "INSURANCE DECLARTION": "",
                "COSTS OF REPAIR": "",
                "OTHER CHARGES": "",
                PROCESSING: "",
                COMMENTS: "",
              };
              data2.push(row);
            }
            XLSX.utils.sheet_add_json(workSheet2, data2, {});
            //---------------------------------------------------
            //---------------------------------------------------
            for (let index2 = 0; index2 < element.containers.length; index2++) {
              const container = element.containers[index2];
              var row = {
                "CLAIMS SERIAL": this.getClaimSerialNumber(element),
                DATE: element.incident_date,
                MONTH:
                  element.incident_date &&
                  element.incident_date != "" &&
                  element.incident_date != null
                    ? element.incident_date.split("/")[1] +
                      "-" +
                      this.getMonthAndDayBYnum(
                        element.incident_date.split("/")[0]
                      )
                    : "",
                "SHIPPING LINE": container.shipping_line.name,
                CATEGORY: container.categorie_of_container,
                "CONTAINER ID": container.containerID,
                "NATURE OF DAMAGE": container.nature_of_damage.name,

                "COSTS OF REPAIR": this.getEstimateAmountOfCostRepair(
                  container.estimate
                ),
                "OTHER CHARGES": this.getEstimateAmountOfOtherCharges(
                  container.estimate
                ),
                "INSURANCE DECLARTION": container.insurance_declaration,
                PROCESSING: element.status,
                COMMENTS: container.comment_Insurance,
              };
              data3.push(row);
            }
            if (data3.length == 0) {
              var row = {
                "CLAIMS SERIAL": "",
                DATE: "",
                MONTH: "",
                "SHIPPING LINE": "",
                CATEGORY: "",
                "CONTAINER ID": "",
                "NATURE OF DAMAGE": "",

                "COSTS OF REPAIR": "",
                "OTHER CHARGES": "",
                "INSURANCE DECLARTION": "",
                PROCESSING: "",
                COMMENTS: "",
              };
              data3.push(row);
            }
            XLSX.utils.sheet_add_json(workSheet3, data3, {});
            //---------------------------------------------------
          }
          const headerStyle = {
            fill: {
              fgColor: {
                rgb: "1F497D", // Orange color
              },
            },
            font: {
              color: {
                rgb: "FFFFFF", // White font color
              },
              bold: true,
            },
          };
          const headerStyle1 = {
            fill: {
              fgColor: {
                rgb: "rgb(64 86 255 / 74%)", // Orange color
              },
            },
            font: {
              color: {
                rgb: "FFFFFF", // White font color
              },
              bold: true,
            },
          };
          const headerStyle2 = {
            fill: {
              fgColor: {
                rgb: "FFA500", // Orange color
              },
            },
            font: {
              color: {
                rgb: "FFFFFF", // White font color
              },
              bold: true,
            },
          };
          const headerStyle3 = {
            fill: {
              fgColor: {
                rgb: "4CAF50", // Orange color
              },
            },
            font: {
              color: {
                rgb: "FFFFFF", // White font color
              },
              bold: true,
            },
          };
          if (data.length > 0) {
            Object.keys(headers).forEach(function (key) {
              workSheet[XLSX.utils.encode_cell({ c: key, r: 0 })].s =
                headerStyle;
            });
          }

          if (data1.length > 0) {
            Object.keys(headers1).forEach(function (key) {
              workSheet1[XLSX.utils.encode_cell({ c: key, r: 0 })].s =
                headerStyle1;
            });
          }

          if (data2.length > 0) {
            Object.keys(headers2).forEach(function (key) {
              workSheet2[XLSX.utils.encode_cell({ c: key, r: 0 })].s =
                headerStyle2;
            });
          }

          if (data3.length > 0) {
            Object.keys(headers3).forEach(function (key) {
              workSheet3[XLSX.utils.encode_cell({ c: key, r: 0 })].s =
                headerStyle3;
            });
          }

          XLSX.utils.book_append_sheet(workbook, workSheet, "EQUIPMENTS");
          XLSX.utils.book_append_sheet(workbook, workSheet1, "AUTOMOBILES");
          XLSX.utils.book_append_sheet(workbook, workSheet2, "VESSELS");
          XLSX.utils.book_append_sheet(workbook, workSheet3, "CONTAINERS");
          var wbout = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "binary",
          });

          console.log(wbout);
          saveAs(
            new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }),
            this.month +
              (this.month != "" && this.month != null ? "_" : "") +
              "claims_data.xlsx"
          );
          this.setModuleShowToFalseAction();
        })
        .catch((e) => {
          this.this.setModuleShowToFalseAction();
        });
    },
    getFiltered(e) {
      this.afterFiltedArray = e;
    },
    getMonthAndDayBYnum(element) {
      switch (element) {
        case "01":
          return "January";
          break;
        case "02":
          return "February";
          break;
        case "03":
          return "March";
          break;
        case "04":
          return "April";
          break;
        case "05":
          return "May";
          break;
        case "06":
          return "June";
          break;
        case "07":
          return "July";
          break;
        case "08":
          return "August";
          break;
        case "09":
          return "September";
          break;
        case "10":
          return "October";
          break;
        case "11":
          return "November";
          break;
        case "12":
          return "December";
          break;

        default:
          break;
      }
    },
    getEstimateAmount(estimate) {
      let total = 0;
      for (let index = 0; index < estimate.length; index++) {
        const element = estimate[index];
        for (
          let index1 = 0;
          index1 < element.other_valuation.length;
          index1++
        ) {
          const element2 = element.other_valuation[index1];
          total += element2.value_valuation;
        }
      }
      return total;
    },
    getEstimateAmountOfCostRepair(estimate) {
      let total = 0;
      for (let index = 0; index < estimate.length; index++) {
        const element = estimate[index];
        for (
          let index1 = 0;
          index1 < element.other_valuation.length;
          index1++
        ) {
          const element2 = element.other_valuation[index1];
          if (
            element2.name == "Costs of repair" ||
            element2.name == "Costs of cargo"
          )
            total += element2.value_valuation;
        }
      }
      return total;
    },
    getEstimateAmountOfOtherCharges(estimate) {
      let total = 0;
      for (let index = 0; index < estimate.length; index++) {
        const element = estimate[index];
        for (
          let index1 = 0;
          index1 < element.other_valuation.length;
          index1++
        ) {
          const element2 = element.other_valuation[index1];
          if (
            element2.name != "Costs of repair" &&
            element2.name != "Costs of cargo"
          )
            total += element2.value_valuation;
        }
      }
      return total;
    },
    showDownloadAction(id, claimSerial) {
      this.download_id = id;
      this.download_claimSerial = claimSerial;
      this.setClaimsFilesAction(this.download_id)
        .then((e) => {
          console.log(
            "downloads  : ",
            this.getCLAIMS_FILES[0]["inidentReports"][0]
          );
          this.showDownload = true;
        })
        .catch((e) => {});
    },
    hideDownloadAction() {
      this.download_id = "";
      this.download_claimSerial = "";
      this.showDownload = false;
    },
    isEven(index) {
      return index % 2 === 0;
    },
    isOdd(index) {
      return index % 2 !== 0;
    },
    equipmentsFiles(equipments) {
      let counter = 0;
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["liability"].forEach((element2) => {
          counter++;
        });
      });
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["insurance"].forEach((element2) => {
          counter++;
        });
      });
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["estimation"].forEach((element2) => {
          element2[Object.keys(element2)[0]].forEach((element3) => {});
          counter++;
        });
      });
      return counter;
    },
    equipmentFiles(equipment) {
      let counter = 0;

      equipment[Object.keys(equipment)[0]]["liability"].forEach((element2) => {
        counter++;
      });
      equipment[Object.keys(equipment)[0]]["insurance"].forEach((element2) => {
        counter++;
      });
      equipment[Object.keys(equipment)[0]]["estimation"].forEach((element2) => {
        element2[Object.keys(element2)[0]].forEach((element3) => {});
        counter++;
      });
      return counter;
    },
    automobilesFiles(equipments) {
      let counter = 0;
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["liability"].forEach((element2) => {
          counter++;
        });
      });
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["insurance"].forEach((element2) => {
          counter++;
        });
      });
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["estimation"].forEach((element2) => {
          element2[Object.keys(element2)[0]].forEach((element3) => {});
          counter++;
        });
      });
      return counter;
    },
    automobileFiles(equipment) {
      let counter = 0;

      equipment[Object.keys(equipment)[0]]["liability"].forEach((element2) => {
        counter++;
      });
      equipment[Object.keys(equipment)[0]]["insurance"].forEach((element2) => {
        counter++;
      });
      equipment[Object.keys(equipment)[0]]["estimation"].forEach((element2) => {
        element2[Object.keys(element2)[0]].forEach((element3) => {});
        counter++;
      });
      return counter;
    },
    vesselsFiles(equipments) {
      let counter = 0;
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["liability"].forEach((element2) => {
          counter++;
        });
      });
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["insurance"].forEach((element2) => {
          counter++;
        });
      });
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["estimation"].forEach((element2) => {
          element2[Object.keys(element2)[0]].forEach((element3) => {});
          counter++;
        });
      });
      return counter;
    },
    vesselFiles(equipment) {
      let counter = 0;

      equipment[Object.keys(equipment)[0]]["liability"].forEach((element2) => {
        counter++;
      });
      equipment[Object.keys(equipment)[0]]["insurance"].forEach((element2) => {
        counter++;
      });
      equipment[Object.keys(equipment)[0]]["estimation"].forEach((element2) => {
        element2[Object.keys(element2)[0]].forEach((element3) => {});
        counter++;
      });
      return counter;
    },
    containersFiles(equipments) {
      let counter = 0;
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["liability"].forEach((element2) => {
          counter++;
        });
      });
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["insurance"].forEach((element2) => {
          counter++;
        });
      });
      equipments.forEach((element) => {
        element[Object.keys(element)[0]]["estimation"].forEach((element2) => {
          element2[Object.keys(element2)[0]].forEach((element3) => {});
          counter++;
        });
      });
      return counter;
    },
    containerFiles(equipment) {
      let counter = 0;

      equipment[Object.keys(equipment)[0]]["liability"].forEach((element2) => {
        counter++;
      });
      equipment[Object.keys(equipment)[0]]["insurance"].forEach((element2) => {
        counter++;
      });
      equipment[Object.keys(equipment)[0]]["estimation"].forEach((element2) => {
        element2[Object.keys(element2)[0]].forEach((element3) => {});
        counter++;
      });
      return counter;
    },
  },
};
</script>
