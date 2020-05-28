package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Cart;
import osfo.demo.repo.cartRepo;

@Repository
public class cartDao {
    @Autowired
    private cartRepo cartrepo;

    public Cart save(Cart cart)
    {
        return cartrepo.save(cart);
    }
    public Iterable<Cart> getallbyuserid(Integer id)
    {
        return cartrepo.findAllByUserId(id);
    }

}
