package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Discount;
import osfo.demo.entity.UserDiscount;
import osfo.demo.repo.discountRepo;
import osfo.demo.repo.userDiscountRepo;

import java.util.Collection;
import java.util.List;

@Repository
public class discountDao {
    @Autowired
    discountRepo discountrepo;
    @Autowired
    userDiscountRepo userdiscountrepo;
    public void deletediscount(Discount discount)
    {
        discountrepo.delete(discount);
        userdiscountrepo.deleteAllByDiscountId(discount.id);

    }
    public Discount adddiscount(Discount discount)
    {
        return discountrepo.save(discount);
    }
    public Object useradddiscount(UserDiscount userdiscount)
    {
        return userdiscountrepo.save(userdiscount);
    }
    public Iterable<UserDiscount> getalldiscount(Integer userid)
    {
        return userdiscountrepo.findAllByUserId(userid);
    }
    public List<UserDiscount> getallbyid(Collection<Integer> ids)
    {
        return userdiscountrepo.findAllByIdIn(ids);
    }
    public void deleteuserdiscount(UserDiscount userdiscount)
    {
        userdiscountrepo.delete(userdiscount);
    }



}
