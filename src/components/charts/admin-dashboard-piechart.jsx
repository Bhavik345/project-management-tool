/* eslint-disable react/prop-types */
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const AdminDshboardPieChart = ({ projects }) => {
  const projectData = projects?.map((project) => ({
    value: project.resources.length > 0 ? project.resources.length : 0,
    name: project.project_name,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  return (
    <PieChart width={500} height={500}>
      <Pie
        data={projectData}
        dataKey={"value"}
        cx={200}
        cy={200}
        outerRadius={80}
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          index,
          value,
        }) => {
          const RADIAN = Math.PI / 180;
          // eslint-disable-next-line
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          // eslint-disable-next-line
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          // eslint-disable-next-line
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill="#8884d8"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {projectData[index]?.name} ({value})
            </text>
          );
        }}
        fill="#8884d8"
      >
        {projectData?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: "#f5f5f5",
          color: "#333333",
          padding: 8,
          borderRadius: 4,
        }}
      />
      <Legend layout="vertical" align="right" verticalAlign="middle" />
    </PieChart>
  );
};

export default AdminDshboardPieChart;
