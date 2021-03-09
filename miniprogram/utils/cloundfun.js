//请求数据库
const db = wx.cloud.database(); //指定要操作的数据库
// 查找
export const dbGet = (param) => {
	const promise = new Promise((resolve, reject) => {
		db.collection(param.name)
			.get()
			.then(res => {
				resolve(res.data)
			}).catch(err => {
				console.log(err);
				message('请联系开发者，连接错误！')
			})
	})
	return promise
}

const message = (text) => {
	wx.showToast({
		title: text,
		'icon': 'none',
		duration: 2000
	})
}
