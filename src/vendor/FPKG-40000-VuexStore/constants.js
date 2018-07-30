
/*
  FPKG-40000-VuexStore
*/

// getters

// actions
export const GET_BANK_LIST = "GET_BANK_LIST"

// mutations
export const GOT_BANK_LIST = "GOT_BANK_LIST"


/*
  FPKG-70000-Dashboard
*/

// getters
export const THEME_NAME = "THEME_NAME"
// actions
export const RESET_CURRENT_THEME = "RESET_CURRENT_THEME"

// mutations
export const SWITCH_MOBILE_MENU = "SWITCH_MOBILE_MENU"
export const SWITCH_WEB_SYS_MENU = "SWITCH_WEB_SYS_MENU"
export const SET_THEME = "SET_THEME"

/*
  FPKG-90000-Account
*/

// getters
export const IS_LOGIN = "IS_LOGIN"
export const USER_INFO = "USER_INFO"

// actions
export const DO_LOGIN = "DO_LOGIN"
export const DO_LOGOUT = "DO_LOGOUT"
export const GET_USER_INFO = "GET_USER_INFO"
export const CLEAR_USER_INFO = "CLEAR_USER_INFO"
export const GET_ACCOUNT_LIST = "GET_ACCOUNT_LIST"
export const ADD_ACCOUNT = "ADD_ACCOUNT"
export const EDIT_ACCOUNT = "EDIT_ACCOUNT"
export const GET_ACCOUNT = "GET_ACCOUNT"
export const DEL_ACCOUNT = "DEL_ACCOUNT"
export const EDIT_USER_PASSWORD = "EDIT_USER_PASSWORD"

// mutations
export const CHANGE_LOGIN_STATUS = "CHANGE_LOGIN_STATUS"
export const SET_USER_INFO = "SET_USER_INFO"
export const CLEAR_SESSION = "CLEAR_SESSION"
export const GOT_ACCOUNT_LIST = "GOT_ACCOUNT_LIST"
export const GOT_ACCOUNT = "GOT_ACCOUNT"
export const SWITCH_ACCOUNT_DIALOG = "SWITCH_ACCOUNT_DIALOG"
export const SET_USER_AUTH = "SET_USER_AUTH"


/*
  FPKG-110000-Widget
*/

// actions
export const GET_CAPTCH = "GET_CAPTCH"

// mutations
export const GOT_CAPTCH = "GOT_CAPTCH"
export const CLEAR_CAPTCH = "CLEAR_CAPTCH"
export const SWITCH_LOADING_COVER = "SWITCH_LOADING_COVER"
export const SET_BREADCRUMB = "SET_BREADCRUMB"


/*
  FPKG-140000-Announce: Marquee
*/

// actions
export const GET_MARQUEE_LIST = "GET_MARQUEE_LIST"
export const DEL_MARQUEE = "DEL_MARQUEE"
export const ADD_MARQUEE = "ADD_MARQUEE"
export const EDIT_MARQUEE = "EDIT_MARQUEE"

// mutations
export const SWITCH_MARQUEE_DIALOG = "SWITCH_MARQUEE_DIALOG"
export const GOT_MARQUEE_LIST = "GOT_MARQUEE_LIST"


/*
  FPKG-150000-Money: DepositAcc
*/

// actions
export const CLEAR_DEPOSIT_ACC_POINT = "CLEAR_DEPOSIT_ACC_POINT"
export const GET_DEPOSIT_ACC_LIST = "GET_DEPOSIT_ACC_LIST"
export const DEL_DEPOSIT_ACC = "DEL_DEPOSIT_ACC"
export const ADD_DEPOSIT_ACC = "ADD_DEPOSIT_ACC"
export const EDIT_DEPOSIT_ACC = "EDIT_DEPOSIT_ACC"
export const SET_PRIMARY_DEPOSIT_ACC = "SET_PRIMARY_DEPOSIT_ACC"

// mutations
export const SWITCH_DEPOSIT_ACC_DIALOG = "SWITCH_DEPOSIT_ACC_DIALOG"
export const GOT_DEPOSIT_ACC_LIST = "GOT_DEPOSIT_ACC_LIST"


/*
  FPKG-150000-Money: Deposit
*/

// actions
export const GET_DEPOSIT_INFO = "GET_DEPOSIT_INFO"
export const GET_DEPOSIT_LIST = "GET_DEPOSIT_LIST"
export const GET_DEPOSIT_STATUS_LIST = "GET_DEPOSIT_STATUS_LIST"

// mutations
export const SET_DEPOSIT = "SET_DEPOSIT"
export const GOT_DEPOSIT_LIST = "GOT_DEPOSIT_LIST"
export const GOT_DEPOSIT_INFO = "GOT_DEPOSIT_INFO"
export const GOT_DEPOSIT_STATUS_LIST = "GOT_DEPOSIT_STATUS_LIST"
export const SWITCH_DEPOSIT_DIALOG = "SWITCH_DEPOSIT_DIALOG"


/*
  FPKG-150000-Money: Withdrqw
*/

// actions
export const GET_WITHDRAW_INFO = "GET_WITHDRAW_INFO"
export const GET_WITHDRAW_LIST = "GET_WITHDRAW_LIST"
export const GET_WITHDRAW_STATUS_LIST = "GET_WITHDRAW_STATUS_LIST"


// mutations
export const SET_WITHDRAW = "SET_WITHDRAW"
export const GOT_WITHDRAW_LIST = "GOT_WITHDRAW_LIST"
export const GOT_WITHDRAW_INFO = "GOT_WITHDRAW_INFO"
export const GOT_WITHDRAW_STATUS_LIST = "GOT_WITHDRAW_STATUS_LIST"
export const SWITCH_WITHDRAW_DIALOG = "SWITCH_WITHDRAW_DIALOG"
