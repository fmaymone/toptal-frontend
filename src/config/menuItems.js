import AccountBox from '@material-ui/icons/AccountBox'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Brightness2 from '@material-ui/icons/Brightness2'
import Brightness7 from '@material-ui/icons/Brightness7'
import Business from '@material-ui/icons/Business'
import ChatIcon from '@material-ui/icons/Chat'
import DaschboardIcon from '@material-ui/icons/Dashboard'
import FlashOn from '@material-ui/icons/FlashOn'
import GroupIcon from '@material-ui/icons/Group'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import LanguageIcon from '@material-ui/icons/Language'
import ListIcon from '@material-ui/icons/List'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import React from 'react'
import Security from '@material-ui/icons/Security'
import SettingsIcon from '@material-ui/icons/SettingsApplications'
import StyleIcon from '@material-ui/icons/Style'
import TextsmsRounded from '@material-ui/icons/TextsmsRounded'
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom'
import allLocales from './locales'
import allThemes from './themes'

const getMenuItems = props => {
  const {
    locale,
    updateTheme,
    switchNightMode,
    updateLocale,
    intl,
    themeSource,
    auth,
    isGranted,
    deferredPrompt,
    isAppInstallable,
    isAppInstalled,
    isAuthMenu,
    handleSignOut
  } = props

  const isAuthorised = auth.isAuthorised

  const themeItems = allThemes.map(t => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        updateTheme(t.id)
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />
    }
  })

  const localeItems = allLocales.map(l => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
      },
      leftIcon: <LanguageIcon />
    }
  })

  if (isAuthMenu) {
    return [
      {
        value: '/my_account',
        primaryText: intl.formatMessage({ id: 'my_account' }),
        leftIcon: <AccountBoxIcon />
      },
      {
        value: '/signin',
        onClick: handleSignOut,
        primaryText: intl.formatMessage({ id: 'sign_out' }),
        leftIcon: <LockIcon />
      }
    ]
  }

  return [
    {
      value: '/dashboard',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'dashboard' }),
      leftIcon: <DaschboardIcon />
    },
    {
      value: '/trips',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'trips' }),
      leftIcon: <Business />
    },
    {
      visible: isGranted('administration'), 
      primaryTogglesNestedList: true,
      primaryText: intl.formatMessage({ id: 'administration' }),
      leftIcon: <Security />,
      nestedItems: [
        {
          value: '/users',
          visible: isGranted('administration'), 
          primaryText: intl.formatMessage({ id: 'users' }),
          leftIcon: <GroupIcon />
        },
        {
          value: '/roles',
          visible: isGranted('read_roles'),
          primaryText: intl.formatMessage({ id: 'roles' }),
          leftIcon: <AccountBox />
        }
      ]
    },
    {
      divider: true,
      visible: isAuthorised
    },
    {
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: 'theme' }),
          secondaryText: intl.formatMessage({ id: themeSource.source }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems
        },
        {
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems
        }
      ]
    },
    {
      onClick: () => {
        switchNightMode(!themeSource.isNightModeOn)
      },
      primaryText: intl.formatMessage({ id: themeSource.isNightModeOn ? 'day_mode' : 'night_mode' }),
      leftIcon: themeSource.isNightModeOn ? <Brightness7 /> : <Brightness2 />
    },
    {
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt()
      },
      primaryText: intl.formatMessage({ id: 'install' }),
      leftIcon: <VerticalAlignBottomIcon />
    }
  ]
}

export default getMenuItems
