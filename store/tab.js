import Cookie from "js-cookie";

export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/home"
            }
        ],
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            // console.log(val, "val");
            if (val.name !== "home") {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tabsList.push(val);
                }
            }
        },
        closeTag(state, item) {
            console.log(item, "item");
            const index = state.tabsList.findIndex(val => val.name === item.name);
            state.tabsList.splice(index, 1)
        },
        setMenu(state, val) {
            state.menu = val;
            Cookie.set("menu", JSON.stringify(val));
        },
        addMenu(state, router) {
            if (!Cookie.get("menu")) {
                return;
            }
            console.log("router", router);

            const menu = JSON.parse(Cookie.get("menu"));
            state.menu = menu;

            const menuArr = [];
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.name}`);
                        return item;
                    })
                    menuArr.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.name}`);
                    menuArr.push(item);
                }
            });
            console.log("menuArr", menuArr);

            menuArr.forEach(item => {
                router.addRoute("Main", item); // vue-router@3.5.2
            })
        }
    }
}