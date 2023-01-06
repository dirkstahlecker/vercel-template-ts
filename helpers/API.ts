export class API
{
  public static getLastNamesForFirstName = async (firstName: string) => {
    const response = await fetch("/api/getLastNamesForFirstName", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName
      })
    });
  };

  public static addNameToDatabase = async (firstName: string, lastName: string) => {
    const response = await fetch("/api/addFullName", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName
      })
    });
  };
}
