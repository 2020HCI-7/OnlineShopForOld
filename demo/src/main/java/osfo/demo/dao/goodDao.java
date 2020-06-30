package osfo.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import osfo.demo.entity.Goods;
import osfo.demo.repo.goodRepo;
import osfo.demo.repo.storeRepo;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Repository
public class goodDao {
    @Autowired
    goodRepo goodrepo;
    @Autowired
    storeRepo storerepo;
    public List<Goods> getgoodsbystorerid(Integer id)
    {

        return goodrepo.getgoodsbystoreid(id);
    }
    public List<Goods> getallgood()
    {
        return goodrepo.findAll();
    }
    public Optional<Goods> getbyid(Integer id)
    {
        return goodrepo.findById(id);
    }
    public void savegood(Goods good)
    {
        goodrepo.save(good);
    }
    public List<Goods> getgoodbytag(String tag)
    {
        return goodrepo.getGoodsByTag(tag);
    }
   public List<Goods> getgoodsbyname(String name)
   {
       List<Goods> allgood=getallgood();
       List<Goods> result=new LinkedList<Goods>();
       System.out.println(name);
       for(Goods good:allgood)
       {

           if(good.getGoodname().contains(name))
           {

               result.add(good);
           }
           else if(name.contains(good.getGoodname()))
           {
               result.add(good);
           }
            else if(findLCS(name,name.length(),good.getGoodname(),good.getGoodname().length())>2)
           {
               result.add(good);
           }

       }
       System.out.println(result.isEmpty());
       return result;
   }
    public int findLCS(String A, int n, String B, int m) {
        int[][] dp = new int[n + 1][m + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                dp[i][j] = 0;
            }
        }
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (A.charAt(i - 1) == B.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
                }
            }
        }
        return dp[n][m];
    }
   public Optional<Goods> getgoodbyid(Integer id)
   {
       return goodrepo.findById(id);
   }

}
