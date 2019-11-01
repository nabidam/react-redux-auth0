import * as types from "../types/types";

const changeComeFrom = comeFrom => ({
  type: types.CHANGE_COME_FROM,
  comeFrom
});

export default changeComeFrom;
