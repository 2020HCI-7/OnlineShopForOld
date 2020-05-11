package osfo.demo.util.restapi;

public class response {
    public boolean success;
    public String errmsg;
    public Object content;
    public response(boolean success,String errmsg,Object content)
    {
        this.success=success;
        this.errmsg=errmsg;
        this.content=content;
    }
}
