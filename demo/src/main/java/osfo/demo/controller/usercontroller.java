package osfo.demo.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import osfo.demo.entity.Consumer;
import osfo.demo.service.userService;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class usercontroller {
    @Resource
    userService userservice;


    @RequestMapping("/register/consumer")
    public Object userregister(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("neck_name") String neckname, @RequestParam("openid") String openid)
    {

        return userservice.register(username,password,neckname,openid);

    }
    @RequestMapping("/register/dealer")
    public Object dealerregister(@RequestParam("username") String username,@RequestParam("password") String password)
    {

        return userservice.register1(username,password);

    }
}
