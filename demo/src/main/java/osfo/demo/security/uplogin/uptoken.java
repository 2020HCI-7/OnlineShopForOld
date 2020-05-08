package osfo.demo.security.uplogin;

import org.springframework.security.authentication.AbstractAuthenticationToken;

public class uptoken extends AbstractAuthenticationToken {
    /**
     * Creates a token with the supplied array of authorities.
     *
     * @param authorities the collection of <tt>GrantedAuthority</tt>s for the principal
     *                    represented by this authentication object.
     */
    public String id;
    public String password;
    public uptoken(String id,String password) {
        super(null);
        this.id=id;
        this.password=password;
    }

    @Override
    public Object getCredentials() {
        return this.password;
    }

    @Override
    public Object getPrincipal() {
        return this.id;
    }
}

