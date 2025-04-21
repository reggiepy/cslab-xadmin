import { Page } from 'xadmin-ui';
import { SchemaForm } from 'xadmin-form';
import { C } from 'xadmin-ui';
import models from './models';
import React, { useState } from 'react';

const App = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <Page title="Dashboard">
      <button onClick={handleShow}>Show Modal</button>
      <SchemaForm
        formKey="test"
        schema={models.User}
        initialValues={{ superUser: true }}
        onSubmit={values => {
          console.log(values);
          return null;
        }}
        onChange={value => { console.log('changed', value); }}
        validate={values => {
          return {};
        }}
        // option={{ group: C('Form.SimpleGroup') }}
      >
        {/* {props => <C is="Form.ModalLayout" {...props} title={"Test Form"} show={show} onClose={handleClose} />} */}
      </SchemaForm>
    </Page>
  );
};

export default App