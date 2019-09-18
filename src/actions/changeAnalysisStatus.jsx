import * as types from "../types/types";

const changeAnalysisStatus = analysis => ({
  type: types.CHANGE_ANALYSIS_STATUS,
  analysis
});

export default changeAnalysisStatus;
