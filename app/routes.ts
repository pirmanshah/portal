import {
  index,
  route,
  layout,
  prefix,
  type RouteConfig,
} from "@react-router/dev/routes";
import { PATH } from "./constants/path";

export default [
  index("routes/home.tsx"),
  route("*", "routes/not-found.tsx"),
  layout("routes/auth/auth.layout.tsx", [
    route(PATH.SIGN_IN, "routes/auth/sign-in/sign-in.tsx"),
  ]),
  layout("routes/app.layout.tsx", [
    route("/unauthorized", "routes/unauthorized.tsx"),
    route(PATH.DASHBOARD, "routes/dashboard/dashboard.tsx"),
    route("/profile", "routes/profile/profile.tsx"),
    ...prefix("automation", [index("routes/automation/automation.tsx")]),
    layout("routes/warehouse/warehouse.layout.tsx", [
      ...prefix("warehouse", [
        route("/inventory", "routes/warehouse/inventory/inventory-wh.tsx"),
        route("/receipt", "routes/warehouse/receipt/receipt.tsx"),
        route(
          "/receipt/:code/detail",
          "routes/warehouse/receipt/$code/receipt.code.tsx"
        ),
        route(
          "/receipt/create",
          "routes/warehouse/receipt/create/receipt.create.tsx"
        ),
        ...prefix("issued", [
          index("routes/warehouse/issued/issued.tsx"),
          route(
            "/:code/detail",
            "routes/warehouse/issued/$code/issued.code.tsx"
          ),
          route("/create", "routes/warehouse/issued/create/create.issued.tsx"),
        ]),
        route("/print", "routes/warehouse/wh-print.tsx"),
      ]),
    ]),
    layout("routes/weighing/weighing.layout.tsx", [
      ...prefix("weighing", [
        route("/inventory", "routes/weighing/inventory/inventory-wg.tsx"),
        ...prefix("issued", [
          index("routes/weighing/issued/weighing.issued.tsx"),
          route(
            "/:code/detail",
            "routes/weighing/issued/$code/weighing.issued.code.tsx"
          ),
          route(
            "/create",
            "routes/weighing/issued/create/weighing.create.issued.tsx"
          ),
        ]),
      ]),
    ]),
    layout("routes/print/print.layout.tsx", [
      ...prefix("print", [
        route("/invoice", "routes/print/invoice/invoice.tsx"),
        route("/delivery", "routes/print/delivery/delivery.tsx"),
        route("/packing", "routes/print/packing/packing.tsx"),
      ]),
    ]),

    ...prefix("reports", [
      route("/price-book", "routes/reports/price-book/price-book.tsx"),
      route("/original-po", "routes/reports/original-po/original-po.tsx"),
      route(
        "/sales-delivery",
        "routes/reports/sales-delivery/sales-delivery.tsx"
      ),
      route(
        "/purchase-receipt",
        "routes/reports/purchase-receipt/purchase-receipt.tsx"
      ),
      route(
        "/inventory-list",
        "routes/reports/inventory-list/inventory-list.tsx"
      ),
    ]),
    layout("routes/accounting/accounting.layout.tsx", [
      ...prefix("accounting", [
        route("/coretax", "routes/accounting/coretax.tsx"),
        route("/reports", "routes/accounting/acc-report.tsx"),
      ]),
    ]),
    layout("routes/cs/cs.layout.tsx", [
      ...prefix("cust-service", [
        route("/coretax", "routes/cs/cs-coretax.tsx"),
        route("/reports", "routes/cs/cs-report.tsx"),
        route("/print", "routes/cs/cs-print.tsx"),
      ]),
    ]),
    layout("routes/purchasing/purchasing.layout.tsx", [
      ...prefix("purchasing", [
        route("/reports", "routes/purchasing/pur-report.tsx"),
      ]),
    ]),
    layout("routes/logistic/logistic.layout.tsx", [
      ...prefix("logistic", [
        route("/bc-online", "routes/logistic/bc-online/bc-online.tsx"),
        route("/tpb-bc-27", "routes/logistic/tpb-bc-27/tpb-bc-27.tsx"),
      ]),
    ]),
    layout("routes/production/production.layout.tsx", [
      ...prefix("production", [
        route("/print-label", "routes/production/label/fg-label.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
