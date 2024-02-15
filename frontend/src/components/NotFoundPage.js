import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="display-4">404</h1>
              <p className="lead">Page Not Found</p>
              <p>The page you are looking for does not exist.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
