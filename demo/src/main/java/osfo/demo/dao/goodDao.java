package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Goods;
import osfo.demo.repo.goodRepo;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

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
    public void savegood(Goods good)
    {
        goodrepo.save(good);
    }
   public List<Goods> getgoodsbyname(String name)
   {
       List<Goods> allgood=getallgood();
       List<Goods> result=new LinkedList<Goods>();
       for(Goods good:allgood)
       {

           if(good.getGoodname().indexOf(name)!=-1)
           {
               result.add(good);
           }
       }
       return result;
   }
   public Optional<Goods> getgoodbyid(Integer id)
   {
       return goodrepo.findById(id);
   }

}
