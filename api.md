
# auth
### consumer register

    url:
        /register/consumer
    body:
        consumer

### dealer register

    url:
        /register/dealer
    body:
        dealer
        

### login using username and password
    url:
        /login/up
    param:
        username string
        password string

### edit consumer
    url:
        /consumer/edit
    body:
        consumer
        
        
### edit dealer
    url:
        /dealer/edit
    body:
        dealer

### user add discount
    url:
        /user/adddiscount
    body
        discount

### get user info
    url:
        /user/info
    return:
        list<user>
        

### get consumer info
    url:
        /consumer/info
    return:
        list<consumer>
        
# store
### getallstore
    url:
        /store/getall
    
    return:
        List<Store>
### createstore
    url:
        /store/create
    param:
        address string
        phone string

### get store(used by dealer)
    url:
        /store/get
        
### edit store
    url:
        /store/edit
    body:
        store
### add discount
    url:
        /sotre/adddiscount
    body:
        discount

### remove discount
    url:
        /store/removediscount
    body:
        discount


# good
### getbydealerid
    url:
        /goods/getbystoreid
    param:
        dealerid string
    return:
        List<goods>

### addgoods
    url:
        /goods/addgood
    body:
        goods
### getallgood
    url:
        /goods/getallgood
    return:
        List<goods>
### getgoodbysound
    url:
        /goods/getbysound
    name:
        file
    return:
        List<goods>
### getgoodbytag
    url:
        /goods/searchbytag
    param:
        tag string
    return:
        List<goods>
### search good by name
    url:
        /goods/search
    param:
        sound:string
    return:
    list<goods>
# cart
### add to cart
    url:
        /cart/add
    body:
        cart
### 一键买菜
    url:
        /cart/autobuy

### find one user's cart
    url:
        /cart/findbyuserid
    return:
        list<cart>

### 结算购物车
    url:
        /cart/clean
    body:
        cleancart
    return:
        totalmoney

### 编辑购物车
    url:
        /cart/edit
    body:
        cart

### 删除购物车项
    url:
        /cart/delete
    param:
        cartId: int

# order
### edit order
    url:
        /order/edit
    body:
        userorder
### get order by order id
    url:
        /order/getbyorderid
    param:
        orderid
    return:
        userorder
### get orders by user id
    url:
        /order/getbyuserid
    return:
        list<userorder>

### get order by dealer id
    url:
        /order/getbydealerid
    return:
        list<userorder>

### get goods in orders
    url:
        /order/getitems
    param:
        orderid:int
    return:
        list<orderitem>
# image
### upload image
    url:
        /image/upload
    param:
        id:int
    body:
        file:{your image}
    content-type:
        multipart/form-data

### get image
    url:
        /image/get
    param:
        id: int

    return:
        byte[]
        
 # address
 ### add address
    url:
        /address/add
    body:
        address
### get address by userid
    url:
        /address/getbyuserid
    return:
        address
