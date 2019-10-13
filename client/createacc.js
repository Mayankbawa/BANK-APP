function fncreateacc(){

	var uidRef = document.getElementById('uid')
	var pwdRef = document.getElementById('pwd')
	var accnoRef = document.getElementById('acno')
	var nameRef = document.getElementById('name')
	var phRef = document.getElementById('phno')
	var emailRef = document.getElementById('email')
	var roleRef = document.getElementById('role')
	var acctypeRef = document.getElementById('acctype');
    var amtRef = document.getElementById('balance');


	var uid = uidRef.value;
	var pwd = pwdRef.value;
	var accno = accnoRef.value;
	var name = nameRef.value;
	var phno =phRef.value;
	var email = emailRef.value;
	var role = roleRef.options[roleRef.selectedIndex].value;
	var acctype = acctypeRef.options[acctypeRef.selectedIndex].text;
    var amt = amtRef.value;


	if( uid == '' || pwd == ''|| accno == '' || name == '' || phno == '' || email == '' || acctype == '' || role == '' || amt == ''){
        alert('check u r data');
        return;

    }


	var dataObj = {

         'uid': uid,
         'pwd': pwd,
         'accno': accno,
         'name': name,
         'phno': phno,
         'email': email,
         'role'	: role,
         'acctype': acctype,
         'amt': amt

	}


	sendReq(
        'post',
        'http://localhost:2020/users/createacc',
        dataObj,
        function(res){
            debugger;
            if(res == ''){

            	alert('please enter valid data')
                
            }else{
            	
                alert('Created Successfully')

                
            }
        },
        function(res){
            debugger;
        }

    )
}

fnIsLoggedIn();

var user = sessionStorage.getItem('uid');
document.getElementById('person').innerText = user;


