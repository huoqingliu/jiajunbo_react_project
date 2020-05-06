import { SAVE_TITLE } from "../action_types";

// 保存title信息到localstorage中
export const saveTitle = title => {
  // localStorage.setItem('title', JSON.stringify(title))
  return { type: SAVE_TITLE, data: title }
}
