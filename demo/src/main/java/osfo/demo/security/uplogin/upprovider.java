package osfo.demo.security.uplogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
@Component
public class upprovider implements AuthenticationProvider {
    @Autowired
    @Qualifier(value="myUserService")
    private UserDetailsService userDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = (String) authentication.getPrincipal();
        // 获取表单用户填写的密码
        String password = (String) authentication.getCredentials();

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        String password1 = userDetails.getPassword();
        System.out.print(username);
        System.out.print(password);
        System.out.print(password1);
        if (!passwordEncoder.matches(password,password1)){
            throw new BadCredentialsException("用户名或密码不正确");
        }
        System.out.print("right");
        return new UsernamePasswordAuthenticationToken(username,password,userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (uptoken.class.isAssignableFrom(authentication));
    }
}