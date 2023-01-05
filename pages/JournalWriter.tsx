import * as React from "react";
import {observable, action, computed, makeObservable} from "mobx";
import {observer} from "mobx-react";
import {NamePickerModal} from "./NamePickerModal";
import { JournalWriterMachine } from "../helpers/JournalWriterMachine";

export interface JournalWriterProps
{
	machine: JournalWriterMachine;
}

@observer
export class JournalWriter extends React.Component<JournalWriterProps>
{
	private get machine(): JournalWriterMachine
	{
		return this.props.machine;
	}

	render()
	{
		return <div className="journal-writer">
			<NamePickerModal
				machine={this.props.machine.namePickerModalMachine}
				onRequestClose={(commit: boolean) => this.props.machine.handleModalCloseRequest(commit)}
				isOpen={this.props.machine.showModal}
				currentName={this.props.machine.currentName == null ? "" : this.props.machine.currentName}
				ref={(x) => this.props.machine.modalObj = x}
			/>

			<label htmlFor="dateEntry">Date: </label>
			<br />
			<input type="text" id="dateEntry" onChange={this.machine.updateDate} />
			<label htmlFor="deepDiveCheckbox">Deep Dive?</label>
			<input type="checkbox"
				id="deepDiveCheckbox"
				checked={this.machine.isDeepDiveEntry}
				onChange={this.machine.updateDeepDive}
			/>
			<br />
			<br />
			<label htmlFor="journalEntry">Entry: </label>
			<br />
			<textarea id="journalEntry"
			          value={this.props.machine.journalText}
			          onChange={(e) => this.props.machine.updateJournalText(e)}
			          style={{width: "90%", height: "200px"}}
			/>
			{/*<MyEditor />*/}
			<br />
			<button onClick={(e) => this.props.machine.createFinalText()}>Submit</button>

      <div style={{width: "50%", display: "inline-block", verticalAlign: "top", whiteSpace: "pre-wrap"}}>
        {this.props.machine.finalText}
      </div>
		</div>;
	}

	componentDidMount()
	{
		//roughly every month, suggest doing a deep dive journal entry
		if (this.machine.suggestDeepDive)
		{
			alert("You should do a deep dive entry today!");
		}
	}
}
