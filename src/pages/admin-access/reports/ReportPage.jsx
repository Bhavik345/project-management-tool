import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { report_list } from "../../../utils/resource-addAssigneModal";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getReports } from "../../../modules/report/report-Slice";
import { DataTable } from "../../../components/tables/data-table";

const ReportPage = () => {
  const [data, setData] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const { reportData } = useSelector((state) => state?.root?.reports);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(getReports(e.type));
    setData({ name: e.value, id: e.type });
  };

  const columns = useMemo(
    () => [
      { Header: "Employee Name", accessor: "employee.name" },
      { Header: "Role Type", accessor: "role_type" },
      { Header: "Project Name", accessor: "project.project_name" },
    ],
    []
  );

  const data1 = useMemo(
    () => (reportData && reportData?.length > 0 ? reportData : []),
    [reportData]
  );
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>

      <div>
        <div className="mb-[-40px] mt-5 w-[350px] relative	z-10">
          <Select  
            options={report_list}
            defaultValue={data}
            placeholder="Report List"
            onChange={(selectedOption) => handleChange(selectedOption)}
          />
        </div>
      </div>

      <div>
        <DataTable columns={columns} data={data1}  hideAction = {false} />
      </div>
    </>
  );
};

export default ReportPage;
