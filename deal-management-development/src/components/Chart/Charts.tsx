import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { ResponsiveContainer } from "recharts";
import Chart from "react-apexcharts";
export interface ChartMultiSelectProps {
  name: string;
  value: Array<number>;
  labels: Array<string>;
}
const IssuerConutChart = (props: ChartMultiSelectProps) => {
  const variable = {
    series: props.value,
    options: {
      state: {
        hover: {
          filter: {
            type: "lighten",
            value: 0.15,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "#256bee",
          shadeTo: "dark",
          shadeIntensity: 0.7,
        },
      },
      chart: {
        offsetX: 10,

        type: "donut",
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            // console.log(config.w.config.labels[config.dataPointIndex]);
            // console.log(chartContext);
            switch (config.w.config.labels[config.dataPointIndex]) {
              case "Approves Customersaa":
                window.open("http://localhost:3000/home");
              case "Pending Customersaa":
                window.open("http://localhost:3000/customer/customer-list");
            }
          },
        },
      },
      stroke: {
        width: 2,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: "Total " + props.name,
                color: "black",
              },
            },
          },
        },
      },
      title: {
        text: props.name + " Graph",
        style: {
          color: "#0277bd",
          fontWeight: 600,
        },
      },
      labels: props.labels,
      dataLabels: {
        backgroung: {
          dropShadow: {
            blur: 0,
            opacity: 0.9,
          },
        },
      },
      fill: {
        // colors:COLORS,
        type: "solid",
        opacity: 0.9,
      },

      legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 10,
        markers: {
          //fillColors:COLORS,
          width: 20,
          height: 16,
        },
      },
      tooltip: {
        fillSeriesColor: false,
        onDatasetHover: {
          highlightDataSeries: true,
        },
        marker: {
          show: true,
          //fillColors:COLORS,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <React.Fragment>
        <ResponsiveContainer>
          <Chart
            options={variable.options}
            series={variable.series}
            type="donut"
          />
        </ResponsiveContainer>
      </React.Fragment>
    </>
  );
};

export default IssuerConutChart;
