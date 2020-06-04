package osfo.demo.security.uplogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import osfo.demo.dao.userDao;
import osfo.demo.entity.User;

import java.util.ArrayList;
import java.util.Collection;

@Component
public class upprovider implements AuthenticationProvider {
    @Autowired
    private userDao userdao;


    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        System.out.println("inup");
        String username = (String) authentication.getPrincipal();
        System.out.println(username);
        // 获取表单用户填写的密码
        String password = (String) authentication.getCredentials();
        System.out.println(password);
        System.out.println(userdao);
        System.out.println(userdao.getbyusername(username));
        if (userdao.getbyusername(username).size()==0){
            throw new BadCredentialsException("用户名或密码不正确");
        }
        User user=userdao.getbyusername(username).get(0);
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        System.out.println(user.getRole());
        authorities.add(new SimpleGrantedAuthority(user.getRole()));

        ((uptoken)authentication).id=user.getId();

        System.out.print(username);
        System.out.print(password);

        if (!passwordEncoder.matches(password,passwordEncoder.encode(user.getPassword()))){
            throw new BadCredentialsException("用户名或密码不正确");
        }
        System.out.print(((uptoken)authentication).id);

        return new UsernamePasswordAuthenticationToken(user,password,authorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (uptoken.class.isAssignableFrom(authentication));
    }
}