import { ErrorModel, SuccessModel } from '../model/ResModel';
import { ResErrorObj } from '../model/errorInfo';

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
// 分布式有条件类型
type MyExclude<T, P> = T extends P ? never : T
type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>

export function excludeAttributes<T, K extends keyof T> (param: T, ...args: K[]): MyOmit<T, K> {
  const tempObj = {};
  for (const [key, value] of Object.entries(JSON.parse(JSON.stringify(param)))) {
    if (!args.includes(key as K)) {
      tempObj[key] = value;
    }
  }
  return tempObj as MyOmit<T, K>;
}


// 查询函数错误捕获返回
export function errorReturn(result: any, error: ResErrorObj) {
  if (result?.ok) {
    return new SuccessModel('ok');
  } else {
    return new ErrorModel(error.status, error.msg);
  }
}
