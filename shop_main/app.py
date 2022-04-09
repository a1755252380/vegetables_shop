import random

from flask import Flask , request , jsonify
import json
import pymysql
app = Flask(__name__)


db = pymysql.connect(host="139.159.142.192", user ="root", password ="huangwoqing1@", database ="shop_main", charset ="utf8")
# 得到一个可以执行SQL语句的光标对象
cursor = db.cursor()
#-----------------------------------------------------------------     登录     -----------------------------------------------------------------

#登录
#http://127.0.0.1:5000/login?username=123456&password=123456
@app.route('/login')
def Login():
    username = str(request.args.get('username'))
    password = str(request.args.get('password'))
    sql = "select * from shopUser where username = '%s' and password = '%s'" % (username,password)
    print(sql)
    # 执行SQL语句
    num = cursor.execute(sql)
    user = cursor.fetchone()
    if num >= 1:
        return jsonify({
            'staus':200,
            'data':{
                'id' : user[0],
                'username' : user[1],
                'password' : user[2],
                'phone' : user[3],
                'address' : user[4],
                'nickname' : user[5],
                'image' : user[6],
            },
            'msg':'登录成功'
        })
    else:
        return jsonify({
            'staus': 1000,
            'data': 0,
            'msg': '登录失败'
        })

#-----------------------------------------------------------------     主页     -----------------------------------------------------------------

#轮播图
#http://127.0.0.1:5000/carouselList
@app.route('/carouselList')
def Carousel():
    sql = "select * from shopCarousel"
    # 执行SQL语句
    cursor.execute(sql)
    list_sum = cursor.fetchall()
    list = []
    print(list_sum[0][1])
    for i in range(len(list_sum)):
        list.append(list_sum[i][1])
    return jsonify({
        'staus': 200,
        'data': list,
        'msg': '获取成功'
    })

#根据商品id查找商品
#http://127.0.0.1:5000/findGoods?goodsId=2
#根据商品id查找商品
#http://127.0.0.1:5000/login?username=root&password=123456
@app.route('/findGoods')
def FindGoods():
    goodsId = str(request.args.get('goodsId'))
    sql = "select * from shopGoods where id = '%s'" % (goodsId)
    # 执行SQL语句
    cursor.execute(sql)
    list_sum1 = cursor.fetchone()
    dict = {
        'id': list_sum1[0],
        'status': list_sum1[1],
        'name': list_sum1[2],
        'image1': list_sum1[3],
        'image2': list_sum1[4],
        'title': list_sum1[5],
        'price': list_sum1[6],
        'sales': list_sum1[7],
        'count': list_sum1[8],
        'imageDetail1': list_sum1[9],
        'imageDetail2': list_sum1[10],
    }
    return jsonify({
        'staus': 200,
        'data': dict,
        'msg': '查找成功'
    })

#商品列表
#http://127.0.0.1:5000/goodsList
@app.route('/goodsList')
def Goods():
    sql = "select * from shopGoods"
    # 执行SQL语句
    cursor.execute(sql)
    list_sum1 = cursor.fetchall()
    list_sum2 = []
    print(list_sum1[0][1])
    for i in range(len(list_sum1)):
        dict = {
            'id': list_sum1[i][0],
            'status' : list_sum1[i][1],
            'name' : list_sum1[i][2],
            'image1' : list_sum1[i][3],
            'image2' : list_sum1[i][4],
            'title' : list_sum1[i][5],
            'price' : list_sum1[i][6],
            'sales' : list_sum1[i][7],
            'count' : list_sum1[i][8],
            'imageDetail1' : list_sum1[i][9],
            'imageDetail2' : list_sum1[i][10],
        }
        list_sum2.append(dict)
    return jsonify({
        'staus': 200,
        'data': list_sum2,
        'msg': '获取成功'
    })

#-----------------------------------------------------------------     商品列表     -----------------------------------------------------------------

