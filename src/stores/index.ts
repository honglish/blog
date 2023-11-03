import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";

import blogsStore from "./blogsStore";

export const stores = {
  blogsStore,
};

export default stores;

export function useStores() {
  return useContext(MobXProviderContext);
}
