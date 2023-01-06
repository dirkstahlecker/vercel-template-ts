export class API
{
  public static addNameToDatabase = async (displayname: string, firstName: string, lastName: string) => {
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

  public static getNamesForDisplayName = async (displayname: string) => {
    const response = await fetch("/api/getNamesForDisplayName", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        displayname: displayname
      })
    });
  };
}
