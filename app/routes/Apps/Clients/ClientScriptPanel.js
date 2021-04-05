import React from 'react'
import { Container } from '../../../components'
import GluuTypeAheadForDn from '../Gluu/GluuTypeAheadForDn'

function ClientScriptPanel({ client, scopes, scripts, formik }) {
  const postScripts = scripts
    .filter((item) => item.scriptType == 'POST_AUTHN')
    .filter((item) => item.enabled)
    .map((item) => ({ dn: item.dn, name: item.name }))

  const spontaneousScripts = scripts
    .filter((item) => item.scriptType == 'SPONTANEOUS_SCOPE')
    .filter((item) => item.enabled)
    .map((item) => ({ dn: item.dn, name: item.name }))

  const consentScripts = scripts
    .filter((item) => item.scriptType == 'CONSENT_GATHERING')
    .filter((item) => item.enabled)
    .map((item) => ({ dn: item.dn, name: item.name }))

  const instrospectionScripts = scripts
    .filter((item) => item.scriptType == 'INTROSPECTION')
    .filter((item) => item.enabled)
    .map((item) => ({ dn: item.dn, name: item.name }))

  const rptScripts = scripts
    .filter((item) => item.scriptType == 'UMA_RPT_CLAIMS')
    .filter((item) => item.enabled)
    .map((item) => ({ dn: item.dn, name: item.name }))

  function getMapping(partial, total) {
    if (!partial) {
      partial = []
    }
    return total.filter((item) => partial.includes(item.dn))
  }

  return (
    <Container>
      <GluuTypeAheadForDn
        name="postAuthnScripts"
        label="Post Authn Scripts"
        formik={formik}
        value={getMapping(client.postAuthnScripts, scripts)}
        options={postScripts}
      ></GluuTypeAheadForDn>
      <GluuTypeAheadForDn
        name="consentGatheringScripts"
        label="Consent Gathering Scripts"
        formik={formik}
        value={getMapping(client.consentGatheringScripts, scripts)}
        options={consentScripts}
      ></GluuTypeAheadForDn>
      <GluuTypeAheadForDn
        name="spontaneousScopeScriptDns"
        label="Spontaneous Scope Script Dns"
        formik={formik}
        value={getMapping(client.spontaneousScopeScriptDns, scripts)}
        options={spontaneousScripts}
      ></GluuTypeAheadForDn>
      <GluuTypeAheadForDn
        name="introspectionScripts"
        label="Introspection Scripts"
        formik={formik}
        value={getMapping(client.introspectionScripts, scripts)}
        options={instrospectionScripts}
      ></GluuTypeAheadForDn>
      <GluuTypeAheadForDn
        name="rptScripts"
        label="Rpt Scripts"
        formik={formik}
        value={getMapping(client.rptClaimsScripts, scripts)}
        options={rptScripts}
      ></GluuTypeAheadForDn>
      <GluuTypeAheadForDn
        name="spontaneousScopes"
        label="Spontaneous Scopes"
        formik={formik}
        value={getMapping(client.spontaneousScopes, scopes)}
        options={scopes}
      ></GluuTypeAheadForDn>
    </Container>
  )
}

export default ClientScriptPanel
