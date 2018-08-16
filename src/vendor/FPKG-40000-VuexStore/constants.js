
/*
  FPKG-40000-VuexStore
*/

// getters

// actions
export const GET_BANK_LIST = "GET_BANK_LIST"
export const GET_FEE_LIST = "GET_FEE_LIST"
export const GET_DISPENSE_ACC_OPTIONS = "GET_DISPENSE_ACC_OPTIONS"
export const GET_USER_STATUS_OPTIONS = "GET_USER_STATUS_OPTIONS"
export const GET_MEMBER_STATUS_OPTIONS = "GET_MEMBER_STATUS_OPTIONS"
export const GET_DAILY_DEPOSIT_LIMIT_OPTIONS = "GET_DAILY_DEPOSIT_LIMIT_OPTIONS"
export const GET_GAME_TYPE_OPTIONS = "GET_GAME_TYPE_OPTIONS"
export const GET_GAME_TEMPLATE_OPTIONS = "GET_GAME_TEMPLATE_OPTIONS"
export const GET_STATUS_OPTIONS = "GET_STATUS_OPTIONS"

// mutations
export const GOT_BANK_LIST = "GOT_BANK_LIST"
export const GOT_FEE_LIST = "GOT_FEE_LIST"
export const GOT_DISPENSE_ACC_OPTIONS = "GOT_DISPENSE_ACC_OPTIONS"
export const GOT_USER_STATUS_OPTIONS = "GOT_USER_STATUS_OPTIONS"
export const GOT_MEMBER_STATUS_OPTIONS = "GOT_MEMBER_STATUS_OPTIONS"
export const GOT_DAILY_DEPOSIT_LIMIT_OPTIONS = "GOT_DAILY_DEPOSIT_LIMIT_OPTIONS"
export const GOT_GAME_TYPE_OPTIONS = "GOT_GAME_TYPE_OPTIONS"
export const GOT_GAME_TEMPLATE_OPTIONS = "GOT_GAME_TEMPLATE_OPTIONS"
export const GOT_STATUS_OPTIONS = "GOT_STATUS_OPTIONS"


/*
  FPKG-70000-Dashboard
*/

// getters
export const THEME_NAME = "THEME_NAME"
// actions
export const RESET_CURRENT_THEME = "RESET_CURRENT_THEME"

// mutations
export const SET_MENU = "SET_MENU"
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
export const GET_HISTORY = "GET_HISTORY"

// mutations
export const GOT_CAPTCH = "GOT_CAPTCH"
export const CLEAR_CAPTCH = "CLEAR_CAPTCH"
export const SWITCH_LOADING_COVER = "SWITCH_LOADING_COVER"
export const SET_BREADCRUMB = "SET_BREADCRUMB"
export const SWITCH_HISTORY_DIALOG = "SWITCH_HISTORY_DIALOG"
export const GOT_HISTORY = "GOT_HISTORY"


/*
  FPKG-130000-Member: MemberManage
*/

// actions
export const GET_MEMBER_LIST = "GET_MEMBER_LIST"
export const VERIFY_MEMBER = "VERIFY_MEMBER"
export const ADD_MEMBER = "ADD_MEMBER"
export const EDIT_MEMBER = "EDIT_MEMBER"
export const GET_MEMBER = "GET_MEMBER"
export const EDIT_MEMBER_GAME_SETTING = "EDIT_MEMBER_GAME_SETTING"
export const GET_MEMBER_GAME_SETTING = "GET_MEMBER_GAME_SETTING"

// mutations
export const GOT_MEMBER_LIST = "GOT_MEMBER_LIST"
export const GOT_VERIFY_INFO = "GOT_VERIFY_INFO"
export const CLOSE_VERIFY_DIALOG = "CLOSE_VERIFY_DIALOG"
export const SWITCH_MEMBER_DIALOG = "SWITCH_MEMBER_DIALOG"
export const SWITCH_POINT_DIALOG = "SWITCH_POINT_DIALOG"
export const GOT_MEMBER = "GOT_MEMBER"
export const SET_MEMBER_POINT_MODIFY = "SET_MEMBER_POINT_MODIFY"
export const CLEAR_MEMBER_POINT_MODIFY = "CLEAR_MEMBER_POINT_MODIFY"
export const GOT_MEMBER_GAME_SETTING = "GOT_MEMBER_GAME_SETTING"

/*
  FPKG-130000-Member: MemberSearch
*/

// actions
export const GET_SINGLE_MEMBER = "GET_SINGLE_MEMBER"
export const GET_ALLOW_COMMISSION_LIST = "GET_ALLOW_COMMISSION_LIST"
export const GET_WITHDRAWN_COMMISSION_LIST = "GET_WITHDRAWN_COMMISSION_LIST"
export const GET_ADDED_POINT_LIST = "GET_ADDED_POINT_LIST"
export const GET_SUBTRACTED_POINT_LIST = "GET_SUBTRACTED_POINT_LIST"
export const GET_DIRECT_MEMBER_LIST = "GET_DIRECT_MEMBER_LIST"
export const GET_UPPER_MEMBER_LIST = "GET_UPPER_MEMBER_LIST"

