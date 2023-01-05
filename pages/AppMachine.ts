import React from 'react';
import {makeObservable, observable, runInAction, action} from "mobx";
import { JournalReaderMachine } from './JournalReader';
import { JournalWriterMachine } from './JournalWriter';
import {MarkupUtils} from "./MarkupUtils";

export class AppMachine
{
  @observable testData: any = null;

  public journalReaderMachine: JournalReaderMachine = new JournalReaderMachine();
  public journalWriterMachine: JournalWriterMachine = new JournalWriterMachine();

  @observable public selectedFile: any | null = null;

  constructor()
  {
    makeObservable(this);
  }

  public handleEasyMarkupGeneratorSubmit = (): void => {
    document.getElementById("firstName");
    const firstName: string | null = (document.getElementById("firstName") as HTMLInputElement).value;
    const lastName: string = (document.getElementById("lastName") as HTMLInputElement).value;
    const displayName: string = (document.getElementById("displayName") as HTMLInputElement).value;

    const currentMarkupHack = MarkupUtils.makeMarkup(firstName, lastName, displayName);
    (document.getElementById("placeToSelectText") as HTMLInputElement).value = currentMarkupHack;

    var copyText = document.getElementById("displayCopyArea") as HTMLElement;
    // this.selectElementContents(copyText);
    document.execCommand("copy");

    (document.getElementById("firstName") as HTMLInputElement).value = "";
    (document.getElementById("firstName") as HTMLInputElement).focus();
    (document.getElementById("lastName") as HTMLInputElement).value = "";
    (document.getElementById("displayName") as HTMLInputElement).value = "";
  };
}
