let tablinks = document.querySelectorAll('.tablink');
let tabcontents = document.querySelectorAll('.tabcontent');
for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].setAttribute('index', i);
    tablinks[i].onclick = function () {
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = ''
        }
        this.style.backgroundColor = '#ccc';
        let index = this.getAttribute('index');
        for (let i = 0; i < tabcontents.length; i++) {
            tabcontents[i].style.display = 'none';
        }
        tabcontents[index].style.display = 'block';
    }
}
// 获取到登录时输入的id和密码
let loginId = document.querySelector('#login').querySelectorAll('input')[0];
let loginCode = document.querySelector('#login').querySelectorAll('input')[1];
let loginBtn = document.querySelector('#login').querySelectorAll('.btn')[0];
const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")
//登录
// 获取注册时所需的用户名
let resName = document.querySelector('#register').querySelectorAll('input')[0];
let resId = document.querySelector('#register').querySelectorAll('input')[1];
let resCode = document.querySelector('#register').querySelectorAll('input')[2];
let registerBtn = document.querySelector('#register').querySelectorAll('.btn')[0];
//注册
registerBtn.addEventListener('click', () => {
    let host = 'https://db-api.amarea.cn'
    let key = 'users'
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
    }
    let name = resName.value;
    let pwd = resCode.value;
    let id = resId.value;
    requestOptions.body = JSON.stringify({
        id: id, name: name, password: pwd,   // 初始化一个空的待办清单
    });
    fetch(`${host}/${key}`, requestOptions) // 这里的网址没有id
        .then(response => response.json())
        .then(data => {
            console.log(data.id + "注册成功")
        })  //新创建后的数据的id
        .catch(err => {
            console.log(err)
            alert('用户已存在，注册失败')
        })
})
loginBtn.addEventListener('click', () => {
    let requestOptions = { // 里面不能有body
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    }
    let host = 'https://db-api.amarea.cn'
    let key = 'users'
    let id = loginId.value;
    let password = loginCode.value;
    fetch(`${host}/${key}/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.id === id) {
                if (data.password === password) {
                    console.log(data.name + '登录成功')
                    window.location.href = encodeURI('./index.html?uname=' + data.name);
                } else {
                    throw new Error("密码不正确")
                }
            } else {
                throw new Error("id不存在")
            }
        })
        .catch(err => console.log(err))
})