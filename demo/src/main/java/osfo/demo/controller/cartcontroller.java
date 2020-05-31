package osfo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import osfo.demo.entity.Cart;
import osfo.demo.entity.User;
import osfo.demo.entity.cleancart;
import osfo.demo.service.cartService;
import osfo.demo.service.goodService;

@RestController
public class cartcontroller {
    @Autowired
    cartService cartservice;
    @RequestMapping(method= RequestMethod.POST,value="/cart/add")
    public Object addtocart(@RequestBody Cart cart)
    {
        return cartservice.addtocart(cart);
    }
    @RequestMapping(method=RequestMethod.POST,value="/cart/findbyuserid")
    public Object findbyuserid()
    {
        Integer id=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return cartservice.getmycart(id);
    }
    @RequestMapping(value="/cart/clean")
    public Object cleancart(@RequestBody cleancart info)
    {

        Integer id=((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return cartservice.cleancart(id,info);
    }
    @RequestMapping(value="/cart/edit")
    public Object editcart(@RequestBody Cart cart)
    {
        return cartservice.editcat(cart);
    }
    @RequestMapping(value = "/cart/delete")
    public Object deletecart(@RequestParam("cartId") Integer id)
    {
        return cartservice.removecart(id);
    }
}
