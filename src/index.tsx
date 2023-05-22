import i18n from 'i18next';
import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';
import LeftMenu from './components/LeftMenu';
import { Drawer, Layout } from 'antd';
import { ILayoutProps } from './index.d';
import { useConfigMenu } from './hooks/useConfigMenu';
import useFixed, { FixedType } from './hooks/useFixed';
import { MyModal } from '../../components';
import eventEmitter from '../../eventEmitter';
import './index.less';
import useStyles from '../../theme';
import useHistory from '../../hooks/useHistory';
import useGetOutsideComponent from './hooks/useGetOutsideComponent';
import useChangeWebTitle from './hooks/useChangeWebTitle';
import { CustomizationThemeEnum } from '../../store/customConfig';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';

const LayoutComponent: React.FC<ILayoutProps> = (props) => {
  const styles = useStyles();
  const [siderVisible, setSiderVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const { isFixed, setIsFixed } = useFixed();
  const location = useLocation();
  const history = useHistory();
  const [ajaxErrorVisible, setAjAxErrorVisible] =
    React.useState<boolean>(false);
  const handleAjaxError = React.useCallback(() => {
    if (location.pathname === '/statistics_new') return;
    setAjAxErrorVisible(true);
  }, [location]);

  const keyDownMenu = React.useCallback(
    (event: KeyboardEvent) => {
      // because event target default type EventTarget is not has tagName so strong go to any
      const tagName = (event.target as any).tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') return;

      if (event.keyCode === 90) {
        if (!isFixed) {
          setSiderVisible(!siderVisible);
          setMenuVisible(!siderVisible);
        } else {
          setMenuVisible(!menuVisible);
        }
      }
    },
    [siderVisible, isFixed, menuVisible]
  );
  React.useEffect(() => {
    document.body.addEventListener('keydown', keyDownMenu);
    return () => {
      document.body.removeEventListener('keydown', keyDownMenu);
    };
  }, [keyDownMenu]);
  React.useEffect(() => {
    const defaultTitle =
      process.env.NODE_ENV === 'production' ? 'DMP' : '开发环境';
    document.title = props.config.title || defaultTitle;
  }, [props.config.title]);
  React.useEffect(() => {
    eventEmitter.addListener('REQUEST_ERROR', handleAjaxError);
    return () => {
      eventEmitter.removeListener('REQUEST_ERROR', handleAjaxError);
    };
  }, []);
  React.useEffect(() => {
    if (isFixed) {
      setSiderVisible(true);
    }
  }, [isFixed]);
  const { allNavMenu, navMenu } = useConfigMenu(props);
  const themeCls = React.useMemo(() => {
    if (props.config.theme === CustomizationThemeEnum.Light) {
      return ' light';
    }

    if (props.config.theme === CustomizationThemeEnum.Red) {
      return ' theme-red';
    }

    return '';
  }, [props.config]);
  React.useEffect(() => {
    const hideSiderMenu = () => {
      const fixed = localStorage.getItem('is_fixed');
      if (
        fixed !== FixedType.icon &&
        fixed !== FixedType.normal &&
        siderVisible
      ) {
        setSiderVisible(false);
      }
    };

    const unListen = history.listen(hideSiderMenu);
    return () => {
      unListen();
    };
  }, [history, siderVisible]);

  const switchSiderVisibleChange = () => {
    setSiderVisible(true);
  };

  useGetOutsideComponent();
  useChangeWebTitle();

  return (
    <Layout
      style={{
        height: '100%',
      }}
    >
      <Layout.Header className={`page-header${themeCls}`}>
        <HeaderNav
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          isFixed={!!isFixed}
          setSiderVisible={setSiderVisible}
          visible={siderVisible}
          navMenu={allNavMenu.current}
          className={themeCls}
          title={props.config.title || 'DMP'}
        />
      </Layout.Header>
      <Layout
        style={{
          position: 'relative',
        }}
      >
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setSiderVisible(false)}
          open={siderVisible}
          getContainer={false}
          style={{
            position: 'absolute',
          }}
          bodyStyle={{
            padding: '0',
          }}
          className={themeCls + ' layout-drawer'}
          mask={!isFixed}
          width={isFixed === FixedType.icon ? 50 : 220}
        >
          <LeftMenu
            menuVisible={menuVisible}
            setMenuVisible={setMenuVisible}
            allNavMenu={allNavMenu}
            navMenu={navMenu}
            setSiderVisible={setSiderVisible}
            config={props.config}
            className={themeCls}
            isFixed={isFixed}
            setIsFixed={setIsFixed}
          />
        </Drawer>
        <div
          className="menu-switch"
          hidden={siderVisible}
          onClick={switchSiderVisibleChange}
        >
          <RightOutlined />
        </div>
        <Layout.Content
          className={classNames(
            'action-content',
            styles.bgColor,
            isFixed && `fixed-${isFixed}`
          )}
        >
          {props.children}
        </Layout.Content>
      </Layout>
      <MyModal
        className={styles.modal}
        visible={ajaxErrorVisible}
        handleEvent={{
          handleClick: () => {
            setAjAxErrorVisible(true);
            const url = window.location.pathname;
            window.location.href = `login?target=${url.substring(1)}`;
          },
        }}
      >
        {i18n.t('Layout.Layout.index.LOCALE_DEFAULT_SUFFIX3733')}
      </MyModal>
    </Layout>
  );
};

export default LayoutComponent;
