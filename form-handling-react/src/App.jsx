import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1> Controlled Registration Form </h1>
      <RegistrationForm />

      <hr style={{ margin: '40px 0' }} />

      <h1> Registration Form </h1>
      <FormikForm />
    </div>
  );
}

export default App;
