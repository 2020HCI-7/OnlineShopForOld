    consumer:
        private Integer id;
        private String username;
        private String password;
        private Integer status;
        private String role;
        public String phonenumber;
        public String wexinOpenid;
        public String neckName;

    dealer:
        private Integer id;
        private String username;
        private String password;
        private Integer status;
        private String role;
        
    address:
        private Integer id;
        private Integer userId;
        private String address;
        private String phonenumber;
        private String receivername;

    discount:
        public Integer id;
        public Integer storeId;
        public float man;
        public float jian;

    goods:
        private Integer id;
        private Integer storeId;
        private float normalPrice;
        private float leastPrice;
        private String goodname;
        private String description;
        private float storage;

    store:
        private Integer id;
        private Dealer dealer;
        private String address;
        private String phonenumber;

    userdiscount:
        public Integer id;
        public Integer userId;
        public Integer discountId;
        public float man;
        public float jian;
        public Integer storeId;

    userorder:
        public Integer id;
        public Date date;
        private Integer userId;
        private Integer storeId;
        private Integer addressId;
        private Integer status;
        private String comment;
        public float money;
        public float finalmoney;

    cleancart:
        public List<Integer> cartIds;
        public List<Integer> discountIds;
        public Integer addressId;
        
    Cart:
        public Integer id;
        public Integer userId;
        public Integer goodId;
        public float number;
