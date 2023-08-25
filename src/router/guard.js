import router from "@/router/index"
router.beforeEach((to,from,next)=>{
    const hasToken =sessionStorage.getItem("token")
    if(hasToken){
        if(to.path=="/login"){
            next("/")
        }else{
            next()
        }
    }else{
        if(to.path=="/login"){
            next()
        }else{
            next("/login")
        }
    }
})