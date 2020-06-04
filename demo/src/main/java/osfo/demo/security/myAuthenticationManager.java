package osfo.demo.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import osfo.demo.security.uplogin.upprovider;
import osfo.demo.security.wxlogin.wxprovider;

public class myAuthenticationManager implements AuthenticationManager {
    upprovider uppro = new upprovider();
    wxprovider wxpro = new wxprovider();

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Class<? extends Authentication> toTest = authentication.getClass();
        Authentication result = null;
        if(uppro.supports(toTest)) {
            System.out.println("up");
            try {
                result = uppro.authenticate(authentication);
            }
            catch (AuthenticationException e) {
                throw  e;
            }
        }
        else {
            try {
                result = wxpro.authenticate(authentication);
            }
            catch (AuthenticationException e) {
                throw  e;
            }
        }
        return result;
    }
}
