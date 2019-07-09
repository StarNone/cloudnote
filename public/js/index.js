var box = document.querySelector(".bottom-box");
axios.get("http://localhost:3000/article").then(res => {
    console.log(res.data)
    let str = "";
    res.data.data.forEach(item => {
        let template = `
        <a href="details?id=${item._id}" class="item">
            <div class="item-top clear-f">
                <div class="item-left">
                    <img src="${item.author.avatar}" alt="">
                </div>
                <div class="item-right">
                    <div class="item-right-one">
                        <span class="author-name">${item.author.name}</span>
                        <h2>${item.title}</h2>
                    </div>
                    <div class="item-right-two">
                        <span class="row-item">浏览: ${item.looknums}</span>
                        <span class="row-item">回复: ${item.commontnums}</span>
                        <span class="row-item">分类: ${item.category}</span>
                    </div>
                </div>
            </div>
            <div class="item-content">
               ${item.contentText} 
            </div>
        </a>`
        str += template
    });
    box.innerHTML = str;
})
var box1 = document.querySelector(".right-box");
axios.post("/ladingstatus").then(res => {
    console.log(res);
    if (res.data.num == 1) {
        let data = res.data.data;
        let template = `
        <div class="logoff">
        <div class="logoff-box">
            <img src="${data.avatar}" alt="">
            <div class="user">
                <p>萌新：${data.name}</p>
                <p>email:${data.email}</p>
            </div>
            <form action="/logooff"><button id="btn3" onclick="alert('退出登陆成功')"><span>退出登录</span></button></form>
        </div>
    </div>      
        `
        box1.innerHTML = template;
    }
})
var btn1 = document.querySelector(".btn1");
var input = document.getElementsByTagName("input")
btn1.onclick = function() {
    axios.post("/login", {
        email: input[0].value,
        password: input[1].value
    }).then(res => {
        console.log(res);
        var box1 = document.querySelector(".right-box");
        if(res.data.code == 200){
            let data = res.data.data;
            let str = "登陆成功, 欢迎" + data.name;
            alert(str);
            top.location = "http://localhost:3000";
        } else {
            alert(res.data.msg);
        }
        
    })
}
if(window.name!="hasLoad"){    

    location.reload();    
    window.name = "hasLoad";    
}else{    
    window.name="";    
} 


