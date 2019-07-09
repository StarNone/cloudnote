var E = window.wangEditor
var editor = new E('#editor1')
editor.create();
var input = document.querySelectorAll(".labels div label input");
var span = document.querySelectorAll(".labels div span");
var title = document.querySelector(".title input");
var btn = document.querySelector(".release");
var arr = [];
for (let i = 0; i < input.length; i++) {
    input[i].onclick = function () {
        if (input[i].checked) {
            span[i].onmousemove = null;
            span[i].onmouseout = null;
            span[i].style.backgroundColor = "#409eff";
            span[i].style.color = "#fff";
            arr.push(span[i].textContent);
        } else {
            span[i].style.backgroundColor = "white";
            span[i].onmousemove = function () {
                span[i].style.color = "#409eff";
            }
            span[i].onmouseout = function () {
                span[i].style.color = "#606266";
            }
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] == span[i].textContent) {
                    arr.splice(j, 1);
                }
            }
        }
    }
}

btn.addEventListener('click', function () {
    console.log()
    axios.post("/writearticle", {
        title: title.value,
        contentText: editor.txt.html(),
        category: arr
    }).then(res => {
        if (res.data.code == 200) {
            alert(res.data.msg);
            top.location = "http://localhost:3000";
        } else {
            alert(res.data.msg);
        }

    })
})