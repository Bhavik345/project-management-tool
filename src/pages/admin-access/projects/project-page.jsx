// ProjectPage.jsx

import React from 'react';
import { DataTable } from '../../../components/tables/data-table';

const ProjectPage = () => {
  const data = [
    { id: 1, name: 'Project 1', description: 'Description 1' },
    { id: 2, name: 'Project 2', description: 'Description 2' },
    // Add more rows as needed
  ];

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Description', accessor: 'description' },
  ];

  return (
    <div className="flex flex-col">
      {/* Title Section */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        {/* Add Project Button */}
        {/* ... (your button for adding a project) */}
      </div>

      {/* Table Section */}
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProjectPage;
