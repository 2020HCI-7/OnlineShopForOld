package osfo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import osfo.demo.entity.Cart;
import osfo.demo.entity.User;
import osfo.demo.service.cartService;
import osfo.demo.service.goodService;

@RestController
public class cartcontroller {
    @Autowired
    cartService cartservice;
    @RequestMapping(method= RequestMethod.POST,value="cart/add")
    public Object addtocart(@RequestBody Cart cart)
    {
        return cartservice.addtocart(cart);
    }
    @RequestMapping(method=RequestMethod.POST,value="cart/findbyuserid")
    public Object findbyuserid()
    {
        Integer id=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return cartservice.getmycart(id);
    }
    @RequestMapping(value="cart/clean")
    public Object cleancart(@RequestParam("addressId") Integer addrid)
    {
        Integer id=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return cartservice.cleancart(id,addrid);
    }
}
