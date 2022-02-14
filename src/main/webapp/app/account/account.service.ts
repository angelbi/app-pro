import axios from 'axios';
import { Store } from 'vuex';
import store from '@/store';
import VueRouter from 'vue-router';

import { ViewPermission } from '@/shared/model/system/view-permission.model';
import { TargetType } from '@/shared/model/enumerations/target-type.model';
import ViewPermissionService from '@/entities/system/view-permission/view-permission.service';
import { generateIndexRouter, welcome } from '@/utils/util';
import router from '@/router';
export default class AccountService {
  private viewPermissions: ViewPermission[] = [];
  constructor(private store: Store<any>, private router: VueRouter, private viewPermissionService: ViewPermissionService) {
    this.init();
  }

  public init(): void {
    const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
    if (!this.store.getters.account && !this.store.getters.logon && token) {
      this.retrieveAccount();
    }
    this.retrieveProfiles();
  }

  public retrieveProfiles(): void {
    axios.get('management/info').then(res => {
      /* if (res.data && res.data.activeProfiles) {
        this.store.commit('setRibbonOnProfiles', res.data['display-ribbon-on-profiles']);
        this.store.commit('setActiveProfiles', res.data['activeProfiles']);
      } */
    });
  }

  public retrieveAccount(): void {
    // this.store.commit('authenticate');
    axios
      .get('api/account')
      .then(response => {
        const account = response.data;
        if (account) {
          // this.store.commit('authenticated', account);
          // 设置用户信息
          this.store.commit('SET_MOBILE', account.mobile);
          this.store.commit('SET_INFO', account);
          this.store.commit('SET_NAME', { name: account.firstName, welcome: welcome() });
          this.store.commit('SET_AVATAR', account.imageUrl);

          // 获得所有菜单数据从服务器端
          this.viewPermissionService
            .treeByLogin()
            .then(res => {
              // 去除最外部的分组信息
              this.viewPermissions = res.data.reduce((prev, cur) => prev.concat(cur.children), []);
              // 设置菜单
              const menuData = this.transformViewPermissionsToMenus(this.viewPermissions);
              // 获取静态路由组成的菜单
              store.commit('SET_PERMISSIONLIST', menuData);
              // 生成路由
              let constRoutes = [];
              constRoutes = generateIndexRouter(menuData);
              // 保存路由到store并把路由动态加载到router
              store.dispatch('UpdateAppRouter', { constRoutes: constRoutes }).then(() => {
                router.addRoutes(store.getters.addRouters);
              });
            })
            .catch(err => {
              console.log(err);
            });

          const requestedUrl = sessionStorage.getItem('requested-url');
          if (requestedUrl === '/user/login' || !requestedUrl) {
            this.router.replace('/');
          } else {
            this.router.replace(requestedUrl);
          }
          sessionStorage.removeItem('requested-url');
        } else {
          this.store
            .dispatch('Logout')
            .then(() => {
              this.router.push('/');
              sessionStorage.removeItem('requested-url');
            })
            .catch(err => {
              this.router.push('/');
              sessionStorage.removeItem('requested-url');
            });
        }
      })
      .catch(error => {
        this.store
          .dispatch('Logout')
          .then(() => {
            this.router.push('/');
            sessionStorage.removeItem('requested-url');
          })
          .catch(err => {
            this.router.push('/');
            sessionStorage.removeItem('requested-url');
          });
      });
  }

  public hasAnyAuthority(authorities: any): boolean {
    if (typeof authorities === 'string') {
      authorities = [authorities];
    }
    if (!this.authenticated || !this.userAuthorities) {
      return false;
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this.userAuthorities.find(authority => authority.code === authorities[i])) {
        return true;
      }
    }

    return false;
  }

  public get authenticated(): boolean {
    return this.store.getters.authenticated;
  }

  public get userAuthorities(): any {
    return this.store.getters.account.authorities;
  }

  transformViewPermissionsToMenus(viewPermissions: ViewPermission[]) {
    const result = [];
    viewPermissions.forEach(viewPermission => {
      const menu: any = {};
      menu.disabled = viewPermission.disabled;
      menu.externalLink = viewPermission.externalLink;
      menu.group = viewPermission.group;
      menu.hidden = viewPermission.hide;
      menu.hideInBreadcrumb = viewPermission.hideInBreadcrumb;
      menu.componentFile = viewPermission.componentFile;
      menu.i18n = viewPermission.i18n;
      if (menu.externalLink) {
        switch (viewPermission.target) {
          case TargetType.BLANK:
            menu['meta'] = { target: '_blank' };
            break;
          case TargetType.PARENT:
            menu['meta'] = { target: '_parent' };
            break;
          case TargetType.SELF:
            menu['meta'] = { target: '_self' };
            break;
          case TargetType.TOP:
            menu['meta'] = { target: '_top' };
            break;
          default:
            menu['meta'] = {};
        }
      } else {
        menu['meta'] = {};
      }
      menu.text = viewPermission.text;
      menu.shortcut = viewPermission.shortcut;
      menu.shortcutRoot = viewPermission.shortcutRoot;
      menu.reuse = viewPermission.reuse;
      menu.name = viewPermission.code;
      // menu.redirect = viewPermission.link; // 可能影响导航，导致整个页面刷新
      menu['meta'].title = viewPermission.text;
      // todo menu['meta'].authorities = viewPermission.authorities;
      const icon = viewPermission.icon ? viewPermission.icon.replace('anticon anticon-', '') : viewPermission.icon;
      if (icon) {
        menu['meta'].icon = icon;
      }
      menu.path = viewPermission.link;
      if (viewPermission.children) {
        const tempChildren = this.transformViewPermissionsToMenus(viewPermission.children);
        if (tempChildren && tempChildren.length > 0) {
          menu.children = tempChildren;
        }
      }
      result.push(menu);
    });
    return result;
  }
}
