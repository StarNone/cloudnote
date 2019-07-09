var btn = document.querySelector(".btn1");
var input = document.getElementsByTagName("input")
btn.onclick = function() {
    axios.post("/registe",{name:input[0].value,email:input[1].value,password:input[2].value}).then(res => {
        if(res.data.code == 200){
            alert(res.data.msg);
            top.location = "http://localhost:3000"
        }else{
            alert(res.data.msg);
        }
    })
}