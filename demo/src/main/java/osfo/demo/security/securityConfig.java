package osfo.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import osfo.demo.entrypoint.unauthorized;
import osfo.demo.handler.failHandler;
import osfo.demo.handler.successHandler;

import osfo.demo.security.openid.wxauthfilter;
import osfo.demo.security.openid.wxprovider;
import osfo.demo.security.uplogin.upauthfilter;
import osfo.demo.security.uplogin.upprovider;

@EnableWebSecurity
public class securityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    successHandler shandler;
    @Autowired
    failHandler fhandler;
    @Autowired
    unauthorized unauthorize;
    @Autowired
    upprovider myup;
    @Autowired
    wxprovider mywx;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http


                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorize)
                .and()
                .authorizeRequests()
                .antMatchers("/register/*","/login/*","/store/*","/goods/*","/actuator","/actuator/*","/actuator/*/*","/image/*").permitAll()
                .antMatchers("/cart/*").hasAuthority("user")
                .antMatchers("/order/*").hasAnyAuthority("user","dealer")

                .anyRequest().authenticated();
        http.addFilterBefore(upauthfilterr(), UsernamePasswordAuthenticationFilter.class);
        //http.addFilterBefore(wxauthfilterr(),UsernamePasswordAuthenticationFilter.class);

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
    @Bean
    public wxauthfilter wxauthfilterr() throws Exception {
        wxauthfilter filter = new wxauthfilter();
        filter.setAuthenticationManager(super.authenticationManagerBean());
        filter.setAuthenticationFailureHandler(fhandler);
        filter.setAuthenticationSuccessHandler(shandler);
        return filter;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(myup).authenticationProvider(mywx);
    }
}
