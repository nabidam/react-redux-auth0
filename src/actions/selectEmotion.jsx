import * as types from "../types/types";

const selectEmotion = emotion => ({
  type: types.SELECT_EMOTION,
  emotion
});

export default selectEmotion;
