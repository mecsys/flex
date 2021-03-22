import React, { useState } from 'react'
import {
  Container,
  Wizard,
  Card,
  CardFooter,
  CardBody,
  Form,
  Button,
} from '../../../components'
import ClientBasic from './ClientBasicPanel'
import ClientAdvanced from './ClientAdvancedPanel'
import ClientEncryption from './ClientEncryptionPanel'
import ClientAttributes from './ClientAttributesPanel'
import ClientScript from './ClientScriptPanel'
import { Formik } from 'formik'
const sequence = [
  'Basic',
  'Advanced',
  'Encryption && Signing',
  'Client Attributes',
  'Custom Scripts',
]

function ClientWizardForm({ client, permissions, handleSubmit }) {
  const [currentStep, setCurrentStep] = useState(sequence[0])

  function changeStep(stepId) {
    setCurrentStep(stepId)
  }
  function setId(index) {
    return sequence[index]
  }

  function prevStep() {
    setCurrentStep(sequence[sequence.indexOf(currentStep) - 1])
  }

  function nextStep() {
    setCurrentStep(sequence[sequence.indexOf(currentStep) + 1])
  }

  function isComplete(stepId) {
    return sequence.indexOf(stepId) < sequence.indexOf(currentStep)
  }

  const initialValues = {
    inum: client.inum,
    clientSecret: client.secret,
    clientName: client.clientName,
    displayName: client.displayName,
    description: client.description,
    applicationType: client.applicationType,
    subjectType: client.subjectType,
    registrationAccessToken: client.registrationAccessToken,
    clientIdIssuedAt: client.clientIdIssuedAt,
    idTokenSignedResponseAlg: client.idTokenSignedResponseAlg,
    tokenEndpointAuthMethod: client.tokenEndpointAuthMethod,
    accessTokenSigningAlg: client.accessTokenSigningAlg,
    authenticationMethod: client.authenticationMethod,

    redirectUris: client.redirectUris,
    responseTypes: client.responseTypes,
    grantTypes: client.grantTypes,
    contacts: client.contacts,
    defaultAcrValues: client.defaultAcrValues,
    postLogoutRedirectUris: client.postLogoutRedirectUris,
    scopes: client.scopes,
    customAttributes: client.customAttributes,
    customObjectClasses: client.customObjectClasses,

    deletable: client.deletable,
    frontChannelLogoutSessionRequired: client.frontChannelLogoutSessionRequired,
    requireAuthTime: client.requireAuthTime,
    trustedClient: client.trustedClient,
    persistClientAuthorizations: client.persistClientAuthorizations,
    includeClaimsInIdToken: client.includeClaimsInIdToken,
    rptAsJwt: client.rptAsJwt,
    accessTokenAsJwt: client.accessTokenAsJwt,
    disabled: client.disabled,
    tokenBindingSupported: client.tokenBindingSupported,
  }

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(JSON.stringify(values))
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Card>
              <CardBody className="d-flex justify-content-center pt-5">
                <Wizard activeStep={currentStep} onStepChanged={changeStep}>
                  <Wizard.Step
                    id={setId(0)}
                    icon={<i className="fa fa-shopping-basket fa-fw"></i>}
                    complete={isComplete(sequence[0])}
                  >
                    Basic
                  </Wizard.Step>
                  <Wizard.Step
                    id={setId(1)}
                    icon={<i className="fa fa-cube fa-fw"></i>}
                    complete={isComplete(sequence[1])}
                  >
                    Advanced
                  </Wizard.Step>
                  <Wizard.Step
                    id={setId(2)}
                    icon={<i className="fa fa-credit-card fa-fw"></i>}
                    complete={isComplete(sequence[2])}
                  >
                    Encryption/Signing
                  </Wizard.Step>
                  <Wizard.Step
                    id={setId(3)}
                    icon={<i className="fa fa-credit-card fa-fw"></i>}
                    complete={isComplete(sequence[3])}
                  >
                    Attributes
                  </Wizard.Step>
                  <Wizard.Step
                    id={setId(4)}
                    icon={<i className="fa fa-credit-card fa-fw"></i>}
                    complete={isComplete(sequence[4])}
                  >
                    Custom Scripts
                  </Wizard.Step>
                </Wizard>
              </CardBody>
              <CardBody className="p-5">
                {(() => {
                  switch (currentStep) {
                    case sequence[0]:
                      return <ClientBasic client={client} formik={formik} />
                    case sequence[1]:
                      return <ClientAdvanced client={client} formik={formik} />
                    case sequence[2]:
                      return (
                        <ClientEncryption client={client} formik={formik} />
                      )
                    case sequence[3]:
                      return (
                        <ClientAttributes client={client} formik={formik} />
                      )
                    case sequence[4]:
                      return <ClientScript client={client} formik={formik} />
                  }
                })()}
              </CardBody>
              <CardFooter className="p-4 bt-0">
                <div className="d-flex">
                  {currentStep !== sequence[0] && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      color="link"
                      className="mr-3"
                    >
                      <i className="fa fa-angle-left mr-2"></i>
                      Previous
                    </Button>
                  )}
                  {currentStep !== sequence[sequence.length - 1] && (
                    <Button
                      type="button"
                      color="primary"
                      onClick={nextStep}
                      className="ml-auto px-4"
                    >
                      Next
                      <i className="fa fa-angle-right ml-2"></i>
                    </Button>
                  )}
                  {currentStep === sequence[sequence.length - 1] && (
                    <Button
                      type="submit"
                      color="primary"
                      className="ml-auto px-4"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default ClientWizardForm
