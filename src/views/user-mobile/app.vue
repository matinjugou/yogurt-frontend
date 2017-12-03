<template>
  <v-app id="app">
    <v-toolbar color="indigo" dark fixed app height="100px">
      <v-toolbar-title>xxx公司</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container style="height: calc(100vh - 206px)"></v-container>
      <v-container>
        <v-layout row>
          <v-flex xs8>
            <v-text-field
              label="在此输入消息"
              id="testing"
            ></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-btn fab dark small color="grey">
              <v-icon dark>tag_faces</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2>
            <v-btn fab dark small color="grey">
              <v-icon dark>add_circle_outline</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
