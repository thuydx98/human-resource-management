import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  FormFeedback,
} from 'reactstrap';
import get from 'lodash/fp/get';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks, { USER_INFO_TABS } from './hook';
import PersonalInfo from './PersonalInfo/Loadable';
import BankAccount from './BankAccount/Loadable';
import ReportingLine from './ReportingLine/Loadable';
import ProjectInfo from './ProjectInfo/Loadable';
import Insurance from './Insurance/Loadable';
import Contract from './Contract/Loadable';

export default function UserInfo() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const { user, isSubmitted } = states;
  const { onSubmit, setUser } = handlers;

  const { selectedTab } = states;
  const { setSelectedTab, updateUser } = handlers;

  return (
    <div className="content">
      <Row>
        <Col md="3">
          <Card className="card-user">
            <CardBody>
              <CardText />
              <div className="author">
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar"
                    src={require('assets/img/emilyz.jpg')}
                  />
                  <h5 className="title">Thien Nguyen</h5>
                </a>
                <p className="description">Principle Software Engineer</p>
              </div>
              <Button
                className="card-description btn-link w-100 text-left m-0 mt-4"
                onClick={() => setSelectedTab(USER_INFO_TABS.personalTab)}
              >
                Personal detail
              </Button>
              <Button
                className="card-description btn-link w-100 text-left m-0 mt-2"
                onClick={() => setSelectedTab(USER_INFO_TABS.bankAccountTab)}
              >
                Bank account
              </Button>
              <Button
                className="card-description btn-link w-100 text-left m-0 mt-2"
                onClick={() => setSelectedTab(USER_INFO_TABS.contractTab)}
              >
                Contract
              </Button>
              <Button
                className="card-description btn-link w-100 text-left m-0 mt-2"
                onClick={() => setSelectedTab(USER_INFO_TABS.insuranceTab)}
              >
                Insurance
              </Button>
              <Button
                className="card-description btn-link w-100 text-left m-0 mt-2"
                onClick={() => setSelectedTab(USER_INFO_TABS.reportTab)}
              >
                Reporting line
              </Button>
              <Button
                className="card-description btn-link w-100 text-left m-0 mt-2"
                onClick={() => setSelectedTab(USER_INFO_TABS.projectTab)}
              >
                Project info
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md="9">
          {selectedTab === USER_INFO_TABS.personalTab && (
            <PersonalInfo user={user} updateUser={updateUser} />
          )}
          {selectedTab === USER_INFO_TABS.bankAccountTab && (
            <BankAccount user={user} updateUser={updateUser} />
          )}
          {selectedTab === USER_INFO_TABS.contractTab && (
            <Contract user={user} updateUser={updateUser} />
          )}
          {selectedTab === USER_INFO_TABS.insuranceTab && (
            <Insurance user={user} updateUser={updateUser} />
          )}
          {selectedTab === USER_INFO_TABS.reportTab && (
            <ReportingLine user={user} updateUser={updateUser} />
          )}
          {selectedTab === USER_INFO_TABS.projectTab && (
            <ProjectInfo user={user} updateUser={updateUser} />
          )}
        </Col>
      </Row>
    </div>
  );
}
