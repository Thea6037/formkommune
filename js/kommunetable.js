import { fetchAnyUrl, restDelete} from "./modulejson.js";

console.log("er i kommunetable")

const url = 'http://localhost:8080/getkommunerdata'
const urlKommune = 'http://localhost:8080/kommune'
const pbCreateKommuneTable = document.getElementById("pbGetKommuner");
const tblKommuner = document.getElementById("tblKommuner");

//Indsætter en række for hver kommune i tblKommuner
function createRow(kommune)
{
    let cellCount = 0
    let rowCount = tblKommuner.rows.length;

    let row = tblKommuner.insertRow(rowCount);
    row.id = kommune.navn;

    let cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.kode;
    cell.style.width = "25%"

    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.navn;
    cell.style.width = "25%"

    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.href;
    cell.style.width = "50%"

    cell = row.insertCell(cellCount++);
    let img = document.createElement("img")
    img.setAttribute("src", kommune.hrefPhoto)
    img.setAttribute("alt", "hej")
    img.setAttribute("width", 150)
    img.setAttribute("height", 150)
    cell.appendChild(img)
    //cell.innerHTML = kommune.hrefPhoto;

    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.region.kode;

    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.region.navn;

    cell = row.insertCell(cellCount++);
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet kommune");
    pbDelete.className = "btn1"

    //Kan gøres på denne måde, men også på pbDelete.onclick måden
    /*pbDelete.addEventListener('click', (btn)=>
    {
        document.getElementById(kommune.navn)
    })*/

    pbDelete.onclick = function()
    {
        document.getElementById(kommune.navn).remove();
        deleteKommune(kommune);
    }
    cell.appendChild(pbDelete)
}

async function deleteKommune(kommune)
{
    try
    {
        const urlDelete = urlKommune + "/" + kommune.kode
        const resp = await restDelete(urlDelete)

        //Får fejlbeskeder fra backend fra deleteMappingen, altså ResponseEnitity
        const body = await resp.text();
        alert(body)

        //Fejlbeskeder direkte fra frontend
        /*if(resp.ok) {
            alert("Det gik godt med at slette")
        } else {
            alert("Det gik IKKE godt med at slette")
        }*/

    } catch (error) {
        alert(error.message);
        console.log(error)
    }
}

let kommunearr = []


async function fetchKommuner()
{
    const colhead = document.getElementById("colhead")
    tblKommuner.innerHTML = "";
    tblKommuner.appendChild(colhead)
    kommunearr = await fetchAnyUrl(url);
    kommunearr = sortKommuner(kommunearr)
    kommunearr.forEach(createRow);
}

function actionGetKommuner()
{
    fetchKommuner();
}

function sortKommuner(kommunerarr)
{
    const objSort = kommunerarr.sort((aKommune,bKommune) => {
        if (aKommune.region.kode > bKommune.region.kode)
        {
            return 1;
        } else if (bKommune.region.kode > aKommune.region.kode)
        {
            return -1;
        } else if (aKommune.navn > bKommune.navn){
            return 1;
        } else {return -1}
    })
    return objSort
}



pbCreateKommuneTable.addEventListener('click', actionGetKommuner)