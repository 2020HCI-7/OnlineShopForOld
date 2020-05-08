package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Goods;
import osfo.demo.repo.goodRepo;

import java.util.List;
@Repository
public class goodDao {
    @Autowired
    goodRepo goodrepo;
    public List<Goods> getgoodsbydealerid(Integer id)
    {
        return goodrepo.getgoodsbydealerid(id);
    }
    public List<Goods> getallgood()
    {
        return goodrepo.findAll();
    }

}
