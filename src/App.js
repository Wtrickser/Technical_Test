// react & effects
import React, { Fragment, useState, useEffect } from "react";
// components
import Main from "./components/Main/index";
import Payments from "./components/Payments/index";
import Pagination from "./components/Pagination/index";
import Footer from "./components/Footer/index";
// data blob
import PaymentsData from "./data/sample.json";

// fetch, paginate, & diplay
const App = () => {
  // declare vars
  const [paymentsPerPage] = useState(3);
  const [paymentsToRender, setPaymentsToRender] = useState([]);
  const [payments, setPayments] = useState([]);
  const [currentPage, SetCurrentPage] = useState(1);
  const paginate = pageNumber => SetCurrentPage(pageNumber);
  
  // fetch data
  useEffect(
    _ => {
      const fetchPayments = async () => {
        const res = await PaymentsData;
        // update states
        setPayments(res);
        setPaymentsToRender(
          res.slice(
            currentPage * paymentsPerPage - paymentsPerPage,
            currentPage * paymentsPerPage
          )
        );
      };
      // call ftn
      fetchPayments();
    },
    [currentPage, paymentsPerPage]
  );

  //  display
  return (
    <Fragment>
      <Main>
        <div className="row">
          <div className="col-md-6">
            <h1
              className="mb-3"
              style={{
                color: "#702082",
                fontSize: 50,
                fontWeight: 500,
              }}
            >
              Payment List
            </h1>
          </div>
        </div>
        <Payments
          payments={paymentsToRender}
        />
      </Main>
      <Footer>
        <Pagination
          paymentsPerPage={paymentsPerPage}
          totalPayments={payments.length}
          paginate={paginate}
        />
      </Footer>
    </Fragment>
  );
};

export default App;