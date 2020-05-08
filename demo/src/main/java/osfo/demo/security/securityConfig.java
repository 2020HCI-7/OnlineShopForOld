package osfo.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import osfo.demo.entrypoint.unauthorized;
import osfo.demo.handler.failHandler;
import osfo.demo.handler.successHandler;

@EnableWebSecurity
public class securityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    @Qualifier(value="myUserService")
    UserDetailsService userDetailsService;
    @Autowired
    successHandler shandler;
    @Autowired
    failHandler fhandler;
    @Autowired
    unauthorized unauthorize;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http

                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorize)
                .and()
                .authorizeRequests()
                .antMatchers("/jpalogin","/sslogin","/jpabooklist","/jparegister","/img/*","/jpacurrentuser","/test","/getdetail","/testimg","/register","/login").permitAll()
                .antMatchers("/jpashowcart","/jpacleancart","/jpaaddtocart","/jpashowhistory","/jpadeleteorder","/jpaaddcomment","/uploaduserimg","/finduserimg/*","/test1").hasAnyAuthority("user","ADMIN")
                .antMatchers("/jpaeditsave","/jpaeditdelete","/jpashowuser","/uploadimg","/jpaintroduction").hasAuthority("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginProcessingUrl("/sslogin")
                .usernameParameter("username")
                .passwordParameter("password")
                .successHandler(shandler)
                .failureHandler(fhandler)
                .permitAll();

    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
