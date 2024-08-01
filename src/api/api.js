// 获取数据
// 显示后端的表格数据
// root: root 通常是指 Vue.js 组件实例。
// url: url 是一个字符串，表示要向后端服务器发起请求的 URL 地址。
// params: params 是一个对象，包含了查询字符串参数，这些参数会被附加到 GET 请求的 URL 后面。这些参数可能包括过滤条件、排序选项、分页信息等。例如，在分页的情况下，params 可能包含像 page 和 pageSize 这样的键值对。
export function getData(root,url,params){
    // console.log(params)
    // 这里是获取后端里数据的总条数，用来返回给limit，用于分页
    root.service.get(url + '/count')
    .then(res => {
        // 如果返回的值为200,那么将总条数设置为返回的总条数的值
        res.status === 200 ? root.total = res.data : root.total = 0
        root.service.get(url, {params: params})
        .then(res => {
        if (res.status === 200){
            console.log(res.data)


            // 这是“信息列表”中需要计算的东西
            res.data.forEach(item => {
                // 对表格中的“性别”中的值进行封装
                item.sex === "1" ? item.sex_text = "男" : item.sex_text = "女"
            })


            // 这是"作业列表"中需要计算的东西
            // 计算完成率和批改率
            res.data.forEach(item => {
                // 完成率
                // Math.round()为小数四舍五入,但只有整数
                // ().toFixed(2)是保留两位小数,()中的数字填多少就保留多少位
                item.completion = (item.completedNumber / (item.completedNumber + item.uncompletedNumber) * 100).toFixed(2) +'%'
                // 批改率
                item.checkRate = ((item.completedNumber - item.check) / item.completedNumber).toFixed(2) + '%'
            })


            root.tableData = [...res.data]
        } 
        })
        .catch(err => {
        console.error(err)
        })
    })
    .catch(err => {
        console.error(err)
    })
}



// 新增和修改数据
// root: root 通常是指 Vue.js 组件实例。
// method: method 是一个字符串，表示 HTTP 请求的方法类型，如 'post' 或 'patch'。
// url: url 是一个字符串，表示要向后端服务器发起请求的 URL 地址。
// message: message 是一个字符串，用于在操作成功后显示的消息。
// form: form 是一个字符串，代表 Vue 实例中的表单名称。
// callback: callback 是一个函数，通常用于在成功创建或更新数据之后执行某些操作，比如重新加载数据或刷新视图。在此就是回调getData函数。
export function changeInfo(root, method, url, message, form, callback){
    // 定义一个_url对象用来存放不同方法所需要的对应的url
    let _url = ''
    // 判断：如果方法为新增（post）那么_url就等于传回来的url的值
    // 否则就是判断方法为修改（patch）那么_url就等于url + '/' + url + '/' +root.form.id
    method === 'post' ? _url = url : _url = url + '/' +root.form.id
    // 用以上方法执行判断，可以只写一遍以下代码，而不用反复重写几遍

    // 修改方法的额外要求
    if(method === 'patch'){
        // 删除创建时间
        // delete this.form.createdDate
        // 删除最后修改时间
        // delete this.form,lastModifiedDate
    }

    // 调用接口
    root.service[method](_url, root.form)
    .then(res => {
    // console.log(res) 
    if(res.status === 201 || res.status === 200){
        // 新增或者修改完后关闭弹窗
        root.addStu = false
        // 对整个表单进行重置
        root.$refs[form].resetFields()
        // 弹出新增或者修改成功的消息
        root.$message({message: message,type: 'success',duration: 1500});
        // 由于要回调的函数为getData，所以callback带两个参数
        callback(root,url)
    }
    })
    .catch(err => {
        console.error(err)
    })
}



// 删除数据
// root: root 通常是指 Vue.js 组件实例。
// count: count是弹出框的内容。
// title: tiele是弹出框的标题。
// btn: btn是按钮的名称。
// url: url 是一个字符串，表示要向后端服务器发起请求的 URL 地址。
// message: message 是一个字符串，用于在操作成功后显示的消息。
// id: id是需要删除的数据的编号(id)
// callback: callback 是一个函数，通常用于在成功创建或更新数据之后执行某些操作，比如重新加载数据或刷新视图。在此就是回调getData函数。
export function remove(root, count, title ,btn, url, message, id, callback) {
    // 点击删除按钮，弹出确认删除的弹窗
    root.$alert(count, title, {
        confirmButtonText: btn,
        callback: () => {
            // 调用删除接口
            root.service.delete(url + '/' + id)
            .then(res => {
            console.log(res)
            // 判断返回的状态值是否为204
            if (res.status === 204){
                // 如果为204，则执行以下代码
                // 弹出删除成功的消息
                root.$message({message: message,type: 'success',duration: 1500});
                // 重新刷新表格
                callback(root,url,{})
            }
        })
        .catch(err => {
            console.error(err)
        })
        }
    });
}