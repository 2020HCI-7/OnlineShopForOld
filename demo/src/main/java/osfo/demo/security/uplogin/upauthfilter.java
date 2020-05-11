package osfo.demo.security.uplogin;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import osfo.demo.util.restapi.response;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class upauthfilter extends AbstractAuthenticationProcessingFilter {
    public upauthfilter() {
        super(new AntPathRequestMatcher("/login/up", "POST"));
    }



    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {
        String username=httpServletRequest.getParameter("username");
        String password=httpServletRequest.getParameter("password");

        return this.getAuthenticationManager().authenticate(new uptoken(username,password));

    }
}
