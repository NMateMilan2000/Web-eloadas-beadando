function $(ID) {
  return ID === "" ? undefined : document.getElementById(ID);
}

adatok = [
  { nev: "Zsolti", kor: "22", magassag: "199" },
  { nev: "Béla", kor: "12", magassag: "145" },
  { nev: "Géza", kor: "32", magassag: "178" },
  { nev: "Keve", kor: "5", magassag: "123" },
];

function _validateInput(fieldId) {
  if ($(fieldId).type === "number") {
    if (
      $(fieldId).value === "" &&
      (Number($(fieldId).value) <= 0 || Number($(fieldId).value) > 200)
    ) {
      $(fieldId).classList.add("hiba");
      console.log("error for ", fieldId);
      return false;
    }
  } else if ($(fieldId).type === "text") {
    if ($(fieldId).value === "") {
      $(fieldId).classList.add("hiba");
      console.log("error for ", fieldId);
      return false;
    }
  }
  $(fieldId).classList.remove("hiba");
  console.log("pass ", fieldId);
  return true;
}

function Add() {
  if (
    _validateInput("nev") &&
    _validateInput("kor") &&
    _validateInput("magassag")
  ) {
    adatok.push({
      nev: $("nev").value,
      kor: $("kor").value,
      magassag: $("magassag").value,
    });
    addtotable();
  }
}

function addtotable() {
  $("tbl").innerHTML = `
    <tr>
      <th onclick="sortTable('id')">Azonosító</th>
      <th onclick="sortTable('nev')">Név</th>
      <th onclick="sortTable('kor')">Kor</th>
      <th onclick="sortTable('magassag')">Magasság</th>
    </tr>`;
  $("tbl").innerHTML += adatok
    .map((element, i) => {
      return `<tr>
              <td>${i}</td>
              <td>${element.nev}</td>
              <td>${element.kor}</td>
              <td>${element.magassag}</td>
            </tr>`;
    })
    .join("");
}

function del() {
  adatok = adatok.filter((_, i) => i !== Number($("tor").value));
  addtotable();
}

function update() {
  if (
    _validateInput("nevv") &&
    _validateInput("korr") &&
    _validateInput("magassagg")
  ) {
    adatok = adatok.map((e, i) => {
      if (i === Number($("IDD").value)) {
        return {
          nev: $("nevv").value,
          kor: $("korr").value,
          magassag: $("magassagg").value,
        };
      }
      return e;
    });
    addtotable();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  addtotable();
});

function sortTable(key) {
    let ascending = $("tbl").dataset.order === "asc" ? false : true;
    adatok.sort((a, b) => {
        let cellA = key === 'id' ? adatok.indexOf(a) : a[key];
        let cellB = key === 'id' ? adatok.indexOf(b) : b[key];
        
        if (!isNaN(cellA) && !isNaN(cellB)) {
            return ascending ? cellA - cellB : cellB - cellA;
        }
        return ascending ? cellA.toString().localeCompare(cellB.toString()) : cellB.toString().localeCompare(cellA.toString());
    });
    $("tbl").dataset.order = ascending ? "asc" : "desc";
    addtotable();
}

function filterTable() {
  let nevFilter = $("filter-nev").value.toLowerCase();
  let korFilter = $("filter-kor").value.toLowerCase();
  let magassagFilter = $("filter-magassag").value.toLowerCase();
  
  let filteredData = adatok.filter(e => 
    (e.nev.toLowerCase().includes(nevFilter)) &&
    (e.kor.toLowerCase().includes(korFilter)) &&
    (e.magassag.toLowerCase().includes(magassagFilter))
  );
  
  $("tbl").innerHTML = `
    <tr>
      <th onclick="sortTable('id')">Azonosító (katt a rendezéshez)</th>
      <th onclick="sortTable('nev')">Név (katt a rendezéshez)</th>
      <th onclick="sortTable('kor')">Kor (katt a rendezéshez)</th>
      <th onclick="sortTable('magassag')">Magasság (katt a rendezéshez)</th>
    </tr>`;
  $("tbl").innerHTML += filteredData
    .map((element, i) => {
      return `<tr>
              <td>${i}</td>
              <td>${element.nev}</td>
              <td>${element.kor}</td>
              <td>${element.magassag}</td>
            </tr>`;
    })
    .join("");
}