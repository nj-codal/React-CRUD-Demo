import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import classNames from "classnames";
import UserBreadcrumb from "@/components/Users/UserBreadcrumb";
import Delete from "@/components/Users/UserDelete";
import UserHeader from "@/components/Users/UserHeader";
import { defaultState, headerTitles, statusOptions } from "@/data/user";
import PaginationContainer from "@/lib/PaginationContainer";
import {
  bulkCreateUsers,
  getAllUsers,
  getFilteredListData,
  getRandomUsers,
  showDate,
  showEmail,
  showStatus,
} from "@/modules/user";
import { isValidArray, later, paginate } from "@/modules/utils";

const AddRandomUsers = ({ doPlus }) => {
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    bulkCreateUsers(getRandomUsers(1000));

    later(1500).finally(() => {
      setLoading(false);
      doPlus();
    });
  };

  return (
    <Button
      className="d-block ms-2 me-2"
      disabled={isLoading}
      onClick={handleClick}
      outline
    >
      <i
        className={classNames("fa fa-xs me-2", {
          "fa-random": !isLoading,
          "fa-circle-notch fa-spin": isLoading,
        })}
      />
      Add Random Users
    </Button>
  );
};

const UsersTableBody = ({ doPlus, listData }) => {
  let navigate = useNavigate();

  const handleAction = (id, type) => navigate(`/users/${type}/${id}`);

  if (!isValidArray(listData)) {
    return (
      <tr>
        <td colSpan="7" className="text-center">
          No results found.
        </td>
      </tr>
    );
  }

  return listData.map((d) => (
    <tr key={d.id}>
      <th scope="row">
        <Link to={`/users/detail/${d.id}`}>{d.id}</Link>
      </th>
      <td>{d.firstName}</td>
      <td>{d.lastName}</td>
      <td>{showEmail(d.email)}</td>
      <td>{showDate(d?.createdAt)}</td>
      <td>{showStatus(d?.status)}</td>
      <td>
        <ButtonGroup>
          <Button
            color="dark"
            type="button"
            size="sm"
            outline
            onClick={() => handleAction(d.id, "detail")}
          >
            <i className="fa fa-eye" />
          </Button>
          <Button
            color="dark"
            type="button"
            size="sm"
            outline
            onClick={() => handleAction(d.id, "edit")}
          >
            <i className="fa fa-pencil" />
          </Button>
          <Delete id={d.id} callBack={doPlus} />
        </ButtonGroup>
      </td>
    </tr>
  ));
};

