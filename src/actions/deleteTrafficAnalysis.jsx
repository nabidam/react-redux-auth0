import * as types from "../types/types";

const deleteTrafficAnalysis = analysis => ({
  type: types.DELETE_TRAFFIC_ANALYSIS,
  analysis
});

export default deleteTrafficAnalysis;
