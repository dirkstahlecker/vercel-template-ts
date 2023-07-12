import React from 'react';
import {observer} from "mobx-react";
import { AppMachine } from '../helpers/AppMachine';
import {makeObservable, observable, runInAction, action} from "mobx";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { JournalWriter } from './JournalWriter';
import { JournalReader } from './JournalReader';
import 'react-tabs/style/react-tabs.css';
import { API } from '../helpers/API';

//TODO: why are we loading everything twice?
  //React might do this by default

//TODO: capitalization - how to preserve?

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
      HELLO WORLD
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
