import * as React from "react";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react";
import Modal from "react-modal";
import { API } from "../helpers/API";

export class NamePickerModalMachine
{  
  @observable public lastName: string = "";
  @observable public realFirstName: string | null = null;
  @observable public submitClicked: boolean = false;
  @observable public lastNameOptions: string[] = [];

  public setSubmitClicked = (value: boolean): void => {
    this.submitClicked = value;
  }

  public updateLastName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.lastName = e.currentTarget.value;
  }

  public updateRealFirstName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.realFirstName = e.currentTarget.value;
  }

  public lastNameTxtInput: any;
  public realFirstNameTxtInput: any;

  // public async getLastNames(displayName: string): Promise<void>
  // {

  //   runInAction(() => this.lastNameOptions = names);
  // }
}

export interface NamePickerModalProps
{
  machine: NamePickerModalMachine;
  onRequestClose: (commit: boolean) => void;
  isOpen: boolean;
  currentName: string;
  context?: string; //currently unused, probably won't ever be used
}

@observer
export class NamePickerModal extends React.Component<NamePickerModalProps>
{
  private onModalKeyDown = (e: any): void => {
    if (e.key === "Enter")
    {
      e.preventDefault();
      this.props.machine.setSubmitClicked(true);
      this.props.onRequestClose(true);
    }
    if (e.key === "Escape")
    {
      this.props.onRequestClose(false);
    }
  };

  render()
  {
    return (
      <Modal 
        isOpen={this.props.isOpen}
      >
        <div>
          Current name:&nbsp;
          {this.props.currentName}
          <br />
          <br />
          {
            this.props.context !== undefined &&
            <>
              <div>this.props.context</div>
              <br />
              <br />
            </>
          }
          {
            this.props.machine.lastNameOptions.map((name: string) => {
              return <>{name}</>
            })
          }
          Last name:&nbsp;
          <input type="text" 
                 onChange={this.props.machine.updateLastName}
                 id="lastNameTxt"
                 onKeyDown={this.onModalKeyDown}
                 ref={(x) => {
                   this.props.machine.lastNameTxtInput = x;
                   if (x != null) 
                   {
                     this.props.machine.lastNameTxtInput.focus();
                   }
                 }}
          />
          <br />
          <br />
          Real First Name:&nbsp;
          <input type="text" 
                 onChange={this.props.machine.updateRealFirstName}
                 id="realFirstNameTxt"
                 onKeyDown={this.onModalKeyDown}
                 ref={(x) => {
                   this.props.machine.realFirstNameTxtInput = x;
                 }}
          />
          <br />
          <br />
          <button onClick={() => {
            this.props.machine.setSubmitClicked(true);
            this.props.onRequestClose(true)
          }}>Submit</button>
        </div>
      </Modal>
      );
  }
}

export default NamePickerModal;
