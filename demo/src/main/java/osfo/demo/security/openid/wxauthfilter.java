package osfo.demo.security.openid;

import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import osfo.demo.security.uplogin.uptoken;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

public class wxauthfilter extends AbstractAuthenticationProcessingFilter {
    public wxauthfilter() {
        super(new AntPathRequestMatcher("/login/wx", "POST"));
    }



    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {

        String test="";
        if ("POST".equalsIgnoreCase(httpServletRequest.getMethod()))
        {

            test = httpServletRequest.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        }
        JSONObject tmp=new JSONObject(test);
        String code=tmp.getString("code");


        return this.getAuthenticationManager().authenticate(new wxtoken(code));

    }

}
