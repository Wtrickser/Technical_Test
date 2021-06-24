import React from "react";

const Payments = ({ payments }) => {
  return (
    <div className="accordion" id="paymentsAccordion">
      {payments.map((payment, index) => {
        const { Payee, Payment, Remittance } = payment;

        let total = 0;
        Remittance.forEach(payor => {
          let payed = parseFloat(payor.Amount.replace(/[$,]/g, ""));
          return (total += payed);
        });

        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2
        });

        const totalPayedUSD = formatter.format(
          Number(Math.round(total + "e2") + "e-2")
        );

        return (
          <div className="card" key={index}>
            <div className="card-header" id={`heading-${index}`}>
              <h2
                className="mb-0 d-flex align-items-center"
                style={{ lineHeight: 3 }}
              >
                <button
                  className="btn btn-link font-weight-bold"
                  type="button"
                  data-toggle="collapse"
                  data-target={`#collapse-${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse-${index}`}
                  style={{ color: "#702082" }}
                >
                  <i className="fas fa-info-circle" />
                </button>{" "}
                <div className="m-0 d-flex flex-column flex-md-row justify-content-center- align-content-center">
                  <p
                    className="mt-0"
                    id={`total-${index}`}
                    style={{ fontSize: "1em", color: "#667691" }}
                  >
                    {Payee.Name}
                  </p>
                  <p
                    className="mb-0 mt-n5 mt-md-4 ml-md-2 p-0 font-weight-normal font-italic position-relative"
                    id={`total-${index}`}
                    style={{ fontSize: ".5em", color: "#a0a8b8", textDecorationLine: 'underline' }}
                  >
                    {Payee.SubmissionDate}
                  </p>
                  <style>
                    {`
                      @media (min-width: 768px) {
                        #total-${index} {
                          top: 10px;
                        }
                      }
                      `}
                  </style>
                </div>
                <div className="m-0 ml-auto d-flex flex-column justify-content-center- align-content-center">
                  <p
                    className="mt-3"
                    id={`total-${index}`}
                    style={{ fontSize: ".75em", color: "#567691", fontFamily: "Palatino" }}
                  >
                    {`${totalPayedUSD}`}
                  </p>
                  <p
                    className="mt-n5 text-right p-0"
                    id={`total-${index}`}
                    style={{ fontSize: ".5em", color: "#0000ff" }}
                  >
                    {`paid`}
                  </p>
                </div>
              </h2>
            </div>
            <div
              id={`collapse-${index}`}
              className={`collapse ${index === 0 ? "show" : null}`}
              aria-labelledby={`heading-${index}`}
              data-parent="#paymentsAccordion"
            >
              <div className="card-body">
                <div className="container border- shadow-sm rounded">
                  <div className="row">
                    <div className="col-md-6 p-lg-5 my-2 my-lg-0 d-flex flex-column payee text-center text-lg-left">
                      <h3 className="mb-3" style={{ fontStyle: "italic" }}>Payee</h3>
                      <p className="text-secondary">{`${Payee.Attention}`}</p>
                      <span className="">
                        <i
                          className="fas fa-fax"
                          style={{ color: "#ffa500" }}
                        />{" "}
                        {Payee.Fax}
                      </span>
                      <span className="">
                        <i
                          className="fas fa-phone"
                          style={{ color: "#00ff00" }}
                        />{" "}
                        {Payee.Phone}
                      </span>
                      <p className="text-secondary">
                      <i
                          className="fas fa-map-marker-alt"
                          style={{ color: "#ff0000" }}
                        />{" "}
                        {Payee.Address.Address1}</p>
                      {Payee.Address.Address2 ? (
                        <p className="text-secondary">
                          {Payee.Address.Address2}
                        </p>
                      ) : null}
                      <p className="text-secondary">
                      <i
                          className="fas fa-map-marked"
                          style={{ color: "#e2c84c" }}
                        />{" "}
                        {`${Payee.Address.City}, ${
                          Payee.Address.StateOrProvince
                        } ${Payee.Address.PostalCode}`}{" "}
                        <span
                          className="ml-2"
                          style={{ fontSize: 12, color: "#a0a8b8" }}
                        >
                          {Payee.Address.Country}
                        </span>
                      </p>
                      <hr className="border rounded my-3 mx-lg-0 w-50" />
                      <p className="text-secondary">
                      <span className="">
                        <i
                          className="fas fa-credit-card"
                          style={{ color: "#0000ff" }}
                        />{" "}
                        {Payee.Phone}
                      </span>
                        PAN:{" "}
                        <span style={{ color: "#a0a8b8" }}>{Payment.PAN}</span>
                      </p>
                      <p className="text-secondary">
                        CVV:{" "}
                        <span style={{ color: "#a0a8b8" }}>{Payment.CVV}</span>{" "}
                        <span className="ml-4">
                          Exp:{" "}
                          <span style={{ color: "#a0a8b8" }}>
                            {Payment.Exp}
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6 p-lg-5 my-2 my-lg-0">
                      <h3 className="mb-3 text-center text-lg-left" style={{ fontStyle: "italic" }}>
                        {Remittance.length > 1 ? "Remittances" : "Remittance"}
                      </h3>
                      <div
                        id={`remittanceCarouselIndicators-${index}`}
                        className="carousel slide rounded bg-light p-5"
                        data-ride="carousel"
                        style={{ height: 400 }}
                      >
                        <ol className="carousel-indicators bg-light rounded w-50 m-0 mx-auto mb-3">
                          {Remittance.map((payor, i) => {
                            return (
                              <li
                                data-target={`#remittanceCarouselIndicators-${index}`}
                                data-slide-to={i}
                                className={i === 0 ? "active" : null}
                                key={`rci-${index}li-${i}`}
                              />
                            );
                          })}
                        </ol>
                        <div className="carousel-inner">
                          {Remittance.map((payor, index) => {
                            return (
                              <div
                                key={index}
                                className={
                                  index === 0
                                    ? "carousel-item active"
                                    : "carousel-item"
                                }
                              >
                                <div className="container d-flex flex-column justify-content-center align-items-center">
                                  <div className="row w-100 p-0 m-0">
                                    <p
                                      className="ml-auto"
                                      style={{ color: "#a0a8b8" }}
                                    >
                                      {"Invoice #" + payor.InvoiceNo}
                                    </p>
                                  </div>
                                  <div className="row text-center">
                                    <h1
                                      className="mx-auto"
                                      style={{ color: "#0000ff" }}
                                    >
                                      {payor.Amount}
                                    </h1>
                                    <hr className="border rounded my-3 mx-auto w-50" />
                                    <p className="text-center mx-auto" style={{ fontSize: "1.25em" }}>
                                      {payor.Description}
                                    </p>
                                  </div>
                                  <div className="row text-center">
                                    <div className="d-flex justify-content-center">
                                      <h3>{payor.PayorName}</h3>
                                      <span
                                        className="ml-1"
                                        style={{ color: "#a0a8b8" }}
                                      >
                                        {payor.PayorId}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <a
                          className="carousel-control-prev"
                          href={`#remittanceCarouselIndicators-${index}`}
                          role="button"
                          data-slide="prev"
                        >
                          <i className="fas fa-chevron-left fa-lg text-dark" />
                          <span className="sr-only"></span>
                        </a>
                        <a
                          className="carousel-control-next"
                          href={`#remittanceCarouselIndicators-${index}`}
                          role="button"
                          data-slide="next"
                        >
                          <i className="fas fa-chevron-right fa-lg text-dark" />
                          <span className="sr-only"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Payments;