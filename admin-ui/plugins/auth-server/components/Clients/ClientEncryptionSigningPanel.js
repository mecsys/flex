import React from 'react'
import { Col, Container, FormGroup } from 'Components'
import GluuInputRow from 'Routes/Apps/Gluu/GluuInputRow'
import GluuSelectRow from 'Routes/Apps/Gluu/GluuSelectRow'
import { useTranslation } from 'react-i18next'
const DOC_CATEGORY = 'openid_client'

function ClientEncryptionSigningPanel({ client, formik, oidcConfiguration }) {
  const { t } = useTranslation()
  const accessTokenSigningAlg = !!oidcConfiguration.tokenEndpointAuthSigningAlgValuesSupported
    ? oidcConfiguration.tokenEndpointAuthSigningAlgValuesSupported
    : []
  //id_token
  const idTokenSignedResponseAlg = !!oidcConfiguration.idTokenSigningAlgValuesSupported
    ? oidcConfiguration.idTokenSigningAlgValuesSupported
    : []

  const idTokenEncryptedResponseAlg = !!oidcConfiguration.idTokenEncryptionAlgValuesSupported
    ? oidcConfiguration.idTokenEncryptionAlgValuesSupported
    : []

  const idTokenEncryptedResponseEnc = !!oidcConfiguration.idTokenEncryptionEncValuesSupported
    ? oidcConfiguration.idTokenEncryptionEncValuesSupported
    : []
  //request-object
  const requestObjectSignedResponseAlg = !!oidcConfiguration.requestObjectSigningAlgValuesSupported
    ? oidcConfiguration.requestObjectSigningAlgValuesSupported
    : []

  const requestObjectEncryptedResponseAlg = !!oidcConfiguration.requestObjectEncryptionAlgValuesSupported
    ? oidcConfiguration.requestObjectEncryptionAlgValuesSupported
    : []

  const requestObjectEncryptedResponseEnc = !!oidcConfiguration.requestObjectEncryptionEncValuesSupported
    ? oidcConfiguration.requestObjectEncryptionEncValuesSupported
    : []
  //user-info
  const userInfoSignedResponseAlg = !!oidcConfiguration.userInfoSigningAlgValuesSupported
    ? oidcConfiguration.userInfoSigningAlgValuesSupported
    : []

  const userInfoEncryptedResponseAlg = !!oidcConfiguration.userInfoEncryptionAlgValuesSupported
    ? oidcConfiguration.userInfoEncryptionAlgValuesSupported
    : []

  const userInfoEncryptedResponseEnc = !!oidcConfiguration.userInfoEncryptionEncValuesSupported
    ? oidcConfiguration.userInfoEncryptionEncValuesSupported
    : []

  // authorization
  const jansAuthSignedRespAlg = !!oidcConfiguration.authorizationSigningAlgValuesSupported
    ? oidcConfiguration.authorizationSigningAlgValuesSupported
    : []

  const jansAuthEncRespAlg = !!oidcConfiguration.authorizationEncryptionAlgValuesSupported
    ? oidcConfiguration.authorizationEncryptionAlgValuesSupported
    : []

  const jansAuthEncRespEnc = !!oidcConfiguration.authorizationEncryptionEncValuesSupported
    ? oidcConfiguration.authorizationEncryptionEncValuesSupported
    : []

  const tokenEndpointAuthMethod = !!oidcConfiguration.tokenEndpointAuthMethodsSupported
    ? oidcConfiguration.tokenEndpointAuthMethodsSupported
    : []

  return (
    <Container>
      <GluuInputRow
        label="fields.jwks_uri"
        name="jwksUri"
        formik={formik}
        value={client.jwksUri}
        doc_category={DOC_CATEGORY}
      />
      <GluuInputRow
        label="fields.jwks"
        name="jwks"
        formik={formik}
        value={client.jwks}
        doc_category={DOC_CATEGORY}
      />
      <h2>{t(`titles.id_token`)}</h2>
      <FormGroup row>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.id_token_signed_response_alg"
            formik={formik}
            value={client.accessTokenSigningAlg}
            values={idTokenSignedResponseAlg}
            lsize={6}
            rsize={6}
            name="idTokenSignedResponseAlg"
            doc_category={DOC_CATEGORY}
          />
        </Col>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.id_token_encrypted_response_alg"
            formik={formik}
            lsize={6}
            rsize={6}
            value={client.idTokenEncryptedResponseAlg}
            values={idTokenEncryptedResponseAlg}
            name="idTokenEncryptedResponseAlg"
            doc_category={DOC_CATEGORY}
          />
        </Col>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.id_token_encrypted_response_enc"
            formik={formik}
            value={client.idTokenEncryptedResponseEnc}
            values={idTokenEncryptedResponseEnc}
            lsize={6}
            rsize={6}
            name="idTokenEncryptedResponseEnc"
            doc_category={DOC_CATEGORY}
          />
        </Col>
      </FormGroup>
      <h2>{t(`titles.access_token`)}</h2>
      <FormGroup row>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.access_token_signing_alg"
            formik={formik}
            value={client.accessTokenSigningAlg}
            values={accessTokenSigningAlg}
            lsize={6}
            rsize={6}
            name="accessTokenSigningAlg"
            doc_category={DOC_CATEGORY}
          />
        </Col>
      </FormGroup>
      <h2>{t(`titles.userinfo`)}</h2>
      <FormGroup row>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.user_info_signed_response_alg"
            formik={formik}
            value={client.userInfoSignedResponseAlg}
            values={userInfoSignedResponseAlg}
            lsize={6}
            rsize={6}
            name="userInfoSignedResponseAlg"
            doc_category={DOC_CATEGORY}
          />
        </Col>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.user_info_encrypted_response_alg"
            formik={formik}
            value={client.userInfoEncryptedResponseAlg}
            values={userInfoEncryptedResponseAlg}
            lsize={6}
            rsize={6}
            name="userInfoEncryptedResponseAlg"
            doc_category={DOC_CATEGORY}
          />
        </Col>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.user_info_encrypted_response_enc"
            formik={formik}
            value={client.userInfoEncryptedResponseEnc}
            values={userInfoEncryptedResponseEnc}
            lsize={6}
            rsize={6}
            name="userInfoEncryptedResponseEnc"
            doc_category={DOC_CATEGORY}
          />
        </Col>
      </FormGroup>
      <h2>{t(`titles.JARM`)}</h2>
      <FormGroup row>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.authorizationSignedResponseAlg"
            formik={formik}
            value={client.jansAuthSignedRespAlg}
            values={idTokenSignedResponseAlg}
            lsize={6}
            rsize={6}
            name="jansAuthSignedRespAlg"
            doc_category={DOC_CATEGORY}
          />
        </Col>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.authorizationEncryptedResponseAlg"
            formik={formik}
            lsize={6}
            rsize={6}
            value={client.jansAuthEncRespAlg}
            values={idTokenEncryptedResponseAlg}
            name="jansAuthEncRespAlg"
            doc_category={DOC_CATEGORY}
          />
        </Col>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.authorizationEncryptedResponseEnc"
            formik={formik}
            value={client.jansAuthEncRespEnc}
            values={idTokenEncryptedResponseEnc}
            lsize={6}
            rsize={6}
            name="jansAuthEncRespEnc"
            doc_category={DOC_CATEGORY}
          />
        </Col>
      </FormGroup>
      <h2>{t(`titles.request_object`)}</h2>
      <FormGroup row>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.request_object_signing_alg"
            formik={formik}
            value={client.requestObjectSigningAlg}
            values={requestObjectSignedResponseAlg}
            lsize={6}
            rsize={6}
            name="requestObjectSigningAlg"
            doc_category={DOC_CATEGORY}
          />
        </Col>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.request_object_encryption_alg"
            formik={formik}
            value={client.requestObjectEncryptionAlg}
            values={requestObjectEncryptedResponseAlg}
            lsize={6}
            rsize={6}
            name="requestObjectEncryptionAlg"
            doc_category={DOC_CATEGORY}
          />
        </Col>
        <Col sm={6}>
          <GluuSelectRow
            label="fields.request_object_encryption_enc"
            formik={formik}
            value={client.requestObjectEncryptionEnc}
            values={requestObjectEncryptedResponseEnc}
            lsize={6}
            rsize={6}
            name="requestObjectEncryptionEnc"
            doc_category={DOC_CATEGORY}
          />
        </Col>
      </FormGroup>
    </Container>
  )
}

export default ClientEncryptionSigningPanel
