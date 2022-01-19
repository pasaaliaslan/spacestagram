export default async function getSingleMedia(getType, date) {

    let response = null;

    const URL = "https://api.nasa.gov/planetary/apod?api_key=jv4N00zWfpTrTdVduircXimP2oL3dmxCwXecPqu7";

    if (getType === 0) {
        response = await fetch(URL, {method: "GET"});
    } else if (getType === 1) {
        response = await fetch(URL + "&count=1", {method: "GET"});
    } else {
        response = await fetch(URL + "&start_date=" + date + "&end_date=" + date, {method: "GET"})
    }

    return response.json();
}