import * as React from "react";
import {observable, action, makeObservable} from "mobx";
import {observer} from "mobx-react";
import { JournalReaderMachine } from "../helpers/JournalReaderMachine";
import { JournalReaderProps } from "../helpers/JournalReaderProps";

@observer
export class JournalReader extends React.Component<JournalReaderProps>
{
	private get machine(): JournalReaderMachine
	{
		return this.props.machine;
	}

	render()
	{
		return <div className="journal-reader">
			<input type="text" onChange={(e) => this.machine.updateRawText(e.currentTarget.value)}/>
			<br/>
			<br/>

			{
				this.machine.rawText != "" && 
				this.machine.renderJournal()
			}
		</div>;
	}
}
