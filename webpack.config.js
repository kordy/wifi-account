'use strict';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//var NODE_ENV = process.env.NODE_ENV || 'development';
var NODE_ENV = 'dev';
var webpack = require('webpack');
var path = require('path');

var srcPath = path.join(__dirname, 'webapp');

module.exports = {
	target: 'web',
	cache: true,

	entry: {
		myApp: srcPath + "/components/myApp.jsx"
	},
	resolve: {
		root: srcPath,
		extensions: ['', '.js'],
		modulesDirectories: ['node_modules', 'webapp']
	},
	output: {
		path: __dirname + "/release",
		library: "[name]",
		filename: "/js/[name].js"
	},
	module: {
		loaders: [
			{
				//include: //тоже самое, что и тест но используется для проверки путей. только строка
				test:/\.jsx?$/, //ко всем файлам оканчивающимся на js или jsx будет применен бабел
				include: /webapp/,
				//include: __dirname+'/webapp/', //к чему будет применяться этот лоадер
				loader: 'babel?optional[]=runtime' //модуль который применяем, можно через восклицательный знак перечислять. через ? знак можно указать доп параметры в лоадер
				//у бабела опция рунтайм позволяет выносить вспомогательные функции в отдельную функцию иначе он дублирует их при сборке в каждый модуль. Экономит место нет дублирования кода.
			},
			// CSS
			{
				test: /\.css/,
				include: /webapp/,
				loader: ExtractTextPlugin.extract('style-loader','css')
			},
			// LESS
			{
				test: /\.less$/,
				include: /webapp/,
				loader: ExtractTextPlugin.extract('style-loader','css!less') //этот плагин нужен, чтобы выносить css в отельный файл, первый параметр указывает на loader который будет использоваться если стили остались в js (например подгужаются через require.insurence)
			},
			//files
			{
				test: /\.(png|jpg|svg|gif|ttf|eof|woff|woff2)/, //будет брать все поключенные файлы из компоненты и сохранять их.
				loader: 'file?name=/i/[hash]_[name].[ext]'
			}
		]
		//noParse: /lib\/React.js/ //можно указать какие файлы не парсить на зависимости (в каких нет require), это ускоряет время сборки
	},
	plugins:[

		new webpack.NoErrorsPlugin(), //не будет собирать и перезаписывать сборку, если есть возникают ошибки

		new webpack.HotModuleReplacementPlugin(),

		new HtmlWebpackPlugin({
			inject: true,
			template:  'webapp/index.html'
		}),

		new webpack.DefinePlugin({
			NODE_ENV:JSON.stringify(NODE_ENV) //важно стрингифаить, иначе передаваться будет значение переменной, как переменная
		}), //сюда сожно передавать любые переменныепеременные, которые будут доступны внутри и будут подставлятся при сборке

		//new webpack.EnviromentPlugin('NODE_ENV'), //сюда сожно передавать свойства process.env, которые будут доступны внутри и будут подставлятся при сборке

		new webpack.optimize.CommonsChunkPlugin({ //выделяет общий код из всех точек сборки (код который будет использоваться на всех страницах)
			name: 'common',
			minChunks: 2 //будет выносить код который используется минимум в 2 точках сборки
		}),

		new webpack.ProvidePlugin({ //если webPack найдет в коде не обьявленную переменную, то он попробует найти эту переменную в этом плагине, если найдет то подключит соответсвубщий модуль
			React: 'react' //Мы можем использовать переменную react постоянно не подключая его в шапке компоненты
		}),
		new ExtractTextPlugin('style.css',{allChunks: true})  //выносим css в отельный файл, allChunks - запаковывает в этот файл все стили, даже те которые подгружаются динамически через require.ensurance

	],

	watchOptions:{
		aggreagateTime: 100
	},
	debug: true,
	devtool: "eval-cheap-module-source-map", //При отладке код будет разбит по модулям, можно увидеть где на самом деле произошла ошибка (Хорошо работает в хроме)
	devServer: {
		contentBase: "./release",
		historyApiFallback: true
	},

	watch: true,
	externals: { //если внешний js (из CDN) подключен отдельно через script и он возвращает свою переменную, мы можем использовать его внутри наших модулей через require (var $  = require('jquery')), даже если его нет в пакете node_modules
		//jquery: "$" //т.е. подключенная в head jquery возвращает $, мы говорим использовать $ когда будет require('jquery')
	}
};

if(NODE_ENV != 'dev'){ //если продакшн добавляем плагин, который минимизирует и оптимизирует код
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings: false, //убрать ворнинги
				drop_console: true, //убрать вывод в консоль
				unsafe: true
			}
		})
	);
}