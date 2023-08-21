import { UncontrolledTooltip } from "reactstrap";

const year = new Date().getFullYear();

const Footer = () => (
  <section className="bg-secondary text-white">
    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between container-lg py-3">
      <div className="mb-3 mb-md-0">
        Copyright © {year}. All rights reserved.
      </div>
      <div className="d-flex">
        <div>
          By{" "}
          <a
            className="text-white"
            href="https://about.me/niravjethva"
            id="hire-me"
            rel="noreferrer"
            target="_blank"
          >
            NIRAV JETHVA
          </a>
          .
        </div>
        <UncontrolledTooltip placement="top" target="hire-me">
          Hire Me!
        </UncontrolledTooltip>
      </div>
    </div>
  </section>
);

export default Footer;
