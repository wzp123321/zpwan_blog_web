/**
 * element-ui组件注册
 */
import Vue from 'vue'
// 引入element
import 'element-ui/lib/theme-chalk/index.css';

import {
    Pagination,
    Dialog,
    Switch,
    Message,
    Upload,
    Divider,
    Input,
    Button,
    Menu,
    MenuItem,
    Submenu,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
} from "element-ui";


export function elementRegister() {
    Vue.use(Pagination);
    Vue.use(Dialog);
    Vue.use(Divider);
    Vue.use(Upload);
    Vue.use(Switch);
    Vue.use(Input);
    Vue.use(Button);
    Vue.use(Tooltip);
    Vue.use(Breadcrumb);
    Vue.use(BreadcrumbItem);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Carousel);
    Vue.use(CarouselItem);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Menu);
    Vue.use(MenuItem);
    Vue.use(Submenu);

    Vue.prototype.$message = Message;
    Vue.prototype.$notify = Notification;
}