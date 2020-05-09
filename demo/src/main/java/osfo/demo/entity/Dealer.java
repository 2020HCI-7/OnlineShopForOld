package osfo.demo.entity;

import javax.persistence.Entity;

@Entity
public class Dealer extends User {
    public Dealer()
    {

    }
    public Dealer(String username,String password )
    {

        this.setRole("dealer");
        this.setUsername(username);
        this.setPassword(password);

    }
}
