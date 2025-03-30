const url = "http://gamf.nhely.hu/ajax2/";

function $(id) {
  return (id === "" ? null : document.getElementById(id));
}

ids = [];

function setStatus(text, isError = false) {
  $("status").innerHTML = text;
  if (isError) {
    $("status-container").className = "bg-red py-0-5 rounded mx-2 px-2";
  } else {
    $("status-container").className = "bg-green py-0-5 rounded mx-2 px-2";
  }
}

function _validateInput(fieldId) {
  if (
    ($(fieldId).value.length <= 0 ||
      $(fieldId).value.length > 30) ||
    $(fieldId).value === ""
  ) {
    $(fieldId).classList.add("br-red");
    console.log("error for ", fieldId);
    return;
  }
  $(fieldId).classList.remove("br-red");
  console.log("pass ", fieldId);
}

function heightStuff(heights) {
  $("height-sum").innerHTML = ((arr) =>
    arr.reduce((acc, curr) => acc + curr, 0))(heights);
  $("height-avg").innerHTML = ((arr) =>
    arr.reduce((acc, curr) => acc + curr, 0) / arr.length)(heights).toFixed(2);
  $("height-max").innerHTML = Math.max(...heights);
}

async function read() {
  setStatus("Reading...");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=read&code=" + $("code").value,
  })
    .then((data) => {
      if (!data.ok) {
        console.log("error");
        setStatus("Error", true);
        return;
      }
      return data.text();
    })
    .then((data) => {
      data = JSON.parse(data);
      removeInsertRow();
      $("tbl").innerHTML = `<tr>
        <th>Id</th>
        <th>Név</th>
        <th>Magasság</th>
        <th>Súly</th>
        <th>Frissítés</th>
        <th>Törlés</th>
      </tr>`;
      ids = [];
      heightStuff(data.list.map((row) => Number(row.height)));
      sort = data.list.sort((a, b) =>
        a.id - b.id
      );
      for (const row of data.list) {
        $("tbl").innerHTML += `<tr id="row-${row.id}">
          <td>${row.id}</td>
          <td><input type="text" onKeyUp="_validateInput('name-${row.id}')" id="name-${row.id}" value="${row.name}"/></td>
          <td><input type="text" onKeyUp="_validateInput('height-${row.id}')" id="height-${row.id}" value="${row.height}"/></td>
          <td><input type="text" onKeyUp="_validateInput('weight-${row.id}')" id="weight-${row.id}" value="${row.weight}"/></td>
          <td><a onclick="_edit(${row.id})" >Frissíés</a></td>
          <td><a onclick="_del(${row.id})" >Törlés</a></td>
        </tr>`;
        ids.push(row.id);
      }
      appendInsertRow();
    });
}

async function _del(id) {
  setStatus("Törlés...");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=delete&code=" + $("code").value + "&id=" + id,
  }).then((data) => {
    if (!data.ok) {
      console.log("error");
      setStatus("Hiba", true);
      return;
    }
    read();
  })
    .catch((error) => {
      console.log(error);
      setStatus("Hiba", true);
    });
}

async function _edit(id) {
  setStatus("Szerkesztés...");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=update&code=" + $("code").value + "&height=" +
      $("height-" + id).value +
      "&weight=" + $("weight-" + id).value + "&name=" + $("name-" + id).value +
      "&id=" + id,
  }).then((data) => {
    if (!data.ok) {
      console.log("error");
      setStatus("Hiba", true);
      return;
    }
    return data.text();
  })
    .then((data) => {
      if (Number(data) === 0) {
        console.log("error");
        setStatus("Hiba", true);
        return;
      }
      read();
    }).catch((error) => {
      setStatus("Hiba", true);
      console.log(error);
    });
}

async function _add() {
  setStatus("Hozzáadás...");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: "op=create&code=" + $("code").value + "&height=" + $("height").value +
      "&weight=" + $("weight").value + "&name=" + $("name").value,
  }).then((data) => {
    if (!data.ok) {
      console.log("error");
      setStatus("Hiba", true);
      return;
    }
    return data.text();
  })
    .then((data) => {
      if (Number(data) === 0) {
        console.log("error");
        setStatus("Hiba", true);
        return;
      }
      read();
    }).catch((error) => {
      setStatus("Hiba", true);
      console.log(error);
    });
}

function appendInsertRow() {
  $("tbl").innerHTML += `<tr id="insertRow">
      <td>Id</td>
      <td><input onKeyUp="_validateInput('name')"  id="name" placeholder="Fgh"/></td>
      <td><input onKeyUp="_validateInput('height')"  id="height" placeholder="12"/></td>
      <td><input onKeyUp="_validateInput('weight')"  id="weight" placeholder="21"/></td>
      <td  colspan="2"><a onclick="_add()" >Add</a></td>
  </tr>`;
  setStatus("Sorok száma: " + ids.length);
}

function removeInsertRow() {
  $("insertRow").remove();
}
