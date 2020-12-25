import React from 'react';
import {
  Button,
  Row,
  Col,
  ButtonGroup,
  Card,
  CardHeader,
  Input,
} from 'reactstrap';
import classNames from 'classnames';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks, { LEAVE_TABS } from './hook';
import RequestLeave from './RequestLeave';
import SummaryLeave from './SummaryLeave';
import LeaveHistory from './LeaveHistory';

export default function Leave() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { selectedTab, selectedYear } = states;
  const { setSelectedTab, setSelectedYear } = handlers;

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <Row>
            <Col md="3">
              {(selectedTab === LEAVE_TABS.summaryTab ||
                selectedTab === LEAVE_TABS.historyTab) && (
                <Input
                  type="select"
                  value={selectedYear || moment().year()}
                  onChange={e => setSelectedYear(e.target.value)}
                >
                  <option value={moment().year() - 3}>
                    {moment().year() - 3}
                  </option>
                  <option value={moment().year() - 2}>
                    {moment().year() - 2}
                  </option>
                  <option value={moment().year() - 1}>
                    {moment().year() - 1}
                  </option>
                  <option value={moment().year()}>{moment().year()}</option>
                  <option value={moment().year() + 1}>
                    {moment().year() + 1}
                  </option>
                </Input>
              )}
            </Col>
            <Col md="9">
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons"
              >
                <Button
                  tag="label"
                  className={classNames('btn-simple', {
                    active: selectedTab === LEAVE_TABS.requestTab,
                  })}
                  color="info"
                  id="0"
                  size="sm"
                  onClick={() => setSelectedTab(LEAVE_TABS.requestTab)}
                >
                  <input
                    defaultChecked
                    className="d-none"
                    name="options"
                    type="radio"
                  />
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Request
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-single-02" />
                  </span>
                </Button>
                <Button
                  color="info"
                  id="1"
                  size="sm"
                  tag="label"
                  className={classNames('btn-simple', {
                    active: selectedTab === LEAVE_TABS.summaryTab,
                  })}
                  onClick={() => setSelectedTab(LEAVE_TABS.summaryTab)}
                >
                  <input className="d-none" name="options" type="radio" />
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Summary
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-gift-2" />
                  </span>
                </Button>
                <Button
                  color="info"
                  id="2"
                  size="sm"
                  tag="label"
                  className={classNames('btn-simple', {
                    active: selectedTab === LEAVE_TABS.historyTab,
                  })}
                  onClick={() => setSelectedTab(LEAVE_TABS.historyTab)}
                >
                  <input className="d-none" name="options" type="radio" />
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    History
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-tap-02" />
                  </span>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
        {selectedTab === LEAVE_TABS.requestTab && <RequestLeave />}
        {selectedTab === LEAVE_TABS.summaryTab && <SummaryLeave />}
        {selectedTab === LEAVE_TABS.historyTab && <LeaveHistory />}
      </Card>
    </div>
  );
}
