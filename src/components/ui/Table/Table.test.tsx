import { render, screen } from "@testing-library/react";
import Table from "./Table";

interface Student {
  id: number;
  name: string;
  course: string;
  status: string;
}

const columns = [
  {
    key: "id" as keyof Student,
    label: "ID",
  },
  {
    key: "name" as keyof Student,
    label: "Student Name",
  },
  {
    key: "course" as keyof Student,
    label: "Course",
  },
  {
    key: "status" as keyof Student,
    label: "Status",
  },
];

const students: Student[] = [
  {
    id: 1,
    name: "Rahul",
    course: "NEET PG",
    status: "Active",
  },
  {
    id: 2,
    name: "Arun",
    course: "FMGE",
    status: "Inactive",
  },
];

describe("Table", () => {
  it("renders table headers", () => {
    render(
      <Table
        columns={columns}
        data={students}
        rowKey="id"
      />,
    );

    expect(
      screen.getByRole("columnheader", { name: "ID" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("columnheader", {
        name: "Student Name",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("columnheader", { name: "Course" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("columnheader", { name: "Status" }),
    ).toBeInTheDocument();
  });

  it("renders table data", () => {
    render(
      <Table
        columns={columns}
        data={students}
        rowKey="id"
      />,
    );

    expect(screen.getByText("Rahul")).toBeInTheDocument();
    expect(screen.getByText("NEET PG")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();

    expect(screen.getByText("Arun")).toBeInTheDocument();
    expect(screen.getByText("FMGE")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("renders empty message when there is no data", () => {
    render(
      <Table
        columns={columns}
        data={[]}
        rowKey="id"
      />,
    );

    expect(
      screen.getByText("No data available."),
    ).toBeInTheDocument();
  });

  it("supports a custom empty message", () => {
    render(
      <Table
        columns={columns}
        data={[]}
        rowKey="id"
        emptyMessage="No students found."
      />,
    );

    expect(
      screen.getByText("No students found."),
    ).toBeInTheDocument();
  });

  it("supports custom cell rendering", () => {
    const customColumns = [
      ...columns,
      {
        key: "actions",
        label: "Action",
        render: (student: Student) => (
          <button type="button">
            View {student.name}
          </button>
        ),
      },
    ];

    render(
      <Table
        columns={customColumns}
        data={students}
        rowKey="id"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "View Rahul",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "View Arun",
      }),
    ).toBeInTheDocument();
  });
});