const routes = [
    {
        path:"/",
        name:"layout",
        component:()=>import("@/views/layOut"),
        redirect:"/index",
        children:[
            {
                path:"/index",
                name:"index",
                component:()=>import("@/views/index/Home"),
            },
            {
                path:"/order/list",
                name:"order_list",
                component:()=>import("@/views/order/orderlist"),
                meta:{bread:["订单管理","订单列表"]}
            },
            {
                path:"/waybill/list",
                name:"waybill_list",
                component:()=>import("@/views/waybill/WayBillList"),
                meta:{bread:["运单管理","运单列表"]}
            },
            {
                path:"/personal",
                name:"personal",
                component:()=>import("@/views/personal"),
                meta:{bread:["个人中心"]}
            },
        ]
    },
    {
        path:"/login",
        name:"mylogin",
        component:()=>import("@/views/myLogin")
    }
]
export default routes;