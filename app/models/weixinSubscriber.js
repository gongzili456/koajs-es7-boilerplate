export default (sequelize, DataTypes) => {
	const model = sequelize.define('weixinSubscriber', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		date_modified: DataTypes.DATE,
		date_created: DataTypes.DATE,
		created_by: DataTypes.STRING,
		modified_by: DataTypes.STRING,
		assigned_by: DataTypes.STRING,
		deleted: DataTypes.INTEGER,
		openid: DataTypes.STRING,
		unionid: DataTypes.STRING,
		headimgurl: DataTypes.STRING,
		weixin_mp_id: DataTypes.STRING,
		subscribed: DataTypes.INTEGER,
		date_subscribed: DataTypes.DATE,
		data_un_subcribed: DataTypes.DATE,
		country: DataTypes.STRING,
		province: DataTypes.STRING,
		city: DataTypes.STRING,
		sex: DataTypes.STRING,
	})

	return model
}
