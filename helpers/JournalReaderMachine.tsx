import {observable, action, makeObservable} from "mobx";
import {Markup} from "./Markup";

export class JournalReaderMachine
{
	private static DATE_REGEX = /\d{1,2}-\d{1,2}-\d{1,2}:/;

	@observable public rawText: string = "";

	constructor()
	{
		makeObservable(this);
	}

	@action
	public updateRawText(value: string): void
	{
		this.rawText = value; // = this.replaceMarkupWithDisplayName(value);
	}

	public static isDate(piece: string): boolean
	{
		return JournalReaderMachine.DATE_REGEX.test(piece);
	}

	public static splitOnMarkupPiecesAndDates(text: string): string[]
	{
		//eslint-disable-next-line no-useless-escape
		const pieces: string[] = text.split(/(\[!![^\|]+\|[^_]+_[^!]+!!\])|(\d{1,2}-\d{1,2}-\d{1,2}:)/); //split on markup and dates
		return pieces;
	}

	public renderJournal(): JSX.Element | null
	{
		const pieces: string[] = JournalReaderMachine.splitOnMarkupPiecesAndDates(this.rawText);

		return <div>
			{
				pieces.map((piece: string) => {
					if (piece === undefined)
					{
						return "";
					}
					if (Markup.isMarkup(piece))
					{
						return Markup.getHtmlForMarkup(Markup.create(piece));
					}
					else if (JournalReaderMachine.isDate(piece))
					{
						return <>
							<br/><br/>
							{piece}
						</>;
					}
					else
					{
						return piece;
					}
				})
			}
		</div>;
	}

	// private replaceMarkupWithDisplayName(rawText: string): string
	// {
	// 	while (true)
	// 	{
	// 		let markup: Markup | null = Markup.create(rawText);
	// 		if (markup == null)
	// 		{
	// 			break;
	// 		}
	//
	// 		const displayName: string | null = markup.displayName;
	// 		if (displayName == null)
	// 		{
	// 			console.error("Invalid markup was received from getFullMarkupFromString");
	// 			return "TODO"; //TODO
	// 		}
	// 		rawText = rawText.replace(markup, displayName);
	// 	}
	// 	return rawText;
	// }
}