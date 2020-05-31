package osfo.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.Entity;

@Entity

public class Dealer extends User {
    public Dealer()
    {
        setRole("dealer");
    }
    public Dealer(String username,String password )
    {

        this.setRole("dealer");
        this.setUsername(username);
        this.setPassword(password);

    }
}
