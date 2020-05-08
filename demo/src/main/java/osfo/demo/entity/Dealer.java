package osfo.demo.entity;

import javax.persistence.Entity;

@Entity
public class Dealer extends User {
    public Dealer()
    {
        setRole("dealer");
    }
}
