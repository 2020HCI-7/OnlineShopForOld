package osfo.demo.security.wxlogin;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import osfo.demo.dao.ConsumerDao;
import osfo.demo.entity.Consumer;
import osfo.demo.entity.User;
import osfo.demo.util.restapi.wxauth.wxAuth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Component
public class wxprovider implements AuthenticationProvider {
    @Autowired
    ConsumerDao consumerDao = new ConsumerDao();

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String code = (String) authentication.getPrincipal();
        String res = wxAuth.wxAuthCodeToSession(code);

        System.out.println(res);
        JSONObject jsonRes = new JSONObject(res);
        if(jsonRes.has("errcode") && (Integer)jsonRes.get("errcode") != 0) {
            throw new BadCredentialsException("code 错误无法获取openid");
        }

        String openid = jsonRes.getString("openid");
        List<Consumer> consumerList = consumerDao.getconsuerbyopenid(openid);
        if (!consumerList.isEmpty()){
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