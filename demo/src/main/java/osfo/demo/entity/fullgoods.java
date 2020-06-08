package osfo.demo.entity;

public class fullgoods {
    public Goods good;
    public Store store;

    public void setGood(Goods good) {
        this.good = good;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public Goods getGood() {
        return good;
    }

    public Store getStore() {
        return store;
    }
    public fullgoods(Goods good,Store store)
    {
        this.good=good;
        this.store=store;
    }
}