// mutations
export const GOT_SINGLE_MEMBER = "GOT_SINGLE_MEMBER"
export const GOT_ALLOW_COMMISSION_LIST = "GOT_ALLOW_COMMISSION_LIST"
export const GOT_WITHDRAWN_COMMISSION_LIST = "GOT_WITHDRAWN_COMMISSION_LIST"
export const GOT_ADDED_POINT_LIST = "GOT_ADDED_POINT_LIST"
export const GOT_SUBTRACTED_POINT_LIST = "GOT_SUBTRACTED_POINT_LIST"
export const GOT_DIRECT_MEMBER_LIST = "GOT_DIRECT_MEMBER_LIST"
export const GOT_UPPER_MEMBER_LIST = "GOT_UPPER_MEMBER_LIST"


/*
  FPKG-130000-Member: BankAcc
*/

// actions
export const GET_BANK_ACC_LIST = "GET_BANK_ACC_LIST"
export const EDIT_BANK_ACC = "EDIT_BANK_ACC"

// mutations
export const GOT_BANK_ACC_LIST = "GOT_BANK_ACC_LIST"
export const SWITCH_BANK_ACC_DIALOG = "SWITCH_BANK_ACC_DIALOG"
export const SET_BANK_ACC = "SET_BANK_ACC"
export const CHANGE_BANK_ACC_LIST_TYPE = "CHANGE_BANK_ACC_LIST_TYPE"


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
export const SET_DEPOSIT_STATUS = "SET_DEPOSIT_STATUS"

// mutations
export const SET_DEPOSIT = "SET_DEPOSIT"
export const GOT_DEPOSIT_LIST = "GOT_DEPOSIT_LIST"
export const GOT_DEPOSIT_INFO = "GOT_DEPOSIT_INFO"
export const SWITCH_DEPOSIT_DIALOG = "SWITCH_DEPOSIT_DIALOG"
export const SWITCH_DEPOSIT_INFO_DIALOG = "SWITCH_DEPOSIT_INFO_DIALOG"
export const CHANGED_DEPOSIT_LIST_TYPE = "CHANGED_DEPOSIT_LIST_TYPE"


/*
  FPKG-150000-Money: Withdraw
*/

// actions
export const GET_WITHDRAW_INFO = "GET_WITHDRAW_INFO"
export const GET_WITHDRAW_LIST = "GET_WITHDRAW_LIST"
export const SET_WITHDRAW_STATUS = "SET_WITHDRAW_STATUS"


// mutations
export const SET_WITHDRAW = "SET_WITHDRAW"
export const GOT_WITHDRAW_LIST = "GOT_WITHDRAW_LIST"
export const GOT_WITHDRAW_INFO = "GOT_WITHDRAW_INFO"
export const SWITCH_WITHDRAW_DIALOG = "SWITCH_WITHDRAW_DIALOG"
export const SWITCH_WITHDRAW_INFO_DIALOG = "SWITCH_WITHDRAW_INFO_DIALOG"
export const CHANGED_WITHDRAW_LIST_TYPE = "CHANGED_WITHDRAW_LIST_TYPE"

/*
  FPKG-150000-Money: Dispense
*/

// actions
export const GET_DISPENSE_INFO = "GET_DISPENSE_INFO"
export const GET_DISPENSE_LIST = "GET_DISPENSE_LIST"
export const SET_DISPENSE_STATUS = "SET_DISPENSE_STATUS"


// mutations
export const SET_DISPENSE = "SET_DISPENSE"
export const GOT_DISPENSE_LIST = "GOT_DISPENSE_LIST"
export const GOT_DISPENSE_INFO = "GOT_DISPENSE_INFO"
export const SWITCH_DISPENSE_DIALOG = "SWITCH_DISPENSE_DIALOG"
export const SWITCH_DISPENSE_INFO_DIALOG = "SWITCH_DISPENSE_INFO_DIALOG"
export const CHANGED_DISPENSE_LIST_TYPE = "CHANGED_DISPENSE_LIST_TYPE"


/*
  FPKG-150000-Money: DispenseAcc
*/

// actions
export const CLEAR_DISPENSE_ACC_POINT = "CLEAR_DISPENSE_ACC_POINT"
export const GET_DISPENSE_ACC_LIST = "GET_DISPENSE_ACC_LIST"
export const DEL_DISPENSE_ACC = "DEL_DISPENSE_ACC"
export const ADD_DISPENSE_ACC = "ADD_DISPENSE_ACC"
export const EDIT_DISPENSE_ACC = "EDIT_DISPENSE_ACC"
export const SET_PRIMARY_DISPENSE_ACC = "SET_PRIMARY_DISPENSE_ACC"

// mutations
export const SWITCH_DISPENSE_ACC_DIALOG = "SWITCH_DISPENSE_ACC_DIALOG"
export const GOT_DISPENSE_ACC_LIST = "GOT_DISPENSE_ACC_LIST"


/*
  FPKG-160000-Money: BettingInfo
*/

// actions
export const GET_BETTING_INFO = "GET_BETTING_INFO"

// mutations
export const GOT_BETTING_INFO = "GOT_BETTING_INFO"


