// selector
var text = document.getElementById(`siteName`);
var email = document.getElementById(`siteUrl`);
var box = document.getElementById(`overlay`);
var searchPtn = document.getElementById(`search`);
var closebtn = document.getElementById(`closeBtn`);
var addbtn = document.getElementById(`addbtn`);
var updetabtn = document.getElementById(`updetabtn`);
var arr;
var index;


// check local Storege
if (localStorage.getItem("items") == null) {
  arr = [];
} else {
  arr = JSON.parse(localStorage.getItem("items"));
  display();
}

// run in app
function clicks() {
  if (
    text.classList.contains("is-valid") &&
    email.classList.contains("is-valid")
  ) {
    var date = {
      text: text.value,
      email: email.value,
    };

    arr.push(date);
    console.log(arr);
    display();

    localStorage.setItem("items", JSON.stringify(arr));

    clear();
  } else {
    box.style.display = " block";
    closebtn.addEventListener("click", function () {
      box.style.display = " none";
    });
  }
}

// display in dom
function display() {
  var tbody = ``;
  for (let i = 0; i < arr.length; i++) {
    tbody += ` 
    <tr>
      <td>${i + 1}</td>
      <td>${arr[i].text}</td>              
      <td>
        <button class="btn btn-visit btn-info" onclick= "link('${arr[i].email}')" data-index="0">
          <a id = "a"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
        </button>
      </td>
      <td>
        <button class="btn btn-delete btn-warning pe-2" onclick="update(${i})" data-index="0">
        <i class = "fa fa-pen"></i>
          Update
        </button>
      </td>
      <td>
        <button class="btn btn-delete btn-danger pe-2" onclick="delate(${i})" data-index="0">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
      </td>
  </tr>
  </tbody>`;
  }
  document.getElementById("tab").innerHTML = tbody;
}


// valid inputs
function valdCalor(el) {
  var regex = {
    siteName: /^[A-Z][a-z]{2,8}$/,
    siteUrl:
      /(https?:\/\/)?(www.)\w+.\w+(:\d{4}\/)?(\w+.\w+\D+\d+\D\w+\D\w+)?/gi,
  };

  if (regex[el.id].test(el.value) == true) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    el.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    el.classList.add("is-invalid");
    el.classList.remove("is-valid");
    el.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}


// visit link
// var links = `https://${valid.email}`;
function link(e) {
  window.open(e)
}

// delet item
function delate(d) {
  arr.splice(d, 1);
  display();
  localStorage.setItem("items", JSON.stringify(arr));
}

// clear data
function clear() {
  text.value = "";
  email.value = "";
}

// valid inputs
function valdCalor(el) {
  var regex = {
    siteName: /^[A-Z][a-z]{2,8}$/,
    siteUrl:
      /(https?:\/\/)?(www.)\w+.\w+(:\d{4}\/)?(\w+.\w+\D+\d+\D\w+\D\w+)?/gi,
  };

  if (regex[el.id].test(el.value) == true) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    el.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    el.classList.add("is-invalid");
    el.classList.remove("is-valid");
    el.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

//search
function search() {
  var word = searchPtn.value
  var tbody = ``
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].text.toLowerCase().includes(word.toLowerCase())) {
      tbody += ` 
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i].text}</td>              
        <td>
          <button class="btn btn-visit btn-info" onclick=link()" data-index="0">
            <a id = "a"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
          </button>
        </td>
        <td>
          <button class="btn btn-delete btn-warning pe-2" onclick="update(${i})" data-index="0">
          <i class = "fa fa-pen"></i>
            Update
          </button>
        </td>
        <td>
          <button class="btn btn-delete btn-danger pe-2" onclick="delate(${i})" data-index="0">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
    </tr>
    </tbody>`;
    }
    
  }
  document.getElementById("tab").innerHTML = tbody;
}

// update
function update(e) {
  index = e
  text.value = arr[e].text
  email.value = arr[e].email

  addbtn.classList.add("d-none")
  updetabtn.classList.remove("d-none")
}

function updateBtn() {
  arr[index].text = text.value
  arr[index].email = email.value
  updetabtn.classList.add("d-none")
  addbtn.classList.remove("d-none")

  clear()
  display(arr)
  localStorage.setItem("items", JSON.stringify(arr))
}