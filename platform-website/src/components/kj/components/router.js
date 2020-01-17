import Index from "./Index";
import KC from "./KC";
import Mall from "./Mall";
import Slmj from "./Slmj";
import ExchangeCenter from "./ExchangeCenter";
import KCRecord from "./record";

const router = [
  {
    path: "index",
    component: Index,
    name: "cjindex"
  },
  {
    path: "pool",
    component: KC,
    name: "kc"
  },
  {
    path: "mall",
    component: Mall,
    name: "mall"
  },
  {
    path: "slmj",
    component: Slmj,
    name: "slmj"
  },
  {
    path: "exchange",
    component: ExchangeCenter,
    name: "exchangecenter"
  },
  {
    path: "record",
    component: KCRecord,
    name: "recordtab"
  }
];

export default router;
