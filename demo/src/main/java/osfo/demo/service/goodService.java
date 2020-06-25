package osfo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osfo.demo.dao.goodDao;
import osfo.demo.dao.imageDao;
import osfo.demo.dao.storeDao;
import osfo.demo.entity.Goods;
import osfo.demo.entity.Image;
import osfo.demo.util.restapi.response;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class goodService {
    @Autowired
    goodDao gooddao;
    @Autowired
    storeDao storedao;
    @Autowired
    imageDao imagedao;
    public Object getgoodsbystoreid(Integer id)
    {


        return new response(true,"",gooddao.getgoodsbystorerid(id));
    }
    public Object getgoodsbytag(String tag)
    {
        return new response(true,"",gooddao.getgoodbytag(tag));
    }
    public response getbyid(Integer id)
    {
        Optional<Goods> tmp=gooddao.getbyid(id);
        if(tmp.isPresent())
        {
            return new response(true,"",tmp.get());
        }
        else
        {
            return new response(false,"no that good",null);
        }

    }
    public response getallgoods()
    {

        return new response(true,"",gooddao.getallgood());
    }
    public Object addgood(Integer dealerid,Goods good)
    {

        good.setStoreId(storedao.getstorebydealerid(dealerid).get(0).getId());
        gooddao.savegood(good);
        return new response(true,"",null);
    }
    public Object getgoodsbyname(String name)
    {
        return new response(true,"",gooddao.getgoodsbyname(name));
    }
    public byte[] getimagebyid(Integer imageid)
    {
        return imagedao.getimage(imageid).get().image;
    }
    public Object upload(Image image)
    {
        imagedao.uploadimage(image);
        return new response(true,"",null);
    }

}
