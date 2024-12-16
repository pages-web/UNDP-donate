import { cache } from "react";
import { queries } from "../graphql/auth";
import { getClient } from "../ssClient";

export const getConfig = cache(async () => {
  const { data, error } = await getClient().query({
    query: queries.currentConfig,
  });
  const { currentConfig } = data || {};

  return { config: currentConfig, error_msg: error?.message };
});

export const getBranchDetail = cache(async () => {
  const { config } = await getConfig();
  const { erxesAppToken, branchId, name } = config || {};

  if (!branchId) return { name };

  const { data, error } = await getClient().query({
    query: queries.branchDetail,
    variables: {
      id: branchId,
    },
    context: {
      headers: {
        "erxes-app-token": erxesAppToken,
      },
    },
  });

  const { branchDetail } = data || {};

  return { branchDetail, error_msg: error?.message, name };
});
