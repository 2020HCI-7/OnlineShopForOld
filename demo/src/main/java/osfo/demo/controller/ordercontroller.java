package osfo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import osfo.demo.entity.Goods;
import osfo.demo.entity.User;
import osfo.demo.entity.Userorder;
import osfo.demo.service.orderService;

@RestController
public class ordercontroller {
    @Autowired
    orderService orderservice;
    @RequestMapping(value="/order/edit")
    public Object saveorder(@RequestBody Userorder order)
    {
        return orderservice.editorder(order);
    }
    @RequestMapping(value="/order/getbyorderid")
    public Object getorderbyid(@RequestParam("orderid") Integer orderid)
    {
        return orderservice.getorderbyid(orderid);
    }
    @RequestMapping(value="/order/getbyuserid")
    public Object getorderbyid()
    {

        return orderservice.getorderbyuserid(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
    }
    @RequestMapping(value="/order/getbydealerid")
    public Object getbydealerid()
    {
        return orderservice.getorderbydealerid(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
    }

    @RequestMapping(value="/order/getitems")
    public Object getitembyorderid(@RequestParam("orderid") Integer orderid)
    {
        return orderservice.getorderitems(orderid);
    }

}
