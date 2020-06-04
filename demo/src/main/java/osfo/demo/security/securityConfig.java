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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
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
                .antMatchers("/register/*","/login/*","/store/*","/goods/*","/actuator","/image/*").permitAll()
                .antMatchers("/cart/*").hasAuthority("user")
                .antMatchers("/order/*").hasAnyAuthority("user","dealer")
                .antMatchers("/actuator/*").hasAuthority("admin")
                .anyRequest().authenticated();
        http.addFilterBefore(upauthfilterr(), UsernamePasswordAuthenticationFilter.class);
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public upauthfilter upauthfilterr() throws Exception {
        upauthfilter filter = new upauthfilter();
        filter.setAuthenticationManager(super.authenticationManagerBean());
        filter.setAuthenticationFailureHandler(fhandler);
        filter.setAuthenticationSuccessHandler(shandler);
        return filter;
    }
}