#销量优先
#http://127.0.0.1:5000/salesList
@app.route('/salesList')
def SalesList():
    sql = "select * from shopGoods order by goodsSales desc"
    # 执行SQL语句
    cursor.execute(sql)
    list_sum1 = cursor.fetchall()
    list_sum2 = []
    for i in range(len(list_sum1)):
        dict = {
            'id': list_sum1[i][0],
            'status': list_sum1[i][1],
            'name': list_sum1[i][2],
            'image1': list_sum1[i][3],
            'image2': list_sum1[i][4],
            'title': list_sum1[i][5],
            'price': list_sum1[i][6],
            'sales': list_sum1[i][7],
            'count': list_sum1[i][8],
            'imageDetail1': list_sum1[i][9],
            'imageDetail2': list_sum1[i][10],
        }
        list_sum2.append(dict)
    return jsonify({
        'staus': 200,
        'data': list_sum2,
        'msg': '获取成功'
    })

#价格排序
#http://127.0.0.1:5000/priceList?num=0
@app.route('/priceList')
def PriceList():
    number = request.args.get('num')
    sql = ""
    if number == '1':
        sql += "select * from shopGoods order by goodsPrice desc"
    else:
        sql += "select * from shopGoods order by goodsPrice asc"
    # 执行SQL语句
    cursor.execute(sql)
    list_sum1 = cursor.fetchall()
    list_sum2 = []
    for i in range(len(list_sum1)):
        dict = {
            'id': list_sum1[i][0],
            'status': list_sum1[i][1],
            'name': list_sum1[i][2],
            'image1': list_sum1[i][3],
            'image2': list_sum1[i][4],
            'title': list_sum1[i][5],
            'price': list_sum1[i][6],
            'sales': list_sum1[i][7],
            'count': list_sum1[i][8],
            'imageDetail1': list_sum1[i][9],
            'imageDetail2': list_sum1[i][10],
        }
        list_sum2.append(dict)
    return jsonify({
        'staus': 200,
        'data': list_sum2,
        'msg': '获取成功'
    })

#模糊查找搜索
#http://127.0.0.1:5000/searchGoodsList?search=玉米
@app.route('/searchGoodsList')
def SearchGoodsList():
    search = request.args.get('search')
    sql = "select * from shopGoods where goodsTitle like '%%%%%s%%%%'" %(search)
    # 执行SQL语句
    num = cursor.execute(sql)
    list_sum1 = cursor.fetchall()
    list_sum2 = []
    for i in range(len(list_sum1)):
        dict = {
            'id': list_sum1[i][0],
            'status': list_sum1[i][1],
            'name': list_sum1[i][2],
            'image1': list_sum1[i][3],
            'image2': list_sum1[i][4],
            'title': list_sum1[i][5],
            'price': list_sum1[i][6],
            'sales': list_sum1[i][7],
            'count': list_sum1[i][8],
            'imageDetail1': list_sum1[i][9],
            'imageDetail2': list_sum1[i][10],
        }
        list_sum2.append(dict)
    if num >= 1:
        return jsonify({
            'staus': 200,
            'data': list_sum2,
            'msg': '获取成功'
        })
    else:
        return jsonify({
            'staus': 200,
            'data': 0,
        })

#-----------------------------------------------------------------     购物车     -----------------------------------------------------------------

#加人购物车
#http://127.0.0.1:5000/addGoodsToCart?goodsId=2&userId=1&number=10
@app.route('/addGoodsToCart')
def AddGoodsToCart():
    #获取商品ID
    goodsid = request.args.get('goodsId')
    #获取用户ID
    userid = request.args.get('userId')
    #获取用户购买多少件商品
    number = request.args.get('number')
    # 执行SQL语句，根据商品ID获取商品的详情信息
    sql = "select * from shopGoods where id = %s" % (goodsid)
    cursor.execute(sql)
    goods = cursor.fetchone()
    # 执行SQL语句，插入数据到购物车
    # 执行SQL语句
    sql = "INSERT into shopCart(userId,goodsId,cartImage,cartName,cartTitle,cartPrice,cartNumber) values(%s,%s,'%s','%s','%s',%s,%s)" % \
          (int(userid),goodsid,goods[3],goods[2],goods[5],float(goods[6]),int(number))
    print(sql)
    try:
        # Execute the SQL command
        num = cursor.execute(sql)
        # Commit your changes in the database
        db.commit()
    except:
        # Rollback in case there is any error
        db.rollback()
    if num >= 1:
        return jsonify({
            'staus': 200,
            'data': 0,
            'msg': '添加成功'
        })
    else:
        return jsonify({
            'staus': 1000,
            'data': 0,
            'msg': '添加失败'
        })

