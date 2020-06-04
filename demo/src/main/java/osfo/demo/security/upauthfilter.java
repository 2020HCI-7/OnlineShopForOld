package osfo.demo.security;
import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import osfo.demo.security.uplogin.uptoken;
import osfo.demo.security.wxlogin.wxtoken;
import osfo.demo.util.restapi.response;
import osfo.demo.security.myAuthenticationManager;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

public class upauthfilter extends AbstractAuthenticationProcessingFilter {
    myAuthenticationManager myManager = new myAuthenticationManager();

    public upauthfilter() {
        super(new AntPathRequestMatcher("/login", "POST"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {
        //此处为了保证请求体的header统一，需要手动解析json
        BufferedReader br = httpServletRequest.getReader();
        String str = "";
        String listString = "";
        while ((str = br.readLine()) != null) {
            listString += str;
        }
//        System.out.println(listString);
        JSONObject json = new JSONObject(listString);


//        System.out.println(json.getString("code"));
        if (json.has("username")) {
            String username = json.getString("username");
            String password=json.getString("password");
            return myManager.authenticate(new uptoken(username,password));
        }
        else {
            String code = json.getString("code");
            return myManager.authenticate(new wxtoken(code));
        }
    }
}
