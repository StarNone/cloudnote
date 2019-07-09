let content = document.querySelector(".content");
var search = location.search;
axios.get(`http://localhost:3000/detail${search}`).then(res => {
    console.log(res);
    let item = res.data.data;
    let date = new Date(item.createtime);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let str = year + "年" + month + "月" + day + "日";
    let template = `
        <h2>${item.title}</h2>
        <div class="content-msg">
            <div class="content-top">
                <div class="author">
                    作者:
                    <span class="author-name">${item.author.name}</span>
                </div>
                <div class="create-time">${str}</div>
            </div>
            <div class="content-details">${item.contentText}</div>
        </div>
    `
    content.innerHTML = template;
})









