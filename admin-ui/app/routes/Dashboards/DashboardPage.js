import React, { useState, useEffect } from 'react'
import { subMonths } from 'date-fns'
import moment from 'moment'
import CustomBarGraph from './Grapths/CustomBarGraph'
import CustomLineChart from './Grapths/CustomLineChart'
import CustomBadgeRow from './Grapths/CustomBadgeRow'
import 'react-datepicker/dist/react-datepicker.css'
import GluuLoader from '../Apps/Gluu/GluuLoader'
import GluuViewWrapper from '../Apps/Gluu/GluuViewWrapper'
import { getMau } from '../../redux/actions/MauActions'
import { getClients } from '../../redux/actions/InitActions'
import applicationstyle from '../Apps/Gluu/styles/applicationstyle'
import GluuRibbon from '../Apps/Gluu/GluuRibbon'
import {
  Button,
  Card,
  CardFooter,
  CardBody,
  FormGroup,
  Col,
} from '../../../app/components'
import {
  hasBoth,
  buildPayload,
  STAT_READ,
  STAT_JANS_READ,
} from '../../utils/PermChecker'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

function DashboardPage({ statData, permissions, clients, loading, dispatch }) {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState(subMonths(new Date(), 3))
  const [endDate, setEndDate] = useState(new Date())
  const userAction = {}
  const options = {}
  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      if (statData.length === 0 && count < 2) {
        search()
      }
      if (clients.length === 0 && count < 2) {
        buildPayload(userAction, 'Fetch openid connect clients', {})
        dispatch(getClients(userAction))
      }
      count++
    }, 1000)
    return () => clearInterval(interval)
  }, [1000])

  function search() {
    options['month'] = getFormattedMonth()
    buildPayload(userAction, 'GET MAU', options)
    dispatch(getMau(userAction))
  }

  function doDataAugmentation(input) {
    let stat = input
    if (stat && stat.length >= 1) {
      let flattendStat = stat.map((entry) => entry['month'])
      let aRange = generateDateRange(moment(startDate), moment(endDate))
      for (const ele of aRange) {
        const currentMonth = getYearMonth(new Date(ele))
        if (flattendStat.indexOf(parseInt(currentMonth, 10)) === -1) {
          let newEntry = new Object()
          newEntry['month'] = parseInt(getYearMonth(new Date(ele)), 10)
          newEntry['mau'] = 0
          newEntry['client_credentials_access_token_count'] = 0
          newEntry['authz_code_access_token_count'] = 0
          newEntry['authz_code_idtoken_count'] = 0
          stat.push(newEntry)
        }
      }
      return Array.from(new Set(stat)).sort(
        (a, b) => parseInt(a.month, 10) - parseInt(b.month, 10),
      )
    }
    return stat
  }
  function getYearMonth(date) {
    return date.getFullYear() + getMonth(date)
  }
  function getFormattedMonth() {
    return getYearMonth(startDate) + '%' + getYearMonth(endDate)
  }
  function getMonth(aDate) {
    let value = String(aDate.getMonth() + 1)
    if (value.length > 1) {
      return value
    } else {
      return '0' + value
    }
  }

  function generateDateRange(start, end) {
    var result = []
    while (start.isBefore(end)) {
      result.push(start.format('YYYY-MM-01'))
      start.add(1, 'month')
    }
    return result
  }

  const CustomButton = React.forwardRef(({ value, onClick }, ref) => (
    <Button
      color="primary"
      outline
      style={applicationstyle.customButtonStyle}
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </Button>
  ))

  return (
    <GluuLoader blocking={loading}>
      <GluuViewWrapper
        canShow={hasBoth(permissions, STAT_READ, STAT_JANS_READ)}
      >
        <Card>
          <GluuRibbon title={t('titles.active_users')} fromLeft />
          <FormGroup row />
          <FormGroup row />
          <FormGroup row />
          <FormGroup row />
          <FormGroup row />
          <FormGroup row />
          <FormGroup row>
            <Col sm={2}></Col>
            <Col sm={3}>
              <CustomBadgeRow
                label="OIDC Clients Count"
                value={clients.length}
              />
            </Col>
            <Col sm={3}>
              <CustomBadgeRow label="Active Users Count" value={1} />
            </Col>
            <Col sm={3}>
              <CustomBadgeRow label="Token issued count" value={153} />
            </Col>
            <Col sm={1}></Col>
          </FormGroup>
          <FormGroup row />
          <FormGroup row />
          <CardBody>
            <FormGroup row>
              <Col sm={6}>
                <CustomBarGraph data={statData} />
              </Col>
              <Col sm={6}>
                <CustomLineChart data={doDataAugmentation(statData)} />
              </Col>
            </FormGroup>
          </CardBody>
          <CardFooter className="p-4 bt-0"></CardFooter>
        </Card>
      </GluuViewWrapper>
    </GluuLoader>
  )
}

const mapStateToProps = (state) => {
  return {
    statData: state.mauReducer.stat,
    loading: state.mauReducer.loading,
    clients: state.initReducer.clients,
    permissions: state.authReducer.permissions,
  }
}

export default connect(mapStateToProps)(DashboardPage)