#删除购物车的商品
#http://127.0.0.1:5000/deleteGoodsToCart?cartId=1
@app.route('/deleteGoodsToCart')
def DeleteGoodsToCart():
    cartId = str(request.args.get('cartId'))
    sql = "DELETE FROM shopCart where id = '%s'" % (cartId)
    # 执行SQL语句
    num = cursor.execute(sql)
    try:
        # Execute the SQL command
        cursor.execute(sql)
        # Commit your changes in the database
        db.commit()
    except:
        # Rollback in case there is any error
        db.rollback()
    if num >= 1:
        return jsonify({
            'staus':200,
            'data':0,
            'msg':'删除成功'
        })
    else:
        return jsonify({
            'staus': 1000,
            'data': 0,
            'msg': '删除失败'
        })

#获取购物车的商品
#http://127.0.0.1:5000/getShopCartList?userId=1
@app.route('/getShopCartList')
def getShopCartList():
    userId = str(request.args.get('userId'))
    sql = "select * from shopCart where userId = %s" % (userId)
    # 执行SQL语句
    num = cursor.execute(sql)
    list1 = cursor.fetchall()
    print(list1)
    list_sum = []
    for i in range(len(list1)):
        dict = {
            'id' : list1[i][0],
            'userId' : list1[i][1],
            'goodsId' : list1[i][2],
            'cartImageUrl' : list1[i][3],
            'cartName' : list1[i][4],
            'cartTitle' : list1[i][5],
            'cartPrice' : list1[i][6],
            'cartNumber' : list1[i][7],
        }
        list_sum.append(dict)
    if num >= 1:
        return jsonify({
            'staus':200,
            'data':list_sum,
            'msg':'获取成功'
        })
    else:
        return jsonify({
            'staus': 1000,
            'data': 0,
            'msg': '获取失败'
        })


#-----------------------------------------------------------------     订单中心     -----------------------------------------------------------------


#创建订单
#http://127.0.0.1:5000/createOrder?goodsIdList=1 3 5&userId=1
@app.route('/createOrder')
def createOrder():
    goodsIdList = str(request.args.get('goodsIdList')).split(" ")
    userId = str(request.args.get('userId'))
    print(goodsIdList)
    #获取用户的信息
    sql = "select * from shopUser where id = %s" % (userId)
    cursor.execute(sql)
    user = cursor.fetchone()
    print("user",user)
    #获取商品的消息
    goods_sum = []
    money_sum = 0.0
    a = ['a', 'b', 'c', 'd', 'e', 'q', 'w', 'y', 'u', 'o', 'z', 'm', 'n', 'v', 'l', 'k', 'j', 'h', 'g']
    b = random.sample(a, 10)
    number = ''
    for i in b:
        number += i
    for i in range(len(goodsIdList)):
        sql = "select * from shopGoods where id = %s" % (goodsIdList[i])
        cursor.execute(sql)
        goods = cursor.fetchone()
        print(goods)
        dict = {
            'id' : goods[0],
            'name' : goods[2],
            'image' : goods[3],
            'money' : goods[6],
        }
        money_sum += float(goods[6])
        goods_sum.append(dict)
        #要把购物车里面对应的商品删除掉
        sql = "DELETE FROM shopCart where goodsId = '%s'" % (goods[0])
        try:
            # Execute the SQL command
            cursor.execute(sql)
            # Commit your changes in the database
            db.commit()
        except:
            # Rollback in case there is any error
            db.rollback()
        #添加对应数据到订单表里面
        sql = "INSERT INTO shopOrder(userId,goodsId,goodsName,imageUrl,money,flag,status) VALUES(%s,%s,'%s','%s',%s,%s,'%s')" % (user[0],goods[0],str(goods[2]),str(goods[3]),float(goods[6]),0,number)
        try:
            # Execute the SQL command
            cursor.execute(sql)
            # Commit your changes in the database
            db.commit()
        except:
            # Rollback in case there is any error
            db.rollback()
    return jsonify({
        'staus': 200,
        'data': {
            'user' : user,
            'goodsSum' : goods_sum,
            'moneySum' : money_sum
        },
        'msg': '创建成功'
    })

