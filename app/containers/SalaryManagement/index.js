/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  UncontrolledTooltip,
  Spinner,
} from 'reactstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import moment from 'moment';
import SubmitButton from 'components/Buttons/SubmitButton';
import Notification from 'components/Notification';
import { ACTION_STATUS } from 'utils/constants';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import useHooks, { calculateTax, formatCurrency } from './hook';

export default function SalaryManagement() {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { states, handlers } = useHooks();
  const {
    selectedDate,
    salaries,
    saveSalaryListState,
    getListSalaryState,
    notificationRef,
  } = states;
  const { setSelectedDate, handleSaveListSalary } = handlers;

  return (
    <div className="content">
      <div className="d-flex">
        <Input
          type="month"
          defaultValue={selectedDate}
          max={moment().format('YYYY-MM')}
          className="w-25"
          onChange={e =>
            setSelectedDate(moment(e.target.value).format('YYYY-MM'))
          }
        />
        <SubmitButton
          className="ml-3"
          disabled={
            !salaries ||
            salaries.length === 0 ||
            salaries[0].submitted ||
            saveSalaryListState === ACTION_STATUS.PENDING ||
            saveSalaryListState === ACTION_STATUS.SUCCESS
          }
          loading={saveSalaryListState === ACTION_STATUS.PENDING}
          onClick={handleSaveListSalary}
        >
          {saveSalaryListState === ACTION_STATUS.SUCCESS ||
          (salaries && salaries.length > 0 && salaries[0].submitted)
            ? 'Submitted'
            : 'Submit'}
        </SubmitButton>
        <UncontrolledDropdown className="ml-auto">
          <DropdownToggle
            caret
            className="btn-icon"
            color="link"
            data-toggle="dropdown"
            type="button"
          >
            <i className="tim-icons icon-settings-gear-63" />
          </DropdownToggle>
          <DropdownMenu aria-labelledby="dropdownMenuLink" right>
            <DropdownItem onClick={e => e.preventDefault()}>
              Export report
            </DropdownItem>
            <DropdownItem onClick={e => e.preventDefault()}>
              Export for each bank
            </DropdownItem>
            <DropdownItem onClick={e => e.preventDefault()}>
              Send report to banks
            </DropdownItem>
            <DropdownItem onClick={e => e.preventDefault()}>
              Send report to employees
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th className="text-center">
              Working <br /> date
            </th>
            <th className="text-right">Net salary</th>
            <th className="text-right">
              Social ins <br /> 8% + 17.5%
            </th>
            <th className="text-right">
              Health ins <br /> 1.5% + 3%
            </th>
            <th className="text-right">
              Unemployment ins
              <br /> 1% + 1%
            </th>
            <th className="text-right">
              Tax
              <span id="tooltip_tax" className="text-info cursor-pointer">
                <i className="tim-icons icon-alert-circle-exc ml-1 mb-1" />
              </span>
              <UncontrolledTooltip target="tooltip_tax" placement="right">
                Actual salary + Other
                <br /> <div className="d-inline">- SI - HI - UI</div>
                <div className="text-left">{'5%:  < 5 mil'}</div>
                <div className="text-left">{'10%: < 5 - 10 mil'}</div>
                <div className="text-left">{'15%: < 10 - 18 mil'}</div>
                <div className="text-left">{'20%: < 18 - 32  mil'}</div>
                <div className="text-left">{'25%: < 32 - 52  mil'}</div>
                <div className="text-left">{'30%: < 52 - 80  mil'}</div>
                <div className="text-left">{'35%: > 80 mil'}</div>
              </UncontrolledTooltip>
            </th>
            <th className="text-right">Other</th>
            <th className="text-right">Total paid</th>
          </tr>
        </thead>
        <tbody>
          {salaries &&
            salaries.map(item => {
              const gross =
                (item.gross / item.totalWorkingDateOfMonth) *
                item.totalWorkingDate;
              const social = gross * 0.08;
              const companySocial = gross * 0.175;
              const health = gross * 0.015;
              const companyHealth = gross * 0.03;
              const unemployment = gross * 0.01;
              const other = item.others.reduce((a, b) => a + b.amount, 0);
              const tax = calculateTax(
                gross + other - health - social - unemployment,
              );
              const net = gross + other - social - health - unemployment - tax;
              const total =
                gross + companyHealth + companySocial + unemployment + other;
              return (
                <tr key={item.id}>
                  <td>{item.employeeCode}</td>
                  <td>{item.employee}</td>
                  <td className="text-center">
                    <span
                      id={`tooltip${item.id}_working_date`}
                      className="text-info cursor-pointer"
                    >
                      {item.totalWorkingDate}/{item.totalWorkingDateOfMonth}
                    </span>
                    <UncontrolledTooltip
                      target={`tooltip${item.id}_working_date`}
                    >
                      {`${moment(item.startDate).format(
                        'MMM DD YYYY',
                      )} - ${moment(item.endDate).format('MMM DD YYYY')}`}
                      <br />
                      {`Leaves: ${item.leaves.length} days (non-paid)`}
                    </UncontrolledTooltip>
                  </td>
                  <td className="text-right">
                    <span
                      id={`tooltip${item.id}_salary`}
                      className="text-info cursor-pointer"
                    >
                      {formatCurrency(net)}
                    </span>
                    <UncontrolledTooltip target={`tooltip${item.id}_salary`}>
                      {`Gross base: ${formatCurrency(item.gross)}`}
                      <br />
                      {`Actual salary: ${formatCurrency(gross)}`}
                    </UncontrolledTooltip>
                  </td>
                  <td className="text-right">
                    <span
                      id={`tooltip${item.id}_social`}
                      className="text-info cursor-pointer"
                    >
                      {formatCurrency(social + companySocial)}
                    </span>
                    <UncontrolledTooltip target={`tooltip${item.id}_social`}>
                      <div className="text-left">
                        {`Employee (8%): ${formatCurrency(social)}`}
                      </div>
                      {`Employer (17.5%): ${formatCurrency(companySocial)}`}
                    </UncontrolledTooltip>
                  </td>
                  <td className="text-right">
                    <span
                      id={`tooltip${item.id}_health`}
                      className="text-info cursor-pointer"
                    >
                      {formatCurrency(health + companyHealth)}
                    </span>
                    <UncontrolledTooltip target={`tooltip${item.id}_health`}>
                      <div className="text-left">
                        {`Employee (1.5%): ${formatCurrency(health)}`}
                      </div>
                      {`Employer (3%): ${formatCurrency(companyHealth)}`}
                    </UncontrolledTooltip>
                  </td>
                  <td className="text-right">
                    <span
                      id={`tooltip${item.id}_unemployment`}
                      className="text-info cursor-pointer"
                    >
                      {formatCurrency(unemployment + unemployment)}
                    </span>
                    <UncontrolledTooltip
                      target={`tooltip${item.id}_unemployment`}
                    >
                      <div className="text-left">
                        {`Employee (8%): ${formatCurrency(unemployment)}`}
                      </div>
                      {`Employer (17.5%): ${formatCurrency(unemployment)}`}
                    </UncontrolledTooltip>
                  </td>
                  <td className="text-right">{formatCurrency(tax)}</td>
                  <td className="text-right">
                    <span
                      id={`tooltip${item.id}_other`}
                      className={other > 0 ? 'text-info cursor-pointer' : ''}
                    >
                      {other < 0 ? '- ' : '+ '}
                      {formatCurrency(other)}
                    </span>
                    {other > 0 && (
                      <UncontrolledTooltip target={`tooltip${item.id}_other`}>
                        {item.others.map(otherItem => (
                          <div key={otherItem.id} className="text-left">
                            {`${otherItem.amount < 0 ? '- ' : '+ '}
                                ${formatCurrency(otherItem.amount)}: 
                                ${otherItem.description}`}
                          </div>
                        ))}
                      </UncontrolledTooltip>
                    )}
                  </td>
                  <td className="text-right">
                    {String(total.toFixed(0)).replace(
                      /(.)(?=(\d{3})+$)/g,
                      '$1.',
                    )}{' '}
                    đ
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      {getListSalaryState === ACTION_STATUS.PENDING && (
        <h5 className="w-100 text-center text-info">
          <Spinner size="sm" color="info" className="mr-2" />
          Loading...
        </h5>
      )}
      {getListSalaryState === ACTION_STATUS.FAILED && (
        <h5 className="w-100 text-center text-danger">Load data failed</h5>
      )}
      {getListSalaryState === ACTION_STATUS.SUCCESS &&
        salaries.length === 0 && (
          <h5 className="w-100 text-center text-info">No data</h5>
        )}

      <Notification ref={notificationRef} />
    </div>
  );
}
