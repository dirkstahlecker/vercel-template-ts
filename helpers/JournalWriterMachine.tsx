import * as React from "react";
import {observable, action, computed, makeObservable} from "mobx";
import {MarkupUtils} from "../helpers/MarkupUtils";
import {NameReference} from "../helpers/NameReference";
import NamePickerModal, { NamePickerModalMachine } from "../components/NamePickerModal";
import { AddMarkupMachine } from "../components/AddMarkupToExistingEntry";

export class JournalWriterMachine
{
	public static DEEP_DIVE_INDICATOR: string = "[Deep Dive]";

  public suggestDeepDive: boolean = this.getRandomInt(0, 30) === 0;
  
  constructor()
  {
    makeObservable(this);
  }

	@observable
	public journalText: string = "";

	@observable
	public currentName: string | null = null;

	@observable
	public finalText: string = "";

	@observable
	private dateStr: string = "";

	@observable
	public isDeepDiveEntry: boolean = this.suggestDeepDive;

	public modalObj: NamePickerModal | null = null;

	public addMarkupMachine: AddMarkupMachine = new AddMarkupMachine();

	@action
	public updateDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
		this.dateStr = e.currentTarget.value;
	};

	@action
	public createFinalText(): void
	{
		const deepDiveText: string = this.isDeepDiveEntry ? JournalWriterMachine.DEEP_DIVE_INDICATOR : "";
		this.finalText = this.dateStr + ": " + deepDiveText + " " + this.journalText;
	}

	@action
	public setCurrentName(value: string | null): void
	{
		this.currentName = value;
	}

	@action
	public updateDeepDive = (e: React.ChangeEvent<HTMLInputElement>): void => {
		this.isDeepDiveEntry = e.currentTarget.checked;
	}

	public namePickerModalMachine: NamePickerModalMachine = new NamePickerModalMachine();

	@computed
	public get showModal(): boolean
	{
		return this.currentName != null;
	}

	private getRandomInt(min: number, max: number): number
	{
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	public handleModalCloseRequest(commit: boolean): void
	{
		if (!commit) //close without adding markup
		{
		  this.currentName = null;
		  return;
		}
		if (this.currentName == null)
		{
		  throw Error("name shouldn't be null");
		}
		//take the last name given by the user and insert the proper markup into the box itself
		let realFirstName: string | null = this.namePickerModalMachine.realFirstName;
		const markup: string = MarkupUtils.makeMarkup(realFirstName != null ? realFirstName : this.currentName, this.namePickerModalMachine.lastName, this.currentName);
		const textLen: number = this.journalText.length;
		const previousJournalText: string = this.journalText;
		//add the markup in place of the name
		this.journalText = previousJournalText.substring(0, textLen - this.currentName.length - 1) + markup +  previousJournalText.substring(textLen - 1, textLen);

		//clean up
		this.currentName = null; //close the modal
		this.namePickerModalMachine.lastName = ""; //reset
		this.namePickerModalMachine.realFirstName = null;
	}

	@action
	public updateJournalText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		this.journalText = e.currentTarget.value;

		let text: string = this.journalText;
		let lastWord: string;
		let lastCharacter: string = text.substring(text.length - 1, text.length);
		if (lastCharacter === " ")
		{
			text = text.substring(0, text.length - 1); //remove trailing space
			lastWord = text.substring(Math.max(text.lastIndexOf(" "), text.lastIndexOf("\n")), text.length);
			lastWord = lastWord + " "; //add space back in for the rest of the logic to work properly
		}
		else
		{
			lastWord = text.substring(Math.max(text.lastIndexOf(" "), text.lastIndexOf("\n")), text.length);
		}

		//names must be preceeded by a space or newline and followed by a word split character
		if (AddMarkupMachine.wordSplitCharacters.indexOf(lastWord.substring(lastWord.length - 1, lastWord.length)) > -1) //last character is a word split character
		{
			lastWord = NameReference.cleanWord(lastWord.substring(0, lastWord.length - 1)); //remove the final character to get just the name
			if (NameReference.isName(lastWord))
			{
				this.currentName = lastWord;
			}
		}
	};


}
