function check_gender(c){

  var el_male=document.getElementById("id_gender_m");
  var el_female=document.getElementById("id_gender_f");

  if(c==0){
    if(el_male.checked==true){
      if(el_female.checked==true){
        el_female.checked=false;
      }
    }
  }
  else {
    if(el_female.checked==true){
      if(el_male.checked==true){
        el_male.checked=false;
      }
    }
  }
}

function toast_msg(a,b) {
    alert(b);
    /*var x = document.getElementById("id_snackbar");
    if(a==1){
      //message for error
      x.innerText=b;
      x.style.color="#00C853";
    }
    else if(a==0){
      //message for successfull
      x.innerText=b;
      x.style.color="#E53935";
    }

    //x.className = "show";
    //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    */

}

function event_closed() {
  alert("The events are closed...");
}

function check_error() {

  //boolean values
  var el_male=document.getElementById("id_gender_m");
  var el_female=document.getElementById("id_gender_f");
  var el_accomodation=document.getElementById("id_accomodation");
  //var el_toggle_college=document.getElementById("id_toggle_college");

  //text values
  var el_name=document.getElementById("id_name");
  var el_branch=document.getElementById("id_branch");
  var el_city=document.getElementById("id_city");
  var el_phone=document.getElementById("id_phone");
  var el_email=document.getElementById("id_email");
  //var el_college_value=document.getElementById("id_college_value");
  var el_college=document.getElementById("id_college");

  //events selection(multiple values)
  var el_set1=document.getElementById("id_set1");
  var el_set2=document.getElementById("id_set2");
  var el_set3=document.getElementById("id_set3");


  var el_sem=document.getElementById("id_sem");


  //check all the text options is filled
  if(el_name.value.trim()=="" || el_college.value.trim()=="" || el_city.value.trim()=="" ||
  el_phone.value.trim()=="" || el_email.value.trim()==""){
    toast_msg(0,"Fill all options...");
    return;
  }


  //check if gender is selected
  if(!el_male.checked && !el_female.checked){
    toast_msg(0,"Select gender...");
    return;
  }

  /*//check if college is selected
  if(el_college.value=="0"){
    toast_msg(0,"Select your college...");
    return;
  }

  //if other college is selected then check name
  if(el_college.value=="2"){
    if(el_college_value.value.trim()==""){
      toast_msg(0,"Enter college name..");
      return;
    }
  }*/

  //check branch is selected
  if (el_branch.value=="0") {
    toast_msg(0,"Select atleast one department...");
    return;
  }

  //check if sem is selected
  if (el_sem.value=="0") {
    toast_msg(0,"Select semester...");
    return;
  }

  //only 10 digits
  if(el_phone.value.length!=10){
    alert("Enter only last 10 digits...");
    return;
  }

  //check if email in valid or not
  var string = el_email.value,substring = "@",substring2=".com";
  if(!string.includes(substring && substring2)){
    toast_msg(0,"Invalid email...");
    return;
  }

  //check if atleast one event is selected
  if(el_set1.value==0 && el_set2.value==0 && el_set3.value==0 ){
    toast_msg(0,"Select atleast one event...");
    return;
  }

  //cancel
  if(el_set3.value==1){
    toast_msg(0,"Technical Treasure hunt is closed.. please select something else..");
    return;
  }

  //get gender in variable to store in database
  var str_gender;
  if(el_male.checked){
    str_gender="male";
  }
  else {
    str_gender="female";
  }

  //Realtime database
  /*var database = firebase.database();

  firebase.database().ref('registration').push().set({
    username: name.value,
    college: college.value,
    branch : branch.value,
    city: city.value,
    usn : usn.value,
    phone: phone.value,
    email: email.value
  });
  var college_name;

  if(el_college.value=="1"){
    college_name="becbgk2018";
  }
  else {
    college_name=el_college_value.value;
  }*/

  var el_load=document.getElementById("id_loader");
  el_load.style.visibility="visible";

  //firestore
  var db = firebase.firestore();
  var docData = {
    name: el_name.value.trim(),
    college: el_college.value.trim(),
    branch : el_branch.value,
    city: el_city.value.trim(),
    phone: el_phone.value,
    email: el_email.value.trim(),
    gender: str_gender,
    sem: el_sem.value,

    accomodation: el_accomodation.checked,
    events: {
      set1: el_set1.value,
      set2: el_set2.value,
      set3: el_set3.value,
    }
  };

  db.collection("fusion_2k18").add(docData)
  .then(function() {
    el_load.style.visibility="hidden";
    toast_msg(1,"Successfully submitted...");

      //empty all inputs
      el_name.value="";
      el_college.value="";
      el_city.value="";
      el_phone.value="";
      el_email.value="";
  })
  .catch(function(error) {
    el_load.style.visibility="hidden";
    toast_msg(0,"Error in registration:\n\n", error);
  });
}

function login() {
  var el_login=document.getElementById("id_pwd");
  if(el_login.value==""){
    alert("Enter password...");
    return;
  }

  var el_load=document.getElementById("id_loader");
  el_load.style.visibility="visible";

  var ref_root=firebase.database().ref("admin");

  ref_root.once('value').then(function(snapshot) {
    var username = snapshot.child("pwd").val();
    if(username==el_login.value){
      el_load.style.visibility="hidden";
      sessionStorage.setItem('status_allow', 'yes');
      window.location.href = "display_all.html";
    }
    else {
      el_load.style.visibility="hidden";
      alert("Wrong password...");
    }
  });
}

function logout(){

    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
      alert("Error\n\n"+error);
    });
}

function check_college() {
  var el_college=document.getElementById("id_college");
  var el_college_option=document.getElementById("id_toggle_college");

  if(el_college.value=="2"){
    el_college_option.style.display="block";
  }
  else {
    el_college_option.style.display="none";
  }
}
