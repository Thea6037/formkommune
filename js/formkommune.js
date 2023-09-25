import { postObjectAsJson} from "./modulejson.js";

console.log("jeg er i formkommune")

document.addEventListener('DOMContentLoaded', createFormEventListener);

let formKommune;

function createFormEventListener() {
    formKommune = document.getElementById("formKommune");
    formKommune.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event)
{

    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    console.log(form);
    console.log(url);
    try
    {
        const formData = new FormData(form); //Indeholder alle indtastede data
        console.log(formData);
        const responseData = await postFormDataAsJson(url, formData);
    } catch (error)
    {
        alert(error.message);
        console.error(error);
    }
}

async function postFormDataAsJson(url, formData)
{
    //nu bliver alle indtastet data indsat i et objekt: plainFormData
    //hvor keys er name fra inputfelter og value er indtastet value i inputfelter
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData)
    plainFormData.region = {}
    plainFormData.region.kode = plainFormData.regionKode
    const resp = postObjectAsJson(url, plainFormData, "POST")
    return resp

}

