import RouteService from "../../services/auth/routing";

export  const getUserHref = (authUser) => {
    const res = RouteService.getPrevRoute();
    if (res) {
        RouteService.removePrevRoute();
        return res;
    } else {
        if (authUser.category) {
            switch (authUser.category.name) {
                case "CUSTOMER":
                    return "/customer";
                case "SYSTEM_ADMIN":
                    return "/admin";
                case "SHIPPER":
                    return "/shipper";
                default:
                    return "/sales-manager";
            }
        }
    }

    return "/404";
};