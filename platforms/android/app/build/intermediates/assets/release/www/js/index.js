/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var POS_MAP = {
     '0' : 'GK',
     '1' : 'CB',
     '2' : 'FB',
     '3' : 'CDM',
     '5' : 'WM',
     '4' : 'CM',
     '6' : 'CAM',
     '7' : 'WF',
     '8' : 'CF'
}

var PLAYERS_DATA = '';

function sortTable(tid) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(tid);
  switching = true;
  /* Make a loop that will continue until no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /* Loop through all table rows (except the first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare, one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      // Check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // I so, mark as a switch and break the loop:
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are: 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //do your stuff!
            document.getElementById('playersfile').addEventListener('change', this.readSingleFile, false);
            document.getElementById('btnbyname').addEventListener('click', this.findPlayerByName, false);
            document.getElementById('btnbyskill').addEventListener('click', this.findPlayersBest, false);
        } else {
            alert('The File APIs are not fully supported by your browser.');
        }
    },

    findPlayerByName: function(){
        document.querySelector("#fileTextResult").innerHTML = "Working ...";

        var html = `
            <table class='table is-bordered is-striped'>
                <tr class='tr'>
                    <th class='td'>DOB</th>
                    <th class='td'>Name</th>
                    <th class='td'>Potential</th>
                    <th class='td'>Position</th>
                </tr>
            `;

        var pls = JSON.parse(PLAYERS_DATA);
        var found = 0;
        var pname = document.querySelector("#pname").value;

        for (var i = 0; i < pls.$values.length; i++){
            if(pls.$values[i]["PlayerName"].toUpperCase()  == pname.toUpperCase() ){

                html = html + '<tr class="tr">';
                html = html + '<td class="td">' + pls.$values[i]["Potential"] + '</td>';
                html = html + '<td class="td">' + pls.$values[i]["PlayerName"] + '</td>';
                html = html + '<td class="td">' + pls.$values[i]["DateOfBirth"] + '</td>';
                html = html + '<td class="td">' + POS_MAP[pls.$values[i]["Position"]] + '</td>';
                html = html + '</tr>';
                html = html + '</table>';
                found = found + 1;
                document.querySelector("#fileTextResult").innerHTML = html;
                break;
            } 
        }
        if(found < 1){
            document.querySelector("#fileTextResult").innerHTML = html + '</table>';
        }
    },

    findPlayersBest: function(){
        document.querySelector("#fileTextResult").innerHTML = "Working ...";

        var html = `
            <table class='table is-bordered is-striped' id='bestPlayersTable'>
                <tr class='tr'>
                    <th class='td'>DOB</th>
                    <th class='td'>Name</th>
                    <th class='td'>Potential</th>
                    <th class='td'>Position</th>
                </tr>
            `;

        var pls = JSON.parse(PLAYERS_DATA);
        var threshold = document.querySelector("#searchbest").value;

        for (var i = 0; i < pls.$values.length; i++){
            if( pls.$values[i]['Potential'] >= threshold ){
                var regen = "";
                if(pls.$values[i]["DateOfBirth"].search("/") > -1){
                    regen = " is-selected";
                }
                html = html + '<tr class="tr' +regen +'">';
                html = html + '<td class="td">' + pls.$values[i]["Potential"] + '</td>';
                html = html + '<td class="td">' + pls.$values[i]["PlayerName"] + '</td>';
                html = html + '<td class="td">' + pls.$values[i]["DateOfBirth"] + '</td>';
                html = html + '<td class="td">' + POS_MAP[pls.$values[i]["Position"]] + '</td>';
                html = html + '</tr>';
            }
        }
        html = html + '</table>';
        document.querySelector("#fileTextResult").innerHTML = html;
        sortTable("bestPlayersTable");
    },

    readSingleFile: function(evt) {

        document.querySelector("#fileTextResult").innerHTML = "Working ...";

        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0]; 

        if (f) {
          var r = new FileReader();
          r.onload = function(e) { 
            var contents = e.target.result;
            console.log("Successful file read: " + contents);
            PLAYERS_DATA = contents;

            alert("Players loaded.");
            document.getElementById('btnbyname').disabled = false;
            document.getElementById('btnbyskill').disabled = false;

            console.log( "Got the file.\n" 
                  +"name: " + f.name + "\n"
                  +"type: " + f.type + "\n"
                  +"size: " + f.size + " bytes\n"
                  + "starts with: " + contents.substr(1, contents.indexOf("n"))
            );  
          }
          r.readAsText(f);
        } else { 
            alert("Failed to load file");
        }
    },


    erridid: function(){
        console.log("What a glorious f*** up!");
        document.querySelector("#fileTextResult").innerHTML = '<div class="err">What a glorious f*** up!</div>';
    },

};

app.initialize();