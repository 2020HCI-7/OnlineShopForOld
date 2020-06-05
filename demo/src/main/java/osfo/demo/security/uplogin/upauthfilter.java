package osfo.demo.security.uplogin;
import org.json.JSONObject;
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
import java.io.BufferedReader;
import java.io.IOException;
import java.util.stream.Collectors;

public class upauthfilter extends AbstractAuthenticationProcessingFilter {
    public upauthfilter() {
        super(new AntPathRequestMatcher("/login/up", "POST"));
    }



    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {

        String test="";
        if ("POST".equalsIgnoreCase(httpServletRequest.getMethod()))
        {

            test = httpServletRequest.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        }
        JSONObject tmp=new JSONObject(test);
        String username=tmp.getString("username");
        String password=tmp.getString("password");

        return this.getAuthenticationManager().authenticate(new uptoken(username,password));

    }


}
