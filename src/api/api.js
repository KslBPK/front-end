// 获取数据
// 显示后端的表格数据
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