#删除购物车的商品
#http://127.0.0.1:5000/detailGoodsToCart?cartId=1
@app.route('/detailGoodsToCart1')
def detailGoodsToCart1():
    cartId = str(request.args.get('cartId'))
    sql = "DELETE FROM shopCart where id = '%s'" % (cartId)
    # 执行SQL语句
    num = cursor.execute(sql)
    try:
        # Execute the SQL command
        cursor.execute(sql)
        # Commit your changes in the database
        db.commit()
    except:
        # Rollback in case there is any error
        db.rollback()
    if num >= 1:
        return jsonify({
            'staus':200,
            'data':0,
            'msg':'删除成功'
        })
    else:
        return jsonify({
            'staus': 1000,
            'data': 0,
            'msg': '删除失败'
        })
#获取所有订单的信息
#flag   0-》待付款   1-》待收货   2-》已完成   3-》已取消
#http://127.0.0.1:5000/getAllshopOrder
@app.route('/getAllshopOrder')
def getAllshopOrder():
    userId = str(request.args.get('userId'))
    sql = "select * from shopOrder where userId = %s " % (userId)
    # 执行SQL语句
    num = cursor.execute(sql)
    list1 = cursor.fetchall()
    print(list1)
    list_sum = []
    for i in range(len(list1)):
        dict = {
            'id' : list1[i][0],
            'userId' : list1[i][1],
            'goodsId' : list1[i][2],
            'goodsName' : list1[i][3],
            'imageUrl' : list1[i][4],
            'money' : list1[i][5],
            'flag' : list1[i][7],
            'status' : list1[i][6],
            'createDate' : list1[i][8],
        }
        list_sum.append(dict)
    if num >= 1:
        return jsonify({
            'staus':200,
            'data':list_sum,
            'msg':'获取成功'
        })
    else:
        return jsonify({
            'staus': 1000,
            'data': 0,
            'msg': '获取失败'
        })

#更新订单的状态
#flag   0-》待付款   1-》待收货   2-》已完成   3-》已取消
#127.0.0.1:5000/updateShopOrder?flag=1&orderId=20
@app.route('/updateShopOrder')
def updateShopOrder():
    flag = str(request.args.get('flag'))
    orderId = str(request.args.get('orderId'))
    sql = "UPDATE shopOrder SET flag = %s WHERE id = %s" % (flag,orderId)
    # 执行SQL语句
    num = cursor.execute(sql)
    try:
        # Execute the SQL command
        cursor.execute(sql)
        # Commit your changes in the database
        db.commit()
    except:
        # Rollback in case there is any error
        db.rollback()
    if num >= 1:
        return jsonify({
            'staus':200,
            'data':0,
            'msg':'更新成功'
        })
    else:
        return jsonify({
            'staus': 1000,
            'data': 0,
            'msg': '更新失败'
        })

@app.route('/')
def hello_world():
    a = ['a', 'b', 'c', 'd', 'e', 'q', 'w', 'y', 'u', 'o', 'z', 'm', 'n', 'v','l', 'k', 'j', 'h', 'g']
    # a = ['a','b','c','d','e','q','w','y','u','o','z','m','n','v','l','k','j','h','g']
    # a = range(1, 100, 2)
    b = random.sample(a, 10)
    print(b)
    str = ''
    for i in b:
        str += i
    print(str)

if __name__ == '__main__':
    hello_world()
    app.debug = True
    app.run(debug=True)
