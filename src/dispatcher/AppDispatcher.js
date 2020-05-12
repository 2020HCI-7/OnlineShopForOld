import { Dispatcher } from "flux";

import UserStore from "../components/user/UserStore";
import TabBarStore from "../components/tab_bar/TabBarStore";
import AccountModifyStore from "../components/account/account_modify/AccountModifyStore";
import AccountListStore from "../components/account/account_list/AccountListStore";
import AccountAddStore from "../components/account/account_add/AccountAddStore"
import AccountManagementStore from "../components/account/account_management/AccountManagementStore";
import OrderListStore from "../components/order/order_list/OrderListStore";
import OrderModifyStore from "../components/order/order_modify/OrderModifyStore";
import OrderManagementStore from "../components/order/order_management/OrderManagementStore";
import OrderStatisticsStore from "../components/order/order_statistics/OrderStatisticsStore";
import CommodityModifyStore from "../components/commodity/commodity_modify/CommodityModifyStore";
import CommodityListStore from "../components/commodity/commodity_list/CommodityListStore";
import CommodityAddStore from "../components/commodity/commodity_add/CommodityAddStore"
import CommodityManagementStore from "../components/commodity/commodity_management/CommodityManagementStore";
// import MessageModifyStore from "../components/message/message_modify/MessageModifyStore";
// import MessageListStore from "../components/message/message_list/MessageListStore";
// import MessageManagementStore from "../components/message/message_management/MessageManagementStore";
import ShopModifyStore from "../components/shop/shop_modify/ShopModifyStore";
import LoginStore from "../pages/login/LoginStore";
import RegisterStore from "../pages/register/RegisterStore";
// import SuperAdminStore from "../pages/super_admin/SuperAdminStore";
// import ConsumerAdminStore from "../pages/consumer_admin/ConsumerAdminStore";
import AdminStore from "../pages/admin/AdminStore";
// import CustomerServiceStore from "../pages/customer_service/CustomerServiceStore";
import DealerStore from "../pages/dealer/DealerStore";

