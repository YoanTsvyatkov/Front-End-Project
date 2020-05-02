const firebaseConfig = {
    apiKey: "AIzaSyDiiKd0_UD3ca01iNymJiWgttW_lJkj_kM",
    authDomain: "cars-bg-d128b.firebaseapp.com",
    databaseURL: "https://cars-bg-d128b.firebaseio.com",
    projectId: "cars-bg-d128b",
    storageBucket: "cars-bg-d128b.appspot.com",
    messagingSenderId: "744003723986",
    appId: "1:744003723986:web:2ffaf5ef9462cb8d2b430b",
    measurementId: "G-QLL3N5F4WR"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Registration start
  var ref = firebase.database().ref('users');
  var regForm =  document.getElementById("register-form");

  if(regForm != null)
  document.getElementById("register-form").addEventListener('submit', submitForm);


//Submiting information to database
var flag = true; // Flag that checks if registration is correct
function submitForm(e){
    e.preventDefault();

    var name =  getValueById("Username");
    var email =  getValueById("Email");
    var password =  getValueById("Password");

    ref.on("value", checkData, errorData);
 
    if(flag){
        if(validateEmail(email)){
            savaData(name, email, password);

            document.getElementById('alert').style.display = "block";

            setTimeout(function(){
                document.getElementById('alert').style.display = "none";
            }, 2000);

            document.getElementById("register-form").reset();
        }else{
               document.getElementById("error").style.display = "block";

                setTimeout(function(){
                 document.getElementById("error").style.display = "none";
                }, 2000);
              
                document.getElementById("register-form").reset();
        }
    }else{
        document.getElementById("error").style.display = "block";

        setTimeout(function(){
         document.getElementById("error").style.display = "none";
        }, 2000);
      
        document.getElementById("register-form").reset();
        flag = true;
    }
}

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function getValueById(id){
    return document.getElementById(id).value;
}

function savaData(name, email, password){
    ref.push({
        name:name,
        email:email,
        password:password
    });
}

 //Registration end

 //Login start
 var loginForm = document.getElementById("login-form");

 if(loginForm != null)
 loginForm.addEventListener('submit', checkLoginInfo);

 function checkLoginInfo(e){
  e.preventDefault();

  ref.on("value", gotData, errorData);
 }

 //Register validation of usernam and password
 function checkData(data){
    let name =  getValueById("Username");
    let email =  getValueById("Email");
    var users = data.val();

    if(users != null){
       var keys = Object.keys(users);

       for(var i = 0; i < keys.length; i++){
           var key = keys[i];
           var obj = users[key];
           if(obj.name == name || obj.email == email){
                flag = false;
                return;
           }
       }
   }
 }

 function gotData(data){
     var username = getValueById('Username');
     var password = getValueById('Password');
     var users = data.val();

     if(users != null){
        var keys = Object.keys(users);

        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            var obj = users[key];
            if(obj.name == username && obj.password == password){
                window.location.href = "index.html";
                return;
            }
        }
    }

   document.getElementById("error").style.display = "block";

   setTimeout(function(){
    document.getElementById("error").style.display = "none";
   }, 2000);

   document.getElementById("login-form").reset();
 }

 function errorData(err){
   document.getElementById("error").style.display = "block";

   setTimeout(function(){
    document.getElementById("error").style.display = "none";
   }, 2000);

   document.getElementById("login-form").reset();
 }

