

let username = document.querySelector("#user");
let webname = document.querySelector("#web");
let password = document.querySelector("#pass");

let btns = document.querySelector("#btn");
btns.addEventListener('click', (e) => {
  e.preventDefault() // no reloated of page
  //   console.log("tapped"); 
  console.log(password.value, username.value, webname.value);
  let info = localStorage.getItem("passwords");
  console.log(info);
  if (info != 0) {
    let json = [];
    json.push({ username: username.value, password: password.value, webname: webname.value });
    localStorage.setItem("passwords", JSON.stringify(json));
    // console.log(" value pushed");
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({ webname: webname.value, username: username.value, password: password.value });
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPassword();

});


const showPassword =()=>{


let tb = document.querySelector("table");
let data = localStorage.getItem("passwords");
if (data == null || JSON.parse(data).length==0) {
  tb.innerHTML = "No password is added";
} else {
  tb.innerHTML = `<tr class="section">
            <th>Web site </th>
            <th>User name </th>
            <th>Password </th>
            <th>Option</th>
          
        </tr>`;
  let arr = JSON.parse(data);
  let str = "";
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];




    str += `<tr>        
      <td>${element.webname}<img onclick="copyText('${element.webname}')" src="download.png" alt="Copy"></td>
    <td>${element.username}<img onclick="copyText('${element.username}')" src="download.png" alt="Copy"></td>
    <td>${maskPassword(element.password)}<img onclick="copyText('${element.password}')" src="download.png" alt="Copy"></td>
    <td><button class="btnsn" onclick="deletepassword('${element.webname}')">Delete</button></td>
    
    </tr>`
    tb.innerHTML = tb.innerHTML + str;
  }
  webname.value ="";
  username.value ="";
  password.value ="";

}
// 

}

showPassword();

const deletepassword=(webname)=>{
  let data = localStorage.getItem("passwords");
 let arr =JSON.parse(data);
 arrUpdate=arr.filter((e)=>{
  return e.webname!=webname
 });
 localStorage.setItem("passwords", JSON.stringify(arrUpdate));
//  alert('succesfully deleated ${websitename} password');
 showPassword();

}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied text: " + text);
  }).catch(() => {
    alert("Failed to copy text.");
  });
}




function maskPassword(pass){
  let str ="";
  for(let index=0; index<pass.length; index++){
    str+="*";
  }
  return str
}



