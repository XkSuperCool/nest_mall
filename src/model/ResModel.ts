class BaseModel {
  status: number;
  data: any;
  message: string

  constructor(status: number, data?: any, message?: string) {
    this.status = status;
    if (typeof data === 'string') {
      this.message = data;
    }

    if (data && typeof data !== 'string') {
      this.data = data;
    }

    if (message) {
      this.message = message;
    }
  }
}

export class SuccessModel extends BaseModel {
  constructor(data: any) {
    super(200, data);
  }
}

export class ErrorModel extends BaseModel {
  constructor(status: number, message: string) {
    super(status, message);
  }
}
