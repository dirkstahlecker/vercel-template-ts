export class API
{
  private static cleanInput(value: string): string
  {
    if (!value)
    {
      return value;
    }
    return value.toLowerCase();
  }

  public static addNameToDatabase = async (displayname: string, firstName: string, lastName: string) => {
    displayname = this.cleanInput(displayname);
    firstName = this.cleanInput(firstName);
    lastName = this.cleanInput(lastName);

    const response = await fetch("/api/addFullName", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        displayName: displayname,
        firstName: firstName,
        lastName: lastName
      })
    });
  };

  public static getNamesForDisplayName = async (displayname: string): Promise<string[]> => {
    displayname = this.cleanInput(displayname);

    const response = await fetch("/api/getNamesForDisplayName", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        displayName: displayname
      })
    });

    const raw = await response.json();
    const rows = raw.message;

    return rows.map((row: {lastname: string}) => {
      return row.lastname;
    });
  };
}
