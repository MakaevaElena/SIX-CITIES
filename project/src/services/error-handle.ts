import request from 'axios';
import { toast } from 'react-toastify';

import { HTTP_CODE } from '../const';
import { ErrorType } from '../types/error';

function errorHandle(error: ErrorType): void {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.info(response.data.error);
        break;
    }
  }
}

export { errorHandle };