/*
  FPKG-170000-Report: MemberReport
*/

// actions
export const GET_MEMBER_REPORT = "GET_MEMBER_REPORT"
export const GET_MEMBER_GAME_REPORT = "GET_MEMBER_GAME_REPORT"
export const GET_MEMBER_GAME_REPORT_INFO = "GET_MEMBER_GAME_REPORT_INFO"
export const GET_MEMBER_GAME_REPORT_DETAIL = "GET_MEMBER_GAME_REPORT_DETAIL"

// mutations
export const GOT_MEMBER_REPORT = "GOT_MEMBER_REPORT"
export const GOT_MEMBER_GAME_REPORT_INFO = "GOT_MEMBER_GAME_REPORT_INFO"
export const GOT_MEMBER_GAME_REPORT_DETAIL = "GOT_MEMBER_GAME_REPORT_DETAIL"


/*
  FPKG-170000-Report: GameReport
*/

// actions
export const GET_GAME_TOTAL_REPORT = "GET_GAME_TOTAL_REPORT"
export const GET_GAME_TYPE_REPORT = "GET_GAME_TYPE_REPORT"
export const GET_GAME_PLAY_REPORT = "GET_GAME_PLAY_REPORT"
export const GET_GAME_PLAY_REPORT_INFO = "GET_GAME_PLAY_REPORT_INFO"
export const GET_GAME_PLAY_REPORT_DETAIL = "GET_GAME_PLAY_REPORT_DETAIL"

// mutations
export const GOT_GAME_TOTAL_REPORT = "GOT_GAME_TOTAL_REPORT"
export const GOT_GAME_TYPE_REPORT = "GOT_GAME_TYPE_REPORT"
export const GOT_GAME_PLAY_REPORT_INFO = "GOT_GAME_PLAY_REPORT_INFO"
export const GOT_GAME_PLAY_REPORT_DETAIL = "GOT_GAME_PLAY_REPORT_DETAIL"


/*
  FPKG-180000-Manage: Users
*/

// actions
export const GET_PERMISSION_GROUP_OPTIONS = "GET_PERMISSION_GROUP_OPTIONS"
export const GET_USER_LIST = "GET_USER_LIST"
export const DEL_USER = "DEL_USER"
export const ADD_USER = "ADD_USER"
export const EDIT_USER = "EDIT_USER"
export const GET_IP_OPTIONS = "GET_IP_OPTIONS"

// mutations
export const GOT_PERMISSION_GROUP_OPTIONS = "GOT_PERMISSION_GROUP_OPTIONS"
export const SWITCH_USER_DIALOG = "SWITCH_USER_DIALOG"
export const GOT_USER_LIST = "GOT_USER_LIST"
export const GOT_IP_OPTIONS = "GOT_IP_OPTIONS"

/*
  FPKG-180000-Manage: IP
*/

// actions
export const GET_IP_LIST = "GET_IP_LIST"
export const DEL_IP = "DEL_IP"
export const ADD_IP = "ADD_IP"
export const EDIT_IP = "EDIT_IP"

// mutations
export const SWITCH_IP_DIALOG = "SWITCH_IP_DIALOG"
export const GOT_IP_LIST = "GOT_IP_LIST"


/*
  FPKG-180000-Manage
*/

// actions
export const GET_USER_OPTIONS = "GET_USER_OPTIONS"

// mutations
export const GOT_USER_OPTIONS = "GOT_USER_OPTIONS"


/*
  FPKG-180000-Manage: OperatingLog
*/

// actions
export const GET_OPERATING_LOG_LIST = "GET_OPERATING_LOG_LIST"
export const GET_OPERATING_OPTIONS = "GET_OPERATING_OPTIONS"

// mutations
export const GOT_OPERATING_LOG_LIST = "GOT_OPERATING_LOG_LIST"
export const GOT_OPERATION_OPTIONS = "GOT_OPERATION_OPTIONS"

/*
  FPKG-180000-Manage: LoginLog
*/

// actions
export const GET_LOGIN_LOG_LIST = "GET_LOGIN_LOG_LIST"

// mutations
export const GOT_LOGIN_LOG_LIST = "GOT_LOGIN_LOG_LIST"

/*
  FPKG-180000-Manage: Permission
*/

// actions
export const GET_DEFAULT_PERMISSION_MENU = "GET_DEFAULT_PERMISSION_MENU"
export const GET_PERMISSION_GROUP_LIST = "GET_PERMISSION_GROUP_LIST"
export const CREATE_PERMISSION_GROUP = "CREATE_PERMISSION_GROUP"
export const MODIFY_PERMISSION_GROUP = "MODIFY_PERMISSION_GROUP"
export const GET_PERMISSION = "GET_PERMISSION"

// mutations
export const GOT_PERMISSION_GROUP_LIST = "GOT_PERMISSION_GROUP_LIST"
export const GOT_DEFAULT_PERMISSION_MENU = "GOT_DEFAULT_PERMISSION_MENU"
export const SET_FIXED_PERMISSION_MENU = "SET_FIXED_PERMISSION_MENU"
export const GOT_PERMISSION = "GOT_PERMISSION"

