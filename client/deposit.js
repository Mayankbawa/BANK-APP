function fnSearch(){
    var accnoRef = document.getElementById('acno');

    var accno = accnoRef.value;
    var d = new Date();

    if(accno == ''){
        alert('please enter accno');
        return;
    }


    sendReq(
        'get',
        'http://localhost:2020/bankaccount/get-acc?accno='+accno,
        undefined,
        function(res){
            debugger;
            if(res == ''){
                alert('please enter valid accno');
            }else{
                res=JSON.parse(res);
                document.querySelector('#content').classList.remove('disp-none');
                document.querySelector('#disp-name').innerText=res.name;
                document.querySelector('#disp-acc').innerText= res.accno;
                document.querySelector('#disp-phone').innerText=res.phno;

                document.getElementById('dt').value = d;

            }
        },
        function(res){
            debugger;
        }
    )

}

//deposit amount in the account

        function fndeposit(){

            var amtRef = document.getElementById('amt');
            var d = new Date();

            var amt = amtRef.value;

            if(amt == ''){
            alert('pelase enter amount');
            return;
            }
            if(isNaN(amt)){
            alert('please enter numebr only');
            return;
            }

            var dataObj={
                     'accno':document.querySelector('#acno').value,
                     'name':document.getElementById('disp-name').innerText,
                     'date':d,
                     'amt':amt,
            }
                            

                    sendReq(
                        'post',
                        'http://localhost:2020/bankaccount/deposit',
                         dataObj,
                         function(res){
                            debugger;
                            var res = JSON.parse(res);
                            if (res.nModified == 1 && res.ok == 1) {
                            alert('Deposited');
                            document.querySelector('#content').classList.add('disp-none');
                            document.querySelector('#acno').value='';
                            } else {

                            alert('try again');
                            }
                                },
                                function(res){
                                    debugger;
                                }
                            )
                        }


    