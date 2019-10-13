function fnlogin(){

	//Get Refrence of inputs
	var uidRef = document.getElementById('uid')
	var pwdRef = document.getElementById('pwd')

	//take values of inputs
	var uid = uidRef.value;
	var pwd = pwdRef.value;

	//Perform validations on inputs
	if( uid == '' || pwd == ''){
        alert('check u r data');
        return;

    }


    var dataObj={
        uid:uid,
        pwd:pwd
    }

    sendReq(
        'post',
        'http://localhost:2020/users/login',
        dataObj,
        function(res){
            debugger;
            if(res == ''){
                document.getElementById('msg').innerText = "Entered userid or password is wrong"
                uidRef.value = ''
                pwdRef.value = ''
            }else{
            	var res = JSON.parse(res)
                sessionStorage.setItem('uid',res.uid);
                sessionStorage.setItem('acc',res.accno);
                sessionStorage.isLoggedIn=true;
                if(res.role == 'employee'){
                 location.href='createaccount.html';
                }
                else if(res.role == 'Customer'){
                 location.href = 'userdetail.html'
                }
            }
        },
        function(res){
            debugger;
        }

    )
}


