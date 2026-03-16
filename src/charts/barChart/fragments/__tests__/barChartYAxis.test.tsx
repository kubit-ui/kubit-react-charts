import { render } from "@testing-library/react";

import { BarChart } from "../../barChart";
import { BarChartContext } from "../../context/barChartContext";
import { CONTEXT } from "../fixture/barContextData";

describe("LineChartYAxis", () => {
  it("renders correctly with context", () => {
    const { getByTestId } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.YAxis tickLine={{}} tickText={{ fontSize: 12 }} />
      </BarChartContext.Provider>,
    );

    const yAxis = getByTestId("testyAxis");
    expect(yAxis).toBeInTheDocument();
  });

  it("renders formatted tick labels", () => {
    const { getByText } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.YAxis
          tickLine={{}}
          tickText={{ fontSize: 12 }}
          valueFormatter={(value) => `${value}%`}
        />
      </BarChartContext.Provider>,
    );

    expect(getByText("10%")).toBeInTheDocument();
    expect(getByText("20%")).toBeInTheDocument();
    expect(getByText("30%")).toBeInTheDocument();
  });
});
