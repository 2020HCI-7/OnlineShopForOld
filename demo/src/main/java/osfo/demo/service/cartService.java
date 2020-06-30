package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import osfo.demo.dao.cartDao;
import osfo.demo.dao.discountDao;
import osfo.demo.dao.goodDao;
import osfo.demo.dao.orderDao;
import osfo.demo.entity.*;
import osfo.demo.util.restapi.response;

import java.util.*;

@Service
public class cartService {
    @Autowired
    cartDao cartdao;
    @Autowired
    orderDao orderdao;
    @Autowired
    goodDao gooddao;
    @Autowired
    discountDao discountdao;
    public Object addtocart(Integer userid,Cart mycart)
    {
        Iterable<Cart> carts =cartdao.getallbyuserid(userid);
        for(Cart cart:carts)
        {

            Goods good=gooddao.getgoodbyid(cart.goodId).get();
            if(cart.goodId.equals(mycart.goodId))
            {
                cart.setNumber(cart.number+mycart.number);
                return new response(true,null,cartdao.save(cart));
            }

        }
        return new response(true,null,cartdao.save(mycart));
    }
    public Object getmycart(Integer userid)
    {
        List<cartutil> tmp=new LinkedList<cartutil>();
        Iterable<Cart> carts =cartdao.getallbyuserid(userid);
        for(Cart cart:carts)
        {
            Goods good=gooddao.getgoodbyid(cart.goodId).get();
            cartutil tmpu=new cartutil();
            tmpu.cart=cart;
            tmpu.good=good;
            tmp.add(tmpu);

        }
        return new response(true,null,tmp);
    }
    public Object cleancart(Integer userid, cleancart info)
    {
        Iterable<Cart> carts =cartdao.getallbyuserid(userid);
        Map<Integer,LinkedList<Cart>> orders=new HashMap<Integer,LinkedList<Cart>>();
        float totalmoney=0.0f;
        for(Cart cart:carts)
        {
            Goods good=gooddao.getgoodbyid(cart.goodId).get();
            if(cart.selected)
            {
                if(orders.containsKey(good.getStoreId()))
                {
                    orders.get(good.getStoreId()).add(cart);
                }
                else
                {
                    orders.put(good.getStoreId(),new LinkedList<Cart>());

                    orders.get(good.getStoreId()).add(cart);
                }
                cartdao.delete(cart.id);
            }

        }
        List<UserDiscount> discounts=discountdao.getallbyid(info.discountIds);

        for(Map.Entry<Integer,LinkedList<Cart>> entry:orders.entrySet())
        {
            Integer storeid=entry.getKey();
            Userorder order=new Userorder();
            order.setStoreId(storeid);
            order.setUserId(userid);
            order.setAddressId(info.addressId);
            order.setDate(new Date());
            order.setStatus(0);
            order=orderdao.saveorder(order);
            float money=0.0f;
            for(Cart cart:entry.getValue())
            {
                OrderItem item=new OrderItem();
                item.setNumber(cart.getNumber());
                item.setGoodId(cart.getGoodId());
                item.setUserorderId(order.getId());

                orderdao.saveorderitem(item);
                Goods good=gooddao.getgoodbyid(cart.goodId).get();
                item.setGoodname(good.getGoodname());
                item.setGoodprice(good.getLeastPrice());
                System.out.println(cart.goodId);
                money+=good.getLeastPrice()*cart.getNumber();
                System.out.println(cart.goodId);
            }
            float finalmoney=money;
            System.out.println(finalmoney);
            for(UserDiscount tmp:discounts)
            {
                if(tmp.getStoreId()==storeid)
                {
                    if(tmp.getMan()<=finalmoney)
                    {
                        finalmoney-=tmp.getJian();
                        discountdao.deleteuserdiscount(tmp);
                        order.setMan(tmp.getMan());
                        order.setJian(tmp.getJian());
                        break;
                    }
                }
            }
            totalmoney+=finalmoney;

            order.setMoney(money);
            order.setFinalmoney(finalmoney);
            orderdao.saveorder(order);
        }
        return new response(true,null,totalmoney );
    }
    public Object removecart(Integer cartid)
    {
        cartdao.delete(cartid);
        return new response(true,null,null );
    }
    public Object autobuy(Integer userid)
    {
        List<orderutil> orderutils = orderdao.getorderbyuserid(userid);
        if(orderutils.isEmpty())
        {
            return new response(false,"请先尝试一次买菜后再进行自动买菜哦",null);
        }
        orderutil tmp=orderutils.get(orderutils.size()-1);
        Iterable<OrderItem> orderItems = orderdao.getorderitem(tmp.order.id);
        for(OrderItem item:orderItems)
        {
            Cart cart=new Cart();
            cart.setNumber(item.getNumber());
            cart.setUserId(userid);
            cart.setGoodId(item.getGoodId());

            cartdao.save(cart);
        }
        return new response(true,null,null );
    }
    public Object soundbuy(String sound,Integer userid)
    {
        try{
            int i=0;
            for(;i<sound.length();++i)
            {
                if(isnum(sound.substring(i,i+1)))
                {
                    break;
                }
            }
            int p=sound.indexOf("斤");
            List<Goods> goods = gooddao.getgoodsbyname(sound);
            Goods goods1 = goods.get(0);

            int i1 = chineseNumber2Int(sound.substring(i, p));
            Cart cart=new Cart();
            cart.setGoodId(goods1.getId());
            cart.setUserId(userid);
            cart.setNumber(chineseNumber2Int(sound.substring(i,p)));
            cartdao.save(cart);
            return new response(true,"",null);
        }
        catch (Exception e)
        {
            return new response(false,"cant recognize",null);
        }

    }
    public Object editcat(Cart cart)
    {
        return new response(true,null,cartdao.save(cart));
    }

    public boolean isnum(String str)
    {
        String tmp="零一两二三四五六七八九十百千万";
        if(tmp.contains(str))
        {
            return true;
        }
        return false;
    }

    private static int chineseNumber2Int(String chineseNumber){
        int result = 0;
        int temp = 1;//存放一个单位的数字如：十万
        int count = 0;//判断是否有chArr
        char[] cnArr = new char[]{'一','二','三','四','五','六','七','八','九'};
        char[] chArr = new char[]{'十','百','千','万','亿'};
        for (int i = 0; i < chineseNumber.length(); i++) {
            boolean b = true;//判断是否是chArr
            char c = chineseNumber.charAt(i);
            for (int j = 0; j < cnArr.length; j++) {//非单位，即数字
                if (c == cnArr[j]) {
                    if(0 != count){//添加下一个单位之前，先把上一个单位值添加到结果中
                        result += temp;
                        temp = 1;
                        count = 0;
                    }
                    // 下标+1，就是对应的值
                    temp = j + 1;
                    b = false;
                    break;
                }
            }
            if(b){//单位{'十','百','千','万','亿'}
                for (int j = 0; j < chArr.length; j++) {
                    if (c == chArr[j]) {
                        switch (j) {
                            case 0:
                                temp *= 10;
                                break;
                            case 1:
                                temp *= 100;
                                break;
                            case 2:
                                temp *= 1000;
                                break;
                            case 3:
                                temp *= 10000;
                                break;
                            case 4:
                                temp *= 100000000;
                                break;
                            default:
                                break;
                        }
                        count++;
                    }
                }
            }
            if (i == chineseNumber.length() - 1) {//遍历到最后一个字符
                result += temp;
            }
        }
        return result;
    }

}