var AppDispatcher = new Dispatcher();
AppDispatcher.register(function (action) {
    switch (action.actionType) {
        /*User*/
        case "USER_INIT":
            UserStore.init(action.initInfo);
            break;
        case "USER_EXIT_LOGIN":
            UserStore.exitLogin();
            break;
        /*Login*/
        case "LOGIN_INIT":
            LoginStore.init();
            break;
        case "LOGIN_HANDLE_CHANGE":
            LoginStore.handleChange(action.key, action.value);
            break;
        case "LOGIN_FINISH_LOGIN":
            LoginStore.finishLogin();
            break;
        /*Register*/
        case "REGISTER_INIT":
            RegisterStore.init();
            break;
        case "REGISTER_HANDLE_CHANGE":
            RegisterStore.handleChange(action.key, action.value);
            break;
        case "REGISTER_FINISH_REGISTER":
            RegisterStore.finishRegister();
            break;
        /*TabBar*/
        case "TABBAR_INIT":
            TabBarStore.init(action.functionList);
            break;
        case "TABBAR_FUNCTION_BUTTON_CLICK":
            TabBarStore.onFunctionButtonClick(action.e);
            break;
        /*AccountModify*/
        case "ACCOUNT_MODIFY_INIT":
            AccountModifyStore.init(action.initInfo);
            break;
        case "ACCOUNT_MODIFY_HANDLE_CHANGE":
            AccountModifyStore.handleChange(action.key, action.value);
            AccountModifyStore.emitChange();
            break;
        case "ACCOUNT_MODIFY_FINISH_USER_INFO_MODIFY":
            AccountModifyStore.finishUserInfoModify();
            AccountModifyStore.emitChange();
            break;
        case "ACCOUNT_MODIFY_FINISH_PASSWORD_MODIFY":
            AccountModifyStore.finishPasswordModify();
            AccountModifyStore.emitChange();
            break;
        /*AccountList*/
        case "ACCOUNT_LIST_INIT":
            AccountListStore.init(action.initInfo);
            break;
        /*AccountAdd*/
        case "ACCOUNT_ADD_INIT":
            AccountAddStore.init(action.initInfo);
            AccountAddStore.emitChange();
            break;
        case "ACCOUNT_ADD_HANDLE_CHANGE":
            AccountAddStore.handleChange(action.key, action.value);
            AccountAddStore.emitChange();
            break;
        case "ACCOUNT_ADD_FINISH_ACCOUNT_ADD":
            AccountAddStore.finishAccountAdd();
            AccountAddStore.emitChange();
            break;
        /*AccountManagement*/
        case "ACCOUNT_MANAGEMENT_INIT":
            AccountManagementStore.init(action.initInfo);
            AccountManagementStore.emitChange();
            break;
        case "ACCOUNT_MANAGEMENT_TO_ACCOUNT_MODIFY":
            AccountManagementStore.toAccountModify(action.userId);
            AccountManagementStore.emitChange();
            break;
        case "ACCOUNT_MANAGEMENT_TO_ACCOUNT_LIST":
            AccountManagementStore.toAccountList();
            AccountManagementStore.emitChange();
            break;
        case "ACCOUNT_MANAGEMENT_TO_ACCOUNT_ADD":
            AccountManagementStore.toAccountAdd();
            AccountManagementStore.emitChange();
            break;
        /*OrderList*/
        case "ORDER_LIST_INIT":
            OrderListStore.init(action.initInfo);
            OrderListStore.emitChange();
            break;
        /*OrderModify*/
        case "ORDER_MODIFY_INIT":
            OrderModifyStore.init(action.initInfo);
            OrderModifyStore.emitChange();
            break;
        case "ORDER_MODIFY_HANDLE_CHANGE":
            OrderModifyStore.handleChange(action.key, action.value);
            OrderModifyStore.emitChange();
            break;
        case "ORDER_MODIFY_FINISH_ORDER_INFO_MODIFY":
            OrderModifyStore.finishOrderInfoModify();
            OrderModifyStore.emitChange();
            break;
        /*OrderManagement*/
        case "ORDER_MANAGEMENT_INIT":
            OrderManagementStore.init(action.initInfo);
            OrderManagementStore.emitChange();
            break;
        case "ORDER_MANAGEMENT_TO_ORDER_MODIFY":
            OrderManagementStore.toOrderModify(action.orderId);
            OrderManagementStore.emitChange();
            break;
        case "ORDER_MANAGEMENT_TO_ORDER_LIST":
            OrderManagementStore.toOrderList();
            OrderManagementStore.emitChange();
            break;
        /*OrderStatistics*/
        case "ORDER_STATISTICS_INIT":
            OrderStatisticsStore.init(action.initInfo);
            break;
        /*CommodityModify*/
        case "COMMODITY_MODIFY_INIT":
            CommodityModifyStore.init(action.initInfo);
            CommodityModifyStore.emitChange();
            break;
        case "COMMODITY_MODIFY_HANDLE_CHANGE":
            CommodityModifyStore.handleChange(action.key, action.value);
            CommodityModifyStore.emitChange();
            break;
        case "COMMODITY_MODIFY_FINISH_COMMODITY_INFO_MODIFY":
            CommodityModifyStore.finishCommodityInfoModify();
            break;
        /*CommodityList*/
        case "COMMODITY_LIST_INIT":
            CommodityListStore.init(action.initInfo);
            CommodityListStore.emitChange();
            break;
        /*CommodityAdd*/
        case "COMMODITY_ADD_INIT":
            CommodityAddStore.init(action.initInfo);
            CommodityAddStore.emitChange();
            break;
        case "COMMODITY_ADD_HANDLE_CHANGE":
            CommodityAddStore.handleChange(action.key, action.value);
            CommodityAddStore.emitChange();
            break;
        case "COMMODITY_ADD_FINISH_COMMODITY_ADD":
            CommodityAddStore.finishCommodityAdd();
            CommodityAddStore.emitChange();
            break;
        /*CommodityManagement*/
        case "COMMODITY_MANAGEMENT_INIT":
            CommodityManagementStore.init(action.initInfo);
            CommodityManagementStore.emitChange();
            break;
        case "COMMODITY_MANAGEMENT_TO_COMMODITY_MODIFY":
            CommodityManagementStore.toCommodityModify(action.commodityId);
            CommodityManagementStore.emitChange();
            break;
        case "COMMODITY_MANAGEMENT_TO_COMMODITY_LIST":
            CommodityManagementStore.toCommodityList();
            CommodityManagementStore.emitChange();
            break;
        case "COMMODITY_MANAGEMENT_TO_COMMODITY_ADD":
            CommodityManagementStore.toCommodityAdd();
            CommodityManagementStore.emitChange();
            break;
        /*ShopModify*/
        case "SHOP_MODIFY_INIT":
            ShopModifyStore.init(action.initInfo);
            break;
        case "SHOP_MODIFY_HANDLE_CHANGE":
            ShopModifyStore.handleChange(action.key, action.value);
            ShopModifyStore.emitChange();
            break;
        case "SHOP_MODIFY_FINISH_SHOP_INFO_MODIFY":
            ShopModifyStore.finishShopInfoModify();
            ShopModifyStore.emitChange();
            break;
        // /*MessageManagement*/
        // case "MESSAGE_MANAGEMENT_INIT":
        //     MessageManagementStore.init(action.initInfo);
        //     MessageManagementStore.emitChange();
        //     break;
        // case "MESSAGE_MANAGEMENT_TO_MESSAGE_MODIFY":
        //     MessageManagementStore.toMessageModify(action.consumerId);
        //     MessageManagementStore.emitChange();
        //     break;
        // case "MESSAGE_MANAGEMENT_TO_MESSAGE_LIST":
        //     MessageManagementStore.toMessageList();
        //     MessageManagementStore.emitChange();
        //     break;
        // /*MessageModify*/
        // case "MESSAGE_MODIFY_INIT":
        //     MessageModifyStore.init(action.initInfo);
        //     MessageModifyStore.emitChange();
        //     break;
        // case "MESSAGE_MODIFY_HANDLE_CHANGE":
        //     MessageModifyStore.handleChange(action.key, action.value);
        //     MessageModifyStore.emitChange();
        //     break;
        // case "MESSAGE_MODIFY_FINISH_MESSAGE_INFO_MODIFY":
        //     MessageModifyStore.finishMessageInfoModify();
        //     break;
        // /*MessageList*/
        // case "MESSAGE_LIST_INIT":
        //     MessageListStore.init(action.initInfo);
        //     MessageListStore.emitChange();
        //     break;
        // /*SuperAdmin*/
        // case "SUPER_ADMIN_INIT":
        //     SuperAdminStore.init();
        //     break;
        // case "SUPER_ADMIN_FLUSH":
        //     SuperAdminStore.flush();
        //     break;
        /*Admin*/
        case "ADMIN_INIT":
            AdminStore.init();
            break;
        case "ADMIN_FLUSH":
            AdminStore.flush();
            break;
        // /*DealerAdmin*/
        // case "DEALER_ADMIN_INIT":
        //     DealerAdminStore.init();
        //     break;
        // case "DEALER_ADMIN_FLUSH":
        //     DealerAdminStore.flush();
        //     break;
        // /*CustomerService*/
        // case "CUSTOMER_SERVICE_INIT":
        //     CustomerServiceStore.init();
        //     break;
        // case "CUSTOMER_SERVICE_FLUSH":
        //     CustomerServiceStore.flush();
        //     break;
        /*Dealer*/
        case "DEALER_INIT":
            DealerStore.init();
            break;
        case "DEALER_FLUSH":
            DealerStore.flush();
            break;
        default:
            break;
    }
})

export default AppDispatcher;