import React from 'react';
import {
  Button,
  Row,
  Col,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import classNames from 'classnames';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks, { LEAVE_TABS } from './hook';
import RequestLeave from './RequestLeave/Loadable';
import SummaryLeave from './SummaryLeave/Loadable';
import LeaveHistory from './LeaveHistory/Loadable';

export default function Leave() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { selectedTab, userLeave } = states;
  const { setSelectedTab, updateLeave } = handlers;

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <Row>
            <Col md="6" />
            <Col sm="6">
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
        {selectedTab === LEAVE_TABS.requestTab && (
          <RequestLeave userLeave={userLeave} updateLeave={updateLeave} />
        )}
        {selectedTab === LEAVE_TABS.summaryTab && (
          <SummaryLeave userLeave={userLeave} updateLeave={updateLeave} />
        )}
        {selectedTab === LEAVE_TABS.historyTab && (
          <LeaveHistory userLeave={userLeave} updateLeave={updateLeave} />
        )}
      </Card>
    </div>
  );
}
