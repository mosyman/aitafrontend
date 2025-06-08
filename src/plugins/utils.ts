import { dayjs as arcoDayjs } from "@arco-design/web-vue/es/_utils/date";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * 格式化时间为 YYYY-MM-DD HH:mm:ss
 * @param time 时间字符串或时间戳
 */
export const formatTime = (time: string) => {
  return arcoDayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

/**
 * 格式化时间为 YYYY-MM-DD
 * @param time 时间字符串或时间戳
 */
export const formatDate = (time: string | number) => {
  return arcoDayjs(time).format("YYYY-MM-DD");
};

export const parseToUTC = (time: string) => {
  return dayjs.utc(time).format("YYYY-MM-DD HH:mm:ss");
};
