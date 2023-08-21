import { Link } from "react-router-dom";
import {
  Alert,
  Breadcrumb as BreadcrumbMain,
  BreadcrumbItem,
} from "reactstrap";
import { isValidArray } from "@/modules/utils";

const Breadcrumb = ({ data }) => (
  <Alert color="dark">
    <BreadcrumbMain listClassName="mb-0">
      <BreadcrumbItem>
        <Link to="/dashboard">Dashboard</Link>
      </BreadcrumbItem>
      {isValidArray(data) &&
        data.map(({ item, id, isActive = false }) => (
          <BreadcrumbItem key={id} active={isActive}>
            {item}
          </BreadcrumbItem>
        ))}
    </BreadcrumbMain>
  </Alert>
);

export default Breadcrumb;
