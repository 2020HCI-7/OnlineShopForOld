package osfo.demo.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import osfo.demo.dao.ConsumerDao;
import osfo.demo.dao.userDao;
import osfo.demo.entity.User;

import java.util.ArrayList;
import java.util.Collection;

@Component
public class myUserService implements UserDetailsService {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    userDao userdao;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(!userdao.getbyusername(username).isEmpty())
        {
            User user=userdao.getbyusername(username).get(0);
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(user.getRole()));
            org.springframework.security.core.userdetails.User user1=new org.springframework.security.core.userdetails.User
                    (user.getUsername(),passwordEncoder.encode(user.getPassword()),true,true,true,true,authorities);
            return user1;
        }
        else
        {
            return null;
        }
    }
}
