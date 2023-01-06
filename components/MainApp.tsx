import React from 'react';
import {observer} from "mobx-react";
import { AppMachine } from '../helpers/AppMachine';
import {makeObservable, observable, runInAction, action} from "mobx";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { JournalWriter } from './JournalWriter';
import { JournalReader } from './JournalReader';
import 'react-tabs/style/react-tabs.css';
import { API } from '../helpers/API';

export interface MainAppProps
{
  
}

@observer
class MainApp extends React.Component<MainAppProps>
{
  private machine: AppMachine = new AppMachine();

  constructor(props: MainAppProps)
  {
    super(props);

    // API.getNamesForDisplayName("Dirk");
    API.addNameToDatabase("Dirk", "Dirk", "Stahlecker");
  }

  private async getFullNameForDisplayName(): Promise<void>
  {
    const raw = await fetch('/api/fullNames/all');
    const fullNames = await raw.json();

    console.log(fullNames);
  }

  onFileChange = (e: any) => { //TODO
    // this.setState({ selectedFile: event.target.files[0] });
    this.machine.selectedFile = e.target.files[0];
  }; 

  onFileUpload = async(): Promise<void> => { 
    // const formData = new FormData(); 
    // formData.append( 
    //   "myFile", 
    //   this.state.selectedFile, 
    //   this.state.selectedFile.name 
    // ); 
    // axios.post("api/uploadfile", formData); 

    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({name: this.machine.selectedFile.name, file: this.machine.selectedFile})
    // }

    // await fetch('/journal/upload', requestOptions);
    // console.log("")


    const formData = new FormData()
    formData.append('file', this.machine.selectedFile)
    console.log(this.machine.selectedFile)
  
    fetch('/journal/upload', {
      method: 'POST',
      body: formData,
      // headers: {'content-type': 'application/json'},
      // headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }; 

  render()
  {
    return <div className="App">
      <span style={{width: "100%", height: "100%", display: "inline-block", verticalAlign: "top"}}
            tabIndex={0}
            id="mainApp"
      >
        <Tabs>
          <TabList>
            <Tab>
              Write
            </Tab>
            <Tab>
              Test
            </Tab>
            <Tab>
              Upload
            </Tab>
            <Tab>
              Read
            </Tab>
            <Tab>
              Add Markup
            </Tab>
            <Tab>
              Stats
            </Tab>
            <Tab>
              Graph Testing
            </Tab>
          </TabList>

          <TabPanel>
            <JournalWriter machine={this.machine.journalWriterMachine}/>
          </TabPanel>
          <TabPanel>
            {/* <button onClick={() => this.getFullNameForDisplayName()}>Test</button>&nbsp; */}
            {/* <button onClick={() => this.fetchAllDbData()}>Get DB Data</button> */}
            <br/>
            {
              this.machine.testData != null &&
              this.machine.testData
            }
          </TabPanel>
          <TabPanel>
            <input type="file" name="journal_path" onChange={this.onFileChange}/>
            <button onClick={this.onFileUpload}> Upload! </button>
          </TabPanel>
          <TabPanel>
            <JournalReader machine={this.machine.journalReaderMachine}/>
          </TabPanel>
          <TabPanel>
            <div onKeyDown={(e: any) => {
              if (e.key === "Enter")
              {
                e.preventDefault();
                this.machine.handleEasyMarkupGeneratorSubmit();
              }
            }}>
              First Name: <input type="text" id="firstName" autoFocus={true}/>
              <br />
              Last Name: <input type="text" id="lastName" />
              <br />
              Display Name: <input type="text" id="displayName" />
              <br />
              <button onClick={this.machine.handleEasyMarkupGeneratorSubmit}>Submit</button>
              <br />
              <br />
              <div id="displayCopyArea">
                <input id="placeToSelectText" />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            {/* <Stats
              machine={new StatsMachine("TODO")}
            /> */}
          </TabPanel>
          <TabPanel>

          </TabPanel>
        </Tabs>

      </span>
    </div>
  }
}

export default MainApp;

/*
TODO:

-low hanging fruit: remember the last entered last name for each first name and suggest that

-autocomplete or memory of some kind of unique names
-way to indicates that names should no longer show up as names (like unique names I no longer see anymore)
*/