const UsersList = () => {
  const [columnSearch, setColumnSearch] = useState(defaultState.columnSearch);
  const [currentPage, setCurrentPage] = useState(defaultState.currentPage);
  const [globalSearch, setGlobalSearch] = useState(defaultState.globalSearch);
  const [perPage, setPerPage] = useState(defaultState.perPage);
  const [sortType, setSortType] = useState(defaultState.sortType);
  const [sortWith, setSortWith] = useState(defaultState.sortWith);
  const [count, setCount] = useState(0);

  const doPlus = () => setCount(count + 1);

  const all = getAllUsers();

  const updateColumnSearch = (key, value) => {
    setColumnSearch({
      ...columnSearch,
      [key]: value || "",
    });
    setCurrentPage(1);
  };

  const renderSearchInput = (key) => (
    <Input
      name={key}
      type="search"
      onChange={(e) => updateColumnSearch(key, e?.target?.value)}
      value={columnSearch?.[key] || ""}
    />
  );

  const filterData = getFilteredListData({
    columnSearch,
    data: all,
    globalSearch,
    sortWith,
    sortType,
  });

  const showAll = perPage === "all";

  const getListData = () =>
    paginate(filterData, !showAll ? perPage : filterData.length, currentPage);

  const listData = getListData();

  const getPaginationDetails = () => {
    if (!showAll) {
      const total = filterData.length;
      const recordsFrom =
        total > 0 ? (Number(currentPage) - 1) * Number(perPage) + 1 : 0;
      const recordsTo = Number(currentPage) * Number(perPage);
      return `Showing ${recordsFrom} to ${
        recordsTo > total ? total : recordsTo
      } of ${total} entries`;
    }
    return `Showing all (${filterData.length}) entries`;
  };

  const getFilterDetails = () => {
    const {
      email = "",
      firstName = "",
      id = "",
      lastName = "",
      status = "",
    } = columnSearch || {};

    return email || firstName || id || lastName || status || globalSearch
      ? `(filtered from ${all.length} total entries)`
      : "";
  };

  const renderPagination = () => (
    <div className="d-flex justify-content-between align-items-center">
      <span>
        {getPaginationDetails()} {getFilterDetails()}
      </span>
      <PaginationContainer
        activePage={currentPage}
        itemsCountPerPage={Number(!showAll ? perPage : filterData.length)}
        onChange={(offset) => setCurrentPage(offset)}
        totalItemsCount={filterData.length}
      />
    </div>
  );

  const handleResetFilter = () => {
    setColumnSearch(defaultState.columnSearch);
    setCurrentPage(defaultState.currentPage);
    setGlobalSearch(defaultState.globalSearch);
    setPerPage(defaultState.perPage);
  };

  const handleSort = (key) => {
    if (sortWith !== key) {
      setSortWith(key);
      setSortType("ASC");
    } else {
      setSortType(sortType === "DESC" ? "ASC" : "DESC");
    }
  };

  const renderSort = (key) => {
    if (sortWith !== key) {
      return null;
    }

    return (
      <i
        aria-hidden="true"
        className={classNames("fa float-right", {
          "fa-sort-asc": sortType !== "DESC",
          "fa-sort-desc": sortType === "DESC",
        })}
      />
    );
  };

  const renderHeader = (key, props) => (
    <th onClick={() => handleSort(key)} {...props}>
      <div
        className="d-flex text-items-center justify-content-between align-items-center"
        role="button"
      >
        {headerTitles[key]} {renderSort(key)}
      </div>
    </th>
  );

  return (
    <>
      <UserBreadcrumb active="List" />
      <UserHeader>
        <Link className="text-decoration-none" to="/users/add">
          <Button>
            <i className="fa fa-plus fa-xs me-2" />
            Add a User
          </Button>
        </Link>
        <AddRandomUsers doPlus={doPlus} />
        <Button className="d-block me-2" onClick={handleResetFilter} outline>
          <i className="fa fa-filter fa-xs me-2" />
          Reset Filter
        </Button>
        <Delete callBack={doPlus} label="Delete All Users" />
      </UserHeader>
      <Card body>
        <Row className="mb-2">
          <Col
            md={{
              size: 3,
            }}
            className="d-flex flex-row align-items-center"
          >
            <Label for="perPage" className="mb-0 d-flex align-items-center">
              Show{" "}
              <Input
                id="perPage"
                name="perPage"
                type="select"
                value={perPage || "10"}
                onChange={(e) => {
                  setPerPage(e?.target?.value || "10");
                  setCurrentPage(1);
                }}
                className="mx-2"
              >
                {["10", "25", "50", "100", "ALL"].map((d) => (
                  <option key={d} value={d.toLowerCase()}>
                    {d}
                  </option>
                ))}
              </Input>{" "}
              entries
            </Label>
          </Col>
          <Col
            md={{
              offset: 6,
              size: 3,
            }}
            className="d-flex flex-row align-items-center"
          >
            <Label for="search" className="mb-0">
              <i className="fa fa-search" />
            </Label>
            <Input
              id="search"
              name="search"
              type="search"
              onChange={(e) => {
                setGlobalSearch(e?.target?.value || "");
                setCurrentPage(1);
              }}
              value={globalSearch}
              style={{ marginLeft: 10 }}
            />
          </Col>
        </Row>
        <Table bordered hover responsive className="users-table">
          <thead>
            <tr>
              {renderHeader("id")}
              {renderHeader("firstName")}
              {renderHeader("lastName")}
              {renderHeader("email")}
              {renderHeader("createdAt")}
              {renderHeader("status", { style: { minWidth: 150 } })}
              <th style={{ minWidth: 100 }}>Actions</th>
            </tr>
            <tr>
              <th>{renderSearchInput("id")}</th>
              <th>{renderSearchInput("firstName")}</th>
              <th>{renderSearchInput("lastName")}</th>
              <th>{renderSearchInput("email")}</th>
              <th>{renderSearchInput("createdAt")}</th>
              <th>
                <Input
                  name="status"
                  type="select"
                  value={columnSearch?.status || ""}
                  onChange={(e) =>
                    updateColumnSearch("status", e?.target?.value)
                  }
                >
                  <option value="">All</option>
                  {Object.keys(statusOptions).map((key) => (
                    <option key={key} value={key}>
                      {statusOptions[key]}
                    </option>
                  ))}
                </Input>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <UsersTableBody listData={listData} doPlus={doPlus} />
          </tbody>
        </Table>
        <div>{renderPagination()}</div>
      </Card>
    </>
  );
};

export default UsersList;
