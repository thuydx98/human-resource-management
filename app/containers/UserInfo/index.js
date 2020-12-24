import React from 'react';
import { Button, Card, CardBody, CardText, Row, Col } from 'reactstrap';
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

  const { selectedTab, selectUserInfo } = states;
  const { setSelectedTab, setUser } = handlers;
  const { avatar, firstname, lastname, permission } = selectUserInfo || {};

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
                    src={avatar || require('assets/img/default-avatar.png')}
                  />
                  <h5 className="title">
                    {firstname ? `${firstname} ${lastname}` : '-'}
                  </h5>
                </a>
                <p className="description">{permission}</p>
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
                Feed back
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
            <PersonalInfo user={selectUserInfo} updateUser={setUser} />
          )}
          {selectedTab === USER_INFO_TABS.bankAccountTab && (
            <BankAccount user={selectUserInfo} updateUser={setUser} />
          )}
          {selectedTab === USER_INFO_TABS.contractTab && (
            <Contract user={selectUserInfo} updateUser={setUser} />
          )}
          {selectedTab === USER_INFO_TABS.insuranceTab && (
            <Insurance user={selectUserInfo} updateUser={setUser} />
          )}
          {selectedTab === USER_INFO_TABS.reportTab && (
            <ReportingLine user={selectUserInfo} updateUser={setUser} />
          )}
          {selectedTab === USER_INFO_TABS.projectTab && (
            <ProjectInfo user={selectUserInfo} updateUser={setUser} />
          )}
        </Col>
      </Row>
    </div>
  );
}
