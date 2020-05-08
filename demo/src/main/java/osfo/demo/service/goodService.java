package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.goodDao;
import osfo.demo.entity.Goods;

import java.util.List;

@Service
public class goodService {
    @Autowired
    goodDao gooddao;
    public List<Goods> getgoodsbydealerid(Integer id)
    {
        return gooddao.getgoodsbydealerid(id);
    }

}
