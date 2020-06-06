package osfo.demo.security.openid;


import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import osfo.demo.dao.ConsumerDao;
import osfo.demo.dao.userDao;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.User;
import osfo.demo.security.uplogin.uptoken;
import osfo.demo.util.wxauth.wxAuth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class wxprovider implements AuthenticationProvider {
    @Autowired
    ConsumerDao consumerdao;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        System.out.println("inweixin");
        String code = (String) authentication.getPrincipal();
        String res = wxAuth.wxAuthCodeToSession(code);

        JSONObject jsonRes = new JSONObject(res);
        if(jsonRes.has("errcode") && (Integer)jsonRes.get("errcode") != 0) {
            throw new BadCredentialsException("code 错误无法获取openid");
        }

        String openid = jsonRes.getString("openid");
        List<Consumer> consumerList = consumerdao.getconsumerbyopenid(openid);
        System.out.println(consumerList);
        System.out.println(consumerList.isEmpty());
        if (consumerList.isEmpty()){
            throw new BadCredentialsException("用户不存在");
        }

        User user = consumerList.get(0);
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));

        return new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword(), authorities);


    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (wxtoken.class.isAssignableFrom(authentication));
    }
}
